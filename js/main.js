import { Templates } from "./classes/Templates.js";

const appDiv = document.getElementById("app");

// function createTemplates(pages, templateList) {
//     let myDiv = document.getElementById(appDiv);
//     let template = (name, templateFunction) => {
//         return templates[name] = templateFunction;
//     };
//     pages.forEach(page => {
//         template(page.toString(), () => {
//             myDiv.innerHTML = ''
//             const title = document.createElement('span')
//             title.innerHTML = page.toString()
//             const listPages = document.createElement('ul')
//             allPages.forEach(page2=>{
//                 const liPage = document.createElement('li')
//                 liPage.innerHTML = `<a href="#/${page2}">${page2}</a>`
//                 listPages.appendChild(liPage)
//             })
//             myDiv.appendChild(title)
//             return myDiv.appendChild(listPages)
//         })
//     });
// }

// function createPage(page){
//     page.innerHTML = ''
// }

function createTemplates(pages, templateList){
    let template = (name, templateFunction) => {
        return templates[name] = templateFunction;
    };
    pages.forEach(page => {
        template(page.title, page.func)
        templateList.push(template)
    });
}

const allPages = [
    {
        title: 'Home',
        path: 'home',
        func: function(){
            new Templates('Home').home(appDiv)
        }
    }, 
    {
        title: 'New Game',
        path: 'new-game',
        func: function(){
            new Templates('New Game').newGame(appDiv)
        }
    },
    {
        title: 'Edit Players',
        path: 'edit-players',
        func: function(){
            new Templates('Edit Players').editPlayers(appDiv)
        }
    },
    {
        title: 'Edit Course',
        path: 'edit-course',
        func: function(){
            new Templates('Edit Course').editCourse(appDiv)
        }
    },
    {
        title: 'Game',
        path: 'game',
        func: function(){
            new Templates('Game').game(appDiv)
        }
    },
    {
        title: 'Saved Scorecards',
        path: 'saved-scorecards',
        func: function(){
            new Templates('Saved Scorecards').viewScorecards(appDiv)
        }
    },
    {
        title: 'View Card',
        path: 'view-card',
        func: function(){
            new Templates('View Card').viewCard(appDiv)
        }
    }

]

let routes = []
let templates = []

createTemplates(allPages, templates)

// let route = (path, template)=>{
//     if (typeof template == "function") {
//         return routes[path] = template;
//     }
//     else if (typeof template == "string") {
//         return routes[path] = templates[template];
//     }
//     else {
//         return;
//     }
// }

function route(route, routeTo){
    let page = allPages.find(element => element.path === routeTo)
    let newRoute = {
        route: route,
        routeTo: page.func
    }
    routes.push(newRoute)
}

let resolveRoute = (route) => {
    try {
        // console.log(routes[route])
        let currentRoute = routes.find(element => element.route === route)
        console.log(currentRoute)
        // return routes[route];
        currentRoute.routeTo()
    } catch (error) {
        throw new Error("The route is not defined");
    }
};

// route('', 'home');
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
    // const routeResolved = resolveRoute(url);
    // routeResolved();
    resolveRoute(url);
};

console.log(routes)
console.log(templates)

window.addEventListener('load', router);
window.addEventListener('hashchange', router);