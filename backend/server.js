import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
 import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import 'dotenv/config'

//app config
const app = express()
const port = process.env.PORT || 4000
//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))//it mounts uploads folder on /images path
 app.use("/api/user",userRouter)
 app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//It is a HTTP method : used to request for data to server 
app.get("/",(req,res)=>{
   res.send("API working")
})
/*app.post('/api/payment/webhook', (req, res) => {
    const webhookEvent = req.body;
    console.log('Webhook Event:', webhookEvent);
    if (webhookEvent.event_type === 'PAYMENT.SALE.COMPLETED') {
        console.log('Payment successful:', webhookEvent.resource);  
    }
    res.sendStatus(200);
});*/


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
    
})

