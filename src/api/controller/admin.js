const saveUploadedFiles = require('../../domain/usecases/saveUploadedFileData').saveFiles;
const saveSoundSet = require('../../domain/usecases/saveSoundSet').saveSoundSet;
const checkFileUpload = require('../../domain/usecases/checkFileUpload').checkFileUpload;

const ServiceError = require('../../utils/serviceError');

module.exports.postSounds = async (req, res) => {
    try {
        console.log(req.files);
        checkFileUpload(req);
        const insertedSounds = await saveUploadedFiles(req.files);
        res.status(200)
            .send(insertedSounds);
    } catch (error) {
        console.log(error);
        if (error instanceof ServiceError) {
            res.status(error.code)
                .send(error.message);
        } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            res.status(400)
                .send('Too many files to upload.');
        } else {
            res.status(400)
                .send(`Error when trying upload many files: ${error}`);
        }
    }
};

module.exports.postSoundSet = async (req, res) => {
    try {
        const soundSet = await saveSoundSet(req);
        res.status(200)
            .send(soundSet);
    } catch (err) {
        console.log(err);
        if (err instanceof ServiceError) {
            res.status(err.code)
                .send(err.message);
        } else {
            res.status(500)
                .send(err);
        }
    }
};
