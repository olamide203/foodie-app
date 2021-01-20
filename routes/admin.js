const express = require("express");
const router = express.Router();
const path = require("path");
const {Food} = require("../models/menu");
const Staff = require("../models/staff");
const Order = require("../models/order");

router
  .route("/menu")
  .get(async (req, res) => {
    try {
      let menu = await Food.getAll();
      res.render("admin/menu", { page: "admin-menu", menu: menu });
    } catch (error) {
      res.send(`Error: ${error}`);
    }
  })
  .post(async (req, res) => {
    let image = req.files.image;
    let name = req.body.name.trim().toLowerCase();
    let price = req.body.price.trim().toLowerCase();
    let category = req.body.category;
    let re = /^.*(\.(gif|jpg|png|jpeg))$/i;
    let mo = re.exec(image.name);
    const ext = mo[1];
    const food = new Food(name, price, category);
    try {
      let document = await food.insert();
      imageName = `${document._id}${ext}`;
      image.mv(path.join(__dirname, `../public/uploads/images/${imageName}`));
      Food.updateImage(document._id, imageName);
      res.redirect("/admin/menu");
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  });

router
  .route("/staff")
  .get(async (req, res) => {
    let employees = await Staff.getAll();
    res.render("admin/staff", { page: "admin", employees: employees });
  })
  .post(async (req, res) => {
    let firstname = `${req.body.firstname
        .slice(0, 1)
        .toUpperCase()}${req.body.firstname.slice(1).toLowerCase()}`,
      lastname = `${req.body.lastname
        .slice(0, 1)
        .toUpperCase()}${req.body.lastname.slice(1).toLowerCase()}`,
      password = req.body.password,
      username = req.body.username,
      address = req.body.address,
      phone = req.body.phone,
      image = req.files.avatar,
      re = /^.*(\.(jpg|jpeg|png|gif))$/i,
      mo = re.exec(image.name),
      ext = mo[1];
    console.log(image.name);
    const staff = new Staff(
      firstname,
      lastname,
      password,
      username,
      address,
      phone
    );
    try {
      const document = await staff.insert();
      const imageName = `${document._id}${ext}`;
      await Staff.updateImage(document._id, imageName);
      image.mv(path.join(__dirname, `../public/uploads/profiles/${imageName}`));
      res.redirect("/admin/staff");
    } catch (error) {
      res.send(`Error: ${error}`);
    }
  });

router.route("/orders").get(async (req, res) => {
  try {
    let orders = await Order.getAll();
    res.render("admin/orders", { page: "orders", orders: orders });
  } catch {
    res.send("something went wrong");
  }
}).post(async(req, res) =>{
  let id = req.body.id;
  let status = req.body.status;
  try {
    if (status && id) {
      if (Array.isArray(id)) {
        id.forEach(async(element) =>{
         await Order.updateStatus(element, status)
        })
      } else {
        await Order.updateStatus(id, status)
      }
      let orders = await Order.getAll();
      res.redirect("/admin/orders");
    } else {
      res.send(req.body);
    }
  } catch (error) {
    console.log(error);
  }
  
})
module.exports = router;
