import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRoute = Router();
const controller = new AuthController();

authRoute.post("/register", controller.register);
authRoute.post("/login", controller.login);
authRoute.get("/verify", controller.verifyToken);

export default authRoute;
