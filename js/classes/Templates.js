import { Player } from "./Player.js"
import { Game } from "./Game.js"
import { SavedGames } from "./SavedGames.js"
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
        this.warningArea = document.querySelector('#warningArea')
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
        viewScorecardsBtn.href = '#/saved-scorecards'
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
            if(!game.course || game.players.length === 0){
                e.preventDefault()
                this.warningArea.innerHTML = ''
                this.warningArea.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show')
                const alertContent = document.createElement('span')
                alertContent.innerHTML = 'You must add players and select a course!'
                const alertBtn = document.createElement('button')
                alertBtn.className = 'btn-close'
                alertBtn.ariaLabel = 'Close'
                alertBtn.addEventListener('click', () => {
                    this.warningArea.innerHTML = ''
                    this.warningArea.classList.remove('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show')
                })
                this.warningArea.appendChild(alertContent)
                this.warningArea.appendChild(alertBtn)
            }
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
                this.warningArea.innerHTML = ''
                this.warningArea.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show')
                const alertContent = document.createElement('span')
                alertContent.innerHTML = 'You can only have up to 4 players!'
                const alertBtn = document.createElement('button')
                alertBtn.className = 'btn-close'
                alertBtn.ariaLabel='Close'
                alertBtn.addEventListener('click', ()=>{
                    this.warningArea.innerHTML = ''
                    this.warningArea.classList.remove('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show')
                })
                this.warningArea.appendChild(alertContent)
                this.warningArea.appendChild(alertBtn)
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
        const courseData = storageHandler.fetchCachedCourseData()
        this.titleText.innerHTML = this.title

        let updateScoreMarker = function(element, scores){
            let total = 0
            scores.forEach(score=>{
                total = total + score.score
            })
            element.innerHTML = total
        }
        let renderCards = async function () {
            let currentGame = storageHandler.fetchGame()
            const loadingSpinner = document.createElement('div')
            loadingSpinner.className = 'spinner-border text-success align-self-center'
            loadingSpinner.role = 'status'
            const spinner = document.createElement('span')
            spinner.className = 'visually-hidden'
            loadingSpinner.appendChild(spinner)
            loadingSpinner.style.display = 'flex'
            appDiv.appendChild(loadingSpinner)
            const courseData = await storageHandler.fetchCachedCourseData()
            loadingSpinner.style.display = 'none'
            console.log('Current Game: ', currentGame)
            const courseTitle = document.createElement('h1')
            courseTitle.innerHTML = currentGame.course.name
            appDiv.appendChild(courseTitle)

            currentGame.players.forEach(player => {
                const out = document.createElement('li')
                out.className = 'card-footer fs-1 d-flex justify-content-between'
                const outLabel = document.createElement('span')
                outLabel.innerHTML = 'OUT: '
                const outScore = document.createElement('span')
                outScore.innerHTML = 0
                out.appendChild(outLabel)
                out.appendChild(outScore)

                const in_ = document.createElement('li')
                in_.className = 'card-footer fs-1 d-flex justify-content-between'
                const inLabel = document.createElement('span')
                inLabel.innerHTML = 'IN: '
                const inScore = document.createElement('span')
                inScore.innerHTML = 0
                in_.appendChild(inLabel)
                in_.appendChild(inScore)

                console.log(player)
                const card = document.createElement('div')
                card.classList.add('card', 'mt-2', 'mb-2')
                const cardBody = document.createElement('div')
                cardBody.className = 'card-footer d-flex justify-content-between'
                const totalScoreLabel = document.createElement('span')
                totalScoreLabel.innerHTML = 'TOTAL: '
                const totalScore = document.createElement('span')
                totalScore.innerHTML = 0
                cardBody.appendChild(totalScoreLabel)
                cardBody.appendChild(totalScore)
                const cardHeader = document.createElement('div')
                cardHeader.className = 'card-header'
                const cardTitle = document.createElement('h5')
                cardTitle.classList.add('card-title')
                cardTitle.innerHTML = `<h4>${player.name}</h4>`
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
                    holeLi.innerHTML = `<strong><h5>Hole ${hole.hole}</h5></strong>Yardage: ${hole.teeBoxes[currentGame.tee].yards} | Par: ${hole.teeBoxes[currentGame.tee].par} | Handicap: ${hole.teeBoxes[currentGame.tee].hcp}`
                    holeLi.appendChild(holeInput)

                    holeInput.value = player.scores[i].score
                    // holeInput.value = player.getScore(i)
                    holeInput.addEventListener('blur',()=>{
                        if(parseInt(holeInput.value) || holeInput.value === '0'){
                            // game = storageHandler.fetchGame()
                            storageHandler.save(currentGame)
                            player.scores[i-1].score = +holeInput.value
                            storageHandler.save(currentGame)
                            holeInput.value = player.scores[i-1].score
                            console.log(currentGame)
                            let outScores = player.scores.slice(0,8)
                            let inScores = player.scores.slice(8,18)
                            updateScoreMarker(outScore, outScores)
                            updateScoreMarker(inScore, inScores)
                            updateScoreMarker(totalScore, player.scores)
                        } else {
                            holeInput.value = player.scores[i-1].score
                        }
                    })

                    playerScores.appendChild(holeLi)
                    i++

                })
                card.appendChild(cardHeader)
                card.appendChild(cardBody)
                cardHeader.appendChild(cardTitle)


                playerScores.insertBefore(out, playerScores.children[8])

                playerScores.insertBefore(in_, playerScores.children[19])


                let isOpen = false
                cardTitle.addEventListener('click', e => {
                    if (isOpen) {
                        card.removeChild(playerScores)
                        isOpen = false
                    } else {
                        card.appendChild(playerScores)
                        isOpen = true
                    }
                })

                appDiv.appendChild(card)
            })

            const endGameBtn = document.createElement('a')
            endGameBtn.href = '#/saved-scorecards'
            endGameBtn.className = 'btn btn-success mt-2 mb-2'
            endGameBtn.innerHTML = 'End Game'
            endGameBtn.addEventListener('click', ()=>{
                let gameToEnd = storageHandler.fetchGame()
                storageHandler.setSavedScorecards(gameToEnd)
            })
            appDiv.appendChild(endGameBtn)
        }
        const courseTeeSelector = document.createElement('div')
        courseTeeSelector.className = 'input-group'
        const selector = document.createElement('select')
        // selector.type = 'select'
        selector.className = 'form-select'
        selector.id = 'floatingSelect'
        const label = document.createElement('label')
        label.htmlFor = 'floatingSelect'
        label.innerHTML = 'Please Select a Tee'
        courseTeeSelector.appendChild(selector)
        courseTeeSelector.appendChild(label)
        appDiv.appendChild(courseTeeSelector)
        const defaultSelectOption = document.createElement('option')
        defaultSelectOption.innerText = 'Select a Tee'
        selector.appendChild(defaultSelectOption)
        courseData.data.holes[0].teeBoxes.forEach((tee,i) => {
            const teeOption = document.createElement('option')
            // teeOption.value = tee.teeTypeId
            teeOption.value = i
            teeOption.innerText = tee.teeType
            selector.appendChild(teeOption)
            i++
        })
        selector.addEventListener('change', () => {
            selector.style.display = 'none'
            label.style.display = 'none'
            game.tee = selector.value
            storageHandler.save(game)
            renderCards()
        })
        appDiv.appendChild(selector)

    }
    viewScorecards(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/home'
        this.backBtn.firstChild.className = 'align-self-center bi bi-arrow-left fs-1'
        // this.backBtn.firstChild.classList.add('bi', 'bi-arrow-left')
        this.titleText.innerHTML = this.title
        const getSavedScorecards = storageHandler.fetchSavedScorecards()
        const savedGamesUl = document.createElement('div')
        savedGamesUl.className = 'list-group'
        getSavedScorecards.games.forEach(game =>{
            const savedGameCard = document.createElement('a')
            savedGameCard.className = 'list-group-item list-group-item-action'
            const savedGameCardHeader = document.createElement('div')
            savedGameCardHeader.className = 'd-flex justify-content-between'
            const savedGameCardTitle = document.createElement('h5')
            savedGameCardTitle.className = 'mb-1'
            savedGameCardTitle.innerHTML = game.course.name
            const small1 = document.createElement('small')
            let gameDate = new Date(game.id)
            small1.innerHTML = gameDate.toLocaleDateString('en-US')
            savedGameCardHeader.appendChild(savedGameCardTitle)
            savedGameCardHeader.appendChild(small1)
            savedGameCard.appendChild(savedGameCardHeader)
            const p = document.createElement('p')
            p.className = 'mb-1'
            game.players.forEach(player=>{
                p.innerHTML = p.innerHTML + `${player.name} `
            })
            const small2 = document.createElement('small')
            savedGameCard.appendChild(p)
            savedGameCard.appendChild(small2)

            savedGamesUl.appendChild(savedGameCard)
        })
        appDiv.appendChild(savedGamesUl)
    }
    viewCard(appDiv) {
        
    }
}