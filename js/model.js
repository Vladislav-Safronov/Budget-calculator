export default class Model {
    constructor () {
        this.incomes = [];  // Объекты доходов
        this.expenses = [];  // Объекты расходов

        this.totals = {
            budget: 0,  // Общий бюджет
            inc: 0,  // Сумма доходов
            exp: 0,  // Сумма расходов
        }

        this.percentage = -1;  // % для суммы расходов

        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const incData = localStorage.getItem('incomes');
        if (incData) {
            this.incomes = JSON.parse(incData);
        }

        const expData = localStorage.getItem('expenses');
        if (expData) {
            this.expenses = JSON.parse(expData);
        } 
    }

    saveToLocalStorage() {
        localStorage.setItem('incomes', JSON.stringify(this.incomes));
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    // Проверка на заполненность формы
    formValidation(description, value) {
        if (description.trim() !== '' && value !== '' && value > 0) {
            return true;
        } else if (description.trim() === '') {
            alert('Введите описание.');
        } else if (value === '') {
            alert('Введите сумму.');
        } else if (value <= 0) {
            alert('Введите корректную сумму.');
        }
    }

    // Добавление доходов в массив income
    addIncomeFlow(type, description, value) {
        let id = 1;
        if (this.incomes.length > 0) {
            id = this.incomes[this.incomes.length - 1]['id'] + 1;
        }

        const newIncomeFlow = {
            id: id,
            type: type,
            description: description,
            value: value,
        }

        this.incomes.push(newIncomeFlow);

        this.saveToLocalStorage();

        return newIncomeFlow;
    }

    // Добавление расходов в массив expenses
    addExpensesFlow(type, description, value) {
        let id = 1;
        if (this.expenses.length > 0) {
            id = this.expenses[this.expenses.length - 1]['id'] + 1;
        }

        const newExpensesFlow = {
            id: id,
            type: type,
            description: description,
            value: value,
            ownPercentage: -1,
        }

        this.expenses.push(newExpensesFlow);

        this.saveToLocalStorage();

        return newExpensesFlow;
    }

    // Подсчет бюджета
    calcBudget() {
        let totalInc = 0;
        let totalExp = 0;

        // Подсчет всех доходов
        for (let income of this.incomes) {
            totalInc += parseInt(income.value);
        }
        this.totals.inc = totalInc;

        // Подсчет всех расходов
        for (let expense of this.expenses) {
            totalExp += parseInt(expense.value);
        }
        this.totals.exp = totalExp;

        // Подсчет общего бюджета
        this.totals.budget = totalInc - totalExp;

        // Подсчет % для расходов
        if (this.totals.inc > 0) {
            this.percentage = Math.round((this.totals.exp / this.totals.inc) * 100);
        } else {
            this.percentage = -1
        }
        
    }

    // Подсчет % для каждого расхода
    calcOwnPercentage() {
        
        for (let expense of this.expenses) {
            if (this.totals.inc > 0) {
                expense.ownPercentage = Math.round((expense.value / this.totals.inc) * 100);
            } else {
                expense.ownPercentage = -1;
            }
        }
        
    }

    // Поиск денежного потока
    findCashFlow(id, type) {
        
        if (type === 'inc') {
            const indexOfLiObject = this.incomes.findIndex(function(item) {
                if (item.id == id) {
                    return true;
                }
            })
            return this.incomes[indexOfLiObject];

        } else if (type === 'exp') {
            const indexOfLiObject = this.expenses.findIndex(function(item) {
                if (item.id == id) {
                    return true;
                }
            })
            return this.expenses[indexOfLiObject];
        }
        
    }
    
    // Удаление объекта денежного потока
    removeCashFlow(liObject) {
        // Удаление объекта доходов
        if (liObject.type === 'inc') {
            const index = this.incomes.indexOf(liObject);
            this.incomes.splice(index, 1);

        // Удаление объекта расходов
        } else if (liObject.type === 'exp') {
            const index = this.expenses.indexOf(liObject)
            this.expenses.splice(index, 1);
        }

        this.saveToLocalStorage();
    }


}