import { Request, Response, NextFunction } from 'express';
const { User, Event, History} = require('../db/models');

class historyController {
  static async joinEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params
      const { id } = req.user

      // Pastikan event dan user tersedia
      const event = await Event.findByPk(eventId);
      const user = await User.findByPk(id);

      if (!event || !user) throw { name: 'Data Not Found' };

      // Buat history
      await History.create({
        user_id: id,
        event_id: eventId
      });

      res.status(201).json({ msg: 'Event joined successfully' });
    } catch (err) {
      next(err);
    }
  }

  static async getUserHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.user

      // Temukan semua history yang diikuti oleh pengguna
      const userHistory = await History.findAll({
        where: { user_id: id },
        include: [Event] 
      });

      res.status(200).json(userHistory);
    } catch (err) {
      next(err);
    }
  }

  static async leaveEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params
      const { id } = req.user

      // Cari history pengguna pada event tertentu
      const userHistory = await History.findOne({
        where: { user_id: id, event_id: eventId },
      });

      if (!userHistory) throw ({ name: 'Data Not Found' })

      // Hapus history
      await userHistory.destroy();

      res.status(200).json({ message: 'User successfully left the event.' });
    } catch (err) {
      next(err);
    }
  }

}

export default historyController
