import debounce from './debounce.js';

export default class ScrollAnima {
    // Construtor da classe
    constructor(sections) {
        // Seleciona os elementos baseado no seletor recebido
        this.sections = document.querySelectorAll(sections);
        // Define a altura da janela multiplicada por 0.6
        // como referência para animação
        this.halfWindow = window.innerHeight * 0.6;

        // Faz o bind do método checkDistance para ter o 'this' correto
        // e usa debounce para prevenir a ativação constante da animação
        this.checkDistance = debounce(this.checkDistance.bind(this), 50);
    }

    // Método que retorna a distância dos elementos
    // em relação ao topo do site
    getDistance() {
        this.distance = [...this.sections].map((section) => {
            const offset = section.offsetTop;
            return {
                element: section,
                offset: Math.floor(offset - this.halfWindow),
            };
        });
    }

    // Método que verifica a distância de cada objeto
    // em relação ao scroll do site
    checkDistance() {
        console.log('teste');
        this.distance.forEach((item) => {
            // Verifica se a posição do scroll está além do offset do elemento
            if (window.pageYOffset > item.offset) {
                // Adiciona a classe 'ativo' ao elemento
                item.element.classList.add('ativo');
            } else if (item.element.classList.contains('ativo')) {
                // Remove a classe 'ativo' caso o elemento já a possua
                item.element.classList.remove('ativo');
            }
        });
    }

    // Método que inicializa a animação
    init() {
        // Verifica se há elementos para animar
        if (this.sections.length) {
            this.getDistance();
            this.checkDistance();
            // Adiciona o evento de scroll ao objeto window
            // e associa ao método checkDistance
            window.addEventListener('scroll', this.checkDistance);
        }
        return this;
    }

    // Método que remove o evento de scroll
    stop() {
        // Remove o evento de scroll associado ao método checkDistance
        window.removeEventListener('scroll', this.checkDistance);
    }
}
