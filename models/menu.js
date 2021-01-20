const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const food = new Schema({
  name: String,
  price: String,
  category: String,
  img: String
  
  
});

const foodModel = new model("menu", food);
class Food {
  constructor(name, price, category, img = null,id = null) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.img = img;
    this.id = id;
  }
  async insert() {
    const document = new foodModel(this);
    return await document.save();
  }

  static async getAll() {
    let documents = await foodModel.find();
    documents.forEach((document, index, documents)=>{
      let food = new Food(document.name, document.price,document.category, document.img, document._id)
      documents.splice(index, 1, food);
    });
    return documents;
  }

  static async updateImage(id,image){
   return await foodModel.findByIdAndUpdate(id,{img: image});
  }

  static async getById(id){
    return await foodModel.findById(id);
  }
}

module.exports ={Food,  food, foodModel};
