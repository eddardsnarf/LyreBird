const ServiceError = require('../../utils/serviceError');
const getSoundFileStream = require('../../domain/usecases/getSoundFileById').getSoundFileById;
const getSoundSet = require('../../domain/usecases/getSoundSet').getSoundSet;
const getSoundByName = require('../../domain/usecases/getSoundByName').getSoundFileByName;
const getDb = require('../../data/db/database').getDb;

const SoundRepository = require('../../data/repo/soundRepository');
const SoundSetRepository = require('../../data/repo/soundSetRepository');

module.exports = class StorageController {
    constructor () {
        this.soundRepo = new SoundRepository(getDb);
        this.soundSetRepo = new SoundSetRepository(getDb);
    }

    searchByName = async (req, res) => {
        try {
            const sounds = await getSoundByName(req.query.q, this.soundRepo);
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
