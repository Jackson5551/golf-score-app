export class Player {
    constructor(name) {
        this.id = Date.now().toString()
        this.name = name
        this.scores = []
        this.status = true
    }
    setName(name){
        this.name = name
    }
    getScore(index){
        return this.scores[index].score
    }
    createScore(score){
        this.scores.push(score)
    }
    updateScore(newScore, index){
        this.scores[index] = newScore
    }
    isPlaying(){
        if(this.isPlaying){
            this.isPlaying = false
        } else {
            this.isPlaying = true
        }
    }
}

class Score{
    constructor(id, hole, tee){
        this.id = id
        this.hole = hole
        this.tee = tee
        this.score = 0
    }
}