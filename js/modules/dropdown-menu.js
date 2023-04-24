import outsideClick from './outside-click.js';

export default function initDropdownMenu() {
    const dropdownMenus = document.querySelectorAll('[data-dropdown]');

    function handleClick(event) {
        // Previne o default, não abrindo o link
        event.preventDefault();
        // Adiciona/remove a classe 'active' na li
        this.classList.toggle('active');
        // Ao clicar/touch fora do this,
        // irá executar a função outsideClick e remover a classe 'active'
        outsideClick(this, ['touchstart', 'click'], () => {
            this.classList.remove('active');
        });
    }

    dropdownMenus.forEach((menu) => {
        // Em vez de adicionar o callback para cada tipo de evento, um por um,
        // cria-se uma Array com todos os tipos de eventos e,
        // então um loop para cada tipo de evento que receberá o callback
        ['touchstart', 'click'].forEach((userEvent) => {
            menu.addEventListener(userEvent, handleClick, { passive: false });
        });
    });
}
