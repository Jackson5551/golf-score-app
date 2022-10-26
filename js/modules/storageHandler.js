import { SavedGames } from "../classes/SavedGames.js"

const LOCAL_STORAGE_KEY = 'golfScoreApp.currentGame'
const COURSE_DATA_KEY = 'golfScoreApp.courseData'
const SAVED_SCORECARDS_KEY = 'golfScoreApp.savedScorecards'
let currentGame = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
let courseData = JSON.parse(localStorage.getItem(COURSE_DATA_KEY))
let savedGames = JSON.parse(localStorage.getItem(SAVED_SCORECARDS_KEY))

export function save(game){
    console.log('Saving...')
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(game))
}

export function fetchGame(){
    console.log('Fetching...')
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
}

export function clearGame(){
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

export function checkIfExists(){
    if(currentGame !== null){
        return true
    } else {
        return false
    }
}

export function cacheCourseData(course){
    console.log('Caching...')
    localStorage.setItem(COURSE_DATA_KEY, JSON.stringify(course))
}

export function fetchCachedCourseData(){
    console.log('Reading Cache...')
    return JSON.parse(localStorage.getItem(COURSE_DATA_KEY))
}

export function setSavedScorecards(game){
    if(!savedGames){
        let lsSavedGames = new SavedGames()
        lsSavedGames.add(game)
        localStorage.setItem(SAVED_SCORECARDS_KEY, JSON.stringify(lsSavedGames))
    } else {
        let lsSavedGames = JSON.parse(localStorage.getItem(SAVED_SCORECARDS_KEY))
        lsSavedGames.games.push(game)
        localStorage.setItem(SAVED_SCORECARDS_KEY, JSON.stringify(lsSavedGames))
    }
}

export function removeSavedScorecard(game){
    let lsSavedGames = JSON.parse(localStorage.getItem(SAVED_SCORECARDS_KEY))
    console.log(lsSavedGames)
    lsSavedGames.games.forEach((savedGame, i) => {
        if(savedGame.id === game.id){
            lsSavedGames.games.splice(i,1)
            localStorage.setItem(SAVED_SCORECARDS_KEY, JSON.stringify(lsSavedGames))
        }
        i++
    })
}

export function fetchSavedScorecards(){
    console.log('Fetching...')
    return JSON.parse(localStorage.getItem(SAVED_SCORECARDS_KEY))
}