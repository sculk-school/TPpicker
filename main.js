// Questo file contiene la logica principale dell'applicazione
// Aggiunta di un listener per il caricamento del contenuto DOM
document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('category-list');
  const gridContainer = document.querySelector('.grid-container');
  const sidebar = document.querySelector('.sidebar');

  // Creazione del pulsante per mostrare/nascondere la sidebar
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '=';
  toggleButton.className = 'sidebar-toggle';
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener('click', () => {
    // Mostra o nasconde la sidebar
    sidebar.classList.toggle('hidden');
  });

  // Caricamento delle categorie e dei widget dal file JSON
  fetch('widgets.json')
    .then(response => response.json())
    .then(data => {
      // Genera i pulsanti della sidebar per ogni categoria
      data.categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.className = 'widget-button'; // Usa lo stesso stile dei pulsanti dei widget
        button.addEventListener('click', () => loadWidgets(category.widgets));
        categoryList.appendChild(button);
      });

      // Funzione per caricare i widget nella griglia
      function loadWidgets(widgets) {
        gridContainer.innerHTML = '';
        widgets.forEach(widget => {
          const widgetDiv = document.createElement('div');
          widgetDiv.className = 'widget';
          widgetDiv.innerHTML = `
            <h3 class="widget-title" title="${widget.description}">${widget.title}</h3>
            <div class="widget-preview">
              <img src="${widget.preview || 'assets/placeholder.png'}" alt="Preview" class="preview-image">
            </div>
            <div class="widget-options">
              ${
                widget.type === 'color-picker'
                  ? '<input type="color" class="widget-color-picker" title="Pick a color">'
                  : widget.options.map(option => `<button class="widget-button">${option}</button>`).join('')
              }
            </div>
          `;
          gridContainer.appendChild(widgetDiv);

          // Aggiunge il comportamento di selezione ai pulsanti dei widget
          const buttons = widgetDiv.querySelectorAll('.widget-button');
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              buttons.forEach(btn => btn.classList.remove('selected'));
              button.classList.add('selected');
            });
          });
        });
      }

      // Aggiunge il comportamento di selezione ai pulsanti delle categorie nella sidebar
      const categoryButtons = categoryList.querySelectorAll('.widget-button');
      categoryButtons.forEach(catBtn => {
        catBtn.addEventListener('click', () => {
          categoryButtons.forEach(btn => btn.classList.remove('selected'));
          catBtn.classList.add('selected');
        });
      });
    })
    .catch(error => console.error('Errore nel caricamento dei widget:', error));
});