document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('category-list');
  const gridContainer = document.querySelector('.grid-container');
  const sidebar = document.querySelector('.sidebar');

  // Sidebar toggle button
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '=';
  toggleButton.className = 'sidebar-toggle';
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  // Fetch categories and widgets
  fetch('widgets.json')
    .then(response => response.json())
    .then(data => {
      // Generate sidebar buttons for each category
      data.categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.className = 'widget-button'; // Use the same style as widget buttons
        button.addEventListener('click', () => loadWidgets(category.widgets));
        categoryList.appendChild(button);
      });

      // Load widgets into the grid
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

          // Add selection behavior to widget buttons
          const buttons = widgetDiv.querySelectorAll('.widget-button');
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              buttons.forEach(btn => btn.classList.remove('selected'));
              button.classList.add('selected');
            });
          });
        });
      }

      // Add selection behavior to sidebar category buttons
      const categoryButtons = categoryList.querySelectorAll('.widget-button');
      categoryButtons.forEach(catBtn => {
        catBtn.addEventListener('click', () => {
          categoryButtons.forEach(btn => btn.classList.remove('selected'));
          catBtn.classList.add('selected');
        });
      });
    })
    .catch(error => console.error('Error loading widgets:', error));
});