const template = document.querySelector('#task-template').content;
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('.add-form')

//отправка данных
const postItems  = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.text();
}

const addItem = (text) => {
    const newItem = template.cloneNode(true);
    const newItemText = newItem.querySelector('span');
    newItemText.textContent = text;
    todoList.appendChild(newItem);
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputText = form.querySelector('.add-form-input');
    const text = inputText.value;
    addItem(text);
    inputText.value = '';

    postItems('http://localhost:63342/list/data.json', text).then(r => {
        console.log(r);
    });
});

// получение данных из json
const getItems = () => {
    return fetch('http://localhost:63342/list/data.json').then(response => response.json());
}



window.addEventListener('DomContentLoaded', () => {
    getItems();
});