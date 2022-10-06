// import { createTemplates } from "./modules/templates"

const appDiv = "app";

function createTemplates(pages, templateList) {
    let myDiv = document.getElementById(appDiv);
    let template = (name, templateFunction) => {
        return templates[name] = templateFunction;
    };
    pages.forEach(page => {
        template(page.toString(), () => {
            myDiv.innerHTML = ''
            const title = document.createElement('span')
            title.innerHTML = page.toString()
            const listPages = document.createElement('ul')
            allPages.forEach(page2=>{
                const liPage = document.createElement('li')
                liPage.innerHTML = `<a href="#/${page2}">${page2}</a>`
                listPages.appendChild(liPage)
            })
            myDiv.appendChild(title)
            return myDiv.appendChild(listPages)
        })
    });
}

function createPage(page){
    page.innerHTML = ''
}


let allPages = [
    'home',
    'new-game',
    'edit-players',
    'edit-course',
    'game',
    'saved-scorecards',
    'view-card'
]

let routes = {}
let templates = {}

createTemplates(allPages, templates)

let route = (path, template)=>{
    if (typeof template == "function") {
        return routes[path] = template;
    }
    else if (typeof template == "string") {
        return routes[path] = templates[template];
    }
    else {
        return;
    }
}

let resolveRoute = (route) => {
    try {
        return routes[route];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};

route('/', 'home');
route('/home', 'home');
route('/new-game', 'new-game');
route('/edit-players', 'edit-players');
route('/edit-course', 'edit-course');
route('/game', 'game');
route('/saved-scorecards', 'saved-scorecards');
route('/view-card', 'view-card');

let router = (evt) => {
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    routeResolved();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);