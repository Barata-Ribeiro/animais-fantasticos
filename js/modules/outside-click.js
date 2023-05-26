export default function outsideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = 'data-outside';

    function handleOutsideClick(event) {
        if (!element.contains(event.target)) {
            // Quando callback ocorreu, remover o atributo 'outside' do element
            element.removeAttribute(outside);
            events.forEach((userEvent) => {
                // Remove o event listener de HTML
                html.removeEventListener(userEvent, handleOutsideClick);
            });
            // Ativa o callback
            callback();
        }
    }

    // Se não tem attribute outside, execute apenas uma vez
    if (!element.hasAttribute(outside)) {
        // Cria um loop para os tipos de eventos, seja click ou touch
        events.forEach((userEvent) => {
            // Usa settimeout para o event dentro do bubble
            setTimeout(() => {
                // Adiciona o event listener de click e execute function handleOutsideClick
                html.addEventListener(userEvent, handleOutsideClick);
            });
        });

        // Adiciona o atributo 'outside' ao element
        element.setAttribute(outside, '');
    }
}
