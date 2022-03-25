
class Poll {
    constructor(description, added_by, created_at, finished_at, opt_a, opt_b, opt_c, id = null) {
        this.description = description;
        this.addedBy = added_by
        this.createdAt = created_at
        this.finishedAt = finished_at
        this.optA = opt_a
        this.optB = opt_b
        this.optC = opt_c
        this.id = id
    }

    
}

module.exports = Poll;