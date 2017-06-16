import model from '../models/';
import Helpers from '../helper/Helpers';

const Folder = model.Folder;
const Documents = model.Documents;

export default {
  /**
   * Create a folder
   * Route: POST: /folders
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
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

  /**
   * Get all folders
   * Route: GET: /folders
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
  getAllFolders(req, res) {
    return Folder
      .findAll()
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

  /**
   * Get a particular folder
   * Route: GET: /folders/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
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

  /**
   * Update a particular folder
   * Route: PUT: /folders/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
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

  /**
   * Delete a particular folder
   * Route: DELETE: /folders/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
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

  /**
   * Get all folders that belongs to a user
   * Route: GET: /users/:id/folders
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  findUserFolders(req, res) {
    return Folder
      .find({
        where: { userId: req.params.id },
        attributes: ['id', 'folderName', 'userId'],
        include: [{
          model: Documents,
          attributes: [
            'id', 'access', 'title', 'content', 'folderId', 'createdAt'],
          as: 'folderDocuments'
        }]
      })
      .then((folder) => {
        if (!folder) {
          return res.status(404).send({ message: 'Folder Not Found' });
        }
        return res.status(200).send({ folder, status: true });
      })
      .catch(error => Helpers.handleError(error, res));
  },
};
