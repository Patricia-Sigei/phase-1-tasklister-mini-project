document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

  // Event listener for form submission
  formElement.addEventListener('submit', function(event) {
    event.preventDefault(); 

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

    // Color the task based on priority (for example, red for high, yellow for medium, green for low)
    if (priority === 'high') {
      taskItem.style.color = 'red';
    } else if (priority === 'medium') {
      taskItem.style.color = 'yellow';
    } else {
      taskItem.style.color = 'green';
    }

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

  // Event listener for sorting tasks by priority
  const sortButton = document.getElementById('sort-button');
  sortButton.addEventListener('click', function() {
    const tasks = Array.from(taskList.children);
    
    // Create a priority map to order priorities correctly (high < medium < low)
    const priorityMap = { high: 1, medium: 2, low: 3 };

    tasks.sort(function(a, b) {
      const priorityA = a.classList[0].split('-')[1]; 
      const priorityB = b.classList[0].split('-')[1];
      return priorityMap[priorityA] - priorityMap[priorityB];
    });

    // Re-append the sorted tasks
    tasks.forEach(function(task) {
      taskList.appendChild(task);
    });
  });
});
