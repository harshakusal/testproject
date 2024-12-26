import mongoose, { Schema, Document } from "mongoose";
import internal from "stream";

// Define the interface for a User document
interface IUser extends Document {
  first_name: string;
  last_name: string;
  phone_number:string;
  email:string

}

// Define the schema for User
const userSchema: Schema<IUser> = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true, unique: true },
  phone_number:{ type: String, required: true },
  email:{ type: String, required: true},
});

// Create the model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
