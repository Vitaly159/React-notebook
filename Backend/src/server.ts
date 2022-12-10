import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidations } from "./validations/register";
import { UserModel } from "./models/UserModel";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const startServer = () => {
  const PORT = process.env.PORT || 5000;
  try {
    mongoose
      .connect("mongodb://localhost:27017/test")
      .then((res) => console.log("connected"))
      .catch((err) => console.log('err'));
    app.listen(PORT, function () {
      UserModel.find().then((res) => console.log(res));
    });
  } catch (e) {
    console.log("error");
  }
};

startServer();

// get запрос------------------------------------
// app.get('/api/test', async (req,res)=> {
//   // const q = test.find().then((res)=>{return res}).then((res)=>{console.log(res);
//   // });
//   res.send({
//     q: await test.find().then((res)=>{return res})
//   })
// })

// post запрос------------------------------------
app.post(
  "/api/test",
  registerValidations,
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    UserModel.create({
      email: req.body.email,
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      password: req.body.password,
      password2: req.body.password2,
    }).then((user) => res.json(user));

    startServer();
  }
);

// put запрос------------------------------------
// app.put("/api/test/:_id", async (req: express.Request, res) => {
//   UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) => {
//     UserModel.findOne({ _id: req.params.id }).then((user) => {
//       res.send(user);
//     });
//   });
// });

//   const token = jwt.sign(
//    {
//      email: req.body.email,
//      fullname: req.body.fullname,
//      username: req.body.username,
//      password: req.body.password,
//    },
//    "12345"
//  );

//  res.json({
//     success: 'true',
//     token,
//  });
