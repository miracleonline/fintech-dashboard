import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    purpose: {
      type: String,
      required: true,
      trim: true,
    },
    repaymentPeriod: {
      type: Number, // in months
      required: true,
    },
    employmentStatus: {
      type: String,
      enum: ["Employed", "Self-Employed", "Unemployed", "Student", "Other"],
      required: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    collateral: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    decisionNotes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

loanSchema.index({ user: 1, status: 1 });

export default mongoose.model("Loan", loanSchema);
