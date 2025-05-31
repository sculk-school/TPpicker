document.addEventListener('DOMContentLoaded', () => {
  // seleziona gli elementi principali del layout
  const categoryList = document.getElementById('category-list');
  const gridContainer = document.querySelector('.grid-container');
  const sidebar = document.querySelector('.sidebar');

  // crea un pulsante per mostrare/nascondere la barra laterale
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '=';
  toggleButton.className = 'sidebar-toggle';
  document.body.appendChild(toggleButton);

  // aggiunge un evento per alternare la visibilità della barra laterale
  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  // carica i dati dei widget dal file json
  fetch('widgets.json')
    .then(response => response.json())
    .then(data => {
      // crea i pulsanti per ogni categoria
      data.categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.className = 'widget-button';
        button.addEventListener('click', () => loadWidgets(category.widgets));
        categoryList.appendChild(button);
      });

      // funzione per caricare i widget nella griglia
      function loadWidgets(widgets) {
        gridContainer.innerHTML = '';
        widgets.forEach(widget => {
          const widgetDiv = document.createElement('div');
          widgetDiv.className = 'widget';
          widgetDiv.innerHTML = `
            <h3 class="widget-title" title="${widget.description}">${widget.title}</h3>
            <div class="widget-options">
              ${
                widget.type === 'color-picker'
                  ? '<input type="color" class="widget-color-picker" title="Pick a color">'
                  : widget.options.map(option => `<button class="widget-button">${option}</button>`).join('')
              }
            </div>
          `;
          gridContainer.appendChild(widgetDiv);

          const buttons = widgetDiv.querySelectorAll('.widget-button');
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              buttons.forEach(btn => btn.classList.remove('selected'));
              button.classList.add('selected');
            });
          });
        });
      }

      // aggiunge eventi per selezionare le categorie
      const categoryButtons = categoryList.querySelectorAll('.widget-button');
      categoryButtons.forEach(catBtn => {
        catBtn.addEventListener('click', () => {
          categoryButtons.forEach(btn => btn.classList.remove('selected'));
          catBtn.classList.add('selected');
        });
      });
    })
    .catch(error => console.error('errore nel caricamento dei widget:', error));
});