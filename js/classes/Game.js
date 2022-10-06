export class Game{
    constructor(course, players){
        this.id = Date.now().toString()
        this.course = course
        this.players = players
        this.status = true
    }
    addPlayer(player){
        this.players.push(player)
    }
    removePlayer(player){

    }
    setCourse(course){
        this.course = course
    }
    endGame(){
        this.status = false
    }
}