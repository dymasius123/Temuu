import { Request, Response, NextFunction } from 'express';

const authorizationUserIsCreator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userRole = req.user.role;

    if (userRole === 'creator') {
      next()
    } else {
      throw { name: 'Forbidden' }
    }
  } catch (err) {
    next(err);
  }
};

export default authorizationUserIsCreator;
