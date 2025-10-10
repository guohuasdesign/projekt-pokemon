import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  // We only keep a reference here — the actual auth service may manage users.
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
});

export default mongoose.model("User", UserSchema);
