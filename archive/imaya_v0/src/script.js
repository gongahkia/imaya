const smallTask = document.getElementById('small-task');
const mediumTask = document.getElementById('medium-task');
const largeTask = document.getElementById('large-task');
const saveButton = document.getElementById('save-tasks');
const orderSelect = document.getElementById('order-select');
const dailyLog = document.getElementById('daily-log');
const weeklyLog = document.getElementById('weekly-log');
const viewWeeklyLogButton = document.getElementById('view-weekly-log');

const MAX_TASKS = 9;

function saveTasks() {

    const tasks = [smallTask.value.trim(), mediumTask.value.trim(), largeTask.value.trim()];
    const count = tasks.filter(Boolean).length;
    console.log(count);

    if (count > 1){

        alert('タスクは一つにしてください！ (Please enter only one task!)');
        return null;

    } else if (count == 0){

        alert('タスクを入力してください！ (Please enter a task!)');
        clearInputs();
        return null;

    } else {

        const date = new Date().toLocaleDateString('ja-JP');

        const taskData = {
            date: date,
            flowType: orderSelect.value,
            taskType: smallTask.value ? 'smallTask' : mediumTask.value ? 'mediumTask' : 'largeTask',
            taskValue: smallTask.value.trim() || mediumTask.value.trim() || largeTask.value.trim(),
        }

        let dayLog = JSON.parse(localStorage.getItem('dailyLog')) || [];
        let weeklyLog = JSON.parse(localStorage.getItem('weekLog')) || [];

        console.log(dayLog);

        if (dayLog.length < MAX_TASKS) {

            dayLog.push(taskData);
            weeklyLog.push(taskData);
            localStorage.setItem('dailyLog', JSON.stringify(dayLog));
            localStorage.setItem('weekLog', JSON.stringify(weeklyLog));
            updateDailyLog();
            clearInputs();

        } else {

            alert('タスクの最大数に達しました！ (Maximum number of tasks reached!)');

        }

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

    // console.log(weekLog);

    if (weekLog.length === 0) {
        alert('週間ログは空です。 (Weekly log is empty.)');
        return;
    } else if (weekLog.length >= MAX_TASKS * 7){
        alert('週間ログは最大7日分しか保存されません。 (Weekly log is limited to 7 days.)');
    } else {
        alert(`${weekLog.length} items in the weekly log.`)
    }

    const groupedData = {};
    weekLog.forEach(item => {
        const { date } = item;
        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(item);
    });

    // console.log(groupedData);

    weeklyLog.innerHTML = "";

    for (const date in groupedData) {
        const dateHeader = document.createElement('h2');
        dateHeader.textContent = date;
        weeklyLog.appendChild(dateHeader);
        for (const item of groupedData[date]) {
            const div = document.createElement('div');
            formattedText = `${item.date}: ${getEmoji(item.order)} ${item.taskType}: ${item.taskValue}`;
            div.textContent = formattedText;
            div.classList.add('log-data');
            weeklyLog.appendChild(div);
        }
    }
}

saveButton.addEventListener('click', saveTasks);
viewWeeklyLogButton.addEventListener('click', viewWeeklyLog);

updateDailyLog();
