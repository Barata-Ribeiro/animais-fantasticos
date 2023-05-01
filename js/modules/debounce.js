// Exporta uma função 'debounce' como padrão,
// que recebe um callback e um valor de atraso (delay) como argumentos.
export default function debounce(callback, delay) {
    // Declara uma variável 'timer' que será usada para armazenar o timer de atraso.
    let timer;

    // Retorna uma função anônima que recebe um número variável de argumentos 'args'.
    return (...args) => {
        // Se o timer já estiver definido, limpe o timer para cancelar a execução anterior.
        if (timer) clearTimeout(timer);

        // Define um novo timer que executa a função 'callback'
        // após o tempo especificado em 'delay'.
        timer = setTimeout(() => {
            // Utiliza o operador '...' (spread) para passar todos
            // os argumentos recebidos para a função 'callback'.
            callback(...args);

            // Depois de executar a função 'callback',
            // atribui 'null' ao timer, indicando que ele não está mais ativo.
            timer = null;
        }, delay);
    };
}
