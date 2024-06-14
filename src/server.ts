import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function(){
      console.log(`The server is runnig successfully on port ${PORT}`)
    });
  })
  .catch((err) => {console.log("Error on connection MongoDB", err)}); 