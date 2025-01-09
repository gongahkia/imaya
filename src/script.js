const smallTask = document.getElementById('small-task');
const mediumTask = document.getElementById('medium-task');
const largeTask = document.getElementById('large-task');
const saveButton = document.getElementById('save-tasks');
const orderSelect = document.getElementById('order-select');
const dailyLog = document.getElementById('daily-log');
const viewWeeklyLogButton = document.getElementById('view-weekly-log');

const MAX_TASKS = 9;

function saveTasks() {
    const date = new Date().toLocaleDateString('ja-JP');
    const taskText = `${date}: ${smallTask.value || mediumTask.value || largeTask.value} (${getOrderEmoji(orderSelect.value)})`;

    let dayLog = JSON.parse(localStorage.getItem('dailyLog')) || [];
    if (dayLog.length < MAX_TASKS) {
        dayLog.push(taskText);
        localStorage.setItem('dailyLog', JSON.stringify(dayLog));
        updateDailyLog();
        clearInputs();
    } else {
        alert('タスクの最大数に達しました！ (Maximum number of tasks reached!)');
    }
}

function updateDailyLog() {
    const dayLog = JSON.parse(localStorage.getItem('dailyLog')) || [];
    dailyLog.innerHTML = '';
    dayLog.forEach(task => {
        const div = document.createElement('div');
        div.textContent = task;
        div.classList.add('log-data'); 
        dailyLog.appendChild(div);
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

function viewWeeklyLog() {
    const weekLog = JSON.parse(localStorage.getItem('weekLog')) || [];
    if (weekLog.length === 0) {
        alert('週間ログは空です。 (Weekly log is empty.)');
        return;
    }
    const formattedLog = weekLog.map(entry => {
        const date = entry.date || '日付不明 (Unknown Date)';
        const tasks = [
            entry.small ? `小さい: ${entry.small}` : '',
            entry.medium ? `中くらい: ${entry.medium}` : '',
            entry.large ? `大きい: ${entry.large}` : ''
        ].filter(Boolean).join(', ');
        const order = entry.order ? `順序: ${getOrderEmoji(entry.order)}` : '';
        return `${date}: ${tasks} (${order})`;
    }).join('\n');
    alert(`週間ログ:\n${formattedLog}`);
}

saveButton.addEventListener('click', saveTasks);
viewWeeklyLogButton.addEventListener('click', viewWeeklyLog);

updateDailyLog();
