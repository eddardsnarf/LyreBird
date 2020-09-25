import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const fileStorage = multer.diskStorage({
    destination: 'audio-files',
    filename: (req, file, callback) => {
        callback(null, `${crypto.randomBytes(12).toString('hex')}${path.extname(file.originalname)}`);
    }
});

const multerFilter = (req: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    if (file.mimetype === 'audio/mpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

export const fileMulter = multer({
    storage: fileStorage,
    fileFilter: multerFilter
}).array('soundFiles', 100);
