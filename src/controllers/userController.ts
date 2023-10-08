import { Request, Response, NextFunction } from 'express';
const User = require('../db/models');
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {first_name, last_name, role, username, phone_number, password, gender, type} = req.body
      const user = await User.create({first_name, last_name, role, username, phone_number, password, gender, type});
      res.status(201).json({
        msg: `${user.username} success created`,
      });
    } catch (err) {
      next(err);
    }
  }
  
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username) throw { name: `Invalid Credential` };
      if (!password) throw { name: `Invalid Credential` };
      const user = await User.findOne({ where: { username } });
      if (!user) throw { name: `Invalid Credential` };
      const pw = comparePassword(password, user.password);
      if (!pw) throw { name: `Invalid Credential` };
      const access_token = createToken({
        id: user.id,
        role: "user",
      });
      res.json({ access_token});
    } catch (err) {
      next(err);
    }
  }

  static async updateVerified(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user.id;

      const existingUser = await User.findByPk(id);
      
      await existingUser.update({ is_verified: true });

      res.status(200).json({
        msg: `User ${id} is verified.`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user.id;

      const existingUser = await User.findByPk(id);
      
      await existingUser.update({ role: "creator" });

      res.status(200).json({
        msg: `User ${id} is creator.`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user.id;

      const existingUser = await User.findByPk(id);
      
      await existingUser.update({ type: "subsrciber" });

      res.status(200).json({
        msg: `User ${id} is subsrciber.`,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
