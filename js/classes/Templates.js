import { Player } from "./Player.js"
import { Game } from "./Game.js"
import { SavedGames } from "./SavedGames.js"
import * as storageHandler from "../modules/storageHandler.js";
import * as apiHelper from "../modules/apiHelper.js"

let game = new Game

export class Templates {
    constructor(title, link, icon) {
        this.title = title
        this.link = link
        this.btnIcon = `${icon}`
        this.body = document.querySelector('body')
        this.backBtn = document.querySelector('#backBtn')
        this.titleText = document.querySelector('#titleText')
        this.warningArea = document.querySelector('#warningArea')
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
        newGameCardBody.className = 'card-body d-flex justify-content-between align-items-center'
        newGameCard.appendChild(newGameCardBody)
        const newGameCardTitle = document.createElement('h5')
        newGameCardTitle.className = 'card-title'
        newGameCardTitle.textContent = 'New Game'
        newGameCardBody.appendChild(newGameCardTitle)
        const newGameBtn = document.createElement('a')
        newGameBtn.className = 'btn btn-success align-self-stretch'
        newGameBtn.href = '#/new-game'
        newGameBtn.innerHTML = 'Create'
        newGameCardBody.appendChild(newGameBtn)

        const viewScorecardsCard = document.createElement('div')
        viewScorecardsCard.className = 'card mb-2'
        const viewScorecardsCardBody = document.createElement('div')
        viewScorecardsCardBody.className = 'card-body d-flex justify-content-between align-items-center'
        viewScorecardsCard.appendChild(viewScorecardsCardBody)
        const viewScorecardsCardTitle = document.createElement('h5')
        viewScorecardsCardTitle.className = 'card-title'
        viewScorecardsCardTitle.textContent = 'Saved Scorecards'
        viewScorecardsCardBody.appendChild(viewScorecardsCardTitle)
        const viewScorecardsBtn = document.createElement('a')
        viewScorecardsBtn.className = 'btn btn-success align-self-stretch'
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
        if (game.players.length === 0) {
            playersCardTitle.textContent = `No Players`
        } else {
            playersCardList.innerHTML = ''
            game.players.forEach(player => {
                const playersCardListItem = document.createElement('li')
                playersCardListItem.className = 'list-group-item'
                playersCardListItem.innerHTML = player.name
                playersCardList.appendChild(playersCardListItem)
            })
            playersCardTitle.textContent = `${game.players.length} Players`
        }
        const playersEditBtn = document.createElement('a')
        playersEditBtn.className = 'btn btn-primary mt-2'
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
            courseCardTitle.innerHTML = `Course: ${game.course.name}`
        }
        const address = document.createElement('h6')
        address.className = 'card-subtitle mb-2 text-muted'
        let courseData = storageHandler.fetchCachedCourseData()
        // address.innerHTML = courseData.data.addr1
        const courseEditBtn = document.createElement('a')
        courseEditBtn.className = 'btn btn-primary mt-2'
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
            if (!game.course || game.players.length === 0) {
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
            } else {
                storageHandler.save(game)
            }
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
        game.players.forEach(player => {
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

            playerName.addEventListener('blur', () => {
                playerName.disabled = true
                deleteBtn.disabled = false
                editBtn.className = 'btn btn-warning text-light'
                editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
                player.setName(playerName.value)
            })
            playerName.addEventListener('keypress', e => {
                if(e.key === 'Enter'){
                    playerName.disabled = true
                    deleteBtn.disabled = false
                    editBtn.className = 'btn btn-warning text-light'
                    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>'
                    player.setName(playerName.value)
                }
            })

            editBtn.addEventListener('click', () => {
                if (playerName.disabled === true) {
                    playerName.disabled = false
                    playerName.focus()
                    deleteBtn.disabled = true
                    editBtn.className = 'btn btn-success text-light'
                    editBtn.innerHTML = '<i class="bi bi-save-fill"></i>'
                }
            })

            deleteBtn.addEventListener('click', () => {
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
            if (game.players.length < 4 && playerName.trim() !== '') {
                game.addPlayer(newPlayer)
                console.log(game.players)
                playerNameInput.value = ''
                this.editPlayers(appDiv)
            } else {
                this.warningArea.innerHTML = ''
                this.warningArea.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show')
                const alertContent = document.createElement('span')
                alertContent.innerHTML = 'You can only have up to 4 players and names can\'t be blank!'
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
                // p.innerText = 'Address'

                a.appendChild(div)
                div.appendChild(h5)
                div.appendChild(small)
                // a.appendChild(p)

                container.appendChild(a)

                a.addEventListener('click', () => {
                    console.log(course.name)
                    game.course = course
                    console.log(game)
                    let getData = async function () {
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
        let currentGame = storageHandler.fetchGame()

        let updateScoreMarker = function (element, scores) {
            let total = 0
            scores.forEach(score => {
                total = total + score.score
            })
            element.innerHTML = total
        }
        let renderCards = async function () {
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
            courseTitle.innerHTML = currentGame.course.name + ' - ' + currentGame.teeName
            appDiv.appendChild(courseTitle)

            currentGame.players.forEach(player => {
                const out = document.createElement('li')
                out.className = 'card-footer fs-1 d-flex justify-content-between'
                const outLabel = document.createElement('span')
                outLabel.innerHTML = 'OUT: '
                const outScore = document.createElement('span')
                updateScoreMarker(outScore, player.scores.slice(0, 9))
                out.appendChild(outLabel)
                out.appendChild(outScore)

                const in_ = document.createElement('li')
                in_.className = 'card-footer fs-1 d-flex justify-content-between'
                const inLabel = document.createElement('span')
                inLabel.innerHTML = 'IN: '
                const inScore = document.createElement('span')
                updateScoreMarker(inScore, player.scores.slice(9, 19))
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
                updateScoreMarker(totalScore, player.scores)
                cardBody.appendChild(totalScoreLabel)
                cardBody.appendChild(totalScore)
                const cardHeader = document.createElement('div')
                cardHeader.className = 'card-header'
                const cardTitle = document.createElement('h5')
                cardTitle.classList.add('card-title')
                cardTitle.innerHTML = `<h4>${player.name}</h4>`
                const playerScores = document.createElement('ul')
                playerScores.classList.add('list-group', 'list-group-flush')
                courseData.data.holes.forEach((hole, i = 0) => {
                    let newScore = {
                        playerId: player.id,
                        hole: hole.hole,
                        score: 0
                    }
                    if (player.scores.length < 18) {
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
                    holeInput.addEventListener('blur', () => {
                        if (parseInt(holeInput.value) || holeInput.value === '0') {
                            // game = storageHandler.fetchGame()
                            storageHandler.save(currentGame)
                            player.scores[i - 1].score = +holeInput.value
                            storageHandler.save(currentGame)
                            holeInput.value = player.scores[i - 1].score
                            console.log(currentGame)
                            let outScores = player.scores.slice(0, 9)
                            let inScores = player.scores.slice(9, 19)
                            updateScoreMarker(outScore, outScores)
                            updateScoreMarker(inScore, inScores)
                            updateScoreMarker(totalScore, player.scores)
                        } else {
                            holeInput.value = player.scores[i - 1].score
                        }
                    })

                    playerScores.appendChild(holeLi)
                    i++

                })
                card.appendChild(cardHeader)
                card.appendChild(cardBody)
                cardHeader.appendChild(cardTitle)


                playerScores.insertBefore(out, playerScores.children[9])

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
            endGameBtn.className = 'btn btn-success btn-lg mt-2 mb-2'
            endGameBtn.innerHTML = 'End Game'
            endGameBtn.addEventListener('click', () => {
                let gameToEnd = storageHandler.fetchGame()
                storageHandler.setSavedScorecards(gameToEnd)
            })
            appDiv.appendChild(endGameBtn)
        }

        let renderTeeSelector = async function () {
            storageHandler.clearGame()
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
            courseData.data.holes[0].teeBoxes.forEach((tee, i) => {
                if (tee.teeType !== 'auto change location') {
                    const teeOption = document.createElement('option')
                    // teeOption.value = tee.teeTypeId
                    teeOption.value = i
                    teeOption.innerText = tee.teeType.toUpperCase()
                    selector.appendChild(teeOption)
                    i++
                }
            })
            selector.addEventListener('change', () => {
                selector.style.display = 'none'
                label.style.display = 'none'
                currentGame.tee = selector.value
                currentGame.teeName = selector.children[parseInt(currentGame.tee) + 1].textContent
                storageHandler.save(currentGame)
                renderCards()
            })
            appDiv.appendChild(selector)
        }
        if (currentGame.tee === null) {
            renderTeeSelector()
        } else {
            renderCards()
        }
    }
    viewScorecards(appDiv) {
        appDiv.innerHTML = ''
        this.backBtn.href = '#/home'
        this.backBtn.firstChild.className = 'align-self-center bi bi-arrow-left fs-1'
        // this.backBtn.firstChild.classList.add('bi', 'bi-arrow-left')
        this.titleText.innerHTML = this.title
        const getSavedScorecards = storageHandler.fetchSavedScorecards()

        getSavedScorecards.games.forEach(savedGame => {

            const savedGameCard = document.createElement('div')
            savedGameCard.className = 'card mb-2'
            const savedGameCardHeader = document.createElement('div')
            savedGameCardHeader.className = 'card-header'
            const savedGameCardBody = document.createElement('div')
            savedGameCardBody.className = 'card-body'
            const savedGameCardTitle = document.createElement('h5')
            savedGameCardTitle.className = 'card-title'
            savedGameCardTitle.innerHTML = savedGame.course.name + ` <small>(${savedGame.teeName})</small>`
            const savedGameCardSubtitle = document.createElement('h6')
            savedGameCardSubtitle.className = 'card-subtitle mb-2 text-muted'
            let gameDate = new Date(savedGame.id)
            savedGameCardSubtitle.innerHTML = gameDate.toLocaleDateString('en-US')
            const savedGameCardPlayerList = document.createElement('ul')
            savedGameCardPlayerList.className = 'list-group list-group-flush d-flex'
            savedGame.players.forEach(player => {
                let allScores = []
                
                player.scores.forEach(score =>{
                    allScores.push(score.score)
                })
                const sum = allScores.reduce((a, b) => a + b, 0)
                let playerIn = allScores.splice(9, 18)
                playerIn = playerIn.reduce((a, b) => a + b, 0)
                const playerLi = document.createElement('li')
                let playerOut = allScores.splice(0,9)
                playerOut = playerOut.reduce((a,b) => a + b, 0)

                // playerLi.className = 'list-group-item d-flex justify-content-between'
                playerLi.className = 'list-group-item'
                // playerLi.innerHTML = player.name + ' ' + sum
                const playerNameSpan = document.createElement('span')
                playerNameSpan.className = 'fs-5'
                playerNameSpan.innerHTML = player.name
                const playerScoreInfo = document.createElement('div')
                playerScoreInfo.className = 'd-flex justify-content-between'
                const playerOutSpan = document.createElement('span')
                playerOutSpan.className = 'fw-light'
                playerOutSpan.innerHTML = `OUT: ${playerOut}`
                const playerInSpan = document.createElement('span')
                playerInSpan.className = 'fw-light'
                playerInSpan.innerHTML = `IN: ${playerIn}`
                const playerTotalScoreSpan = document.createElement('span')
                playerTotalScoreSpan.className = 'fw-bold'
                playerTotalScoreSpan.innerHTML = `TOTAL: ${sum}`
                playerLi.appendChild(playerNameSpan)
                playerScoreInfo.appendChild(playerOutSpan)
                playerScoreInfo.appendChild(playerInSpan)
                playerScoreInfo.appendChild(playerTotalScoreSpan)
                playerLi.appendChild(playerScoreInfo)
                savedGameCardPlayerList.appendChild(playerLi)
            })
            const savedGameCardFooter = document.createElement('div')
            savedGameCardFooter.className = 'card-footer d-flex justify-content-center flex-column text-center'
            const savedGameCardDeleteBtn = document.createElement('a')
            savedGameCardDeleteBtn.className = 'btn btn-danger mt-2'
            savedGameCardDeleteBtn.innerHTML = 'Delete Scorecard'

            savedGameCardDeleteBtn.addEventListener('click', () => {
                const confirmationLabel = document.createElement('span')
                confirmationLabel.className = 'text-danger text-muted'
                confirmationLabel.innerHTML = 'Are you sure you want to delete this scorecard? <strong>This operation cannot be undone!</strong>'
                const confirmationBtnGroup = document.createElement('div')
                confirmationBtnGroup.className = 'btn-group mt-2'
                const cancelBtn = document.createElement('button')
                cancelBtn.className = 'btn btn-secondary'
                cancelBtn.innerHTML = 'Cancel'
                const deleteBtn = document.createElement('button')
                deleteBtn.className = 'btn btn-danger'
                deleteBtn.innerHTML = 'Delete'

                savedGameCardDeleteBtn.style.display = 'none'

                savedGameCardFooter.appendChild(confirmationLabel)
                savedGameCardFooter.appendChild(confirmationBtnGroup)
                confirmationBtnGroup.appendChild(cancelBtn)
                confirmationBtnGroup.appendChild(deleteBtn)

                cancelBtn.addEventListener('click', () => {
                    savedGameCardFooter.removeChild(confirmationLabel)
                    savedGameCardFooter.removeChild(confirmationBtnGroup)
                    confirmationBtnGroup.removeChild(cancelBtn)
                    confirmationBtnGroup.removeChild(deleteBtn)
                    savedGameCardDeleteBtn.style.display = 'block'
                })
                deleteBtn.addEventListener('click', () => {
                    storageHandler.removeSavedScorecard(savedGame)
                    this.viewScorecards(appDiv)
                })

            })

            savedGameCard.appendChild(savedGameCardHeader)
            savedGameCard.appendChild(savedGameCardBody)
            savedGameCardHeader.appendChild(savedGameCardTitle)
            savedGameCardHeader.appendChild(savedGameCardSubtitle)
            savedGameCardBody.appendChild(savedGameCardPlayerList)
            savedGameCard.appendChild(savedGameCardFooter)
            savedGameCardFooter.appendChild(savedGameCardDeleteBtn)
            appDiv.appendChild(savedGameCard)
        })
    }
}