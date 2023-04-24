export default class SmoothScroll {
    // Construtor da classe que recebe dois argumentos: links e options.
    constructor(links, options) {
        // Seleciona todos os elementos que correspondem ao seletor passado como argumento links.
        this.internalLinks = document.querySelectorAll(links);

        // Verifica se o argumento options foi fornecido.
        if (options === undefined) {
            // Caso options não tenha sido fornecido,
            // define um objeto com as opções padrão de comportamento.
            this.options = { behavior: 'smooth', block: 'start' };
        } else {
            // Caso options tenha sido fornecido, atribui o objeto recebido como argumento.
            this.options = options;
        }

        // Garante que o método scrollToSection tenha o contexto correto quando chamado.
        this.scrollToSection = this.scrollToSection.bind(this);
    }

    // Método scrollToSection que recebe um objeto event como argumento.
    scrollToSection(event) {
        // Previne a ação padrão do evento, que seria navegar para a âncora.
        event.preventDefault();

        // Obtém o valor do atributo 'href' do elemento que disparou o evento.
        const href = event.currentTarget.getAttribute('href');

        // Seleciona o elemento que corresponde ao valor do atributo 'href'.
        const section = document.querySelector(href);

        // Faz a rolagem suave até o elemento selecionado de acordo com as opções definidas.
        section.scrollIntoView(this.options);
    }

    // Método addLinkEvent que adiciona um ouvinte de evento 'click' a todos os links internos.
    addLinkEvent() {
        this.internalLinks.forEach((link) => {
            link.addEventListener('click', this.scrollToSection);
        });
    }

    // Método init que inicia a funcionalidade de rolagem suave.
    init() {
        // Verifica se existem links internos na página.
        if (this.internalLinks.length) {
            // Caso existam, adiciona o ouvinte de evento 'click' a cada link.
            this.addLinkEvent();
        }

        // Retorna a instância da classe SmoothScroll.
        return this;
    }
}
