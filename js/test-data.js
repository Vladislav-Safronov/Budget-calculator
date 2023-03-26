let ExampleItem = function(type, desc, sum) {
    this.type = type;
    this.desc = desc;
    this.sum = sum;
}

let testData = [
    new ExampleItem('inc', 'Зарплата', 1245),
    new ExampleItem('inc', 'Фриланс', 820),
    new ExampleItem('inc', 'Программа', 110),
    new ExampleItem('inc', 'Продажи', 90),
    new ExampleItem('exp', 'Рента', 400),
    new ExampleItem('exp', 'Бензин', 60),
    new ExampleItem('exp', 'Продукты', 300),
    new ExampleItem('exp', 'Развлечения', 100),
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


document.querySelector('.header').addEventListener('click', function() {
    let randomInt = getRandomInt(testData.length);
    let randomItem = testData[randomInt];

    document.querySelector('#input__type').value = randomItem.type;
    document.querySelector('#input__description').value = randomItem.desc;
    document.querySelector('#input__value').value = randomItem.sum;
})
