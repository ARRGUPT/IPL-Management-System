import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    unique: true
    },
    name: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, "company name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Owner", ownerSchema);
