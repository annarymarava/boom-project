const GameWriteComponent = (terms, definitions, number, mistakeAnswer) => {
    let content;
    let mistake = [];
    for (let i =0; i < mistakeAnswer.length; i++) {
        let count = mistakeAnswer[i];
        mistake.push(`<div class="preview-words-game">${terms[count]} - ${definitions[count]}</div>`);
    }
    let mistakeString = mistake.join('');
    if (number < definitions.length) {
        content = `
        <h3>Введите перевод в поле под словом</h3>
        <div class="game-write-container">
            <form>
                <label for="game-write-answer">${definitions[number]}</label>
                <input type="text" id="game-write-answer">
            </form>
            <button id="check-write-module">Проверить</button>
        </div>`
    } else {
        content = `
        <h3>Колличество ваших ошибок: ${mistakeAnswer.length}. Посмотрите в каких словах вы допустили ошибку.</h3>
        <div class="game-write-container">
            ${mistakeString}
        </div>`
    }

    return (content)
};

export default GameWriteComponent;