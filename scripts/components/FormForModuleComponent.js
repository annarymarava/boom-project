const FormForModuleComponent = (count) => {
    const cardComponent = `
<div class="words-container">
    <div>
        <input type="text" class="text-module-term">
        <span>Термин</span>
    </div>
    <div>
        <input type="text" class="text-module-definition">
        <span>Определение</span>
    </div>
</div>`;
    let wordsArr =[];
    for(let i=0; i<count; i++) {
        wordsArr.push(cardComponent); 
    }
    let words = wordsArr.join(``);
    
    return (
        `<div class="page-with-text-module">
            <h3>Создайте новый учебный модуль</h3>
            <form id="form-module">
                <div class="header-module">
                    <input type="text" id="name-module">
                    <label for="name-module">Введите название модуля</label>
                </div>
                ${words}
            </form>
            <button id ="btn-create-module">
                <i class="fas fa-check"></i>
                Создать модуль
            </button>
            <span id="error-message-text-module" class="error-message block">Заполните обязательно все поля или проверьте правильность ввода!</span>
        </div>`
    )
};

export default FormForModuleComponent;
