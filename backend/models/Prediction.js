import { Schema, model } from "mongoose";

const predictionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    input: {
      type: Object,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
    user: {
      type: String,
      default: "anonymous",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

 
export default model("Prediction", predictionSchema);
