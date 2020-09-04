const ServiceError = require('../../utils/serviceError');
const getSoundFileStream = require('../../domain/usecases/getSoundFileById').getSoundFileById;
const getSoundSet = require('../../domain/usecases/getSoundSet').getSoundSet;
const getSoundByName = require('../../domain/usecases/getSoundByName').getSoundFileByName;

exports.searchByName = async (req, res) => {
    try {
        const sounds = await getSoundByName(req.body.soundName);
        res.status(200)
            .send(sounds);
    }catch (err) {
        if (err instanceof ServiceError) {
            res.status(err.code).send(err.message);
        } else {
            res.status(500).send(err);
        }
    }
};

exports.getSoundFile = async (req, res) => {
    const errorHandler = (serviceError) => {
        res
            .status(serviceError.code)
            .send(serviceError.msg);
    };
    const soundFileStream = await getSoundFileStream(req.params.soundId, errorHandler);
    res.setHeader('Content-Type', 'audio/mpeg');
    soundFileStream.pipe(res);
};

exports.getSoundSet = async (req, res) => {
    try {
        const soundSet = await getSoundSet(req.params.setId);
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