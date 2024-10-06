document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

  formElement.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get task description and priority values from the form
    const descriptionInput = document.getElementById('new-task-description');
    const prioritySelect = document.getElementById('priority-select');
    const description = descriptionInput.value;
    const priority = prioritySelect.value;

    // Create a new task item
    const taskItem = document.createElement('li');
    taskItem.textContent = description;

    // Assign priority class to the task item based on selected priority
    taskItem.classList.add(`priority-${priority}`);

    // Add delete button to the task item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      taskItem.remove();
    });
    taskItem.appendChild(deleteButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Reset the form inputs
    descriptionInput.value = '';
    prioritySelect.value = 'low';
  });

  // Sort tasks by priority
  const sortButton = document.getElementById('sort-button');
  sortButton.addEventListener('click', function() {
    const tasks = Array.from(taskList.children);
    tasks.sort(function(a, b) {
      const priorityA = a.classList[0].split('-')[1];
      const priorityB = b.classList[0].split('-')[1];
      return priorityA.localeCompare(priorityB);
    });
    tasks.forEach(function(task) {
      taskList.appendChild(task);
    });
  });
});
