const Folder = require('../models').Folder;
const Documents = require('../models').Documents;

module.exports = {
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
      .catch(error => res.status(400).send({
        error,
        message: 'Error creating new folder'
      }));
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
      .catch(error => res.status(400).send({
        error,
        message: 'Error retrieving all folders'
      }));
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
      .catch(error => res.status(400).send({
        error,
        message: 'Error occured while retrieving folder'
      }));
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
          .catch(error => res.status(400).send({
            error,
            message: 'Folder did not update successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error updating folder'
      }));
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
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting Folder.'
      }));
  },
};
