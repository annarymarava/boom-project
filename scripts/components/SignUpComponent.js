const SignUpComponent = () => {

    return (`
            <div class="sign-up-page">
                <form id="sign-up">
                    <label for="sign-un-name">Введите Ваше имя:</label>
                    <input type="text" id="sign-up-name">
                    <label for="sign-un-email">Введите Ваш почтовый адрес:</label>
                    <input type="text" id="sign-up-email">
                    <label for="sign-up-password">Введите Ваш пароль:(не менее 6 символов)</label>
                    <input type="password" id="sign-up-password">
                    <button id="btn-sign-up">Зарегистрироваться</button>
                    <span id="error-message-sign" class="error-message block">Заполните обязательно все поля или проверьте правильность ввода!</span>
                </form>
            </div>`)

};

export default SignUpComponent;