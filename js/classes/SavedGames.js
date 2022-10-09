export class SavedGames{
    constructor(){
        this.games = []
    }
    add(game){
        this.games.push(game)
    }
    remove(game){
        this.games.forEach((saved, i)=>{
            if(saved === game){
                this.games.splice(i, 1)
            }
            i++
        })
    }
}