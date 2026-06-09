import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Player name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    role: {
      type: String,
      required: [true, "Player role is required"],
      enum: {
        values: ["batsman", "bowler", "all-rounder", "wicket-keeper"],
        message:
          'Role must be: "batsman", "bowler", "all-rounder", "wicket-keeper"',
      },
      index: true,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalRuns: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSixes: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalFours: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalWickets: {
      type: Number,
      default: 0, 
      min: 0,
    },
    totalCatches: {
      type: Number,
      default: 0,
      min: 0,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Player", playerSchema);
