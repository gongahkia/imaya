const smallTask = document.getElementById('small-task');
const mediumTask = document.getElementById('medium-task');
const largeTask = document.getElementById('large-task');
const saveButton = document.getElementById('save-tasks');
const orderSelect = document.getElementById('order-select');
const weeklyLog = document.getElementById('weekly-log');


function saveTasks() {
    /**
     saves the current tasks to local storage with the current date 
     and order and ensures that only the last 7 days' tasks are kept 
     in storage, updating the weekly log display and clearing the 
     input fields after saving
    **/
    const date = new Date().toLocaleDateString('ja-JP');
    const tasks = {
        small: smallTask.value,
        medium: mediumTask.value,
        large: largeTask.value,
        order: orderSelect.value,
        date: date
    };

    let weekLog = JSON.parse(localStorage.getItem('weekLog')) || [];
    weekLog.push(tasks);
    if (weekLog.length > 7) {
        weekLog = weekLog.slice(-7);
    }
    localStorage.setItem('weekLog', JSON.stringify(weekLog));

    updateWeeklyLog();
    clearInputs();
}

function updateWeeklyLog() {
    /**
     updates the weekly log element with the tasks stored in localStorage, 
    retrieving the last 7 days' tasks and formats them as list items, 
    displaying each task's date, description, and the order represented by an emoji
    **/
    const weekLog = JSON.parse(localStorage.getItem('weekLog')) || [];
    weeklyLog.innerHTML = '';
    weekLog.forEach(day => {
        const li = document.createElement('li');
        li.textContent = `${day.date}: ${day.small}, ${day.medium}, ${day.large} (${getOrderEmoji(day.order)})`;
        weeklyLog.appendChild(li);
    });
}

function getOrderEmoji(order) {
    switch(order) {
        case 'frog': return '🐸';
        case 'summit': return '🗻';
        case 'burn': return '🏃🏼';
        default: return '';
    }
}

function clearInputs() {
    smallTask.value = '';
    mediumTask.value = '';
    largeTask.value = '';
}

saveButton.addEventListener('click', saveTasks);

updateWeeklyLog();
