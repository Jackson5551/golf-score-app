import { Player } from "./Player.js"
import { Game } from "./Game.js"
import * as apiHelper from "../modules/apiHelper.js"

let game = new Game;

export class Templates {
    constructor(title) {
        this.title = title
    }
    home(appDiv) {
        appDiv.innerHTML = ''
        const div = document.createElement('div')
        const newGameBtn = document.createElement('span')
        newGameBtn.innerHTML = `<a href="#/new-game">New Game</a>`
        const viewScorecardsBtn = document.createElement('span')
        viewScorecardsBtn.innerHTML = `<a href="#/saved-scorecards">Saved Scorecards</a>`

        div.appendChild(newGameBtn)
        div.appendChild(viewScorecardsBtn)

        appDiv.appendChild(div)
    }
    newGame(appDiv) {
        appDiv.innerHTML = ''
        const div = document.createElement('div')
        div.classList.add('d-flex', 'flex-column', 'justify-content-between', 'align-items-center')
        const editPlayerBtn = document.createElement('span')
        editPlayerBtn.innerHTML = `<a href="#/edit-players" class="btn btn-primary mb-5">Edit Players</a>`
        const editCourseBtn = document.createElement('span')
        editCourseBtn.innerHTML = `<a href="#/edit-course" class="btn btn-primary mb-5">Edit Course</a>`
        const gameInfo = document.createElement('span')
        const playerInfo = document.createElement('div')
        if(game.players.length === 0){
            playerInfo.innerHTML = 'No Players'
        } else {
            playerInfo.innerHTML = ''
            game.players.forEach(player => {
                const playerSpan = document.createElement('span')
                playerSpan.innerHTML = player.name
                playerInfo.appendChild(playerSpan)
            })
        }
        if(!game.course){
            gameInfo.innerHTML = 'No Course Selected'
        } else {
            gameInfo.innerHTML = `Course: ${game.course.name}`
        }
        const playBtn = document.createElement('span')
        playBtn.innerHTML = `<a href="#/game" class="btn btn-success mb-5">PLAY</a>`

        div.appendChild(editPlayerBtn)
        div.appendChild(editCourseBtn)
        div.appendChild(playerInfo)
        div.appendChild(gameInfo)
        div.appendChild(playBtn)

        appDiv.appendChild(div)
    }
    editPlayers(appDiv) {

    }
    editCourse(appDiv) {
        appDiv.innerHTML = ''
        let renderCards = async function () {
            await apiHelper.runOnLoad()
            const allCourses = apiHelper.courses
            console.log(allCourses)
            const container = document.createElement('div')
            container.classList.add('list-group')
            container.innerHTML = ''
            allCourses.forEach(course => {
                console.log(course.name)
                const a = document.createElement('a')
                a.href = '#/new-game'
                a.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start')
                const div = document.createElement('div')
                div.classList.add('d-flex', 'w-100', 'justify-content-between')
                const h5 = document.createElement('h5')
                h5.classList.add('mb-1')
                h5.innerHTML = course.name
                const small = document.createElement('small')
                small.innerHTML = ''
                const p = document.createElement('p')
                p.classList.add('mb-1')
                p.innerText = 'Address'

                a.appendChild(div)
                div.appendChild(h5)
                div.appendChild(small)
                a.appendChild(p)

                container.appendChild(a)

                a.addEventListener('click', () => {
                    console.log(course.name)
                    game.course = course
                    console.log(game)
                })
            })
            appDiv.innerHTML = ''
            appDiv.appendChild(container)
            console.log('Done')
        }
        renderCards()
    }
    game(appDiv) { }
    viewScorecards(appDiv) { }
    viewCard(appDiv) { }
}