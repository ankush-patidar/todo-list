
    const todoContainer = document.getElementById('todo-container');
    const addTask = document.getElementById('add-task');
    const resetTask = document.getElementById('reset-task');
    const deleteAll = document.getElementById('delete-all');
    const inputTitle = document.getElementById('title');
    const inputTask = document.getElementById('input-task');
    const alertBox = document.getElementById('alert-box');
    const inputPriority = document.getElementById('priority');

    
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3
    };

    function showAlert(message, type) {
      alertBox.innerHTML = `<div id='alert' class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${message}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      setTimeout(() => {
        document.getElementById('alert').classList.add('fade-in');
        setTimeout(() => document.getElementById('alert').style.display = 'none', 1500);
      }, 100);
    }

    function generateKey() {
      return `${Date.now()}${Math.floor(Math.random() * 100)}`;
    }

    function renderTodoCard(key, title, task, priority) {
      const priorityClass = {
        high: 'priority-high',
        medium: 'priority-medium',
        low: 'priority-low'
      };

      const card = document.createElement('div');
      card.className = 'col-md-4 fade-in';
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${title.charAt(0).toUpperCase() + title.slice(1)}</h5>
            <span class="badge priority-badge ${priorityClass[priority]}">
              ${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
            <h4 class="card-text m-2">${task.charAt(0).toUpperCase() + task.slice(1)}</h4>
            <button class="btn btn-success me-2 mt-2" onclick="completeTask('${key}')">
              <i class="bi bi-check-circle"></i> Complete
            </button>
            <button class="btn btn-danger mt-2" onclick="deleteTask('${key}')">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>`;
      todoContainer.appendChild(card);
    }

    function loadTodos() {
      todoContainer.innerHTML = '';
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const [title, task, priority] = JSON.parse(localStorage.getItem(key));
        renderTodoCard(key, title, task, priority);
      }
    }

    addTask.addEventListener('click', () => {
      const title = inputTitle.value.trim();
      const task = inputTask.value.trim();
      const priority = inputPriority.value.trim();

      if (title === '' || task === '') {
        showAlert('Please enter title and task', 'danger');
        return;
      }

      const key = generateKey();
      localStorage.setItem(key, JSON.stringify([title, task, priority]));
      renderTodoCard(key, title, task, priority);

      inputTitle.value = '';
      inputTask.value = '';
      showAlert('Task added successfully!', 'success');
    });

    resetTask.addEventListener('click', () => {
      inputTitle.value = '';
      inputTask.value = '';
      showAlert('Input fields reset', 'info');
    });

    deleteAll.addEventListener('click', () => {
      localStorage.clear();
      todoContainer.innerHTML = '';
      showAlert('All tasks deleted successfully!', 'danger');
    });

    function completeTask(key) {
      const card = document.querySelector(`button[onclick="completeTask('${key}')"]`).closest('.card');
      card.classList.add('complete-task');
      card.querySelector('.card-body').style.opacity = '0.6';
      showAlert('Task marked as complete', 'success');
    }

    function deleteTask(key) {
      localStorage.removeItem(key);
      const card = document.querySelector(`button[onclick="deleteTask('${key}')"]`).closest('.col-md-4');
      todoContainer.removeChild(card);
      showAlert('Task deleted', 'danger');
    }

    function sortByPriority() {
      const todos = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const [title, task, priority] = JSON.parse(localStorage.getItem(key));
        todos.push({ key, title, task, priority });
      }

      todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      todoContainer.innerHTML = '';
      todos.forEach(todo => {
        renderTodoCard(todo.key, todo.title, todo.task, todo.priority);
      });
    }

    const sortByPriorityBtn = document.getElementById('sort-by-priority');
    sortByPriorityBtn.addEventListener('click', () => {
      sortByPriority();
      showAlert('Tasks sorted by priority', 'success');
    });

   // Disable right-click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, and other shortcuts
  document.addEventListener("keydown", function (e) {
    if (
      e.keyCode == 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode == 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.keyCode == 85) || // Ctrl+U
      (e.ctrlKey && e.keyCode == 83)
    ) {
      // Ctrl+S
      e.preventDefault();
      
    }
  });

    window.onload = loadTodos;

    window.addEventListener('load', function() {
      // Simulate a loading delay
      setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('todo-list').style.display = 'block';
      }, 2000);  // 3 seconds delay for demo
    });
  