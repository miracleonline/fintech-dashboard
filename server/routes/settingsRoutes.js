import { Router } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { getSettings, upsertSettings } from "../controllers/settingsController.js";

const router = Router();

router.use(requireAuth);

// GET /api/settings
router.get("/", getSettings);

// POST /api/settings
router.post(
  "/",
  validate([
    body("investmentPreferences.durationInMonths").optional().isInt({ min: 1 }),
    body("investmentPreferences.frequency")
      .optional()
      .isIn(["daily", "weekly", "monthly", "quarterly", "yearly"]),
    body("investmentPreferences.riskLevel")
      .optional()
      .isIn(["low", "medium", "high"]),
    body("investmentPreferences.horizon")
      .optional()
      .isIn(["short", "medium", "long"]),
    body("assetPreferences.selectedCryptos")
      .optional()
      .isArray({ max: 10 }),
    body("assetPreferences.diversificationPreference")
      .optional()
      .isIn(["low", "medium", "high"]),
    body("signalPreferences.useCompanySignals").optional().isBoolean(),
    body("notificationPreferences.emailNotifications").optional().isBoolean(),
    body("notificationPreferences.smsNotifications").optional().isBoolean(),
  ]),
  upsertSettings
);

export default router;
