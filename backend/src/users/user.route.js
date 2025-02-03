const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const validateUsername = await User.findOne({ username });
    if (validateUsername) {
      return res.status(400).send({ message: 'Username already register' });
    }
    const validateEmail = await User.findOne({ email });
    if (validateEmail) {
      return res.status(400).send({ message: 'email already register' });
    }
    const user = new User({ email, username, password });
    console.log('backend data', user);
    await user.save();
    res.status(201).send({ message: 'user registered successfull' });
  } catch (error) {
    console.log('error registered', error);
    res.status(500).send({ message: 'Error  registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('email', email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'email not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Password not match' });
    }

    const token = await generateToken(user._id);
    res.cookie('Cookies', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.status(201).send({
      message: 'user login successfull',
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    }); 
  } catch (error) {
    console.log('error login', error);
    res.status(500).send({ message: 'Error login user' });
  }
});

router.post('/logout', async (req, res, next) => {
  res.clearCookie('Cookies');
  res.status(200).send({ message: 'User logout Successfully' });
});

router.delete('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  const deleteUser = await User.findByIdAndDelete(id);
  if (!deleteUser) res.status(404).send({ message: 'User not found' });
  res.status(200).send({ message: 'User deleted successfully' });
});

router.get('/users', async (req, res) => {
  try {
    const user = await User.find({}, 'id email role').sort({ createdAt: -1 });
    res.status(200).send(user);
  } catch (error) {
    console.log('Error fetching user', error);
    res.send(500).send({ message: 'Error fetching user' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User successfully updated' });
  } catch (error) {
    console.log('Error in user updated', error);
    res.status(500).send({ message: 'Error updating user role' });
  }
});

router.patch('/edit-profile', async (req, res) => {
  const { userId, username, profession, profileImage, bio } = req.body;

  const user = await User.findById(userId);
  if (user) {
    res.status(404).send({ message: 'User not found' });
  }

  if (username !== undefined) return (user.username = username);
  if (profileImage !== undefined) return (user.profileImage = profileImage);
  if (bio !== undefined) return (user.bio = bio);
  if (profession !== undefined) return (user.profession = profession);

  await user.save();

  res.status(200).send({
    message: 'profile updated successfully',
    user: {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      profession: user.profession,
    },
  });
});

module.exports = router;
