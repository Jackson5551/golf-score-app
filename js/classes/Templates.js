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
        // const div = document.createElement('div')
        // const newGameBtn = document.createElement('span')
        // newGameBtn.innerHTML = `<a href="#/new-game" class="btn btn-primary">New Game</a>`
        // const viewScorecardsBtn = document.createElement('span')
        // viewScorecardsBtn.innerHTML = `<a href="#/saved-scorecards" class="btn btn-primary">Saved Scorecards</a>`
        const div = document.createElement('div')
        const newGameCard = document.createElement('div')
        newGameCard.className = 'card mb-2'
        const newGameCardBody = document.createElement('div')
        newGameCardBody.className = 'card-body'
        newGameCard.appendChild(newGameCardBody)
        const newGameCardTitle = document.createElement('h5')
        newGameCardTitle.className = 'card-title'
        newGameCardTitle.textContent = 'New Game'
        newGameCardBody.appendChild(newGameCardTitle)
        const newGameBtn = document.createElement('a')
        newGameBtn.className = 'btn btn-primary'
        newGameBtn.href = '#/new-game'
        newGameBtn.innerHTML = 'Create'
        newGameCardBody.appendChild(newGameBtn)

        const viewScorecardsCard = document.createElement('div')
        viewScorecardsCard.className = 'card mb-2'
        const viewScorecardsCardBody = document.createElement('div')
        viewScorecardsCardBody.className = 'card-body'
        viewScorecardsCard.appendChild(viewScorecardsCardBody)
        const viewScorecardsCardTitle = document.createElement('h5')
        viewScorecardsCardTitle.className = 'card-title'
        viewScorecardsCardTitle.textContent = 'Saved Scorecards'
        viewScorecardsCardBody.appendChild(viewScorecardsCardTitle)
        const viewScorecardsBtn = document.createElement('a')
        viewScorecardsBtn.className = 'btn btn-primary'
        viewScorecardsBtn.href = '#/view-scorecards'
        viewScorecardsBtn.innerHTML = 'View'
        viewScorecardsCardBody.appendChild(viewScorecardsBtn)

        div.appendChild(newGameCard)
        div.appendChild(viewScorecardsCard)

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
        playerNameInput.maxLength = 8
        inputGroup.appendChild(playerNameInput)
        inputGroup.appendChild(addPlayerBtn)
        appDiv.appendChild(inputGroup)
        playerNameInput.focus()
        const playerList = document.createElement('ul')
        playerList.className = 'list-group'
        game.players.forEach(player =>{
            const playerLi = document.createElement('li')
            playerLi.className = 'list-group-item'

            const inputGroup = document.createElement('div')
            inputGroup.className = 'input-group'
            const playerName = document.createElement('input')
            playerName.type = 'text'
            playerName.className = 'form-control'
            playerName.value = player.name
            playerName.disabled = true
            playerName.maxLength = 8
            const editBtn = document.createElement('button')
            editBtn.className = 'btn btn-warning text-light'
            editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'btn btn-danger text-light'
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i>'

            playerName.addEventListener('blur', ()=>{
                playerName.disabled = true
                deleteBtn.disabled = false
                editBtn.className = 'btn btn-warning text-light'
                editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
                player.setName(playerName.value)
            })

            editBtn.addEventListener('click', ()=>{
                if(playerName.disabled === true){
                    playerName.disabled = false
                    playerName.focus()
                    deleteBtn.disabled = true
                    editBtn.className = 'btn btn-success text-light'
                    editBtn.innerHTML = '<i class="bi bi-save-fill"></i>'
                } else {
                    playerName.disabled = true
                    deleteBtn.disabled = false
                    editBtn.className = 'btn btn-warning text-light'
                    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
                    player.setName(playerName.value)
                }
            })

            deleteBtn.addEventListener('click', ()=>{
                game.removePlayer(player.id)
                this.editPlayers(appDiv)
            })

            inputGroup.appendChild(playerName)
            inputGroup.appendChild(editBtn)
            inputGroup.appendChild(deleteBtn)
            playerLi.appendChild(inputGroup)

            playerList.appendChild(playerLi)
        })
        appDiv.appendChild(playerList)
        inputGroup.addEventListener('submit', (e) => {
            e.preventDefault()
            const playerName = playerNameInput.value
            let newPlayer = new Player(playerName)
            if (game.players.length < 4) {
                game.addPlayer(newPlayer)
                console.log(game.players)
                playerNameInput.value = ''
                this.editPlayers(appDiv)
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
        const loadingSpinner = document.createElement('div')
        loadingSpinner.className = 'spinner-border text-success align-self-center'
        loadingSpinner.role = 'status'
        const spinner = document.createElement('span')
        spinner.className = 'visually-hidden'
        loadingSpinner.appendChild(spinner)
        loadingSpinner.style.display = 'flex'
        appDiv.appendChild(loadingSpinner)
        let renderCards = async function () {
            loadingSpinner.style.display = 'node'
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
                    let getData = async function (){
                        let data = await apiHelper.getCourseInfo(course.id)
                        storageHandler.cacheCourseData(data)
                    }
                    getData()
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
        const loadingSpinner = document.createElement('div')
        loadingSpinner.className = 'spinner-border text-success align-self-center'
        loadingSpinner.role = 'status'
        const spinner = document.createElement('span')
        spinner.className = 'visually-hidden'
        loadingSpinner.appendChild(spinner)
        loadingSpinner.style.display = 'flex'
        appDiv.appendChild(loadingSpinner)
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
            const courseData = await storageHandler.fetchCachedCourseData()
            loadingSpinner.style.display = 'none'
            console.log('Current Game: ', currentGame)
            const courseTitle = document.createElement('h1')
            courseTitle.innerHTML = currentGame.course.name
            appDiv.appendChild(courseTitle)
            const courseTeeSelector = document.createElement('div')
            courseTeeSelector.className = 'form-floating'
            const selector = document.createElement('select')
            selector.className = 'form-select'
            selector.id = 'floatingSelect'
            const label = document.createElement('label')
            label.htmlFor = 'floatingSelect'
            label.innerHTML = 'Please Select a Tee'
            courseTeeSelector.appendChild(selector)
            courseTeeSelector.appendChild(label)
            appDiv.appendChild(courseTeeSelector)
            courseData.data.holes[0].teeBoxes.forEach(tee =>{
                const teeOption = document.createElement('option')
                teeOption.value = tee.teeTypeId
                teeOption.innerText = tee.teeType
                selector.appendChild(teeOption)
            })
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
                courseData.data.holes.forEach((hole,i=0) => {
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
                    holeLi.innerHTML = `<strong>Hole ${hole.hole}</strong> | Par: ${hole.teeBoxes[0].par} | Handicap: ${hole.teeBoxes[0].hcp}`
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

                const out = document.createElement('li')
                out.className = 'list-group-item fs-1'
                out.innerHTML = `<span>OUT</span>`
                playerScores.insertBefore(out, playerScores.children[8])

                const in_ = document.createElement('li')
                in_.className = 'list-group-item fs-1'
                in_.innerHTML = `<span>IN</span>`
                playerScores.insertBefore(in_, playerScores.children[19])


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