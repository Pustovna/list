const template = document.querySelector('#task-template').content;
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('.add-form');
const modal = document.querySelector('.modal')
const buttons = modal.querySelectorAll('.modal-button');
const deleteButton = todoList.querySelectorAll('.todo-list-input')
let checkedItem;

const addItem = (text) => {
    const newItem = template.cloneNode(true);
    const newItemText = newItem.querySelector('span');
    newItemText.textContent = text;
    todoList.appendChild(newItem);

    const button = todoList.lastElementChild.querySelector('.todo-list-input');
    showModal(button);
};

const getItems = () => {
    return fetch('http://localhost:63342/list/data.json').then(response => response.json());
};

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputText = form.querySelector('.add-form-input');
    const text = inputText.value;
    addItem(text);
    inputText.value = '';
});

const showModal = (button) => {
    button.addEventListener('click', (e) => {
        modal.style.display = "flex";
        const text = modal.querySelector('span');
        text.textContent = 'Delete?';
        checkedItem = e.target;
    })
};

deleteButton.forEach(button => {
    showModal(button);
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.button === 'yes') {
            getItems().then((data) => {
                const itemList = checkedItem.closest('.todo-list-item')
                for (let item in data) {
                    if (data[item] == true) {
                        itemList.remove();
                        modal.style.display = "none";
                    }
                }
            })
                .catch(() => {
                    const text = modal.querySelector('span');
                    text.textContent = 'Error';
                });
        } else {
            modal.style.display = "none";
        }
    })
})




