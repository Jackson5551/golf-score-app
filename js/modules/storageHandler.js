const LOCAL_STORAGE_KEY = 'golfScoreApp.currentGame'
let currentGame = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

export function save(game){
    console.log('Saving...')
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(game))
}

export function fetchGame(){
    console.log('Fetching...')
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
}

export function checkIfExists(){
    if(currentGame !== null){
        return true
    } else {
        return false
    }
}