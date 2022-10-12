import { Player } from "./Player.js"
import { Game } from "./Game.js"
import * as storageHandler from "../modules/storageHandler.js";
import * as apiHelper from "../modules/apiHelper.js"

let game = new Game

export class Templates {
    constructor(title,link,icon) {
        this.title = title
        this.link = link
        this.btnIcon = `${icon}`
        this.body = document.querySelector('body')
        this.backBtn = document.querySelector('#backBtn')
        this.titleText = document.querySelector('#titleText')
    }   
    navBar(icon,link){
        const nav = document.createElement('nav')
        nav.classList.add('navbar','bg-success','text-light')
        const div = document.createElement('div')
        div.classList.add('container-fluid', 'justify-content-between')
        const backBtn = document.createElement('a')
        backBtn.classList.add('btn', 'btn-primary')
        backBtn.href = `#/${link}`
        backBtn.classList.add('btn', 'btn-success')
        const backBtnIcon = document.createElement('i')
        backBtnIcon.classList.add('bi',icon)
        backBtn.innerHTML = `<h1 class="bi ${icon.toString()}"></h1>`
        const pageTitle = document.createElement('h1')
        pageTitle.innerHTML = this.title

        nav.appendChild(div)
        div.appendChild(backBtn)
        div.appendChild(pageTitle)

        return nav
    }
    home(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/home'
        // this.backBtn.firstChild.className = 'd-flex justify-content-center align-items-center bi bi-house'
        this.backBtn.firstChild.className = 'align-self-center bi bi-house fs-1'
        // this.backBtn.firstChild.classList.add('bi', `bi-house`)
        this.titleText.innerHTML = this.title
        const div = document.createElement('div')
        const newGameBtn = document.createElement('span')
        newGameBtn.innerHTML = `<a href="#/new-game" class="btn btn-primary">New Game</a>`
        const viewScorecardsBtn = document.createElement('span')
        viewScorecardsBtn.innerHTML = `<a href="#/saved-scorecards" class="btn btn-primary">Saved Scorecards</a>`

        div.appendChild(newGameBtn)
        div.appendChild(viewScorecardsBtn)

        appDiv.appendChild(div)
    }
    newGame(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/home'
        this.backBtn.firstChild.className = 'align-self-center bi bi-arrow-left fs-1'
        // this.backBtn.firstChild.classList.add('bi', 'bi-arrow-left')
        this.titleText.innerHTML = this.title
        const playersCard = document.createElement('div')
        playersCard.className = 'card mb-2'
        const playersCardBody = document.createElement('div')
        playersCardBody.className = 'card-body'
        const playersCardTitle = document.createElement('h5')
        playersCardTitle.className = 'card-title'
        // playersCardTitle.textContent = `${game.players.length} Players`
        const playersCardList = document.createElement('ul')
        playersCardList.className = 'list-group list-group-flush'
        if(game.players.length === 0){
            playersCardTitle.textContent = `No Players`
        }else{
            playersCardList.innerHTML = ''
            game.players.forEach(player=>{
                const playersCardListItem = document.createElement('li')
                playersCardListItem.className = 'list-group-item'
                playersCardListItem.innerHTML = player.name
                playersCardList.appendChild(playersCardListItem)
            })
            playersCardTitle.textContent = `${game.players.length} Players`
        }
        const playersEditBtn = document.createElement('a')
        playersEditBtn.className = 'btn btn-primary'
        playersEditBtn.href = '#/edit-players'
        playersEditBtn.innerHTML = 'Edit'
        playersCard.appendChild(playersCardBody)
        playersCardBody.appendChild(playersCardTitle)
        playersCardBody.appendChild(playersCardList)
        playersCardBody.appendChild(playersEditBtn)

        const courseCard = document.createElement('div')
        courseCard.className = 'card mb-2'
        const courseCardBody = document.createElement('div')
        courseCardBody.className = 'card-body'
        const courseCardTitle = document.createElement('h5')
        courseCardTitle.className = 'card-title'
        if (!game.course) {
            courseCardTitle.innerHTML = 'No Course Selected'
        } else {
            courseCardTitle.innerHTML = `${game.course.name}`
        }
        const address = document.createElement('h6')
        address.className = 'card-subtitle mb-2 text-muted'
        address.innerHTML = 'Address'
        const courseEditBtn = document.createElement('a')
        courseEditBtn.className = 'btn btn-primary'
        courseEditBtn.href = '#/edit-course'
        courseEditBtn.innerHTML = 'Edit'
        courseCard.appendChild(courseCardBody)
        courseCardBody.appendChild(courseCardTitle)
        courseCardBody.appendChild(address)
        courseCardBody.appendChild(courseEditBtn)

        appDiv.appendChild(playersCard)
        appDiv.appendChild(courseCard)

        const playBtn = document.createElement('a')
        playBtn.href = '#/game'
        playBtn.className = 'btn btn-success btn-lg align-self-stretch'
        playBtn.innerText = 'PLAY!'
        appDiv.appendChild(playBtn)

        playBtn.addEventListener('click', e => {
            storageHandler.save(game)
        })
    }
    editPlayers(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/new-game'
        this.backBtn.firstChild.className = 'align-self-center bi bi-arrow-left fs-1'
        // this.backBtn.firstChild.classList.add('bi', 'bi-arrow-left')
        this.titleText.innerHTML = this.title
        const backBtn = document.createElement('a')
        backBtn.href = '#/new-game'
        const inputGroup = document.createElement('form')
        inputGroup.classList.add('input-group', 'mb-3')
        const addPlayerBtn = document.createElement('button')
        addPlayerBtn.classList.add('btn', 'btn-primary')
        addPlayerBtn.innerHTML = 'Add'
        addPlayerBtn.type = 'submit'
        const playerNameInput = document.createElement('input')
        playerNameInput.classList.add('form-control')
        inputGroup.appendChild(playerNameInput)
        inputGroup.appendChild(addPlayerBtn)
        appDiv.appendChild(inputGroup)

        inputGroup.addEventListener('submit', (e) => {
            e.preventDefault()
            const playerName = playerNameInput.value
            let newPlayer = new Player(playerName)
            if (game.players.length < 4) {
                game.addPlayer(newPlayer)
                console.log(game.players)
                playerNameInput.value = ''
            } else {

                alert('You can only have 4 players!')
            }
        })
    }
    editCourse(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/new-game'
        this.backBtn.firstChild.className = 'align-self-center bi bi-arrow-left fs-1'
        // this.backBtn.firstChild.classList.add('bi', 'bi-arrow-left')
        this.titleText.innerHTML = this.title
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
    game(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/new-game'
        this.backBtn.firstChild.className = 'align-self-center bi bi-arrow-left fs-1'
        // this.backBtn.firstChild.classList.add('bi', 'bi-arrow-left')
        this.titleText.innerHTML = this.title
        const loader = document.createElement('div')
        let getCourseData = async function (courseId) {
            const courseData = await apiHelper.getCourseInfo(courseId)
            // console.log(courseData.data.holes)
            const holes = courseData.data.holes
            // holes.forEach(hole => {
            //     console.log(hole.teeBoxes)
            // })
            // holes.forEach(hole=>{
            //     courseHoles.push(hole)
            // })
            return holes
        }
        let updateScoreMarker = function(element, score){
            element.innerHTML = score
        }
        let renderCards = async function () {
            let currentGame = storageHandler.fetchGame()
            const courseData = await getCourseData(currentGame.course.id)
            console.log('Current Game: ', currentGame)
            const courseTitle = document.createElement('h1')
            courseTitle.innerHTML = currentGame.course.name
            appDiv.appendChild(courseTitle)
            currentGame.players.forEach(player => {
                console.log(player)
                const card = document.createElement('div')
                card.classList.add('card', 'mt-2', 'mb-2')
                const cardBody = document.createElement('div')
                cardBody.classList.add('card-body')
                const cardTitle = document.createElement('h5')
                cardTitle.classList.add('card-title')
                cardTitle.innerHTML = player.name
                const playerScores = document.createElement('ul')
                playerScores.classList.add('list-group', 'list-group-flush')
                courseData.forEach((hole,i=0) => {
                    let newScore = {
                        playerId: player.id,
                        hole: hole.hole,
                        score: 0
                    }
                    if(player.scores.length < 18){
                        player.scores.push(newScore)
                        // player.createScore(newScore)
                    }
                    const holeLi = document.createElement('li')
                    const holeInput = document.createElement('input')
                    holeInput.type = 'text'
                    holeInput.classList.add('form-control')
                    holeLi.classList.add('list-group-item')
                    holeLi.innerHTML = `<strong>Hole ${hole.hole}</strong> | Par: 0`
                    holeLi.appendChild(holeInput)

                    holeInput.value = player.scores[i].score
                    // holeInput.value = player.getScore(i)
                    holeInput.addEventListener('blur',e=>{
                        if(parseInt(holeInput.value)){
                            // game = storageHandler.fetchGame()
                            storageHandler.save(currentGame)
                            player.scores[i-1].score = +holeInput.value
                            storageHandler.save(currentGame)
                            holeInput.value = player.scores[i-1].score
                            console.log(currentGame)
                        } else {
                            holeInput.value = player.scores[i-1].score
                        }
                    })

                    playerScores.appendChild(holeLi)
                    i++

                })
                card.appendChild(cardBody)
                cardBody.appendChild(cardTitle)

                let isOpen = false
                cardTitle.addEventListener('click', e => {
                    if (isOpen) {
                        cardBody.removeChild(playerScores)
                        isOpen = false
                    } else {
                        cardBody.appendChild(playerScores)
                        isOpen = true
                    }
                })

                appDiv.appendChild(card)
            })
        }
        renderCards()
    }
    viewScorecards(appDiv) { }
    viewCard(appDiv) { }
}