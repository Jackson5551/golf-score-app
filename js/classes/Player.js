export class Player {
    constructor(name, scores) {
        this.id = Date.now().toString()
        this.name = name
        this.scores = scores
    }
    setName(name){
        this.name = name
    }
    updateScore(score){
        this.scores.push(score)
    }
}