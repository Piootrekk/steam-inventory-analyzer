import { Router } from "express";
import Investment from "../schemas/InvestmentSchema";
import authMiddleware from "../middlewares/steamAuthMiddleware";
import { InvestmentFormTypes } from "../types/AnalizeListTypes";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import mongoose from "mongoose";

const router = Router();

const isCollectionExists = async (collectionName: string): Promise<boolean> => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  return collections.some((collection) => collection.name === collectionName);
};

const checkMongoStatus = () => {
  const status = mongoose.connection.readyState;
  let statusMessage = "Unknown";

  switch (status) {
    case 0:
      statusMessage = "Disconnected";
      break;
    case 1:
      statusMessage = "Connected";
      break;
    case 2:
      statusMessage = "Connecting";
      break;
    case 3:
      statusMessage = "Disconnecting";
      break;
    default:
      statusMessage = "Unknown";
  }

  return statusMessage;
};

router.get("/mongo-status", (req, res) => {
  const statusMessage = checkMongoStatus();
  res.json({ status: statusMessage });
});

router.get("/investments", authMiddleware, async (req, res) => {
  if (!(await isCollectionExists("investments"))) {
    console.log("Collection does not exist");
    Investment.create();
  }
  const user = req.user as AuthenticatedUser;
  try {
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const investments = await Investment.find({ steamId: user._json.steamid });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/add-investment", authMiddleware, async (req, res) => {
  try {
    const user = req.user as AuthenticatedUser;
    const investmentData: InvestmentFormTypes = {
      steamId: user._json.steamid,
      spreadsheetName: req.body.spreadsheetName,
      investments: req.body.investments,
    };

    const newInvestment = new Investment({
      steamId: investmentData.steamId,
      spreadsheetName: investmentData.spreadsheetName,
      investment: investmentData.investments,
    });
    await newInvestment.save();

    res.json(newInvestment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/delete-investment/:id", authMiddleware, async (req, res) => {
  try {
    const user = req.user as AuthenticatedUser;
    const investmentId = req.params.id;
    const investment = await Investment.findById(investmentId);
    if (investment?.steamId !== user._json.steamid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await Investment.findByIdAndDelete(investmentId);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update-investment/:id", authMiddleware, async (req, res) => {
  try {
    const user = req.user as AuthenticatedUser;
    const investmentId = req.params.id;
    const investment = await Investment.findById(investmentId);
    if (investment?.steamId !== user._json.steamid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await Investment.findByIdAndUpdate(investmentId, req.body);
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
