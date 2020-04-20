
let User = require('./User');

// The purpose of this "mini-controller" is to show how to use a dropdown select

class UserController {

     select(req, res) {
        res.render('selectUser', { users: User.all() });
     }

    showSelected(req, res) {
       let id = req.params.id;
        console.log("Input: ");
       console.log(req.body);

       let user = User.find(req.body.chosenUser);

       res.render('showUser', { user: user });
     }

     index(req, res) {
        let users = User.all();
        res.render('userIndex', { users: users });
    }

    show(req, res) {
         let id = req.params.id;
         let user = User.find(id);

        if (!user) {
           res.send("Could not find user with id of " + id);
        } else {
            res.render('userShow', { user: user });
       }
 
     }

     newUser(req, res) {
        res.render('userNew', { user: new User() });
    }

    create(req, res) {
        console.log("About to create user");
        console.log(req.body);
        let newUser = User.create(req.body.user);

        if (newUser.isValid()) {

            console.log("New user is valid: ");
            console.log(newUser);

            // Send a redirect to the "show" route for the new bug.
            res.writeHead(302, { 'Location': `/users/${newUser.id}` });
            res.end();
        } else {
            res.render('userNew', { user: newUser });
        }
    }


      edit(req, res) {
        let id = req.params.id;
        let user = User.find(id);

        if (!user) {
            res.send("Couldn't edit a user with id  " + id);
        } else {
            res.render('userEdit', { user: user });
        }
    }

     delete (req, res){
        let id = req.params.id;
        let user =  User.find(id);

        if (user.id == id) {
            User.allUsers = User.allUsers.filter(temp => temp.id !=user.id);
            res.render ('userDelete', {user: user});
        }else {
            res.send("Couldn't not find user with id of " + id);
        }
    }

     

     update(req, res) {
        let id = req.params.id;
        let user = User.find(id);

        let testUser = new User(req.body.User);
        if (!testUser.isValid()) {
            testUser.id = user.id;
            res.render('userEdit', { user: testUser });
            return;
        }

        if (!user) {
            res.send("Could not find user with id of " + id);
        } else {
            user.fname = req.body.user.fname;
            bug.lname = req.body.user.lname;
            user.email = req.body.user.email;
            user.thubnail = req.body.user.thubnail;
           

            // console.log("About to call user");
            // User.update(user);

            // Send a redirect to the "show" route for the new bug.
            res.writeHead(302, { 'Location': `/users/${user.id}` });
            res.end();
        }
    }

    
}

 

module.exports = UserController;