export default function initModal() {
    const openButton = document.querySelector('[data-modal="abrir"]');
    const closeButton = document.querySelector('[data-modal="fechar"]');
    const containerModal = document.querySelector('[data-modal="container"]');

    function toggleModal(event) {
        event.preventDefault();
        containerModal.classList.toggle('ativo');
    }

    function outsideModal(event) {
        if (event.target === this) {
            toggleModal(event);
        }
    }

    if (openButton && closeButton && containerModal) {
        openButton.addEventListener('click', toggleModal);
        closeButton.addEventListener('click', toggleModal);
        containerModal.addEventListener('click', outsideModal);
    }
}
