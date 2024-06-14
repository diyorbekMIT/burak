import express from "express";
const routerAdmin = express.Router(); // we call Router method
import restaurantController from "./controllers/restaurant.controller";
// Restaurant
routerAdmin.get("/", restaurantController.goHome); // get method, rooters are associated with endpoints/ endpoints-urls ./signUp
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);
// Product
// User
export default routerAdmin;