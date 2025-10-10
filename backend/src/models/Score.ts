import mongoose, { Schema, Document } from "mongoose";

export interface IScore extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  date: Date;
}

const ScoreSchema = new Schema<IScore>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Score", ScoreSchema);
