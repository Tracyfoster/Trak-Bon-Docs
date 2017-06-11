import model from '../models/';
import Helpers from '../helper/Helpers';

const Folder = model.Folder;
const User = model.User;
const Documents = model.Documents;

export default {
  create(req, res) {
    return Folder
      .create({
        folderName: req.body.folderName,
        userId: req.params.userId
      })
      .then(folder => res.status(201).send({
        folder,
        message: 'Folder created succesfully'
      }))
      .catch(error => Helpers.handleError(error, res));
  },

  list(req, res) {
    return Folder
      .findAll({
        include: [{
          model: Documents,
          as: 'folderDocuments',
        }],
      })
      .then((folder) => {
        if (!folder) {
          return res.status(404).send({
            message: 'No Folders Found',
          });
        }
        return res.status(200).send({ folder });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  retrieve(req, res) {
    return Folder
      .findById(req.params.id, {
        include: [{
          model: Documents,
          as: 'folderDocuments',
        }],
      })
      .then((folder) => {
        if (!folder) {
          return res.status(404).send({
            message: 'Folder does not exist',
          });
        }
        return res.status(200).send({ folder });
      })
      .catch(error => Helpers.handleError(error, res));
  },

  update(req, res) {
    return Folder
      .findById(req.params.id)
      .then((folder) => {
        if (!folder) {
          return res.status(404).send({
            message: 'folder does not exist',
          });
        }
        return folder
          .update({
            folderName: req.body.folderName || folder.folderName,
          })
          .then(() => res.status(200).send({
            folder,
            message: 'Folder updated successfully.'
          }))
          .catch(error => Helpers.handleError(error, res));
      })
      .catch(error => Helpers.handleError(error, res));
  },

  destroy(req, res) {
    return Folder
      .findById(req.params.id)
      .then((folder) => {
        if (!folder) {
          return res.status(404).send({
            message: 'Folder does not exist',
          });
        }
        return folder
          .destroy()
          .then(() => res.status(200).send({
            message: 'Folder deleted successfully.'
          }));
      })
      .catch(error => Helpers.handleError(error, res));
  },
};
