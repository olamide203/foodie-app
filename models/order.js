const mongoose = require("mongoose");
const {food, foodModel} = require("./menu");

const { Schema, model } = mongoose;
const orderSchema = new Schema({
  food: {type: mongoose.Schema.Types.ObjectId, ref: foodModel},
  name: String,
  address: String,
  email: String,
  phone: String,
  date: {type: Date, default: Date.now},
  status: String,
});
const orderModel = new model("order", orderSchema);
class Order {
  static STATUS_PENDING = 1;
  static STATUS_DELIVERED = 2;
  static STATUS_CANCELED = 0;
  constructor(food, name, address,email, phone, status = Order.STATUS_PENDING, date = new Date(), id = null) {
    this.food = food,
    this.name = name,
    this.address = address,
    this.email = email,
    this.phone = phone,
    this.status = status;
    this.date = date,
    this.id = id;
  }

  async insert() {
    let document = new orderModel(this);
    return await document.save();
  }

  async update(){
    return await orderModel.findByIdAndUpdate(this.id, this);
  }
  get mealName(){
    food.getById(this.food.id).then((result) => {
      return result;
    }).catch((err) => {
      console.log(err);
    });
  }

  static async getAll() {
    let orders = await orderModel.find().populate("food");
    console.log(orders);    orders.forEach((order, index, orders) => {
      let a = new Order(order.food, order.name, order.address, order.email, order.phone, order.status, order.date, order.id);
      orders.splice(index, 1, a);
    });
    return orders;
  }

  static async updateFood(){
    await food.findByIdAndUpdate(this.food.id);
  }
  
  static async getById(id){
    return await orderModel.findById(id);
  }
}

module.exports = Order;
