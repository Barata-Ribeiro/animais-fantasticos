export default class AnimaNumbers {
    // Construtor recebe números, elemento alvo do observador e a classe do observador
    constructor(numbers, observerTarget, observerClass) {
        this.numbers = document.querySelectorAll(numbers);
        this.observerClass = observerClass;
        this.observerTarget = document.querySelector(observerTarget);

        // Vincula o "this" do objeto ao callback da mutação
        this.handleMutation = this.handleMutation.bind(this);
    }

    // Método estático que recebe um elemento do DOM com um número em seu texto
    // Incrementa a partir de 0 até o número final
    static numberIncrement(numberElement) {
        // Constante para obter os números dos elementos span
        const total = +numberElement.innerText; // O "+" converte a string em número
        // Incremento onde cada número é dividido por 100 e arredondado
        const increment = Math.floor(total / 100);
        // Variável "start" com valor inicial 0
        let start = 0;
        // Timer utilizando setInterval para aumentar o valor de 0 ao total
        const timer = setInterval(() => {
            // start = 0 + incrementos
            start += increment;
            // Define o texto para o valor de "start"
            numberElement.innerText = start;
            // Se "start" for maior que "total"...
            if (start > total) {
                // Define "numberElement" para o valor total original
                numberElement.innerText = total;
                // Limpa o intervalo
                clearInterval(timer);
            }
        }, 25 * Math.random()); // O timer acontece em tempo randômico
    }

    // Método que ativa o incremento de número para cada
    // número selecionado do DOM
    animaNumbers() {
        this.numbers.forEach((number) => this.constructor.numberIncrement(number));
    }

    // Método executado quando a mutação ocorrer
    handleMutation(mutation) {
        // Se o elemento alvo contiver a classe "ativo"...
        if (mutation[0].target.classList.contains(this.observerClass)) {
            // Desconecta o observador
            this.observer.disconnect();
            // Executa a função de animação
            this.animaNumbers();
        }
    }

    // Método que adiciona o MutationObserver para verificar
    // quando a classe "ativo" é adicionada ao elemento alvo
    addMutationObserver() {
        this.observer = new MutationObserver(this.handleMutation);
        // Observa os atributos do elemento alvo
        this.observer.observe(this.observerTarget, { attributes: true });
    }

    // Método "init" que inicializa a classe se os números e o observador alvo estiverem presentes
    init() {
        if (this.numbers.length && this.observerTarget) {
            this.addMutationObserver();
        }
        return this;
    }
}
