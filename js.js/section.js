window.onload = function() {
    const elm = document.querySelectorAll('.section');
    const elmCount = elm.length;
    let isScrolling = false; // 연속 스크롤 방지

    elm.forEach(function(item, index) {
        item.addEventListener('wheel', function(event) {
            if (isScrolling) return; // 이미 스크롤 중이면 중복 실행 방지
            isScrolling = true;

            event.preventDefault();
            let delta = event.deltaY > 0 ? 1 : -1; // 양수: 아래로, 음수: 위로

            let moveTop = window.scrollY;
            let elmSelector = elm[index];

            // wheel down : move to next section
            if (delta > 0) {
                if (index < elmCount - 1) {
                    moveTop = elmSelector.nextElementSibling.offsetTop;
                } else {
                    // 마지막 섹션에서 푸터로 이동
                    const footer = document.querySelector('footer');
                    if (footer) moveTop = footer.offsetTop;
                }
            }
            // wheel up : move to previous section
            else {
                if (index > 0) {
                    moveTop = elmSelector.previousElementSibling.offsetTop;
                } else {
                    // 첫 번째 섹션에서 최상단 고정
                    moveTop = 0;
                }
            }

            smoothScroll(moveTop);

            // 일정 시간 후 스크롤 가능하도록 설정
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        });
    });

    function smoothScroll(target) {
        const start = window.scrollY;
        const distance = target - start;
        const duration = 800; // 0.8초 동안 스크롤
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);

            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
};
