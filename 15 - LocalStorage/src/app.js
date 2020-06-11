
const dishesKey = "dishes";
const dishesString = localStorage.getItem(dishesKey);
const dishesList = JSON.parse(dishesString) || [];

const wrapperNode = document.querySelector('.wrapper');
const platesListNode = wrapperNode.querySelector('ul.plates');
const addItemFormNode = wrapperNode.querySelector('form.add-items');
const checkAllButtonNode = wrapperNode.querySelector('button[data-check-all]');
const uncheckAllButtonNode = wrapperNode.querySelector('button[data-uncheck-all]');
const clearAllButtonNode = wrapperNode.querySelector('button[data-clear-all]');

const renderPlates = function (container, source) {

    const platesLiNodes = source.map((item, i) => {
        return `
            <li>
                <input type="checkbox" id="item${i}" data-index="${i}" ${item.done ? "checked" : ""}>
                <label for="item${i}">
                    ${item.text}
                </label>
            </li>
        `;
    }).join('');

    container.innerHTML = platesLiNodes;
}

const persistPlatesState = function (source) {
    localStorage.setItem(dishesKey, JSON.stringify(source));
}

const populatePlates = function (container, source) {

    if (!dishesList || !dishesList.length) return;

    renderPlates(container, source);
}

const persistCheckboxState = function (e) {

    if (!e.target.matches("input[type='checkbox']")) return;

    const checkbox = e.target;
    const index = checkbox.dataset.index;
    dishesList[index].done = !dishesList[index].done;

    persistPlatesState(dishesList);
}

const addItem = function (e) {

    e.preventDefault();

    const form = e.target;
    const dishTitle = form.querySelector("input[name='item']").value;
    form.reset();

    const itemIndex = dishesList.length;
    const liNode = document.createElement('li');
    liNode.innerHTML = `
        <input type="checkbox" id="item${itemIndex}" data-index="${itemIndex}">
        <label for="item${itemIndex}">
            ${dishTitle}
        </label>
    `;

    platesListNode.appendChild(liNode);

    const plateItem = {
        text: dishTitle,
        done: false
    };

    dishesList.push(plateItem);
    persistPlatesState(dishesList);
}

const setStateForAllCheckboxes = function (state) {

    dishesList.forEach(item => {
        item.done = state;
    });

    renderPlates(platesListNode, dishesList);
    persistPlatesState(dishesList);
}

const checkAll = function (e) {
    setStateForAllCheckboxes(true);
}

const uncheckAll = function (e) {
    setStateForAllCheckboxes(false);
}

const clearAll = function () {
    dishesList.splice(0);
    renderPlates(platesListNode, dishesList);
    persistPlatesState(dishesList);
}

addItemFormNode.addEventListener('submit', addItem);
platesListNode.addEventListener('click', persistCheckboxState)
checkAllButtonNode.addEventListener('click', checkAll)
uncheckAllButtonNode.addEventListener('click', uncheckAll)
clearAllButtonNode.addEventListener('click', clearAll)

populatePlates(platesListNode, dishesList);
