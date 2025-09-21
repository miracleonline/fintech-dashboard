import { Router } from "express";
import { body, param } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

import {
  createLoan,
  listUserLoans,
  getLoanById,
  updateLoanStatus,
} from "../controllers/loansController.js";

const router = Router();

router.use(requireAuth);

// POST /api/loans - Apply for a loan
router.post(
  "/",
  validate([
    body("amount").isNumeric().toFloat().isFloat({ min: 1 }),
    body("purpose").notEmpty().isString(),
    body("repaymentPeriod").isInt({ min: 1 }),
    body("employmentStatus").isIn([
      "Employed",
      "Self-Employed",
      "Unemployed",
      "Student",
      "Other",
    ]),
    body("monthlyIncome").isNumeric().toFloat(),
    body("collateral").optional().isString(),
  ]),
  createLoan
);

// GET /api/loans - List user loans
router.get("/", listUserLoans);

// GET /api/loans/:id - Get single loan
router.get(
  "/:id",
  validate([param("id").isMongoId()]),
  getLoanById
);

// PATCH /api/loans/:id - Update loan status (admin)
router.patch(
  "/:id",
  validate([
    param("id").isMongoId(),
    body("status").optional().isIn(["Pending", "Approved", "Rejected"]),
    body("decisionNotes").optional().isString(),
  ]),
  updateLoanStatus
);

export default router;
