import FormForModuleComponent from './components/FormForModuleComponent.js';
import GameCardsComponent from './components/GameCardsComponent.js';
import GameComponent from './components/GameComponent.js';
import GameDragnDropComponent from './components/GameDragnDropComponent.js';
import GameDragnDropFinishComponent from './components/GameDragnDropFinishComponent.js';
import GameTestComponent from './components/GameTestComponent.js';
import GameTestFinishComponent from './components/GameTestFinishComponent.js';
import GameWriteComponent from './components/GameWriteComponent.js';
import ListQuantityWordsComponent from './components/ListQuantityWordsComponent.js';
import LoginComponent from './components/LoginComponent.js';
import NavComponent from './components/NavComponent.js';
import SignInComponent from './components/SignInComponent.js';
import SignUpComponent from './components/SignUpComponent.js';
import UserComponent from './components/UserComponent.js';
const components = {
    navPage: NavComponent,
    loginPage: LoginComponent,
    signInPage: SignInComponent,
    signUpPage: SignUpComponent,
    userPage: UserComponent,
    formForModulePage: FormForModuleComponent,
    listQuantityPage: ListQuantityWordsComponent,
    gamePage: GameComponent,
    gameCardPage: GameCardsComponent,
    gameDragnDropPage: GameDragnDropComponent,
    gameDragnDropFinishPage: GameDragnDropFinishComponent,
    gameWritePage: GameWriteComponent,
    gameTestPage: GameTestComponent,
    gameTestFinishPage: GameTestFinishComponent,
}
const myApp = (function () {
    function AppView() {
        let appContainer = null;
        let section = null;
        let container = null;
        let mistakeAnswer = [];

        this.init = function (app) {
            appContainer = app;
            this.showAuthorizationPage();
            section = document.getElementById('main-content');
        }

        this.showAuthorizationPage = function () {
            appContainer.innerHTML = components.navPage();
            section = document.getElementById('main-content');
            section.innerHTML = components.loginPage();
        }

        this.showFormSignIn = function () {
            section.innerHTML = components.signInPage();
        }

        this.showFormSignUp = function () {
            section.innerHTML = components.signUpPage();
        }

        this.signUserError = function () {
            let error = document.getElementById('error-message-sign');
            error.classList.remove('block');
        }

        this.showUserPage = function (name, data) {
            appContainer.innerHTML = components.navPage(name);
            section = document.getElementById('main-content');
            section.innerHTML = components.userPage(name, data);

        }

        this.makeNewModule = function () {
            section.innerHTML = components.listQuantityPage();
        };

        this.proccedModule = function (count) {
            let errorMessageProcced = document.getElementById('error-message-procced');
            if (!errorMessageProcced.classList.contains('block')) {
                errorMessageProcced.classList.add('block')
            }
            section.innerHTML = components.formForModulePage(count);
        }

        this.proccedModuleError = function () {
            let error = document.getElementById('error-message-procced');
            error.classList.remove('block');
        }

        this.openOptionForModule = function (data) {
            section.innerHTML = components.gamePage(data);
        }

        this.createModuleError = function () {
            let error = document.getElementById('error-message-text-module');
            error.classList.remove('block');
        }

        this.gameCardsModule = function (data, option, number) {
            container = document.getElementById('game-words-container');
            container.innerHTML = components.gameCardPage(data, option, number);

        }

        this.gameDragnDropModule = function (data) {
            container = document.getElementById('game-words-container');
            container.innerHTML = components.gameDragnDropPage(data, container);
        }

        this.gameDragnDropModuleFinish = function () {
            let containerDrop = document.querySelector('.dragn-drop-container');
            containerDrop.innerHTML = components.gameDragnDropFinishPage();
        }

        this.gameWriteModule = function (terms, definitions, number) {
            container = document.getElementById('game-words-container');
            container.innerHTML = components.gameWritePage(terms, definitions, number, mistakeAnswer);
        }

        this.gameMistakeWriteModule = function (rightAnswer, numberAnswer) {
            mistakeAnswer.push(numberAnswer);
            let containerAnswer = document.getElementById('game-write-answer');
            containerAnswer.value = rightAnswer;
            containerAnswer.classList.add('mistake-answer');
        }

        this.gameTestModule = function (terms, definitions) { 
            container = document.getElementById('game-words-container');
            container.innerHTML = components.gameTestPage(terms, definitions);
        }

        this.checkTestModule = function(result) {
            container = document.getElementById('game-words-container');
            container.innerHTML = components.gameTestFinishPage(result);
        }
    }

    function AppModel() {
        let myAppView = null;
        const that = this;
        this.dataModel = {
            activeCard: null,
            nameUser: null,
            idUser: null,
        }

        this.init = function (view) {
            myAppView = view;
        }

        this.showAuthorizationPage = function () {
            myAppView.showAuthorizationPage();
        }

        this.showFormSignIn = function () {
            myAppView.showFormSignIn();
        }

        this.showFormSignUp = function () {
            myAppView.showFormSignUp();
        }

        this.signUpUser = function (userEmail, userPassword, userName) {
            firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
                .then((userCredential) => {
                    that.changeDataUser(userName)
                    that.signInUser(userEmail, userPassword);
                })
        }

        this.changeDataUser = function (userName) {
            let user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: userName
            }).catch(function (error) {
                console.error("Ошибка изменения имени: ", error);
            });
        }

        this.signInUser = function (userEmail, userPassword) {
            if (userEmail && userPassword) {
                firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
                    .then((user) => {
                        that.dataModel.nameUser = user.user.displayName;
                        that.dataModel.idUser = user.user.uid
                        that.showUserPage();
                    }).catch(() => {
                        that.signUserError();
                    })
            }
        }

        this.signUserError = function () {
            myAppView.signUserError();
        }

        this.makeNewModule = function () {
            myAppView.makeNewModule();
        };

        this.proccedModule = function (count) {
            myAppView.proccedModule(count);
        }

        this.proccedModuleError = function () {
            myAppView.proccedModuleError();
        }

        this.createModule = function (words) {
            firebase.database().ref(that.dataModel.idUser + '/').push({
                name: words.name,
                terms: words.terms,
                definitions: words.definitions
            });
            that.showUserPage()
        }

        this.createModuleError = function () {
            myAppView.createModuleError();
        }

        this.showUserPage = function () {
            firebase.database().ref(that.dataModel.idUser).once("value")
                .then(function (snapshot) {
                    let data = snapshot.val();
                    myAppView.showUserPage(that.dataModel.nameUser, data);
                })
        }

        this.loginOut = function () {
            firebase.auth().signOut();
            myAppView.showAuthorizationPage();
        }

        this.comeBackStartPage = function () {
            that.showUserPage();
        }

        this.openOptionForModule = function (id) {
            let cardNameArr = id.split('-');
            cardNameArr.splice(0, 1)
            let cardName = null;
            if(cardNameArr.length === 1) {
                cardName = cardNameArr[0];
            } else {
                cardName = cardNameArr.join(' ');
            }
            firebase.database().ref(that.dataModel.idUser).once("value")
                .then(function (snapshot) {
                    let data = snapshot.val();
                    for (let key in data) {
                        if (data[key].name === cardName) {
                            that.dataModel.activeCard = data[key]; //задаю конкретный модуль, с которым сейчас работаю, в случае клика по другому модулю, данные перезапишутся
                            myAppView.openOptionForModule(that.dataModel.activeCard);
                        }
                    }
                })
        }

        this.gameCardsModule = function (option, number, e) {
            myAppView.gameCardsModule(that.dataModel.activeCard, option, number, e);
        }

        this.gameDragnDropModule = function () {
            myAppView.gameDragnDropModule(that.dataModel.activeCard);
        }

        this.dragStart = function (elem) {
            setTimeout(() => {
                elem.classList.add('hide');
            }, 0)
        }

        this.dragEnd = function (elem) {
            elem.classList.remove('hide');
        }

        this.dragEnter = function (elem) {
            elem.classList.add('hovered');
        }

        this.dragLeave = function (elem) {
            elem.classList.remove('hovered');
        }

        this.dragDrop = function (elem, card) {
            elem.classList.remove('hovered');
            if (elem.getAttribute('data-drag') === card.getAttribute('data-drag')) {
                elem.append(card);
                card.style.left = '0';
                card.style.top = '0';
                elem.parentElement.removeChild(elem);
            }
            let containerDrop = document.querySelectorAll('.dragn-drop-container div');
            if (!containerDrop.length) {
                myAppView.gameDragnDropModuleFinish();
            }
        }

        this.gameWriteModule = function (number) {
            myAppView.gameWriteModule
                (that.dataModel.activeCard.terms,
                that.dataModel.activeCard.definitions,
                number);
        }

        this.gameCheckWriteModule = function(answer, number) {
            if (answer === that.dataModel.activeCard.terms[number-1]) {
                myAppView.gameWriteModule
                (that.dataModel.activeCard.terms,
                that.dataModel.activeCard.definitions,
                number);
            } else {
                myAppView.gameMistakeWriteModule(that.dataModel.activeCard.terms[number-1], number-1)
                setTimeout(() => {
                    myAppView.gameWriteModule
                    (that.dataModel.activeCard.terms,
                    that.dataModel.activeCard.definitions,
                    number);
                }, 1000)
            }
        }

        this.gameTestModule = function () { 
            myAppView.gameTestModule(that.dataModel.activeCard.terms, that.dataModel.activeCard.definitions);
        }

        this.checkTestModule = function (data) {
            let rightAnswer = 9;
            for (let i=0; i< 3; i++) {
                if (data.answer.value[i] !== this.dataModel.activeCard.terms[data.answer.atribut[i]]) {
                    rightAnswer--;
                }

                if (data.selection.value[i] !== this.dataModel.activeCard.terms[data.selection.atribut[i]]) {
                    rightAnswer--;
                }

                if (data.option.value[i] !== this.dataModel.activeCard.terms[data.option.atribut[i]]) {
                    rightAnswer--;
                }
            }
            let result = Math.round(rightAnswer*100/9);
            myAppView.checkTestModule(result);
        }
    }



    function AppController() {
        let myAppModel = null;
        const that = this;
        this.gameCards = {
            option: 'term',
            number: 0,
        }

        this.gameDragnDrop = {
            dragCards: [],
        }

        this.gameWrite = {
            number: 0,
        }

        this.userDataIn = {
            email: null,
            password: null
        }

        this.userDataUp = {
            email: null,
            password: null,
            name: null
        }

        this.moduleData = {
            coundWord: null,
            terms: [],
            definitions: [],
            nameModule: null,
        }

        this.init = function (model) {
            myAppModel = model;

            //слушатель событий на документ
            window.onload = function () {
                location.hash = '';
            };
            window.addEventListener('hashchange', function () {
                let hash = location.hash ? location.hash.slice(1) : '';
                if (hash === '') {
                    that.showAuthorizationPage();
                }

                if (hash === 'sign-in') { //если кнопка войти, то вызвать свою ф-ю по открытию формы для входа
                    that.showFormSignIn();
                }

                if (hash === 'sign-up') { //если кнопка зарегистрироваться, то вызвать свою ф-ю по открытию формы для регистрации
                    that.showFormSignUp();
                }

                if (hash === 'start-page-in') { //если кнопка войти, то вызвать свою ф-ю по авторизации пользователя
                    that.signInUser();
                }

                if (hash === 'start-page-up') { //если кнопка зарегистрироваться, то вызвать свою ф-ю по авторизации пользователя
                    that.signUpUser();
                }

                if (hash === 'choose-words') { //в стартовой форме создать модуль, переход на страницу выбора кол-ва слов
                    myAppModel.makeNewModule();
                }

                if (hash === 'login-out') { //выйти из аккаунта
                    myAppModel.loginOut();
                }

                if (hash === 'create-module') { //после выбора кол-ва слов, переход в форму модуля
                    that.proccedModule();
                }

                if (hash === 'page-with-module') { //в форме создания модуля, создать модуль
                    that.createModule();
                }

                if (hash === 'start-page') { //клик по логотипу, для возварата к модулям
                    that.comeBackStartPage();
                }

                if (hash.includes('card')) { //клик по созданным модулям в аккаунте пользователя
                    let id = hash.slice(5);
                    myAppModel.openOptionForModule(id);
                }
            });

            document.addEventListener('click', function (event) {
                if (event.target && event.target.id === 'btn-sign-in') { //если кнопка войти, то вызвать свою ф-ю по проверке заполняемости полей
                    that.defaultController(event);
                    that.checkSignInUser();
                }

                if (event.target && event.target.id === 'btn-sign-up') { //если кнопка зарегистрироваться, то вызвать свою ф-ю по проверке заполняемости полей
                    that.defaultController(event);
                    that.checkSignUpUser();
                }

                if (event.target && event.target.id === 'btn-procced-create-module') {  //если кнопка по созданию модуля, после выбора колличества слов, проверка на заполненность поля и целое число
                    that.defaultController(event);
                    that.checkProccedModule();
                }

                if (event.target && event.target.id === 'btn-create-module') {  //в форме создания модуля, создать модуль
                    that.defaultController(event);
                    that.checkCreateModule();
                }

                if (event.target && event.target.id === 'btn-cards-module') {  //клик по функции "КАРТОЧКИ"
                    that.defaultController(event);
                    that.gameCardsModule();
                }

                if (event.target && event.target.id === 'game-card') {  //клик по самой карточке, для отображение перевода слова
                    that.defaultController(event);
                    that.changeWordFromCard(event.target);
                }

                if (event.target && (event.target.id === 'btn-next-card' || event.target.classList.contains('double-right'))) {  //клик по стрелке, для показа следующего термина
                    that.defaultController(event);
                    if (!event.target.closest('button[disabled]')) { //проверка на наличие родителя с задизейбл кнопкой
                        that.nextWordFromCard();
                    }
                }


                if (event.target && (event.target.id === 'btn-prev-card' || event.target.classList.contains('double-left'))) {  //клик по стрелке, для показа предыдущего термина
                    that.defaultController(event);
                    if (!event.target.closest('button[disabled]')) { //проверка на наличие родителя с задизейбл кнопкой
                        that.prevWordFromCard();
                    }
                }

                if (event.target && event.target.id === 'btn-dragn-drop-module') {  //клик по функции "ПЕРЕТЯГИВАНИЕ"
                    that.defaultController(event);
                    that.gameDragnDropModule();
                }

                if (event.target && event.target.id === 'btn-write-module') {  //клик по функции "ПИСЬМО"
                    that.defaultController(event);
                    that.gameWriteModule();
                }

                if (event.target && event.target.id === 'check-write-module') {  //клик по проверить в функции "ПИСЬМО"
                    that.defaultController(event);
                    that.gameCheckWriteModule();
                }

                if (event.target && event.target.id === 'btn-test-module') {  //клик по функции "ТЕСТ"
                    that.defaultController(event);
                    that.gameTestModule();
                }

                if (event.target && event.target.id === 'check-test-module') {  //клик по проверить в функции "ТЕСТ"
                    that.defaultController(event);
                    that.checkTestModule();
            }
                
            });
        },

            this.defaultController = function (event) { //отключает действие по умолчанию и всплытие
                event.preventDefault();
                event.stopPropagation();
            }

        this.showAuthorizationPage = function () {
            myAppModel.showAuthorizationPage();
        }

        this.showFormSignIn = function () { // вызов модели по открытию формы для входа
            myAppModel.showFormSignIn();
        }

        this.showFormSignUp = function () { //вызов модели по открытию формы для регистрации
            myAppModel.showFormSignUp();
        }

        this.checkSignUpUser = function () { //логика для регистрации
            const signUpName = document.getElementById('sign-up-name');
            const signUpEmail = document.getElementById('sign-up-email');
            const signUpPassword = document.getElementById('sign-up-password');
            if (signUpEmail.value, signUpPassword.value, signUpName.value) {
                that.userDataUp.email = signUpEmail.value;
                that.userDataUp.password = signUpPassword.value;
                that.userDataUp.name = signUpName.value;
                window.location = '#start-page-up';
            } else {
                myAppModel.signUserError()
            }
        }

        this.signUpUser = function () {
            myAppModel.signUpUser(that.userDataUp.email, that.userDataUp.password, that.userDataUp.name)
        }

        this.checkSignInUser = function () { //логика для входа
            const signInEmail = document.getElementById('sign-in-login');
            const signInPassword = document.getElementById('sign-in-password');
            if (signInEmail.value, signInPassword.value) {
                that.userDataIn.email = signInEmail.value;
                that.userDataIn.password = signInPassword.value;
                window.location = '#start-page-in';
            } else {
                myAppModel.signUserError()
            }
        }

        this.signInUser = function () {
            myAppModel.signInUser(that.userDataIn.email, that.userDataIn.password)
        }

        this.checkProccedModule = function () { //проверка на содержание числа в поле ввода, для создания модуля
            const count = document.getElementById('enter-quantity-words');
            if (count.value && parseInt(count.value) && count.value > 5) {
                that.moduleData.coundWord = count.value;
                location.hash = '#create-module'
            } else {
                myAppModel.proccedModuleError();
            }
        }

        this.proccedModule = function () {
            myAppModel.proccedModule(that.moduleData.coundWord);
        }

        this.checkCreateModule = function () { //получение данных из инпутов в форме для создания модуля и передача в виде объекта в создание модуля
            let terms = document.querySelectorAll('.text-module-term'),
                definitions = document.querySelectorAll('.text-module-definition'),
                name = document.getElementById('name-module');
            for (let elem of terms) {
                if (elem.value) {
                    this.moduleData.terms.push(elem.value);
                } else {
                    this.moduleData.terms = [];
                    this.moduleData.definitions = [];
                    myAppModel.createModuleError();
                }
            }
            for (let elem of definitions) {
                if (elem.value) {
                    this.moduleData.definitions.push(elem.value);
                } else {
                    this.moduleData.terms = [];
                    this.moduleData.definitions = [];
                    myAppModel.createModuleError();
                }
            }
            if (name.value && this.moduleData.terms.length > 0 && this.moduleData.definitions.length > 0) {
                this.moduleData.nameModule = name.value;
                location.hash = '#page-with-module'
            } else {
                myAppModel.createModuleError();
            }
            console.log(this.moduleData)
        }

        this.createModule = function () { //создание учебного модуля с получением созданного объекта
            myAppModel.createModule({
                name: this.moduleData.nameModule,
                terms: this.moduleData.terms,
                definitions: this.moduleData.definitions
            });
            this.moduleData.nameModule = null;
            this.moduleData.terms = [];
            this.moduleData.definitions = [];
        }

        this.comeBackStartPage = function () { //возвращение на стартовую страницу
            myAppModel.comeBackStartPage();
        }


        this.gameCardsModule = function () { //передача данных для демонстрации карточки
            myAppModel.gameCardsModule(that.gameCards.option, that.gameCards.number);
        }

        this.changeWordFromCard = function (e) { //по клику на саму карточку отображается перевод
            if (that.gameCards.option === 'term') {
                that.gameCards.option = 'definition';
            } else if (that.gameCards.option === 'definition') {
                that.gameCards.option = 'term';
            }
            myAppModel.gameCardsModule(that.gameCards.option, that.gameCards.number, e);
        }

        this.nextWordFromCard = function () { //следующая карточка начинается с изучаемого языка
            that.gameCards.option = 'term';
            that.gameCards.number += 1;
            myAppModel.gameCardsModule(that.gameCards.option, that.gameCards.number);
        }

        this.prevWordFromCard = function () { //предыдущая карточка демонстрируется с изучаемого языка
            that.gameCards.option = 'term';
            that.gameCards.number -= 1;
            myAppModel.gameCardsModule(that.gameCards.option, that.gameCards.number);
        }

        this.gameDragnDropModule = function () { //dragn-drop
            let card = null;
            myAppModel.gameDragnDropModule();
            let listCards = document.querySelectorAll('.dragn-drop-container div');
            for (let item of listCards) {
                that.gameDragnDrop.dragCards.push(item);
            }

            for (let item of that.gameDragnDrop.dragCards) {
                item.addEventListener('dragstart', function () {
                    card = item;
                    myAppModel.dragStart(this);
                });

                item.addEventListener('dragend', function () {
                    myAppModel.dragEnd(this);
                });

                item.addEventListener('dragover', function (e) {
                    e.preventDefault();
                });

                item.addEventListener('dragenter', function (e) {
                    e.preventDefault();
                    myAppModel.dragEnter(this);
                });

                item.addEventListener('dragleave', function () {
                    myAppModel.dragLeave(this);
                });

                item.addEventListener('drop', function () {
                    myAppModel.dragDrop(this, card);
                });
            }
        }

        this.gameWriteModule = function () { //функция письмо
            myAppModel.gameWriteModule(that.gameWrite.number);
        }

        this.gameCheckWriteModule = function() {
            that.gameWrite.number++;
            let answerWord = document.getElementById('game-write-answer');
            myAppModel.gameCheckWriteModule(answerWord.value, that.gameWrite.number);
        }

        this.gameTestModule = function () { //функция тест
            myAppModel.gameTestModule();
        }

        this.checkTestModule = function() { //проверка функции тест
            const dataTest = {
                answer: {atribut: [], value: []},
                selection: {atribut: [], value: []},
                option: {atribut: [], value: []}
            }
            const answers = document.querySelectorAll('.test-answer-container input');
            const selections = document.querySelectorAll('.test-selection-container-first input');
            const paragraphs = document.querySelectorAll('.test-selection-container-second p');
            const options = document.querySelectorAll('.test-options-container input:checked');
            const wordsRadio = document.querySelectorAll('.test-options-container span');
            for (let item of answers) {
                dataTest.answer.atribut.push(item.getAttribute('data-test-answer'));
                dataTest.answer.value.push(item.value);
            }

            for (let item of selections) {
                let val = item.value.toUpperCase();
                dataTest.selection.atribut.push(item.getAttribute('data-test-selection'));
                for (let elem of paragraphs) {
                    if (elem.getAttribute('data-selection-letter') === val) {
                        dataTest.selection.value.push(elem.getAttribute('data-selection-value'));
                    }
                }
            }

            for (let item of wordsRadio) {
                dataTest.option.atribut.push(item.getAttribute('data-test-options'));
            }

            for (let item of options) {
                dataTest.option.value.push(item.value);
            }
            myAppModel.checkTestModule(dataTest);
        }
    }

    return { //инициализация 
        init: function () {
            const app = document.getElementById('app');
            let myAppView = new AppView(),
                myAppModel = new AppModel(),
                myAppController = new AppController();

            myAppView.init(app);
            myAppModel.init(myAppView);
            myAppController.init(myAppModel);
        }
    };
})(); //принцип модуля

myApp.init();
