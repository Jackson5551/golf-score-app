export class Player {
    constructor(name, scores) {
        this.id = Date.now().toString()
        this.name = name
        this.scores = scores
        this.status = true
    }
    setName(name){
        this.name = name
    }
    updateScore(score){
        this.scores.push(score)
    }
    isPlaying(){
        if(this.isPlaying){
            this.isPlaying = false
        } else {
            this.isPlaying = true
        }
    }
}