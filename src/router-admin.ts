import express from "express";
const routerAdmin = express.Router(); // we call Router method
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";


// Restaurant
routerAdmin.get("/", restaurantController.goHome); // get method, rooters are associated with endpoints/ endpoints-urls ./signUp
routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);

routerAdmin.get("/check-me", restaurantController.checkAuthSession);

// Product
routerAdmin.get("/product/all",restaurantController.verifyRestaurant, productController.getAllProducts);
routerAdmin.post('/product/create',
    restaurantController.verifyRestaurant,
    makeUploader('products').array('productImages', 5),
    productController.createNewProduct);

routerAdmin.post("/product/:id",restaurantController.verifyRestaurant, productController.UpdateChoosenProduct);
// User
export default routerAdmin;