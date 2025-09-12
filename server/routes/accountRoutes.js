// routes/accountRoutes.js
import { Router } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import upload from "../middleware/upload.js";
import {
  getBalance,
  getAccountInfo,
  updateAccountInfo,
} from "../controllers/accountController.js";

const router = Router();

// Authentication for all routes
router.use(requireAuth);

// GET /api/account/balance
router.get("/balance", getBalance);

// GET /api/account/info
router.get("/info", getAccountInfo);

// PUT /api/account/update
router.put(
  "/update",
  upload.single("profile_image"),
  validate([
    body("wallet_address").optional().isString().isLength({ max: 255 }),
    body("bank_name").optional().isString().isLength({ max: 100 }),
    body("account_number").optional().isString().isLength({ max: 50 }),
    body("address").optional().isString().isLength({ max: 255 }),
    body("city").optional().isString().isLength({ max: 100 }),
    body("country").optional().isString().isLength({ max: 100 }),
  ]),
  updateAccountInfo
);

export default router;
