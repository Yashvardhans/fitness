
import User from "../models/user.js";


export const getUserData = async (req, res) => {
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isAdmin = user.role === 'admin'; 
      return res.status(200).json({user, isAdmin});
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phoneNumber } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password, phoneNumber },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Failed to update user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  };
  