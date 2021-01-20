const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const staff = new Schema({
  firstname: String,
  lastname: String,
  password: String,
  username: String,
  address: String,
  phone: String,
  avatar: String
});

const staffModel = new model("staff", staff);
class Staff {
  constructor(firstname, lastname, password, username, address, phone, avatar = null,id = null, ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.username = username;
    this.address = address;
    this.phone = phone;
    this.avatar = avatar;
    this.id = id;
  }

  async insert() {
    let document = new staffModel(this);
    return await document.save();
  }

  static async getAll() {
    let employees = await staffModel.find();
    employees.forEach((staff, index, employees) => {
      let employee = new Staff(staff.firstname, staff.lastname, staff.password, staff.username, staff.address, staff.phone, staff.avatar, staff._id);
      employees.splice(index, 1, employee);
    });
    return employees;
  }

  static async updateImage(id, image){
    return await staffModel.findByIdAndUpdate(id, {avatar: image});
  }
}

module.exports = Staff;
