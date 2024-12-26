import { Request, Response } from "express";
import User from "../models/userModel";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, phone_number, email } = req.body;
  console.log("reqqqqqq",req.body)

  // Check if email is provided and if a user already exists with that email
  if (email) {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
  }

  try {
    // Create a new user with the provided details
    const user = new User({ first_name, last_name, phone_number, email });
    await user.save(); // Save the user to the database

    // Respond with the created user
    return res.status(201).json(user);
  } catch (error) {
    // Handle any errors that occur during the save process
    return res.status(400).json({ message: "Error creating user", error });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log("users",users)
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, email } = req.body;
  console.log("reqqqqqq",req.body)

  try {
    const user = await User.findByIdAndUpdate(id, { first_name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    console.log("user",user)
    if (!user) {
      return res.status(404).json({ message: "User not found with the provided id" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
