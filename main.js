let Elid = function (inputName, buttonName, buttonTwoName, titleName, textName, processName,resultName) {
    this.input = document.getElementById(inputName);
    this.button = document.getElementById(buttonName);
    this.buttonTwo = document.getElementById(buttonTwoName);
    this.title = document.getElementById(titleName);
    this.text = document.getElementById(textName);
    this.process = document.getElementById(processName);
    this.result = document.getElementById(resultName);
    this.checkPoint = false;
};

Elid.prototype.changeId = function (inputName) {
    this.input.id = inputName;
    this.checkPoint = true;
};

Elid.prototype.changeContent = function (inputName, buttonName, titleName, textName) {
    actionId.title.innerHTML = titleName;
    actionId.text.innerHTML = textName;
    actionId.button.innerHTML = buttonName;
    actionId.input.innerHTML = inputName;
};

let actionId = new Elid("input_question", "confirm", "confirmTwo", "title", "text", "process", "result");

let Logic = function () {
    this.howQuestions = undefined;
    this.askTrue = 0;
    this.askFalse = 0;
    this.min = undefined;
    this.max = undefined;
    this.numberOne = undefined;
    this.numerTwo = undefined;
    this.check = undefined;
    this.askTrue = 0;
    this.askFalse = 0;
    this.result = undefined;
}

Logic.prototype.createNumber = function () {
    this.min = Math.ceil(2);
    this.max = Math.floor(9);

    this.numberOne = Math.round(Math.random() * (this.max - this.min) + this.min);
    this.numberTwo = Math.round(Math.random() * (this.max - this.min) + this.min);
};

Logic.prototype.createResult = function () {
    this.result = document.getElementById("answer").value;
    this.result = +this.result;
};

Logic.prototype.rightAnswer = function () {
    this.check = this.numberOne * this.numberTwo;
    +this.check.toFixed(1);
}

Logic.prototype.endResult = function () {
    actionId.process.style.display = "none";
    actionId.result.style.display = "block";
}

let logic = new Logic();

if (actionId.checkPoint === false) {
    logic.createNumber();
    logic.rightAnswer();
}
    actionId.title.innerHTML = "На сколько вопросов вы хотите ответить? Это должно быть не менее 5 вопросов и не более 20";
    actionId.button.addEventListener('click', function () {
        logic.howQuestions = actionId.input.value;
        if ((logic.howQuestions == '' || logic.howQuestions == null || logic.howQuestions == undefined) && actionId.checkPoint === false) {
            actionId.text.innerHTML = "Ошибка: Введите число";
        } else if ((logic.howQuestions >= 5 && logic.howQuestions <= 20) || actionId.checkPoint === true) {
            actionId.changeId("answer");
            actionId.changeContent("", "", "", "");
            actionId.title.innerHTML = `Сколько будет: ${logic.numberOne} x ${logic.numberTwo}`;
            actionId.input.value = "";
            actionId.buttonTwo.style.display = "block";
            actionId.button.style.display = "none";
                
        } else if ((logic.howQuestions < 5 || logic.howQuestions > 20) && actionId.checkPoint === false) {
            actionId.text.innerHTML = "Ошибка: Вопросов должно быть не менее 5-ти и не более 20-ти. Введите еще раз";
        } else if (isNaN(logic.howQuestions) && actionId.checkPoint === false) {
            actionId.text.innerHTML = "Ошибка: Веденное значение должно быть числом";
        }
    });

    actionId.buttonTwo.addEventListener('click', function () {
        logic.createResult();
        if (logic.result == logic.check) {
            actionId.text.innerHTML = "Ответ правильный";
            logic.askTrue++;
            actionId.text.style.color = "green";
        } else if (logic.result == '' || isNaN(logic.result) || logic.result == null) {
            actionId.text.innerHTML = "Ошибка: некорректный ввод";
            logic.howQuestions++;
        } else {
            actionId.text.innerHTML = "Ответ неправильный";
            logic.askFalse++;
            actionId.text.style.color = "red";
        }
        actionId.input.value = "";
        logic.howQuestions--;
        console.log(logic.howQuestions);
        logic.createNumber();
        logic.rightAnswer();
        actionId.title.innerHTML = `Сколько будет: ${logic.numberOne} x ${logic.numberTwo}`;
        if (logic.howQuestions == 0){
            logic.endResult();
            document.getElementById("howRightAnswer").innerHTML = `Правильных ответов: ${logic.askTrue}`;
            document.getElementById("howFalseAnswer").innerHTML = `Неправильных ответов: ${logic.askFalse}`;
            document.getElementById("reload").addEventListener('click', function() {
                location.reload()
            });
        }
    });



