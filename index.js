const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const connectMongodb = require('./database/mongodb.connect');

connectMongodb();


const userRouter = require('./controllers/user.controller');
app.use('/users', userRouter);


const profileRouter = require('./controllers/profile.controller');
app.use('/profiles', profileRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
