const GameDragnDropComponent = (data, container) => {

    function getXPositionOfElement() {//Получить случайные координаты x
                var x_position = Math.floor(Math.random() * (container.clientWidth-100));
                return x_position;
            }            
    function getYPositionOfElement() {//Получить случайные координаты y
                var y_position = Math.floor(Math.random() * (container.clientHeight-70));
                return y_position;
    }
   
        
    let termsArr = data.terms;
    let definitionsArr = data.definitions;
    let contentArr = [];
        for (let i = 0; i < termsArr.length; i++) {
          contentArr.push(`<div draggable="true" data-drag="${termsArr[i]}" style="left: ${getXPositionOfElement()}px; top: ${getYPositionOfElement()}px">${termsArr[i]}</div>
          <div draggable="true" data-drag="${termsArr[i]}" style="left: ${getXPositionOfElement()}px; top: ${getYPositionOfElement()}px">${definitionsArr[i]}</div>`) 
        };

let content = contentArr.join('');
    return (`
    <h3>Перетягивайте карточки к их переводу</h3>
    <div class="dragn-drop-container">
        ${content}
    </div>
    `)
};

export default GameDragnDropComponent;