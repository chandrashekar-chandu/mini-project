const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String }, // Alias for name, used in API responses
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalProblems: { type: Number, default: 0 }, // Total problems in contest
}, { 
  timestamps: true,
  getters: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual to use name as title if title is not set
contestSchema.virtual('titleAlias').get(function() {
  return this.title || this.name;
});

const Contest = mongoose.model("Contest", contestSchema);
module.exports = Contest;