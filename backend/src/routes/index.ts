import { Router } from "express";
import authRoutes from "./authRoutes";
import steamApiRoutes from "./steamApiRoutes";
import testEndpoints from "./testEndpoints";
import steamMarket from "./steamMarket";
import mongoEndpoints from "./mongoEndpoints";
const router = Router();

router.use("/", authRoutes);
router.use("/", steamApiRoutes);
router.use("/", steamMarket);
router.use("/", testEndpoints);
router.use("/", mongoEndpoints);

export default router;
