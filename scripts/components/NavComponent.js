const NavComponent = (name) => {
    let content ='';
    if (name) {
        content = `
    <div class="container-page-name"> 
        <i class="fas fa-user"></i>
        <span>${name}</span>
        <a class="btn-log-out" id="btn-log-out" href="#login-out">Выйти</a>
    </div>`;
    } 

    return (`<nav>
    <div class="container-page-logo"> 
        <i class="fas fa-bomb"></i>
        <a href="#start-page" class="page-logo">BOMB</a>
    </div>
    ${content}
    </nav>
    <section id ="main-content" class="main-content">
    </section>`)

};

export default NavComponent;

