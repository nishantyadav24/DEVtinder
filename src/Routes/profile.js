const express =require("express")
const { userAuth } = require("../middlewares/auth");
const user = require("../models/Users")
const profileRouter = express.Router()
const {validateEditProfileData} =require("../utils/validation")
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    res.send(req.user);
});



profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
  const validation = validateEditProfileData(req);

  if (!validation.isValid) {
      return res.status(400).json({
          message: validation.message,
          invalidFields: validation.invalidFields,
      });
  }

  try {
      const updates = req.body; // Fields to update
      const updatedUser = await user.findByIdAndUpdate(
          req.user._id,       // Use the authenticated user's ID
          updates,            // Apply updates
          { new: true, runValidators: true } // Return updated document and validate fields
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
          message: "Profile updated successfully!",
          user: updatedUser,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

const bcrypt = require("bcrypt"); // Import bcrypt for hashing

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body; // Extract passwords from request body

    // Check if the required fields are provided
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    // Compare current password with the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    req.user.password = hashedPassword; // Update the user's password
    await req.user.save(); // Save the updated user document

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});
 
module.exports = profileRouter