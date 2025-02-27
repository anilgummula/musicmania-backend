const User = require('../models/user');

const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: "Profile loaded successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  };

const updateProfile = async (req, res) => {
    try {
      const { username, email,mobile } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { username, email, mobile },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: "Profile updation success", updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating profile' });
    }

  };


module.exports = {getProfile,updateProfile};