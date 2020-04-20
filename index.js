const express =require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import Routes
const authRoute = require('./routes/auth');
const GolfsRoute = require('./routes/Golfs');
const ManagersRoute = require('./routes/Managers');


dotenv.config();

//connect to DB 
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },
    () => console.log('connected to DB')
);
//middlewares

app.use(express.json());


//route middlewares
app.use('/api/user' , authRoute);
app.use('/api/golfs',GolfsRoute);
app.use('/api/golfs/manager',ManagersRoute);


app.listen(3000, () => console.log('server running'));