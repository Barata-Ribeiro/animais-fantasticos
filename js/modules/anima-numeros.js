export default function initAnimaNumbers() {
    function animaNumbers() {
        const numbers = document.querySelectorAll('[data-numero]');
        numbers.forEach((number) => {
            // Constante para pegar os numeros dos spans
            const total = +number.innerText; // + Transforma a string em numero
            // Incremento onde cada número é dividido por 100 e arrendodado
            const increment = Math.floor(total / 100);
            // Variável start com valor inicial 0
            let start = 0;
            // O timer utilizando setInterval para o valor ir de 0 ao total
            const timer = setInterval(() => {
                // start = 0 + incrementos
                start += increment;
                // Seta o texto para o valor do start
                number.innerText = start;
                // Se o start ficar maior que total...
                if (start > total) {
                    // Setar number para o valor total original
                    number.innerText = total;
                    // Limpar o interval
                    clearInterval(timer);
                }
            }, 25 * Math.random()); // O timer acontece em tempo randômico
        });
    }

    // O observador
    let observer;
    // Irá observar a section e animar somente uma vez e quando estiver 'ativo'
    function handleMutation(mutation) {
        // Se conter ativo...
        if (mutation[0].target.classList.contains('ativo')) {
            // Desconecta o observador
            observer.disconnect();
            // Executa a função de animação
            animaNumbers();
        }
    }
    observer = new MutationObserver(handleMutation);
    // Target a ser observado
    const ObserverTarget = document.querySelector('.numeros');
    // Observar os atributos do Target
    observer.observe(ObserverTarget, { attributes: true });
}
