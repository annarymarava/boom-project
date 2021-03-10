const ListQuantityWordsComponent = () => {

    return (
        `<div class="page-with-question">
        <form>
        <label for="enter-quantity-words">Введите количество слов в Вашем списке</label>
        <input type="text" id="enter-quantity-words">
    </form>
    <button id="btn-procced-create-module">
        Продолжить
    </button>
    <span id="error-message-procced" class="error-message block">Заполните обязательно все поля или проверьте правильность ввода!</span>
    </div>`)
};

export default ListQuantityWordsComponent;