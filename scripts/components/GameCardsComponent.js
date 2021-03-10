const GameCardsComponent = (data, option, number) => {
    let termsArr = data.terms;
    let definitionsArr = data.definitions;
    let content;
    let disabledLeft = '';
    let disabledRight = '';
    let classLeft = '';
    let classRight = '';
    if (number === 0 && number === (termsArr.length - 1)) {
        disabledLeft = 'disabled';
        disabledRight = 'disabled';
        classLeft = 'btn-disabled';
        classRight = 'btn-disabled';
    } else if (number === (termsArr.length - 1)) {
        disabledRight = 'disabled';
        classRight = 'btn-disabled';
    } else if (number === 0) {
        disabledLeft = 'disabled';
        classLeft = 'btn-disabled';
    } else {
        disabledLeft = '';
        disabledRight = '';
        classLeft = '';
        classRight = '';
    }

    if (number < termsArr.length && number < definitionsArr.length) {
        if (option === 'term') {
            content = `<div class ="game-card" id="game-card">${termsArr[number]}</div>`
        } else if(option === 'definition') {
            content = `<div class ="game-card" id="game-card">${definitionsArr[number]}</div>`
        }
    }

    return (`
    <h3>Нажимая на карточку, вы узнаете ее перевод</h3>
    <div class="game-card-button-container">
        <button id="btn-prev-card" class="btn-prev-card ${classLeft}" ${disabledLeft}><span class="double double-left">&#171;</span></button>
        ${content}
        <button id="btn-next-card" class="btn-next-card ${classRight}" ${disabledRight}><span class="double double-right">&#187;</span></i></button>
    </div>`)
};

export default GameCardsComponent;