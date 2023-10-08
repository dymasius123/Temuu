import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            res.status(400).json({ msg: err.errors[0].message });
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ msg: err.errors[0].message });
            break;
        case 'Invalid Credential':
            res.status(401).json({ msg: 'Invalid email or password' });
            break;
        case 'Invalid Token':
            res.status(401).json({ msg: 'Invalid Token' });
            break;
        case 'Forbidden':
            res.status(403).json({ msg: 'You dont have Authorization' });
            break;
        case 'Data Not Found':
            res.status(404).json({ msg: 'Data Not Found' });
            break;
        default:
            console.log(err, '<< di errorhandler');
            res.status(500).json({ msg: 'Internal Server Error' });
            break;
    }
};

export default errorHandler;
