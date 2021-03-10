const UserComponent = (name, data) => {
    let content = [];
if (data) {
    content.push(`<h3>Ваши созданные модули</h3>
    <div class="container-module">`)
    for (let key in data) {
       content.push(`<a id="${name.toLowerCase()}-${data[key].name}" class="user-cards" href="#card-${name.toLowerCase()}-${data[key].name}">${data[key].name}</a>`); 
    }
    content.push(`
    </div><a class="btn-make-module" id="btn-make-module" href="#choose-words">Создать новый модуль</a>`)
} else {
    content.push(`<h3>Создайте Ваш первый учебный модуль</h3>
    <a class="btn-make-module" id="btn-make-module" href="#choose-words">Создать</a>`);
}
let contentString = content.join(``);


    return (
        `<div class="page-with-module">
            ${contentString}
        </div>`
    )
};

export default UserComponent;
