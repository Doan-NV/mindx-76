const express = require('express');
const { User } = require('./models/user.model');
const { createUser, findOneUser } = require('./services/user.service');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error:', error);
});
dotenv.config();
console.log(process.env.KEY);
const jwt = require('jsonwebtoken');
const { Animal } = require('./models/animal');
app.use(express.json());
// api create user
app.post('/create-user', async (req, res) => {
  console.log(req.body);
  // hash password 123456 ==> hash => adasdasdadlawdmlkanflo  pwijda, clkansc
  const user = await createUser(req.body);
  res.json(user);
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// create api login
app.post('/login', async (req, res) => {
  // get username and password from request
  const { username, password } = req.body; // 123456  asdasdasdasdasdaslkdaljfalsd

  // find user from database
  const userLogin = await findOneUser({ username, password });
  //  const matchingPass = await bcrypt.compare(password, userLogin.password);
  // const isPasswordMatch = userLogin.comparePassword(password);
  // if user exists
  if(userLogin) {
    // create payload
    const payload = {
      name: userLogin.name,
      age: userLogin.age,
      address: userLogin.address,
      phone: userLogin,
      _id: userLogin._id.toString(),
    }
    // create token
    const token = jwt.sign(payload, 'tokencuatao', { expiresIn: '1h' });
    // return token to client
    res.json({ token });
  } else {
    res.json({ message: 'Invalid username or password' });
  }
    
  // if user not exists
})


// api list animal 
app.get('/animals', async (req, res) => {
  // console.log(req.headers);
  // get token from request
  const tokenFormRequest = req.headers.authorization;
  const token = tokenFormRequest.split(' ')[1];
  // verify token: jwt.verify(token, 'secret-private');
  const payload = jwt.verify(token, 'tokencuatao');
  if(payload) {
    // get list animal from database
    const listAnimal = await Animal.find();
    return res.json(listAnimal);
  } else {
    return res.json({ message: 'Invalid token' });
  }
});

