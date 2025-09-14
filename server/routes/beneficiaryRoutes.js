import { Router } from "express";
import { body, param } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createBeneficiary,
  listBeneficiaries,
  updateBeneficiary,
  deleteBeneficiary,
} from "../controllers/beneficiaryController.js";

const router = Router();

router.use(requireAuth);

// POST /api/beneficiaries
router.post(
  "/",
  validate([
    body("fullName").notEmpty().isString().isLength({ max: 120 }),
    body("dateOfBirth").isISO8601().toDate(),
    body("relationship").notEmpty().isString().isLength({ max: 50 }),
    body("bankName").notEmpty().isString().isLength({ max: 100 }),
    body("accountNumber").notEmpty().isString().isLength({ max: 50 }),
  ]),
  createBeneficiary
);

// GET /api/beneficiaries
router.get("/", listBeneficiaries);

// PATCH /api/beneficiaries/:id
router.patch(
  "/:id",
  validate([
    param("id").isMongoId(),
    body("fullName").optional().isString().isLength({ max: 120 }),
    body("dateOfBirth").optional().isISO8601().toDate(),
    body("relationship").optional().isString().isLength({ max: 50 }),
    body("bankName").optional().isString().isLength({ max: 100 }),
    body("accountNumber").optional().isString().isLength({ max: 50 }),
    body("status").optional().isIn(["Active", "Inactive"]),
  ]),
  updateBeneficiary
);

// DELETE /api/beneficiaries/:id
router.delete("/:id", validate([param("id").isMongoId()]), deleteBeneficiary);

export default router;
