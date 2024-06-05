import express from "express";
import menuController from "../controllers/menuController.js";
const MenuRouter = express.Router();
MenuRouter.post("/", menuController.createMenuItem);
MenuRouter.get("/", menuController.getAllMenuItems);
MenuRouter.get("/:id", menuController.getMenuItemById);
MenuRouter.put("/:id", menuController.updateMenuItemById);
MenuRouter.delete("/:id", menuController.deleteMenuItemById);

export default MenuRouter;
