import express from "express";
import controller from "./controller";
import prefix from "./prefix";
// Middleware
import token from "../../middleware/token";
// Middleware
import upload from "../../middleware/upload";

const router = express.Router();

router.post(prefix + "/", token, upload.none(), controller.create);
router.get(prefix + "/", token, controller.fetch);
router.put(prefix + "/", token, upload.none(), controller.update);
router.delete(prefix + "/", token, controller.remove);

export default router;
