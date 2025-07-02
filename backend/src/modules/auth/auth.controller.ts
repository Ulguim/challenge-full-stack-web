import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { IsEmail, IsString, Length, validate } from "class-validator";

const authService = new AuthService();

class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;
}

export class AuthController {
  async register(req: Request, res: Response) {
    const dto = Object.assign(new AuthDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", details: errors });
    }
    const { email, password } = req.body;
    try {
      const user = await authService.register(email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(400).json({ message: "User already exists" });
    }
  }

  async login(req: Request, res: Response) {
    const dto = Object.assign(new AuthDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", details: errors });
    }
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      res.json(result);
    } catch (err) {
      console.error("Login error:", err);
      res.status(401).json({ message: "Invalid credentials" });
    }
  }

  async verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = authService.verifyToken(token);
      res.json(payload);
    } catch (err) {
      console.error("Token verification error:", err);
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
