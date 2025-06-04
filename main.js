document.addEventListener('DOMContentLoaded', () => {
  // seleziona gli elementi principali del layout
  const categoryList = document.getElementById('category-list');
  const gridContainer = document.querySelector('.grid-container');
  const sidebar = document.querySelector('.sidebar');

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
                  ? '<input type="color" class="widget-color-picker" value="#20e5f2">'
                    + '<input type="number" class="widget-alpha-picker" min="0" max="1" step="0.01" value="1">'
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

          const alphaInput = widgetDiv.querySelector('.widget-alpha-picker');
          if (alphaInput) {
            alphaInput.addEventListener('change', function() {
              const val = parseFloat(this.value);
              if (isNaN(val) || val < parseFloat(this.min) || val > parseFloat(this.max)) {
                this.value = this.defaultValue;
              }
            });
          }
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