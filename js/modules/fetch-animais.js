import AnimaNumbers from './anima-numeros.js';

export default function initFetchAnimais() {
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
    // Função assíncrona para buscar a API
    async function fetchAnimais(url) {
        // Tente executar
        try {
            // Busca a url da api
            const animaisResponse = await fetch(url);
            // Interpreta o texto em formato json
            const animaisJson = await animaisResponse.json();
            // Busca a div grid-numeros pela classe
            const numerosGrid = document.querySelector('.grid-numeros');

            // Para cada item no arquivo JSON, executar a função
            // createAnimal
            animaisJson.forEach((animal) => {
                // Coloca dentro da constante todas as divs criadas
                // com a função createAnimal
                const divAnimal = createAnimal(animal);
                // Dentro de numerosGrid, append a divAnimal
                numerosGrid.appendChild(divAnimal);
            });
            // Inicia a função de animação somente quando
            // o fetch terminar
            const animaNumbers = new AnimaNumbers('[data-numero]', '.numeros', 'ativo');
            animaNumbers.init();

            // Se tiver algum error, estará no log
        } catch (error) {
            console.log(error);
        }
    }
    // url do arquivo JSON sendo usado como parâmetro
    fetchAnimais('./animaisApi.json');
}
