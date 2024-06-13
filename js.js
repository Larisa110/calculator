const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    toggleTheme();
});

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const root = document.documentElement;
    if (isDarkMode) {
        root.style.setProperty('--bg-color-light', '#000000');
        root.style.setProperty('--bg-color-dark', '#ffffff');
        root.style.setProperty('--text-color-light', '#ffffff');
        root.style.setProperty('--text-color-dark', '#000000');
    } else {
        root.style.setProperty('--bg-color-light', '#ffffff');
        root.style.setProperty('--bg-color-dark', '#000000');
        root.style.setProperty('--text-color-light', '#000000');
        root.style.setProperty('--text-color-dark', '#ffffff');
    }
}



const result = document.getElementById('result');

let a = '';
let b = '';
let sign = '';
let finish = false;
let keyPressed = false; // Флаг для отслеживания активации клавиши

const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const asset = ['+', '-', '*', '/'];

const buttons = document.querySelectorAll('#calculator td');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        const key = button.dataset.key;

        if (digit.includes(value)) {
            handleDigit(value);
        } else if (asset.includes(key)) {
            handleOperator(key);
        } else if (value === '=') {
            handleEqual();
        } else if (value === 'C') {
            handleClear();
        }
    });
});

document.addEventListener('keydown', event => {
    const key = event.key;
    if (!keyPressed) { // Проверяем, активирована ли уже клавиша
        const button = document.querySelector(`#calculator td[data-key="${key}"]`);
        if (button) {
            const value = button.textContent;
            const buttonKey = button.dataset.key;

            if (digit.includes(value)) {
                handleDigit(value);
            } else if (asset.includes(buttonKey)) {
                handleOperator(buttonKey);
            } else if (value === '=') {
                handleEqual();
            } else if (value === 'C') {
                handleClear();
            }
        } else if (key === 'Enter') {
            handleEqual();
        } else if (key === 'Delete') {
            handleClear();
        }
        keyPressed = true; // Устанавливаем флаг активации клавиши
    }
});

document.addEventListener('keyup', () => {
    keyPressed = false; // Сбрасываем флаг активации клавиши после отпускания клавиши
});

function handleDigit(value) {
    if (finish) {
        result.value = '';
        finish = false;
    }
    result.value += value;
}

function handleOperator(value) {
    if (a === '') {
        a = result.value;
        sign = value;
        result.value = '';
    } else if (a !== '' && sign !== '') {
        b = result.value;
        calculate();
        a = result.value;
        sign = value;
        b = '';
    }
}

function handleEqual() {
    if (a !== '' && sign !== '' && b === '') {
        b = result.value;
        calculate();
        a = '';
        b = '';
        sign = '';
        finish = true;
    }
}

function handleClear() {
    result.value = '';
    a = '';
    b = '';
    sign = '';
    finish = false;
}

function calculate() {
    switch (sign) {
        case '+':
            result.value = parseFloat(a) + parseFloat(b);
            break;
        case '-':
            result.value = parseFloat(a) - parseFloat(b);
            break;
        case '*':
            result.value = parseFloat(a) * parseFloat(b);
            break;
        case '/':
            result.value = parseFloat(a) / parseFloat(b);
            break;
        default:
            break;
    }
}


