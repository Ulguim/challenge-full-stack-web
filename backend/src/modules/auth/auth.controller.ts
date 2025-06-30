import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await authService.register(email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      res.status(400).json({ message: "User already exists" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      res.json(result);
    } catch (err) {
 
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
}
