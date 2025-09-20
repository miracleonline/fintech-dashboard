import Settings from "../models/Settings.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";

// GET current user's settings
export const getSettings = catchAsync(async (req, res) => {
  const settings = await Settings.findOne({ user: req.user._id });

  res.json({ success: true, settings });
});

// CREATE or UPDATE settings
export const upsertSettings = catchAsync(async (req, res) => {
  const updatedSettings = await Settings.findOneAndUpdate(
    { user: req.user._id },
    { ...req.body, user: req.user._id },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({ success: true, settings: updatedSettings });
});
