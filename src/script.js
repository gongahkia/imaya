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

    // add code here to serialise saved data to a proper JSON format instead of a string
    // then add a deserialisation function from below

    const taskData = {
        date: date,
        flowType: orderSelect.value,
        taskType: smallTask.value ? 'smallTask' : mediumTask.value ? 'mediumTask' : 'largeTask',
        taskValue: smallTask.value || mediumTask.value || largeTask.value,
    }

    let dayLog = JSON.parse(localStorage.getItem('dailyLog')) || [];

    console.log(dayLog);

    if (dayLog.length < MAX_TASKS) {
        dayLog.push(taskData);
        localStorage.setItem('dailyLog', JSON.stringify(dayLog));
        updateDailyLog();
        clearInputs();
    } else {
        alert('タスクの最大数に達しました！ (Maximum number of tasks reached!)');
    }

}

function updateDailyLog() {

    const dayLog = JSON.parse(localStorage.getItem('dailyLog')) || [];
    console.log(dayLog);

    dailyLog.innerHTML = '';

    dayLog.forEach(data=> {

        date = data.date;
        order = data.flowType;
        taskType = data.taskType;
        taskValue = data.taskValue;

        console.log(date, order, taskType, taskValue);

        const div = document.createElement('div');
        formattedText = `${date}: ${getEmoji(order)} ${taskType}: ${taskValue}`;
        div.textContent = formattedText;
        div.classList.add('log-data'); 
        dailyLog.appendChild(div);

    });

}

function getEmoji(text) {
    switch(text) {
        case 'frog': return '🐸';
        case 'summit': return '🗻';
        case 'burn': return '🏃🏼';
        case 'droplet': return '💧';
        case 'river': return '🏞️';
        case 'ocean': return '🌊';
        case 'completed': return '✅';
        case 'in-progress': return '⏳';
        case 'important': return '⚠️';
        case 'note': return '📝';
        case 'idea': return '💡';
        case 'scheduled': return '📅';
        case 'priority': return '⭐';
        case 'review': return '🔍';
        case 'waiting': return '⏲️';
        case 'collaboration': return '🤝';
        case 'deadline': return '⏰';
        case 'archive': return '📦';
        case 'feedback': return '💬';
        case 'checklist': return '📋';
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

    console.log(weekLog);

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
        const order = entry.order ? `順序: ${getEmoji(entry.order)}` : '';
        return `${date}: ${tasks} (${order})`;
    }).join('\n');
    alert(`週間ログ:\n${formattedLog}`);
}

saveButton.addEventListener('click', saveTasks);
viewWeeklyLogButton.addEventListener('click', viewWeeklyLog);

updateDailyLog();
