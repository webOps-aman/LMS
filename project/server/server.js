import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';



//Initialize Express
const app = express();

//connect to the database
await connectDB()
await connectCloudinary()



//Middlewares
app.use(cors());
app.use(clerkMiddleware());



//Routes
app.get('/', (req, res) => res.send('api working'))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)




//PORT
const PORT = process.env.PORT || 5000;


//listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})