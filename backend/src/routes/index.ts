import { Router } from "express";
import authRoutes from "./authRoutes";
import steamApiRoutes from "./steamApiRoutes";
import testEndpoints from "./testEndpoints";
import steamMarket from "./steamMarket";

const router = Router();

router.use(authRoutes);
router.use(steamApiRoutes);
router.use(steamMarket);
router.use(testEndpoints);

export default router;
