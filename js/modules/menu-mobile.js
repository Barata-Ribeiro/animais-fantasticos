import outsideClick from './outside-click.js';

// Classe MenuMobile que controla a abertura e fechamento do menu no mobile
export default class MenuMobile {
    // Construtor da classe
    constructor(menuBtn, menuList, events) {
        this.menuBtn = document.querySelector(menuBtn);
        this.menuList = document.querySelector(menuList);
        this.activeClass = 'active';

        // Define click e touchstart como argumento padrão
        // de events caso o usuário não defina
        if (events === undefined) this.events = ['click', 'touchstart'];
        else this.events = events;

        // Método que controla a abertura do menu
        this.openMenu = this.openMenu.bind(this);
    }

    // Método que adiciona a classe 'active' aos elementos do menu
    // para abri-lo e detecta o clique fora dele para fechá-lo
    openMenu(event) {
        event.preventDefault();
        this.menuBtn.classList.add(this.activeClass);
        this.menuList.classList.add(this.activeClass);
        // Ao clicar/touch fora do this.menuList,
        // irá executar a função outsideClick e remover a classe 'active'
        outsideClick(this.menuList, this.events, () => {
            this.menuBtn.classList.remove(this.activeClass);
            this.menuList.classList.remove(this.activeClass);
        });
    }

    // Método que adiciona os eventos de clique ao botão do menu mobile
    addMenuMobileEvents() {
        this.events.forEach((userEvent) => this.menuBtn.addEventListener(userEvent, this.openMenu));
    }

    // Método que inicializa a classe e adiciona os eventos
    init() {
        // Verifica se os elementos menuBtn e menuList existem na página
        if (this.menuBtn && this.menuList) this.addMenuMobileEvents();
        // Retorna a instância da classe para encadeamento de métodos
        return this;
    }
}
