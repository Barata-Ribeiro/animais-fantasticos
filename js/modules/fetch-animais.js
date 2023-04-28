import AnimaNumbers from './anima-numeros.js';

export default function fetchAnimais(url, target) {
    // Cria a div com o número total de animais
    function createAnimal(animal) {
        // Cria uma nova div
        const div = document.createElement('div');
        // Adiciona a classe 'numero-animal' a div
        div.classList.add('numero-animal');
        // Seta o innerHTML da div igual foi criado anteriormente
        // no index.html, mas agora usando a API
        div.innerHTML = `<h3>${animal.especie}</h3><span data-numero>${animal.total}</span>`;
        // Retorna a div
        return div;
    }

    // Busca a div grid-numeros pela classe
    const numerosGrid = document.querySelector(target);
    // Preenche cada animal no DOM
    function preencherAnimais(animal) {
        // Coloca dentro da constante todas as divs criadas
        // com a função createAnimal
        const divAnimal = createAnimal(animal);
        // Dentro de numerosGrid, append a divAnimal
        numerosGrid.appendChild(divAnimal);
    }

    // Anima os números de cada animal
    function animaAnimaisNumbers() {
        // Inicia a função de animação somente quando
        // o fetch terminar
        const animaNumbers = new AnimaNumbers('[data-numero]', '.numeros', 'ativo');
        animaNumbers.init();
    }

    // Função assíncrona para buscar a API
    // de animais através de arquivo JSON
    // e cria cada animal utilizando createAnimal
    async function criarAnimais() {
        // Tente executar
        try {
            // Fetch, espera resposta e transforma em JSON
            const animaisResponse = await fetch(url);
            const animaisJson = await animaisResponse.json();

            // Após a transformação de JSON, ativar as funções
            // para preencher e animar os números
            animaisJson.forEach((animal) => preencherAnimais(animal));
            animaAnimaisNumbers();

            // Se tiver algum error, estará no log
        } catch (error) {
            console.log(error);
        }
    }

    return criarAnimais();
}
