const mongoose = require("mongoose");
const schema = mongoose.Schema;
// create a new schema for the user class
const userSchema = new schema({
  firstname: String,
  lastname: String,
  gender: String,
  level: String,
  username: String,
  password: String,
});
//create the user model with  userschema as the configuration object
const user = mongoose.model("users", userSchema);
class User {
  constructor(firstname, lastname, gender, level, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.level = level;
    this.username = username;
    this.password = password;
  }

  fullName() {
    return this.firstname + " " + this.lastname;
  }

  login() {
    console.log(`${this.firstname} just logged in.`);
  }

  insert() {
    let document = new user(this);
    document.save((err, res) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log("Result: ", res);
      }
    });
  }

  static async getAll() {
  return await user.find();
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      users.findById(id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = User;
