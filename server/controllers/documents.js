import model from '../models/';
import Helpers from '../helper/Helpers';

const Documents = model.Documents;
const Users = model.Users;
const Role = model.Role;

export default {
  create(req, res) {
    return Documents
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        userId: req.body.userId
      })
      .then(document => res.status(201).send({
        document,
        message: 'Document created successfully'
      }))
      .catch(error => Helpers.handleError(error, res));
  },

  list(req, res) {
    return Documents
      .findAndCountAll({
        subQuery: false,
        order: [['createdAt', 'DESC']],
        include: { model: Users },
        offset: req.query.offset || 0,
        limit: req.query.limit || 10,
      })
      .then(document => res.status(200).send(document))
      .catch(error => Helpers.handleError(error, res));
  },

  retrieve(req, res) {
    return Documents
      .findById(req.params.id, {
        include: { model: Users }
      })
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

  update(req, res) {
    Role.findById(req.decoded.roleId)
    .then(() => Documents
      .find({ where: {
        id: req.params.id } })
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
};
