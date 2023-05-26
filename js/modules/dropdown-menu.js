import outsideClick from './outside-click.js';

export default class DropdownMenu {
    // Construtor da classe
    constructor(dropdownMenus, events) {
        this.dropdownMenus = document.querySelectorAll(dropdownMenus);
        this.activeClass = 'active';

        // Define touchstart e click como argumento padrão
        // de events caso o usuário não defina
        if (events === undefined) this.events = ['touchstart', 'click'];
        else this.events = events;

        // Método que controla o clique no menu e o ativa
        this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
    }

    // Método que ativa o dropdown menu e adiciona
    // a função que observa o clique fora dele
    activeDropdownMenu(event) {
        // Previne o comportamento padrão do evento, ou seja, não abrindo o link
        event.preventDefault();
        const element = event.currentTarget;
        // Adiciona/remove a classe 'active' na li
        element.classList.add(this.activeClass);
        // Ao clicar/touch fora do this (elemento atual),
        // irá executar a função outsideClick e remover a classe 'active'
        outsideClick(element, this.events, () => {
            element.classList.remove(this.activeClass);
        });
    }

    // Método que adiciona os eventos de clique no dropdownMenu
    addDropdownMenusEvent() {
        this.dropdownMenus.forEach((menu) => {
            // Em vez de adicionar o callback para cada tipo de evento, um por um,
            // cria-se uma Array com todos os tipos de eventos e,
            // então um loop para cada tipo de evento que receberá o callback
            this.events.forEach((userEvent) => {
                menu.addEventListener(userEvent, this.activeDropdownMenu, { passive: false });
            });
        });
    }

    // Método que inicializa a classe e adiciona os eventos
    init() {
        // Verifica se há dropdownMenus na página
        if (this.dropdownMenus.length) {
            this.addDropdownMenusEvent();
        }
        // Retorna a instância da classe para encadeamento de métodos
        return this;
    }
}
