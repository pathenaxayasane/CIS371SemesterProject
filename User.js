class User {

    constructor(description) {
        // if description is null or undefined, we want to create an "empty" Bug object.
        if (description) {
            this.id = description.id;
            this.lname = description.lname;
            this.fname = description.fname;
            this.email = description.email;
            this.thunbnail = description.thunbnail;
        }
        this.errors = [];
    }

    isValid() {
        this.errors = [];
        if (!this.lname || this.lname.length < 0) {
            this.errors.push("The last name cannot be blank");
        }
        if (!this.fname || this.fname.length < 0) {
            this.errors.push("The first name cannot be blank");
        }
        // if (!this.email||this.email.match (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        //     this.errors.push("The User must have an email.");
        // }
        // if (!this.thunbnail || this.thunbnail.match ('.png', 'jpg', 'gif') || this.thunbnail.length > -1) {
        //     this.errors.push ("The has to have one of the extension .png, jpg, gif");
        // }
       
        return this.errors.length <= 0;
    }




    static all() {
        return User.allUsers;
    }

    static find(id) {
        return User.allUsers.find((item) => item.id == id)
    }

    // Example of "deconstructing" an object
    static find2(theId) {
        return User.allUsers.find(({ id }) => theId === id);
    }


    static create(userDescription) {
        let newUser = new User(userDescription)
        if (newUser.isValid()) {
            newUser.id = this.allUsers.length + 1;
            this.allUsers.push(newUser);
        }
    return newUser;
}
}


User.allUsers = [
new User({ id: 1, fname: 'I am the partying type'}),
new User({ id: 2, fname: 'I am the lone wolf'}),
new User({ id: 3, fname: 'I am an outsider '}),
new User({ id: 4, fname: 'I just like to be with friends and family'}),
];

module.exports = User;