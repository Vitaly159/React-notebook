import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'bodyParser';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);


app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;
app.listen(3001, () => {
  console.log(`app running on port 3001`)
});