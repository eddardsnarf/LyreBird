import { Request } from 'express';
import { ServiceError } from '../../utils/serviceError';

export const checkFileUpload = (req: Request): void => {
    if (req.files.length <= 0) {
        throw new ServiceError(400, 'You must select at least 1 file.');
    }
};
