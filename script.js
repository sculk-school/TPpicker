// Aggiungo un event listener per i widget button
const widgetButtons = document.querySelectorAll('.widget-button');
widgetButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Controllo se il button è già selezionato
        if (button.classList.contains('selected')) {
            // Mostro la preview al centro dello schermo
            const preview = document.createElement('div');
            preview.style.position = 'fixed';
            preview.style.top = '50%';
            preview.style.left = '50%';
            preview.style.transform = 'translate(-50%, -50%)';
            preview.style.width = '200px';
            preview.style.height = '200px';
            preview.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            preview.style.borderRadius = '20px';
            preview.style.zIndex = '1000';

            // Aggiungo la preview al body
            document.body.appendChild(preview);

            // Rimuovo la preview quando si clicca di nuovo
            preview.addEventListener('click', () => {
                document.body.removeChild(preview);
            });
        } else {
            // Seleziono il button
            widgetButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        }
    });
});