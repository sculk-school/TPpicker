document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('category-list');
  const gridContainer = document.querySelector('.grid-container');
  const sidebar = document.querySelector('.sidebar');
  const toggleButton = document.createElement('button');

  // Create toggle button
  toggleButton.textContent = '=';
  toggleButton.className = 'sidebar-toggle';
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  // Load widgets from widgets.json
  fetch('widgets.json')
    .then(response => response.json())
    .then(data => {
      data.categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.name;
        li.addEventListener('click', () => loadWidgets(category.widgets));
        categoryList.appendChild(li);
      });
    });

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
          ${widget.type === 'color-picker' ? '<input type="color" class="widget-color-picker" title="Pick a color">' : '<button class="widget-button">?</button><button class="widget-button">?</button>'}
        </div>
      `;
      gridContainer.appendChild(widgetDiv);

      // Add selection functionality for buttons
      const buttons = widgetDiv.querySelectorAll('.widget-button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        });
      });
    });
  }

  document.getElementById('export-pack').addEventListener('click', () => {
    alert('Export functionality coming soon!');
  });
});