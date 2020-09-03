const ServiceError = require('../../utils/serviceError');

exports.checkFileUpload = (req) => {
    if (req.files.length <= 0) {
        throw new ServiceError(400, 'You must select at least 1 file.');
    }
};
