const express = require("express");
const router = express.Router();
const User = require("../models/users");
const path = require("path");
const Food = require("../models/menu");
const Order = require("../models/order");
const Staff = require("../models/staff");

router.get("/", (req, res) => {
  res.render("pages/index", { page: "home" });
});

router
  .route("/login")
  .get((req, res) => {
    res.render("pages/login", { page: "login" });
  })
  .post(async(req, res) => {
    console.log(req.body);
    // return res.send(req.body);
    let login = await Staff.login(req.body.username, req.body.password);
    if (login){
      if (login.rootAccess){
        req.session.rootAccess = true;
      }else{
        req.session.staff = login;
      }
    }

    res.redirect("/admin/menu");
    // res.render("pages/index", { page: "home" });
  });

router
  .route("/order")
  .get(async(req, res) => {
    const dishes = await Food.getAll();
    res.render("pages/order", { page: "order", dishes: dishes});
  })
  .post(async(req, res) => {
    let name = req.body.name.trim().toLowerCase()
        email = req.body.email
        phone = req.body.phone.trim()
        food_id = req.body.food
        address = req.body.address;
    try {
      const order = new Order(food_id, name, address, email, phone);
      order.insert();
      res.send("Thank you, your order has been taken")
    } catch (error) {
      console.log(error);
      res.send("something went wrong")
    }
  });

router.get("/menu", async(req, res) => {
  let menu = await Food.getAll();
  res.render("pages/menu", { page: "menu",menu: menu});
});

router.get("/user", async (req, res) => {
  try {
    let documents = await User.getAll()
    res.send(documents);
  } catch (error) {
    console.log(error);
    res.send(`Error`);
  }
});

router.get("/user/:id", (req, res) => {
  User.getById(req.params.id)
    .then((result) => res.send(result))
    .catch((error) => res.send("error"));
});

router.get("/404", (req,res) =>{
  res.render("pages/404", {page: "404"})
})
module.exports = router;
