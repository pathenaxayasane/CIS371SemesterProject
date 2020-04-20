const Bug = require('./Bug');
const BugDB = require('./MemoryBugDB');
const UserDb = require('./User')

//const ToyDB = require('./SqliteToyDB');

/* Demonstrates a simple implementation of standard CRUD operations */
class BugController {

    async index(req, res) {
        
        let bugs = await BugDB.allBugs();
        let users = await UserDb.all();

        for ( let i=0; i < bugs.length; i++) {
            
            let user = UserDb.find2(bugs[i].id);
            bugs[i].fname = user.fname;
            bugs[i].lname = user.lname;
        }
   
             res.render('bugIndex', { bugs: bugs, users: users});
    }

    async show(req, res) {
        let id = req.params.id;
        let bug = await BugDB.find(id);
      
        // let users = await UserDb.find(bug['user']);
        
        let user = UserDb.find2(bug.id);
            // console.log(user);
            bug.fname = user.fname;
            bug.lname = user.lname;
        res.render('bugShow', { bug: bug, user: user });

    }
        

    async home(req, res) {
        res.render('home', { bug: new Bug(), users: await UserDb.all() });
    }
    
    
    async newBug(req, res) {
        res.render('bugNew', { bug: new Bug(), users: await UserDb.all() });
    }

    async create(req, res) {
        console.log("About to create bug");
        console.log(req.body);
        let newBug = await BugDB.create(req.body.bug);


        if (newBug.isValid()) {

            // Send a redirect to the "show" route for the new bug.
            res.writeHead(302, { 'Location': `/bugs/${newBug.id}` });
            res.end();
        } else {
            res.render('bugNew', { bug: newBug });
        }
    }

    async edit(req, res) {
        let id = req.params.id;
        let bug = await BugDB.find(id);
        let users = await UserDb.all()
        

        for( let i=0; i < bug.length; i++) {
            let user = UserDb.find2(bug[i].id);
            bug[i].fname = user.fname;
            bug[i].lname = user.lname;
        }

            res.render('bugEdit', { bug: bug, users: users });
        }
    

    async delete (req, res){
        let id = req.params.id;
        let bug = await BugDB.find(id);

        if (bug.id == id) {
            BugDB.bugsList=BugDB.bugsList.filter(temp => temp.id !=bug.id);
            res.render ('bugDelete', {bug: bug});
        }else {
            res.send("Couldn't not find bug with id of " + id);
        }
    }

    async update(req, res) {

        
        let id = req.params.id;
        let bug = await BugDB.find(id);
        let users = await UserDb.all();
        

         let testBug = new Bug(req.body.Bug);
         if (!testBug.isValid()) {
            testBug.id = bug.id;
            res.render('bugEdit', { bug: testBug, users: users });
           return;
        }

        if (!bug) {
            res.send("Could not find bug with id of " + id);
        } else {
            bug.title = req.body.bug.title;
            bug.description = req.body.bug.description;
            bug.issue = req.body.bug.issue;
            bug.priority = req.body.bug.priority;
            bug.status = req.body.bug.status;

            console.log("About to call update");
            BugDB.update(bug);

            // Send a redirect to the "show" route for the new bug.
            res.redirect(`/bugs/${bug.id}`);
            // res.end();
        }
    }
}

module.exports = BugController;
