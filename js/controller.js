import Model from './model.js';
import View from './view.js';
// -------------------------- //
const model = new Model();
const view = new View(model.incomes, model.expenses,);
// -------------------------- //

// Отправка формы, добавление дохода/расхода
view.elements.form.addEventListener('submit', function(event) {
    event.preventDefault();

    const type = view.elements.typeInput.value;
    const description = view.elements.descriptionInput.value;
    const value =  view.elements.valueInput.value;

    // Проверка на заполненность формы
    if (model.formValidation(description, value)) {
        // В зависимости от типа (доход/расход) создаем новый объект
        let newCashFlowObject;
        if (type === 'inc') {
            newCashFlowObject = model.addIncomeFlow(type, description, value);
        } else if (type === 'exp') {
            newCashFlowObject = model.addExpensesFlow(type, description, value);
        }

        // Отображение доходов/расходов на странице
        view.renderCashFlow(newCashFlowObject);

        // Очистка input и фокус
        view.clearInput();

        // Подсчет бюджета
        model.calcBudget();

        // Вывод бюджета
        view.renderBudget(model.totals.inc, model.totals.exp, model.totals.budget, model.percentage);

        // Подсчет % для каждого расхода
        model.calcOwnPercentage();
        // Вывод % для каждого расхода
        view.renderOwnPercentage(model.expenses);
    }
})

// Удаление денежного потока при нажатии на крестик
view.elements.budgetTable.addEventListener('click', function(event) {
    if (event.target.closest('.item__remove')) {
        // Поиск элемента списка, его id и типа
        const parentLi = event.target.closest('li.budget-list__item');
        const idOfParentLi = parentLi.dataset.id;
        const typeOfParentLi = parentLi.dataset.type;
        
        // Поиск объекта в массиве по id, удаление в model и view
        const liObject = model.findCashFlow(idOfParentLi, typeOfParentLi);
        model.removeCashFlow(liObject);
        view.removeCashFlow(liObject);

        // Подсчет бюджета
        model.calcBudget();

        // Вывод бюджета
        view.renderBudget(model.totals.inc, model.totals.exp, model.totals.budget, model.percentage);

        // Подсчет % для каждого расхода
        model.calcOwnPercentage();
        // Вывод % для каждого расхода
        view.renderOwnPercentage(model.expenses);

    }
})

