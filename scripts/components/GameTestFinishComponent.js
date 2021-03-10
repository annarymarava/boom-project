const GameTestFinishComponent = (result) => {
    let content;
    if (result ===100) {
        content = `<p class="big-text">Вы отлично усвоили модуль, ваш результат: 100%, поздравляем!</p>`
    } else if (result>50 && result <100) {
        content = `<p class="big-text">Вы хорошо усвоили модуль, ваш результат: ${result}%, попробуйте позаниматься еще!</p>`
    } else {
        content = `<p class="big-text">Вам стоит еще усердно поработать, ваш результат: ${result}%, попробуйте наши функции!</p>`
    }
    return (content)
};

export default GameTestFinishComponent;