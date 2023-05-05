import express from 'express'
import { upload, uploadProfileAuthentity } from '../../repositories/filesystem/FileSystem'

const api = express.Router();

//api.post('/upload/profile/authentity/:id', (req, res, next) => upload("profile/authentity",req.params.id).array('file'), uploadProfileAuthentity);


api.post('/upload/profile/authentity/:id', (req, res, next) => {
    var uploadMiddleware = upload("profile/authentity", req.params.id).array('file');
    uploadMiddleware(req, res, function(err) {
      if (err) {
        // обработка ошибок загрузки
        return res.status(500).json({error: err.message});
      }
      // загрузка выполнена успешно, продолжаем обработку запроса
      next();
    });
  }, uploadProfileAuthentity);

export default api;