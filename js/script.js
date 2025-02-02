document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slider'); // .slider 클래스를 갖는 모든 슬라이드
    const totalSlides = slides.length;
    const prevButton = document.querySelector('.arrow-prev'); // 왼쪽 버튼
    const nextButton = document.querySelector('.arrow-next'); // 오른쪽 버튼

    // 슬라이드 이동
    function showSlide(index) {
        // 오른쪽 방향으로 순차적으로 이동, 마지막 슬라이드 뒤로 가면 첫 번째 슬라이드로 돌아가도록 처리
        if (index >= totalSlides) {
            currentIndex = 0; // 마지막 슬라이드 뒤로 넘기면 처음으로 돌아가기
        } else if (index < 0) {
            currentIndex = totalSlides - 1; // 처음 슬라이드 앞으로 넘기면 마지막으로 돌아가기
        } else {
            currentIndex = index;
        }

        // 각 슬라이드의 너비를 계산하여 transform 속성으로 이동
        const slideWidth = slides[0].offsetWidth;
        document.querySelector('.slider-container').style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // 첫 번째 슬라이드일 때 왼쪽 버튼 숨기기
        if (currentIndex === 0) {
            prevButton.style.display = 'none'; // 첫 번째 슬라이드에서만 왼쪽 버튼 숨기기
        } else {
            prevButton.style.display = 'block'; // 나머지 슬라이드에서는 왼쪽 버튼 보이기
        }

        // 마지막 슬라이드일 때 오른쪽 버튼 숨기기
        if (currentIndex === totalSlides - 1) {
            nextButton.style.display = 'none'; // 마지막 슬라이드에서만 오른쪽 버튼 숨기기
        } else {
            nextButton.style.display = 'block'; // 나머지 슬라이드에서는 오른쪽 버튼 보이기
        }
    }

    // 오른쪽으로 이동
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // 왼쪽으로 이동
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 슬라이드 컨트롤러
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // 슬라이드 크기 변경 시 업데이트
    window.addEventListener('resize', () => {
        showSlide(currentIndex);
    });

    // 페이지 로드 후 첫 번째 슬라이드 표시
    showSlide(currentIndex);
});
