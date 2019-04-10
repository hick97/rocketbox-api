const File = require('../models/file');
const Box = require('../models/box');

class FileController{
    async store(req, res){
        //Criar um arquivo
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,

        })
        box.files.push(file);

        await box.save();
        //Pega todos os usuários que estão conectados naquela box com aquele ID e retorno o file.
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();