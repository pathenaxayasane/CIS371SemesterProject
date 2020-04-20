class Bug {

    constructor(description) {
        // if description is null or undefined, we want to create an "empty" Bug object.
        if (description) {
            this.id = description.id;
            this.user = description.user;
            this.title = description.title;
            this.description = description.description;
            this.issue = description.issue;
            this.priority = description.priority;
            this.status = description.status
        }
        this.errors = [];
    }

    isValid() {
        this.errors = [];
        if (!this.title || this.title.length <= 2) {
            // this.errors.push("The name must contain at least three characters");
        }
        if (!this.description || this.description.length <= 0) {
            // this.errors.push("The Bug must have a description.");
        }
        if (!this.issue || this.issue.length <= 0) {
            // this.errors.push("The Bug must have an issue.");
        }

        // if (!this.Question1 == "Marvel Cinematic Universe") {
        //     this.errors.push("CORRECT");
        // }

        return this.errors.length <= 0;
    }
}



module.exports = Bug;