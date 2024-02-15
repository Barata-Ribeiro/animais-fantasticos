export default function fetchBitcoin(url, target) {
    // Usando promises, faz um fetch na api de btc
    fetch(url)
        // a resposta transforma em JSON
        .then((r) => r.json())
        // O que iremos buscar dentro do arquivo JSON
        .then((bitcoin) => {
            // Pega o span pela classe
            const btcPreco = document.querySelector(target);
            // Seta o innerText do span para o valor escolhido
            // que vem do arquivo JSON
            btcPreco.innerText = (1000 / bitcoin.BRL.sell).toFixed(4);
        })
        // Se tiver algum error, coloque no console o error
        .catch((error) => console.log(Error(error)));
}
