import { Request, Response, NextFunction } from 'express';
const {Event, History} = require('../db/models');
const { Op } = require("sequelize");

class eventController {

  static async readEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, interest, purpose, sector, page } = req.query;
  
      const limit: number = 6;
      const pageNumber: number = page ? parseInt(page.toString()) : 1; // memastikan query benar2 angka
      const offset: number = (pageNumber - 1) * limit;
  
      const hashMap: any = {};
  
      if (title) {
        hashMap.title = {
          [Op.like]: `%${title}%`,
        };
      }
  
      if (interest) {
        hashMap.interest = {
          [Op.eq]: interest,
        };
      }
  
      if (purpose) {
        hashMap.purpose = {
          [Op.eq]: purpose,
        };
      }
  
      if (sector) {
        hashMap.sector = {
          [Op.eq]: sector,
        };
      }
  
      const events = await Event.findAll({
        where: hashMap,
        limit: limit,
        offset: offset,
      });
  
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {title, description, sector, interest, purpose, gender_type, is_business, long, lat, location, fee, is_verified, is_public, phase} = req.body

      const event = await Event.create({title, description, sector, interest, purpose, gender_type, is_business, long, lat, location, fee, is_verified, is_public, phase});

      const history = await History.create({
        user_id: req.user.id, 
        event_id: event.id 
      });

      res.status(201).json({
        msg: `event ${event.title} success created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getEventDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;

      const event = await Event.findByPk(eventId);

      if (!event) throw { name: 'Data Not Found' };

      const eventDetail = await Event.findByPk(eventId)

      res.status(200).json(eventDetail);
    } catch (err) {
      next(err);
    }
  }

  static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params
      const {
        title, description, sector, interest, purpose,
        gender_type, is_business, long, lat, location,
        fee, is_verified, is_public, phase
      } = req.body;

      const event = await Event.findByPk(eventId);

      if (!event) throw { name: 'Data Not Found' };
      // pastikan yang update === yang buat event
      const eventHistory = await History.findOne({
        where: {
          event_id: event.id,
          user_id: req.user.id  
        }
      });

      if (!eventHistory) throw { name: 'Forbidden' };

      // Update event
      await event.update({
        title, description, sector, interest, purpose,
        gender_type, is_business, long, lat, location,
        fee, is_verified, is_public, phase
      });

      res.status(200).json({ msg: `Event with ID ${eventId} has been updated.` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;

      const event = await Event.findByPk(eventId);

      if (!event) throw { name: 'Data Not Found' };

      // Pastikan yang menghapus adalah yang membuat event
      const eventHistory = await History.findOne({
        where: {
          event_id: event.id,
          user_id: req.user.id,
        }
      });

      if (!eventHistory) throw { name: 'Forbidden' };

      // Hapus event
      await event.destroy();

      res.status(200).json({ msg: `Event with ID ${eventId} has been deleted.` });
    } catch (err) {
      next(err);
    }
  }
  
}

export default eventController