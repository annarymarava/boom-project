const SignInComponent = () => {

    return (`
            <div class="sign-in-page">
                <form id="sign-in">
                    <label for="sign-in-login">Введите Ваш почтовый адрес:</label>
                    <input type="text" id="sign-in-login">
                    <label for="sign-in-password">Введите Ваш пароль:</label>
                    <input type="password" id="sign-in-password">
                    <button id="btn-sign-in">Войти</button>
                    <span id="error-message-sign" class="error-message block">Заполните обязательно все поля или проверьте правильность ввода!</span>
                </form>
            </div>`)

};

export default SignInComponent;