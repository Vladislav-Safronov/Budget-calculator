export default class View {
    constructor() {}


    elements = {
        form: document.querySelector('#budget-form'),  // форма
        typeInput: document.querySelector('#input__type'),  // ввод типа
        descriptionInput: document.querySelector('#input__description'),  // ввод описания
        valueInput: document.querySelector('#input__value'),  // ввод суммы

        budgetTable: document.querySelector('#budgetTable'),  // секция со списком доходов и расходов
        incomeList: document.querySelector('#income__list'),  // список доходов
        expensesList: document.querySelector('#expenses__list'),  // список расходов

        totalInc: document.querySelector('#totalInc'),  // все доходы
        totalExp: document.querySelector('#totalExp'),  // все расходы
        budget: document.querySelector('#budget'),  // общий бюджет
        percentageOfExpenses: document.querySelector('#percentage'),  // процент для всех расходов
    }

    // Отображение доходов/расходов на странице
    renderCashFlow(CashFlowObject) {
        let cashFlowHTML;
        // Отображение доходов
        if (CashFlowObject.type === 'inc') {
            cashFlowHTML = 
                        `<li data-id="${CashFlowObject.id}" data-type="inc" class="budget-list__item item item--income">
                            <div class="item__title">${CashFlowObject.description}</div>
                            <div class="item__right">
                                <div class="item__amount">+ ${CashFlowObject.value}</div>
                                <button class="item__remove">
                                    <img
                                        src="./img/circle-green.svg"
                                        alt="delete"
                                    />
                                </button>
                            </div>
                        </li>`

            this.elements.incomeList.insertAdjacentHTML('afterbegin', cashFlowHTML);

        // Отображение расходов
        } else if (CashFlowObject.type === 'exp') {
            cashFlowHTML = 
                        `<li data-id="${CashFlowObject.id}" data-type="exp" class="budget-list__item item item--expense">
                            <div class="item__title">${CashFlowObject.description}</div>
                            <div class="item__right">
                                <div class="item__amount">
                                    + ${CashFlowObject.value}
                                    <div class="item__badge">
                                        <div data-ownPercentage class="badge badge--dark">
                                            
                                        </div>
                                    </div>
                                </div>
                                <button class="item__remove">
                                    <img src="./img/circle-red.svg" alt="delete" />
                                </button>
                            </div>
                        </li>`

            this.elements.expensesList.insertAdjacentHTML('afterbegin', cashFlowHTML);
        }
    }

    // Очистка input и фокус
    clearInput() {
        this.elements.descriptionInput.value = '';
        this.elements.valueInput.value = '';
        this.elements.descriptionInput.focus();
    }

    // Отображение итогов бюджета
    renderBudget(totalIncValue, totalExpValue, budget, percentage) {
        // Отображение доходов/расходов
        this.elements.totalInc.innerText = `+ ${totalIncValue}`;
        this.elements.totalExp.innerText = `- ${totalExpValue}`;

        // Отображение общего бюджета
        if (budget > 0) {
            this.elements.budget.innerText = `+ ${budget}`;
        } else {
            this.elements.budget.innerText = budget;
        }
        
        // Отображение процентов для расходов
        // Если есть доходы:
        if (percentage != -1) {
            this.elements.percentageOfExpenses.innerText = `${percentage}%`;
        // Если доходов нет:
        } else {
            this.elements.percentageOfExpenses.innerText = '';
        }

    }

    // Удаление денежного потока из списка
    removeCashFlow(liObject) {
        if (liObject.type === 'inc') {
            const cashFlowElement = this.elements.incomeList.querySelector(`[data-id="${liObject.id}"]`);
            cashFlowElement.remove();
        } else if (liObject.type === 'exp') {
            const cashFlowElement = this.elements.expensesList.querySelector(`[data-id="${liObject.id}"]`);
            cashFlowElement.remove();
        }
        
    }

    // Изменение процентов каждого расхода
    renderOwnPercentage(expenseArray) {
        for (let item of expenseArray) {
            // Если есть доходы:
            if (item.ownPercentage != -1) {
                const changingLi = this.elements.expensesList.querySelector(`[data-id="${item.id}"]`);
                changingLi.querySelector('[data-ownPercentage]').innerText = `${item.ownPercentage}%`;
            // Если доходов нет:
            } else {
                const changingLi = this.elements.expensesList.querySelector(`[data-id="${item.id}"]`);
                changingLi.querySelector('[data-ownPercentage]').innerText = ``;
            }
            
        }
    }

    // Форматирование чисел
    formatNumber(num) {
        let n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ",");
    }

}


