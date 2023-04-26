export default class Accordion {
    // Construtor da classe que recebe um argumento 'list'.
    constructor(list) {
        // Seleciona todos os elementos que correspondem ao seletor passado como argumento 'list'.
        this.accordionList = document.querySelectorAll(list);

        // Define a classe CSS 'ativo' que será adicionada ou removida dos elementos do acordeão.
        this.activeClass = 'ativo';
    }

    // Método toggleAccordion que recebe um argumento 'item'.
    toggleAccordion(item) {
        // Alterna a classe CSS 'ativo' no elemento 'item'.
        item.classList.toggle(this.activeClass);

        // Alterna a classe CSS 'ativo' no próximo elemento irmão de 'item'.
        item.nextElementSibling.classList.toggle(this.activeClass);
    }

    // Método addAccordionEvent que adiciona eventos de 'click' aos itens do acordeão.
    addAccordionEvent() {
        this.accordionList.forEach((item) => {
            // Adiciona um ouvinte de evento 'click' a cada 'item' da lista do acordeão.
            item.addEventListener('click', () => this.toggleAccordion(item));
        });
    }

    // Método init que inicia a funcionalidade do acordeão.
    init() {
        // Verifica se a lista do acordeão contém elementos.
        if (this.accordionList.length) {
            // Ativa o primeiro item do acordeão.
            this.toggleAccordion(this.accordionList[0]);

            // Adiciona os eventos de 'click' aos itens do acordeão.
            this.addAccordionEvent();
        }
        // Retorna o objeto para permitir o encadeamento de métodos
        return this;
    }
}
