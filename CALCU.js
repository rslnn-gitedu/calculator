
        const display = document.getElementById('display');
        let currentInput = '';
        let currentOperation = '';
        let previousValue = '';
        let isResultDisplayed = false;  
        let expression = '';  

        document.querySelectorAll('.main button').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;

                if (isResultDisplayed && !isNaN(value)) {
                    // reset the displayed output when another number was clicked
                    currentInput = value;
                    expression = currentInput;
                    display.textContent = expression;
                    isResultDisplayed = false;
                } else if (!isNaN(value) || value === '.') {
                    // decimal 
                    currentInput += value;
                    expression += value; 
                    display.textContent = expression;
                } else if (value === 'C') {
                    // C to clear all input
                    currentInput = '';
                    currentOperation = '';
                    previousValue = '';
                    expression = '';
                    display.textContent = '0';
                    isResultDisplayed = false;
                } else if (value === '=') {
                    // Calculate the result
                    if (currentInput && previousValue && currentOperation) {
                        const result = calculate(parseFloat(previousValue), parseFloat(currentInput), currentOperation);
                        display.textContent = result;
                        expression = result.toString();  
                        currentInput = result.toString();
                        previousValue = '';
                        currentOperation = '';
                        isResultDisplayed = true;  
                    }
                } else {
                    if (currentInput) {
                        if (previousValue) {
                            previousValue = calculate(parseFloat(previousValue), parseFloat(currentInput), currentOperation).toString();
                        } else {
                            previousValue = currentInput;
                        }
                        currentInput = '';
                    }
                    currentOperation = value === '÷' ? '/' : value === '*' ? '*' : value === '-' ? '-' : value === '+' ? '+' : '';
                    expression += ` ${value} `; 
                    display.textContent = expression;
                }
            });
        });

        //method to calculate 
        function calculate(a, b, operation) {
            switch (operation) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    return a / b ;
                default:
                    return 0;
            }
        }
