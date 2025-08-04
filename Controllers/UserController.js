const User = require('../Models/UserModel');

// const createUser = async (req, res) => {
//   try {
//     const newUser = new User(req.body); // Create a new User instance with data from request
//     const savedUser = await newUser.save(); // Save to MongoDB
//     res.status(201).json({users: savedUser}); // Respond with saved user    
//     // res.status(201).json(savedUser);
//   } catch (err) {
//     console.log('error creating user');
//     res.status(400).json({ error: err.message }); // Handle error
//   }
// };

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({usercount: users.length, users});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name }, "-name"); // Find user by name
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated); // Return updated user
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {getUsers, getUserByName, getUserById, updateUserById, deleteUserById};