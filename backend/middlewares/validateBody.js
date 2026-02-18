import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
   Define Zod schemas
--------------------------------*/
const schemas = {
  signup: z.object({
    name: z.string().min(3, "Name too short").max(50),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 chars"),
  }),

  login: z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password required"),
  }),
  changePass: z.object({
    oldpass: z.string().min(6, "Password must be at least 6 chars"),
    newpass: z.string().min(6, "Password must be at least 6 chars"),
  }),
};

/* -----------------------------
   Validation Middleware
--------------------------------*/
export const validateBody = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return next(new ApiError(500, `Zod schema '${schemaName}' not found`));
    }

    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
      console.log("Zod validation failed:", parseResult.error.format());

      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parseResult.error
      });
    }

    req.body = parseResult.data;
    console.log("leaving validate body.js")
    next();
  };
};