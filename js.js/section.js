window.onload = function() {
    const elm = document.querySelectorAll('.section');
    const elmCount = elm.length;

    elm.forEach(function(item, index) {
        item.addEventListener('mousewheel', function(event) {
            event.preventDefault();
            let delta = 0;

            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }

            let moveTop = window.scrollY;
            let elmSelector = elm[index];

            // wheel down : move to next section
            if (delta < 0) {
                if (elmSelector !== elmCount - 1) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                    } catch (e) {}
                } else {
                    // 마지막 섹션에 있을 때 푸터로 이동
                    const footer = document.querySelector('footer');
                    moveTop = footer.offsetTop; // 푸터 위치로 이동
                }
            }
            // wheel up : move to previous section
            else {
                if (elmSelector !== 0) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                    } catch (e) {}
                } else {
                    // 첫 섹션에서 위로 스크롤 방지
                    moveTop = 0; // 최상단으로 스크롤
                }
            }

            window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
        });
    });
}