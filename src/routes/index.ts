import express, { Request, Response } from "express";
import authRoutes from "./auth";
import healthRoutes from "./health";
import path from "path";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

router.use(
  "/",
  express.static(path.join(__dirname, "..", "..", "public"), {
    index: "landing.html",
    extensions: ["html"]
  })
);

export default router;
