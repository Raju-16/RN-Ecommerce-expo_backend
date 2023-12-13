import cloudinary from "cloudinary";
import userModel from "../models/userModel.js";
import { getDataUri } from "../utils/features.js";

export const registerController = async (req, res) => {
  try {
    //check exisiting user
    const isUserExists = await userModel.findOne({ email: req.body.email });

    if (isUserExists) {
      return res.status(500).send({
        success: false,
        message: "email already taken",
      });
    }

    const user = await userModel.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Registeration Success, please login",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //checking password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    res.status(500).send({
      success: "false",
      message: "Error In Login Api",
      error: error.message,
    });
  }
};

// GET USER PROFILE
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Prfolie Fetched Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Profile API",
      error: error.message,
    });
  }
};

// LOGOUT
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout SUccessfully",
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In LOgout API",
      error: error.message,
    });
  }
};

// UPDATE USER PROFILE
export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;

    // validation + Update
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;

    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Profile Updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In update profile API",
      error,
    });
  }
};

// update user passsword
export const udpatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    //valdiation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }
    // old pass check
    const isMatch = await user.comparePassword(oldPassword);
    //validaytion
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In update password API",
      error,
    });
  }
};

// Update user profile photo
export const updateProfilePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    // file get from client photo
    const file = getDataUri(req.file);

    // delete prev image
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    // update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save func
    await user.save();

    res.status(200).send({
      success: true,
      message: "profile picture updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In update profile pic API",
      error,
      error1: error.message,
    });
  }
};
