const GameTestComponent = (terms, definitions) => {
    const letter = ['A', 'B', 'C']
    const data = {
        amswerBlock: [],
        selectionBlock: [],
        optionsBlock: [],
        answerContent: [],
        selectionContent: [],
        selectionAnswerContent: [],
        optionsContent: [],
    }

    for (let i = 0; i < 3; i++) { //получаю случайные значения по длине массива, для составления вопросов
        data.amswerBlock.push(Math.round(Math.random() * (terms.length - 1)))
        data.selectionBlock.push(Math.round(Math.random() * (terms.length - 1)))
        data.optionsBlock.push(Math.round(Math.random() * (terms.length - 1)))
    }

    let resultAnswer = [];
    const checkAnswer =() => {
        for (let elem of data.amswerBlock) {
            if (!resultAnswer.includes(elem)) {
                resultAnswer.push(elem);
            }
        }
        if (resultAnswer.length <3) {
            data.amswerBlock = resultAnswer;
            data.amswerBlock.push(Math.round(Math.random() * (terms.length - 1)));
            resultAnswer=[];
            checkAnswer();
        }
    }
    checkAnswer();
    let resultSection = [];
    const checkSection =() => {
        for (let elem of data.selectionBlock) {
            if (!resultSection.includes(elem)) {
                resultSection.push(elem);
            }
        }
        if (resultSection.length <3) {
            data.selectionBlock = resultSection;
            data.selectionBlock.push(Math.round(Math.random() * (terms.length - 1)));
            resultSection =[];
            checkSection();
        }
    }
    checkSection();

    let resultOptions = [];
    const checkOptions =() => {
        for (let elem of data.optionsBlock) {
            if (!resultOptions.includes(elem)) {
                resultOptions.push(elem);
            }
        }
        if (resultOptions.length <3) {
            data.optionsBlock = resultOptions;
            data.optionsBlock.push(Math.round(Math.random() * (terms.length - 1)));
            resultOptions= [];
            checkOptions();
        }
    }
    checkOptions();
    for (let i=0; i<3; i++) {
        let countAnswer = resultAnswer[i];
        let countSelection = resultSection[i];
        let countSelectionNext;
        if(i===2) {
            countSelectionNext = resultSection[0];
        } else {
            countSelectionNext = resultSection[i+1];
        }
        let countOptions = resultOptions[i];
        //по ранее сгенированным номерам массива, создаю вопросы с необходимостью ввода ответа
        data.answerContent.push(`
        <div>
            <span>${definitions[countAnswer]}</span>
            <input type="text" class="test-answer" data-test-answer ="${countAnswer}">
        </div>`);
        //по ранее сгенированным номерам массива, создаю вопросы с необходимостью выбора правильного ответа, путем ввода буквы
        data.selectionContent.push(`
        <div>
            <input type="text" class="test-selection" data-test-selection ="${countSelection}">
            <span>${definitions[countSelection]}</span>
        </div>`);

        data.selectionAnswerContent.push(`
        <div>
            <span>${letter[i]})</span>
            <p data-selection-letter="${letter[i]}" data-selection-value="${terms[countSelectionNext]}">${terms[countSelectionNext]}</p>
        </div>`)
        //по ранее сгенированным номерам массива, создаю вопросы с необходимостью выбора правильного ответа, путем нажатия на радио-кнопку
        let randomNumberRightAnswer = Math.round(Math.random());
        let arrRadioAnswer = [];
            for(let j=0; j<2; j++) {
                if(j===randomNumberRightAnswer) {
                    arrRadioAnswer.push(`<p><input name="${countOptions}" type="radio" value="${terms[countOptions]}">${terms[countOptions]}</p>`)
                } else {
                    if(countOptions+1 ===terms.length) {
                        arrRadioAnswer.push(`<p><input name="${countOptions}" type="radio" value="${terms[countOptions-1]}">${terms[countOptions-1]}</p>`)
                    } else {
                        arrRadioAnswer.push(`<p><input name="${countOptions}" type="radio" value="${terms[countOptions+1]}">${terms[countOptions+1]}</p>`)
                    }
                    
                }
            }
        let stringRadioAnswer = arrRadioAnswer.join(''); 
        data.optionsContent.push(`
        <div>
            <span data-test-options="${countOptions}">${definitions[countOptions]}</span>
            ${stringRadioAnswer}
        </div>`);
    }

    let answerContentString =  data.answerContent.join('');
    let selectionContentString =  data.selectionContent.join('');
    let selectionAnswerContenString =  data.selectionAnswerContent.join('');
    let optionsContentString =  data.optionsContent.join('');


    return (
        `<div class="test-container">
        <div class="test-answer-container">
            <h3>Вопросы для письменного ответа</h3>
            <form>
                ${answerContentString}
            </form>
        </div>
        <div class="test-selection-container">
            <h3>Вопросы для подбора(вписать верную букву ответа)</h3>
            <form>
                <div class="test-selection-container-first">
                    ${selectionContentString}
                </div>
                <div class="test-selection-container-second">
                    ${selectionAnswerContenString}
                </div>
            </form>
        </div>
        <div class="test-options-container">
            <h3>Вопросы с выбором ответа</h3>
            <form>
            ${optionsContentString}
            </form>
        </div>
        <button id="check-test-module" class="check-test-module">Проверить</button>
        </div>
        `
    )
};

export default GameTestComponent;