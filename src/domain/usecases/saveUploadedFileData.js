exports.saveFiles = async (files, soundRepo) => {
    const sounds = files.map((file) => ({ name: file.originalname, path: file.path }));
    return await soundRepo.save(sounds);
};
