const saveUploadedFiles = require('../../domain/usecases/saveUploadedFileData').saveFiles;
const saveSoundSet = require('../../domain/usecases/saveSoundSet').saveSoundSet;
const checkFileUpload = require('../../domain/usecases/checkFileUpload').checkFileUpload;
const ServiceError = require('../../utils/serviceError');
const SoundRepository = require('../../data/repo/soundRepository');
const SoundSetRepository = require('../../data/repo/soundSetRepository');

module.exports = class AdminController {
    constructor () {
        this.soundRepo = new SoundRepository();
        this.soundSetRepo = new SoundSetRepository();
    }

    postSounds = async (req, res) => {
        try {
            console.log(req.files);
            checkFileUpload(req);
            const insertedSounds = await saveUploadedFiles(req.files, this.soundRepo);

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
    }

    postSoundSet = async (req, res) => {
        try {
            const soundSet = await saveSoundSet(req, this.soundRepo, this.soundSetRepo);
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
};
