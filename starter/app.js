
const morgan=require('morgan');

const express=require('express');

const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');
///middlewares

const app=express();
//middleware express.json returns a function which is added to our middleware stack
if(process.env.NODE__ENV==='development')
{
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))
//custom function to middleware

app.use((req,res,next)=>{
    console.log('Hello form middleware 🥲');
    next();
});
app.use((req,res,next)=>{
    //console.log('Hello form middleware 🥲');
    req.requestTime=new Date().toISOString();

    next();
});


//end of middleware
//reading tours
//const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
///route handlers


///end of route functions


////******** routes */
//app.get('/api/v1/tours',getALLTours);
//for defining route for optional parameters replace id by :id?
//app.get('/api/v1/tours/:id',getTour);
//to create a new tour

//app.post('/api/v1/tours',createTour);
//////app.delete('/api/v1/tours/:id',deleteTour);
//app.patch('/api/v1/tours/:id',updateTour);
///

//routes

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
// starting server
module.exports=app;

