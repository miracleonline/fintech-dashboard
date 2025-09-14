import Beneficiary from "../models/Beneficiary.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";

// Create a new beneficiary
export const createBeneficiary = catchAsync(async (req, res) => {
  const { fullName, dateOfBirth, relationship, bankName, accountNumber } = req.body;

  const beneficiary = await Beneficiary.create({
    user: req.user._id,
    fullName,
    dateOfBirth,
    relationship,
    bankName,
    accountNumber,
  });

  res.status(201).json({ success: true, beneficiary });
});

// List beneficiaries (with optional status filter)
export const listBeneficiaries = catchAsync(async (req, res) => {
  const { status } = req.query;
  const filter = { user: req.user._id };
  if (status && ["Active", "Inactive"].includes(status)) {
    filter.status = status;
  }

  const beneficiaries = await Beneficiary.find(filter).sort({ createdAt: -1 });

  res.json({ success: true, beneficiaries });
});

// Update beneficiary
export const updateBeneficiary = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { fullName, dateOfBirth, relationship, bankName, accountNumber, status } = req.body;

  const beneficiary = await Beneficiary.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { fullName, dateOfBirth, relationship, bankName, accountNumber, status },
    { new: true, runValidators: true }
  );

  if (!beneficiary) throw new ApiError(404, "Beneficiary not found");

  res.json({ success: true, beneficiary });
});

// Delete beneficiary
export const deleteBeneficiary = catchAsync(async (req, res) => {
  const { id } = req.params;

  const beneficiary = await Beneficiary.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!beneficiary) throw new ApiError(404, "Beneficiary not found");

  res.json({ success: true, message: "Beneficiary removed" });
});
