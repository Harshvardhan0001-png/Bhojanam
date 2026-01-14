import express from "express";

import { addFood,listFood,removeFood } from "../controllers/foodController.js";

// image storing system
import multer from "multer"

//by Router => we can use get,delete,push,update method
const foodRouter = express.Router();


// image store engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{  //cb -> callback
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage}) // middleware

foodRouter.post("/add",upload.single("image"),addFood); 
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);




export default foodRouter;

