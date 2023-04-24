export default function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('[data-menu="suave"] a[href^="#"]');

    function scrollToSection(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href);

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    internalLinks.forEach((link) => {
        link.addEventListener('click', scrollToSection);
    });
}
