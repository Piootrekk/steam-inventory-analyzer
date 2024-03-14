import { Router } from "express";
import authRoutes from "./authRoutes";
import steamApiRoutes from "./steamApiRoutes";

const router = Router();

router.use(authRoutes);
router.use(steamApiRoutes);

export default router;