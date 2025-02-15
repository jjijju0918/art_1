window.onload = function() {
    const workBtnContainer = document.querySelector('.work__categories');
    const projectContainer = document.querySelector('.work__projects');
    const projects = document.querySelectorAll('.project');
    const noProjectsMessage = document.createElement('div'); // 메시지 요소 생성
    const sectionContainers = document.querySelectorAll('.section__container');

    // '업로드 예정입니다' 메시지 스타일링
    noProjectsMessage.classList.add('no-projects-message');
    noProjectsMessage.textContent = "업로드 예정입니다";
    noProjectsMessage.style.opacity = '0';
    noProjectsMessage.style.transition = 'opacity 0.5s ease';
    projectContainer.appendChild(noProjectsMessage);

    const firstBtn = document.querySelector('.category__btn.selected');
    if (!firstBtn) {
        console.warn("선택된 category__btn이 없습니다.");
        return;
    }

    const firstFilter = firstBtn.dataset.filter;

    function filterProjects(filter) {
        let hasVisibleProjects = false;

        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
                setTimeout(() => project.style.opacity = '1', 10);
                hasVisibleProjects = true;
            } else {
                project.style.opacity = '0';
                setTimeout(() => project.classList.add('invisible'), 0);
            }
        });

        setTimeout(() => {
            noProjectsMessage.style.opacity = hasVisibleProjects ? '0' : '1';
        }, 300);

        sectionContainers.forEach(container => {
            const span = container.querySelector('span');
            if (span) {
                span.style.opacity = hasVisibleProjects ? '1' : '0';
                span.style.transition = 'opacity 0.3s ease';
            }
            const message = container.querySelector('.message');
            if (message) {
                message.style.opacity = hasVisibleProjects ? '1' : '0';
                message.style.transition = 'opacity 0.3s ease';
            }
        });
    }

    filterProjects(firstFilter);

    workBtnContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category__btn')) {
            const filter = e.target.dataset.filter;
            if (filter == null) {
                return;
            }

            const active = document.querySelector('.category__btn.selected');
            if (active) active.classList.remove('selected');
            e.target.classList.add('selected');

            projectContainer.classList.add('anim-out');
            setTimeout(() => {
                filterProjects(filter);
                projectContainer.classList.remove('anim-out');
            }, 300);
        }
    });

    const elm = document.querySelectorAll('.section');
    const elmCount = elm.length;
    let isScrolling = false;

    elm.forEach(function(item, index) {
        item.addEventListener('wheel', function(event) {
            if (isScrolling) return;
            isScrolling = true;

            event.preventDefault();
            let delta = event.deltaY > 0 ? 1 : -1;

            let moveTop = window.scrollY;
            let elmSelector = elm[index];

            if (delta > 0) {
                if (index < elmCount - 1) {
                    moveTop = elmSelector.nextElementSibling.offsetTop;
                } else {
                    const footer = document.querySelector('footer');
                    if (footer) moveTop = footer.offsetTop;
                }
            } else {
                if (index > 0) {
                    moveTop = elmSelector.previousElementSibling.offsetTop;
                } else {
                    moveTop = 0;
                }
            }

            smoothScroll(moveTop);

            setTimeout(() => {
                isScrolling = false;
            }, 800);
        });
    });

    function smoothScroll(target) {
        const start = window.scrollY;
        const distance = target - start;
        const duration = 800;
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

    const categoryButtons = document.querySelectorAll('.category__btn');
    if (categoryButtons.length === 0) {
        const spans = document.querySelectorAll('.section__container span');
        spans.forEach(span => {
            span.style.opacity = '0';
            span.style.transition = 'opacity 0.2s ease';
        });
        const messages = document.querySelectorAll('.section__container .message');
        messages.forEach(message => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.2s ease';
        });
        noProjectsMessage.style.opacity = '0';
    }
};
