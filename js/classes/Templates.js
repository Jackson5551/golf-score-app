import { Player } from "./Player.js"
import { Game } from "./Game.js"

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
        editPlayerBtn.innerHTML = `<a href="#/edit-players" class="btn btn-primary mb-5">Edit Player</a>`
        const editCourseBtn = document.createElement('span')
        editCourseBtn.innerHTML = `<a href="#/edit-course" class="btn btn-primary mb-5">Edit Course</a>`
        const playBtn = document.createElement('span')
        playBtn.innerHTML = `<a href="#/game" class="btn btn-success mb-5">PLAY</a>`

        div.appendChild(editPlayerBtn)
        div.appendChild(editCourseBtn)
        div.appendChild(playBtn)

        appDiv.appendChild(div)
    }
    editPlayers(appDiv) { }
    editCourse(appDiv) {
        appDiv.innerHTML = ''
        const containerDiv = document.createElement('div')
        containerDiv.classList.add('container')
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')
        const colDiv = document.createElement('div')
        colDiv.classList.add('col-lg-12')
        const formGroupDiv = document.createElement('div')
        formGroupDiv.classList.add('form-group')
        const formLabel = document.createElement('label')
        formLabel.innerHTML = `Select Course`
        const form = document.createElement('form')
        form.classList.add('input-group', 'mt-2', 'd-flex')
        const input = document.createElement('input')
        input.type = 'select'
        input.classList.add('form-control')
        const selectBtn = document.createElement('button')
        selectBtn.type = 'submit'
        selectBtn.classList.add('btn', 'btn-primary')
        selectBtn.innerHTML = 'Play'

        containerDiv.appendChild(rowDiv)
        rowDiv.appendChild(colDiv)
        colDiv.appendChild(formGroupDiv)
        colDiv.appendChild(formLabel)
        formGroupDiv.appendChild(form)
        form.appendChild(input)
        form.appendChild(selectBtn)

        appDiv.appendChild(containerDiv)

        selectBtn.addEventListener('submit', e=>{
            e.preventDefault()
            
        })
    }
    game(appDiv) { }
    viewScorecards(appDiv) { }
    viewCard(appDiv) { }
}