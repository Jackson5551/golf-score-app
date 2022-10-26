import { Templates } from "./classes/Templates.js";

const appDiv = document.getElementById("app");

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
            new Templates('Home','bi-house','#/home').home(appDiv)
        }
    }, 
    {
        title: 'New Game',
        path: 'new-game',
        func: function(){
            new Templates('New Game','bi-arrow-left','#/new-game').newGame(appDiv)
        }
    },
    {
        title: 'Edit Players',
        path: 'edit-players',
        func: function(){
            new Templates('Edit Players','bi-arrow-left','#/edit-players').editPlayers(appDiv)
        }
    },
    {
        title: 'Edit Course',
        path: 'edit-course',
        func: function(){
            new Templates('Edit Course','bi-arrow-left','#/edit-course').editCourse(appDiv)
        }
    },
    {
        title: 'Game',
        path: 'game',
        func: function(){
            new Templates('Game','bi-arrow-back','#/game').game(appDiv)
        }
    },
    {
        title: 'Saved Scorecards',
        path: 'saved-scorecards',
        func: function(){
            new Templates('Saved Scorecards').viewScorecards(appDiv)
        }
    }

]

let routes = []
let templates = []

createTemplates(allPages, templates)

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
        console.log(route)
        // return routes[route];
        currentRoute.routeTo()
        return
    } catch (error) {
        console.log(error)
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