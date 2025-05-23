document.addEventListener('DOMContentLoaded', () => {
  const categoryList = document.getElementById('category-list');
  const gridContainer = document.querySelector('.grid-container');

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
        <h3 title="${widget.description}">${widget.title}</h3>
        ${widget.type === 'color-picker' ? '<input type="color">' : ''}
      `;
      gridContainer.appendChild(widgetDiv);
    });
  }

  document.getElementById('export-pack').addEventListener('click', () => {
    alert('Export functionality coming soon!');
  });
});