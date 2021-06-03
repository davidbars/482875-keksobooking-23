'use strict';


let getRandomNumber = function (min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    if (min >= 0 && max >= 0) {
        return console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    } else {
        return console.log('Вы ввели отрицательное число, не делайте так!');
    }
};

getRandomNumber(3,14);
getRandomNumber(-1,3);
getRandomNumber(0, 44);
getRandomNumber('22', '333');
getRandomNumber(44, 11);



let getRandomDecimalNumber = function (min, max, countOfNumbers) {

    // проверка на отрицательное число
    if (min >= 0 && max >= 0) {
        let result = Math.random() * (max - min + 1) + min;
        let str = result.toString();
        let strArray = str.split('.');

        // проверка на отрицательное число
        result = Number(strArray[0] + '.' +strArray[1].substr(0,countOfNumbers));
        return console.log(result);

    } else {
        return console.log('Вы ввели отрицательное число, не делайте так!');
    }
};

getRandomDecimalNumber(3.2131312312, 14.313123, 4);
getRandomDecimalNumber(1, 33, 3);
getRandomDecimalNumber(0, 44, 2);
getRandomDecimalNumber('22', '333', 7);
getRandomDecimalNumber(44.213, 11, 1);
