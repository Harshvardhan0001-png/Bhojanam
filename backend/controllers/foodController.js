
import foodModel from "../models/foodModel.js";


import fs from 'fs'


//add food item
const addFood = async (req,res) =>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
    console.log(req.file)

  let image_filename = req.file.filename;
  console.log("Uploaded image:", image_filename);
  const food = new foodModel({
       name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       category:req.body.category,
       image:image_filename
  })
  try {
    await food.save();// food item will be saved in db
    res.json({success:true,message:"food added"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error//addfood"})
    
  }
}
// all food list api
const listFood  = async(req,res) =>{
     try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
     }
}
// remove food item
const removeFood = async(req,res)=>{
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"error"})
  }
}
export {addFood,listFood,removeFood}

