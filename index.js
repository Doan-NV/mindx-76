const express = require('express');
const { Animal } = require('./models/animal');
const app = express();
const port = 3000;
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error:', error);
});
const userRouter = require('./controllers/user.controller');
app.use('/users', userRouter);


// api create animal
app.post('/create-animal', async (req, res) => {
  // const { name, age, color, userId } = req.body;
  const dog = new Animal({
    name: 'Dog 1',
    age: 3,
    color: 'black',
    userId: new mongoose.Types.ObjectId('65e87ac425b8ec8f96299bf6'),
  })
  await dog.save();
  // const animal = new Animal({
  //   name,
  //   age,
  //   color,
  //   userId,
  // });
  // await animal.save();
  res.json(dog);
});

// get list animal 
app.get('/animals', async (req, res) => {
  const animals = await Animal.find().populate('userId').lean();
  res.json(animals);
});

// api update animal
app.put('/update-animal/:id', async (req, res) => {
  const { name, age, color, userId } = req.body;
  Animal.findByIdAndUpdate(req.params.id, {
    name,
    age,
    color,
    userId,
  }, { new: true });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
