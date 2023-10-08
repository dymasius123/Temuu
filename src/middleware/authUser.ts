import { Request, Response, NextFunction } from 'express';
const User = require('../db/models');
const { decodeToken } = require("../helpers/jwt");

// masih bingung.
declare global {
  namespace Express {
    interface Request {
      user?: typeof User
    }
  }
}

const authUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: 'Invalid Token' };

    const decoded = decodeToken(access_token);

    if (decoded.role !== 'user') throw { name: 'Invalid Token' };

    const user = await User.findByPk(decoded.id);
    if (!user) throw { name: 'Invalid Token' };

    req.user = user
    next();
  } catch (err) {
    console.log(err, '==== di auth user');
    next(err);
  }
};

export default authUser;
