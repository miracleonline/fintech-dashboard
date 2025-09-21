import Loan from "../models/Loans.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";

// Apply for a loan
export const createLoan = catchAsync(async (req, res) => {
  const {
    amount,
    purpose,
    repaymentPeriod,
    employmentStatus,
    monthlyIncome,
    collateral,
  } = req.body;

  const loan = await Loan.create({
    user: req.user._id,
    amount,
    purpose,
    repaymentPeriod,
    employmentStatus,
    monthlyIncome,
    collateral,
  });

  res.status(201).json({ success: true, loan });
});

// List loans (for current user)
export const listUserLoans = catchAsync(async (req, res) => {
  const loans = await Loan.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, loans });
});

// Get single loan (for current user)
export const getLoanById = catchAsync(async (req, res) => {
  const loan = await Loan.findOne({ _id: req.params.id, user: req.user._id });

  if (!loan) throw new ApiError(404, "Loan not found");

  res.json({ success: true, loan });
});

// Update loan status (for admin)
export const updateLoanStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, decisionNotes } = req.body;

  const loan = await Loan.findByIdAndUpdate(
    id,
    { status, decisionNotes },
    { new: true, runValidators: true }
  );

  if (!loan) throw new ApiError(404, "Loan not found");

  res.json({ success: true, loan });
});
