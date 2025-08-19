const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 5000;
app.use(express.json());

const userRouter = require("./Routes/UserRoutes");
app.use("/api/v1/users/", userRouter);

const authRouter = require("./Routes/AuthRoutes");
app.use("/api/v1/auth/", authRouter);

const postRouter = require("./Routes/PostRoutes");
app.use(postRouter);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('CONNECTED TO MONGODB');
}).catch((err) => {
    console.log('NOT CONNECTED TO MONGODB', err);
})

app.get("/", (req, res) => {
  res.send("Default pg");
});


app.listen(port, () => {
  console.log(`we are running on port ${port}`);
}) 

// http://localhost:5000/api/v1/auth/signin
// http://localhost:5000/api/v1/users/id/:id

//extra
//to create password without controller  
// app.post("/user", async(req, res) => {
//   try {
//     const user  = await User.create(req.body);
//     res.status(201).json({ user });
//   } catch (error) {
//     res.status(404).json({error});
//   }
//   // res.send("User pg");
//   // console.log(req.body.name) 
// });

// app.use("api/v1", userRouter) app.use("apiv1/route", userRouter)
// app.use("api/v2/route", userRouter)  for apis