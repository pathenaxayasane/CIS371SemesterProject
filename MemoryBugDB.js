let Bug = require('./Bug');


class MemoryBugDB {

    // In a "real" app, the methods below would be DB accesses, not just a references to a static array.
    static allBugs() {
        return this.bugsList;
    }

    static find(id) {
        return this.bugsList.find((item) => item.id == id);
    }

    static create(bugDescription) {
        let newBug = new Bug(bugDescription)
        if (newBug.isValid()) {
            newBug.id = this.bugsList.length + 1;
            this.bugsList.push(newBug);
        }
        return newBug;
    }

    static update(bug) {
        // Actually, we already modified the bug object.  There isn't anything that needs to be done here.
        // This method only exists to be consistent with the "real" DB class.
    }
}

MemoryBugDB.bugsList = [];
MemoryBugDB.create({id:1, user: 1, title: 'Validation not working', description: 'The title validation check is crashed', issue:'', priority:'high', status: 'open' });
MemoryBugDB.create({ id:2, user: 2, title: 'Styling Needed', description: 'Needs a different style', issue:'feature', priority:'high', status: 'open' });
MemoryBugDB.create({ id:3, user: 3, title: 'Needs Improvement', description: 'Be ready!', issue:'enhacment', priority:'high', status: 'closed' });
MemoryBugDB.create({ id:4, user: 4, title: 'Problem', description: 'Needs to be fixed', issue:'feature', priority:'high', status: 'open' });
console.log(MemoryBugDB.bugsList);

module.exports = MemoryBugDB;