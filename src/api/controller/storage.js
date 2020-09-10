const ServiceError = require('../../utils/serviceError');
const getSoundFileStream = require('../../domain/usecases/getSoundFileById').getSoundFileById;
const getSoundSet = require('../../domain/usecases/getSoundSet').getSoundSet;
const getSoundByName = require('../../domain/usecases/getSoundByName').getSoundFileByName;

const SoundRepository = require('../../data/repo/soundRepository');
const SoundSetRepository = require('../../data/repo/soundSetRepository');

module.exports = class StorageController {
    constructor () {
        this.soundRepo = new SoundRepository();
        this.soundSetRepo = new SoundSetRepository();
    }

    searchByName = async (req, res) => {
        try {
            const q = req.query.q;
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 20;
            const sounds = await getSoundByName(q, page, limit, this.soundRepo);
            res.status(200)
                .send(sounds);
        } catch (err) {
            if (err instanceof ServiceError) {
                res.status(err.code).send(err.message);
            } else {
                res.status(500).send(err);
            }
        }
    };

    getSoundFile = async (req, res) => {
        const errorHandler = (serviceError) => {
            res
                .status(serviceError.code)
                .send(serviceError.msg);
        };
        const soundFileStream = await getSoundFileStream(req.params.soundId, this.soundRepo, errorHandler);
        res.setHeader('Content-Type', 'audio/mpeg');
        soundFileStream.pipe(res);
    };

    getSoundSet = async (req, res) => {
        try {
            const soundSet = await getSoundSet(req.params.setId, this.soundSetRepo);
            res.status(200)
                .send(soundSet);
        } catch (err) {
            if (err instanceof ServiceError) {
                res.status(err.code).send(err.message);
            } else {
                res.status(500).send(err);
            }
        }
    };
};
