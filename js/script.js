// VENTANAS DRAGGABLES
makeDraggable = (windowElement, headerElement) => {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  headerElement.onmousedown = function (e) {
    e.preventDefault();

    var maxZIndex = Math.max(
      ...Array.from(document.querySelectorAll('.ventana')).map(
        ventana => parseFloat(window.getComputedStyle(ventana).zIndex) || 0
      )
    );
    windowElement.style.zIndex = maxZIndex + 1;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = function () {
      document.onmouseup = null;
      document.onmousemove = null;
    };
    document.onmousemove = function (e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      var newTop = windowElement.offsetTop - pos2;
      var newLeft = windowElement.offsetLeft - pos1;

      var maxX = window.innerWidth - windowElement.offsetWidth;
      var maxY = window.innerHeight - windowElement.offsetHeight;

      newTop = Math.max(0, Math.min(newTop, maxY));
      newLeft = Math.max(0, Math.min(newLeft, maxX));

      windowElement.style.top = newTop + 'px';
      windowElement.style.left = newLeft + 'px';
    };
  };
};

const ventanas = document.querySelectorAll('.ventana');
ventanas.forEach(ventana => {
  const headerElement = ventana.querySelector('.js-winheader');
  makeDraggable(ventana, headerElement);
});

//PAINT
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const downloadButton = document.getElementById('downloadButton');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  let painting = false;
  let color = '#000000';

  startPosition = e => {
    painting = true;
    draw(e);
  };

  endPosition = () => {
    painting = false;
    ctx.beginPath();
  };

  draw = e => {
    if (!painting) return;

    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();

    const mouseX = clientX - rect.left - window.scrollX;
    const mouseY = clientY - rect.top - window.scrollY;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
  };

  changeColor = e => {
    color = e.target.value;
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  downloadCanvas = () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'drawing.png';
    link.click();
  };

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw);

  colorPicker.addEventListener('input', changeColor);
  clearButton.addEventListener('click', clearCanvas);
  downloadButton.addEventListener('click', downloadCanvas);
});

// SETTIINGS
const colorsElements = document.querySelectorAll('.color');
const windowsHeader = document.getElementById('windowHeaderDragable');

const changeBgColor = event => {
  const color = window
    .getComputedStyle(event.target)
    .getPropertyValue('background-color');
  document.body.style.backgroundColor = color;
};
colorsElements.forEach(picker => {
  picker.addEventListener('click', changeBgColor);
});

// HEADER CLOSE BUTTON
const btnCloseWindowElements = document.querySelectorAll('.closeBtn');

closeWindow = event => {
  const ventanaElement = event.target.closest('.ventana');
  if (ventanaElement) {
    ventanaElement.classList.add('offWindow');
  }
};
btnCloseWindowElements.forEach(btnCloseWindowElement => {
  btnCloseWindowElement.addEventListener('click', closeWindow);
});

//SHOW WINDOWS
const btnShowPaint = document.getElementById('displayPaint');
const paintWindow = document.getElementById('ventana2');
const btnShowSettings = document.getElementById('displaySettings');
const settingsWindow = document.getElementById('ventana3');
const btnShowDocuments = document.getElementById('displayDocuments');
const documentsWindow = document.getElementById('ventana4');
const btnShowTasks = document.getElementById('displayTask');
const tasksWindow = document.getElementById('ventana5');
const myComputerWindow = document.getElementById('ventana6');
const btnShowMyComputer = document.getElementById('displayMyComputer');
const btnShowBrowser = document.getElementById('displayBrowser');
const showbrowser = document.getElementById('ventana7');
const btnShowGame = document.getElementById('displayGame');
const gameWindow = document.getElementById('ventana8');
const btnShowContact = document.getElementById('displayContact');
const contactWindow = document.getElementById('ventana9');
const btnShowRecycleBin = document.getElementById('displayRecycleBin');
const recycleBin = document.getElementById('ventana10');
const btnShowDrawings = document.getElementById('displayDrawings');
const drawingWindow = document.getElementById('ventana12');
const btnShowCars = document.getElementById('displayCars');
const carsWindow = document.getElementById('ventana13');
const btnShowNotepad = document.getElementById('displayNotepad');
const notepadWindow = document.getElementById('ventana14');


toggleWindow = windowElement => {
  if (windowElement.classList.contains('offWindow')) {
    windowElement.classList.replace('offWindow', 'onWindow');
  } else {
    windowElement.classList.add('onWindow');
  }
};

btnShowPaint.addEventListener('click', () => toggleWindow(paintWindow));
btnShowSettings.addEventListener('click', () => toggleWindow(settingsWindow));
btnShowDocuments.addEventListener('click', () => toggleWindow(documentsWindow));
btnShowTasks.addEventListener('click', () => toggleWindow(tasksWindow));
btnShowBrowser.addEventListener('click', () => toggleWindow(showbrowser));
btnShowGame.addEventListener('click', () => toggleWindow(gameWindow));
btnShowContact.addEventListener('click', () => toggleWindow(contactWindow));
btnShowRecycleBin.addEventListener('click', () => toggleWindow(recycleBin));
btnShowDrawings.addEventListener('click', () => toggleWindow(drawingWindow));
btnShowCars.addEventListener('click', () => toggleWindow(carsWindow));
btnShowNotepad.addEventListener('click', () => toggleWindow(notepadWindow));



btnShowMyComputer.addEventListener('click', () =>
  toggleWindow(myComputerWindow)
);

// TASK WINDOW
const taksContainerElement = document.getElementById('taksContainer');
const inputCreateElement = document.getElementById('createTask');
const formTaskElement = document.getElementById('task-form');
const inputCheckTaskElement = document.getElementById('checkTask');
const buttonFilterCompleteElement = document.getElementById('completeTask');
const buttonFilterActiveTaskElement = document.getElementById('activeTask');
const buttonFilterAllTaskElement = document.getElementById('showAllTask');
const buttonDeleteTaskElement = document.getElementById('deleteTask');
const remainTasksElement = document.getElementById('remainTasks');


let tasks = [];

addTask = () => {
  const newTask = inputCreateElement.value;
  if (newTask !== '') {
    const objNewTask = {
      id: Date.now(),
      task: newTask,
      completed: false,
    };
    tasks.push(objNewTask);
    createNewTask(objNewTask);
  }
  updateRemainTask();
};
createNewTask = task => {
  const newItemTask = document.createElement('li');
  const newInputCheck = document.createElement('input');
  const newTextTask = document.createElement('span');
  newItemTask.id = task.id;
  newInputCheck.type = 'checkbox';
  newInputCheck.id = task.id;
  newTextTask.textContent = task.task;

  if (task.completed) {
    newInputCheck.checked = true;
    newTextTask.classList.add('taskChecked');
  }

  newItemTask.append(newInputCheck);
  newItemTask.append(newTextTask);

  taksContainerElement.append(newItemTask);

  newInputCheck.addEventListener('change', () => {
    checkTask(task, newTextTask, newInputCheck);
  });
};
checkTask = (task, spanElement, checkbox) => {
  if (checkbox.checked) {
    task.completed = true;
    spanElement.classList.add('taskChecked');
  } else {
    task.completed = false;
    spanElement.classList.remove('taskChecked');
  }
  updateRemainTask();
};
filterCompletTask = () => {
  const completedTasks = tasks.filter(task => task.completed);
  clearTaskList();
  completedTasks.forEach(task => createNewTask(task));
};
filterIncompleteTask = () => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  clearTaskList();
  incompleteTasks.forEach(task => createNewTask(task));
};
showAllTasks = () => {
  clearTaskList();
  tasks.forEach(task => createNewTask(task));
  updateRemainTask();
};
clearTaskList = () => {
  taksContainerElement.innerHTML = '';
};
deleteCompleteTask = () => {
  const completedTasks = tasks.filter(task => task.completed);

  completedTasks.forEach(completedTask => {
    const taskElement = document.getElementById(completedTask.id);
    taskElement.remove();
  });

  tasks = tasks.filter(task => !task.completed);
  updateRemainTask();
};
updateRemainTask = () => {
  const incompleteTasksCount = tasks.filter(task => !task.completed).length;
  remainTasksElement.textContent = `${incompleteTasksCount} tasks left`;
};

formTaskElement.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    addTask();
    inputCreateElement.value = '';
  }
});
formTaskElement.addEventListener('submit', function (event) {
  event.preventDefault();
});
buttonFilterCompleteElement.addEventListener('click', filterCompletTask);
buttonFilterActiveTaskElement.addEventListener('click', filterIncompleteTask);
buttonFilterAllTaskElement.addEventListener('click', showAllTasks);
buttonDeleteTaskElement.addEventListener('click', deleteCompleteTask);

// CLOCK
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
changeHour = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  hoursElement.textContent = hour;
  minutesElement.textContent = formattedMinutes;
};
changeHour();
setInterval(changeHour, 1000);



document.addEventListener("DOMContentLoaded", function () {
  // Start nav bar
  var startButton = document.getElementById('startbutton');
  startButton.addEventListener('click', function () {
      // Toggle start nav bar visibility
      var startBar = document.querySelector('.startBarShowing');
      startBar.style.display = (startBar.style.display === 'flex') ? 'none' : 'flex';
  });

  // Close button
  var closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', function () {
      // Hide the parent element of the close button
      this.parentNode.style.display = 'none';
  });

  // Make ErrorMessage draggable
  makeDraggable(document.getElementById('ErrorMessage'));
});

// Function to make an element draggable
function makeDraggable(element) {
  var isDragging = false;
  var offset = { x: 0, y: 0 };

  element.addEventListener('mousedown', function (event) {
      isDragging = true;

      offset.x = event.clientX - element.getBoundingClientRect().left;
      offset.y = event.clientY - element.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', function (event) {
      if (isDragging) {
          element.style.left = event.clientX - offset.x + 'px';
          element.style.top = event.clientY - offset.y + 'px';
      }
  });

  document.addEventListener('mouseup', function () {
      isDragging = false;
  });
}


const about = document.querySelector('#aboutId');
const skills = document.querySelector('#skillsId');
const projects = document.querySelector('#projectId');
const aboutpage = document.querySelector('.right-infoContainer')
const skillpage = document.querySelector('.skilldiv')
const projectpage = document.querySelector('.projectkiclass')

document.addEventListener('click', function (event) {
  if (event.target === about) {
    aboutpage.style.display = 'block';
    skillpage.style.display = 'none';
    projectpage.style.display = 'none';
    about.style.color = 'blue';
    skills.style.color = 'purple';
    projects.style.color = 'purple';
  } else if (event.target === skills) {
    skillpage.style.display = 'block';
    aboutpage.style.display = 'none';
    projectpage.style.display = 'none';
    skills.style.color = 'blue';
    about.style.color = 'purple';
    projects.style.color = 'purple';
  } else if (event.target === projects) {
    projectpage.style.display = 'block';
    skillpage.style.display = 'none';
    aboutpage.style.display = 'none';
    projects.style.color = 'blue';
    skills.style.color = 'purple';
    about.style.color = 'purple';
  }
})

const rightinfo = document.querySelector('.right-infoContainer')
const skilldiv = document.querySelector('.skilldiv')
const projectdiv = document.querySelector('.projectkiclass')
const leftinfo = document.querySelector('.left-infoContainer')
const homewid = document.querySelector('.homewid')
const homeabout = document.querySelector('#homeabout')
const homeskills = document.querySelector('#homeskills')
const homeproject = document.querySelector('#homeproject')



homeabout.addEventListener('click', function (event) {
  leftinfo.style.display = 'flex';
  rightinfo.style.display = 'flex';
  homewid.style.display = 'none';
  about.style.color = 'blue';
  skills.style.color = 'purple';
  projects.style.color = 'purple';

})

homeskills.addEventListener('click', function (event) {
  leftinfo.style.display = 'flex';
  skilldiv.style.display = 'flex';
  homewid.style.display = 'none';
  skills.style.color = 'blue';
  about.style.color = 'purple';
  projects.style.color = 'purple';
})
homeproject.addEventListener('click', function (event) {
  leftinfo.style.display = 'flex';
  projectdiv.style.display = 'flex';
  homewid.style.display = 'none';
  projects.style.color = 'blue';
  about.style.color = 'purple';
  skills.style.color = 'purple';
})

const homeId = document.querySelector('#homeId');
homeId.addEventListener('click', function () {
  leftinfo.style.display = 'none';
  rightinfo.style.display = 'none';
  skilldiv.style.display = 'none';
  projectdiv.style.display = 'none';
  homewid.style.display = 'block';
})

const conctacthere = document.querySelector('#contacthere');

conctacthere.addEventListener('click', function () {
  contactWindow.classList.remove('offWindow');
  toggleWindow(contactWindow);
})

const clickprint = document.querySelector('#clickprint');
clickprint.addEventListener('click', function () {
  myComputerWindow.classList.remove('offWindow');
  toggleWindow(paintWindow);
})

const clickprint1 = document.querySelector('#clickprint1');
clickprint1.addEventListener('click', function () {
  myComputerWindow.classList.remove('offWindow');
  toggleWindow(paintWindow);
})

const drawings = document.querySelector('#drawings');
drawings.addEventListener('click', function () {
  drawingWindow.classList.remove('offWindow');
  toggleWindow(drawingWindow);
})

document.addEventListener("DOMContentLoaded", function() {
  var reloadBtn = document.getElementById("reloadBtn");

  reloadBtn.addEventListener("click", function () {
      console.log("Reload button clicked");
      
      location.reload();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const textArea = document.getElementById('text-area');
  const fontSizeSelect = document.getElementById('font-size');
  const fontFamilySelect = document.getElementById('font-family');
  const boldButton = document.getElementById('bold-button');
  const downloadButton = document.getElementById('download-button');

  
  textArea.value = localStorage.getItem('notepad_text') || '';
  textArea.style.fontSize = localStorage.getItem('font_size') || '16px';
  textArea.style.fontFamily = localStorage.getItem('font_family') || 'Arial';
  textArea.style.fontWeight = localStorage.getItem('font_weight') || 'normal';

  
  textArea.addEventListener('input', updateLocalStorage);
  fontSizeSelect.addEventListener('change', updateFontSize);
  fontFamilySelect.addEventListener('change', updateFontFamily);
  boldButton.addEventListener('click', toggleBold);
  downloadButton.addEventListener('click', downloadText);

  function updateLocalStorage() {
      localStorage.setItem('notepad_text', textArea.value);
  }

  function updateFontSize() {
      const selectedSize = fontSizeSelect.value;
      textArea.style.fontSize = selectedSize;
      localStorage.setItem('font_size', selectedSize);
  }

  function updateFontFamily() {
      const selectedFont = fontFamilySelect.value;
      textArea.style.fontFamily = selectedFont;
      localStorage.setItem('font_family', selectedFont);
  }

  function toggleBold() {
      const currentWeight = textArea.style.fontWeight;
      const newWeight = currentWeight === 'bold' ? 'normal' : 'bold';
      textArea.style.fontWeight = newWeight;
      localStorage.setItem('font_weight', newWeight);
      boldButton.style.backgroundColor = newWeight === 'bold' ? 'white' : 'rgb(203, 200, 200)';
  }

  function downloadText() {
      const textToDownload = textArea.value;
      const blob = new Blob([textToDownload], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'notepad_content.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }
});
