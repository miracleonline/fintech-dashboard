import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    investmentPreferences: {
      durationInMonths: { type: Number, min: 1 },
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      },
      investmentAmount: { type: Number, min: 0 },
      riskLevel: {
        type: String,
        enum: ["low", "medium", "high"],
      },
      investmentGoals: { type: String, trim: true },
      preferredSectors: { type: String, trim: true },
      horizon: {
        type: String,
        enum: ["short", "medium", "long"],
      },
    },
    assetPreferences: {
      selectedCryptos: [{ type: String, maxlength: 10 }],
      preferredFiatCurrencies: { type: String, trim: true },
      diversificationPreference: {
        type: String,
        enum: ["low", "medium", "high"],
      },
    },
    signalPreferences: {
      useCompanySignals: { type: Boolean, default: false },
      personalSignals: { type: String, trim: true },
    },
    notificationPreferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
