import { Request, Response, NextFunction } from 'express';
const Interest = require('../db/models');

class interestController {
  static async createInterest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {title, description, color, icon} = req.body
      const interest = await Interest.create({title, description, color, icon});
      res.status(201).json({
        msg: `interest ${interest.title} success created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readInterest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const interest = await Interest.findAll()

      if (interest.length === 0) throw { name: 'Data Not Found' };
      
      res.status(200).json(interest);
    } catch (error) {
      next(error);
    }
  }

  static async readDetailInterest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const interest = await Interest.findOne({where: { id: id }})

      res.status(200).json(interest);
    } catch (error) {
      next(error);
    }
  }

  static async updateInterest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const {title, description, color, icon} = req.body
      const updatedInterest = {title, description, color, icon}
  
      await Interest.update(updatedInterest, { where: { id } });
  
      res.status(200).json({ msg: `Interest successfully updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteInterest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const interest = await Interest.findByPk(id);

      await interest.destroy({ id: id });

      res.status(200).json({ msg: `You have deleted interest with ID ${id}` })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default interestController