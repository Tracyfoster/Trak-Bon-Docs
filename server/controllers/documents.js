import model from '../models/';
import Helpers from '../helper/Helpers';

const Documents = model.Documents;
const Role = model.Role;
const Users = model.Users;

export default {

  create(req, res) {
    return Documents
      .findOne({ where: { title: req.body.title } })
      .then((existingDocument) => {
        if (existingDocument) {
          return res.status(409).send({
            message: 'Document title already exists' });
        }
        return Documents.create({
          title: req.body.title,
          content: req.body.content,
          access: req.body.access,
          userId: req.decoded.id
        })
        .then(document => res.status(201).send({
          document,
          message: 'Document created successfully'
        }))
        .catch(error => Helpers.handleError(error, res));
      });
  },

  /**
   * Get all documents
   * Route: GET: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} no returns
   */
  getAllDocuments(req, res) {
    const {
      offset = 0,
      limit = 5,
    } = req.query;

    return Documents
      .findAndCountAll({
        subQuery: false,
        order: [['createdAt', 'DESC']],
        offset,
        limit,
        include: {
          model: Users,
          attributes: ['id', 'roleId', 'firstName', 'lastName']
        } 
      })
      .then((documents) => {
        const pagination = Helpers.pagination(documents, offset, limit);
        const result = Object.assign(documents, pagination);
        return res.status(200).send(result);
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Get a particular document
   * Route: GET: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  retrieve(req, res) {
    return Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Update a particular document
   * Route: PUT: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    Role.findById(req.decoded.roleId)
    .then(() => Documents
      .findById(req.params.id)
        .then((document) => {
          if (!document) {
            return res.status(404).send({
              message: 'Document Not Found',
            });
          }
          if (Helpers.isOwner(req, res, document)) {
            return document
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedDoc => res.status(200).send({
              updatedDoc,
              message: 'Document updated successfully'
            }));
          }
          return (res.status(403)
            .send({ message: 'Unauthorized Access' }));
        })
        .catch(error => Helpers.handleError(error, res))
    )
    .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Delete a particular document
   * Route: DELETE: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    return Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        if (Helpers.isOwner(req, res, document)) {
          return document
            .destroy()
            .then(() => res.status(200).send({
              message: `${document.title}, was successfully deleted`
            }));
        }
        return (res.status(403)
          .send({ message: 'Unauthorized Access' }));
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /users/:id/documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  findUserDocuments(req, res) {
    const {
      offset = 0,
      limit = 5
    } = req.query;

    return Documents
      .findAndCountAll({
        where: { userId: req.params.id },
        subQuery: false,
        attributes: [
          'id', 'access', 'title', 'content', 'createdAt', 'userId'],
        order: [['createdAt', 'DESC']],
        offset,
        limit,
        include: {
          model: Users,
          attributes: ['id', 'roleId', 'firstName', 'lastName']
        } 
      })
      .then((documents) => {
        if (documents.count < 1) {
          return res.status(404).send({ message: 'No Document Found' });
        }

        const pagination = Helpers.pagination(documents, offset, limit);
        const result = Object.assign(documents, pagination);

        return res.status(200).send(result);
      })
      .catch(error => Helpers.handleError(error, res));
  },

  /**
   * Search for documents by title
   * Route: GET: /search/documents?q={title}
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  documentSearch(req, res) {
    const searchTerm = req.query.q;
    return Documents
      .findAndCountAll({
        where: { title: { $iLike: `%${searchTerm}%` } },
        include: {
          model: Users,
          attributes: ['id', 'roleId', 'firstName', 'lastName']
        } 
      })
      .then((documents) => {
        if (!documents || documents.count < 1) {
          return res.status(404).send({
            message: 'No document found',
          });
        }
        return res.status(200).send({
          documents,
          message: 'Search Successful'
        });
      })
      .catch((error) => {
        res.status(400)
        .send({
          error,
          message: 'Error occurred while searching documents'
        });
      });
  }
};
