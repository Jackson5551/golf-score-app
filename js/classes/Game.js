export class Game{
    constructor(course){
        this.id = Date.now().toString()
        this.course = course
        this.tee = 1
        this.players = []
        this.status = true
    }
    addPlayer(player){
        if(this.players.length < 4){
            this.players.push(player)
        } else {
            alert('You can only have up to 4 players!')
        }
    }
    removePlayer(playerId){
        this.players.forEach((player, i)=>{
            if(player.id === playerId){
                this.players.splice(i, 1)
            }
            i++
        })
    }
    setCourse(course){
        this.course = course
    }
    setTee(tee){
        this.tee = tee
    }
    endGame(){
        this.status = false
    }
}