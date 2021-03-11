const GameComponent = (data) => {
    let termsArr = data.terms;
    let definitionsArr = data.definitions;
    let content = [];
    for (let i =0; i < termsArr.length; i++) {
        content.push(`<div class="preview-words-game">${termsArr[i]} - ${definitionsArr[i]}</div>`);
    }
    let contentString = content.join(``);
    return (`
    <div class="page-with-game">
        <div class="game-container">
            <div class="game" id="btn-cards-module">Карточки</div>
            <div class="game" id="btn-dragn-drop-module">Перетягивание</div>
            <div class="game" id="btn-write-module">Письмо</div>
            <div class="game" id="btn-test-module">Тест</div>
        </div>
        <div class="game-words-container" id="game-words-container">
            <h3>Давайте начнем учить новые слова!</h3>
            <p>Выберите любую интересную для Вас функцию, для заучивания новых слов из Вашего модуля! Перед этим, прочтите Ваши слова.</p>
            ${contentString}
        </div>
    </div>`)

};

export default GameComponent;