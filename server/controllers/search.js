import util from 'util';
import model from '../models/';
import Helpers from '../helper/Helpers';
import authentication from '../helper/authentication';

const Users = model.Users;
const Documents = model.Documents;

export default {
  userSearch(req, res) {
    const searchTerm = req.query.q;
    Users.findAll({
      where: {
        $or: [{
          firstName: { $iLike: `%${searchTerm}%` }
        }, {
          lastName: { $iLike: `%${searchTerm}%` }
        },
        {
          email: { $iLike: `%${searchTerm}%` }
        }]
      },
      include: [{
        model: Documents,
        as: 'userDocuments',
      }]
    }).then((users) => {
      if (!users) {
        return res.status(404).send({ message: 'No user found' });
      }
      return res.status(200).send({
        users,
        message: 'Search Successful'
      });
    })
    .catch(error => Helpers.handleError(error, res));
  },

  documentSearch(req, res) {
    let searchTerm = '%%';
    if (req.query.q) {
      searchTerm = `%${req.query.q}%`;
    }
    console.log('searchTerm', searchTerm)
    let queryOptions = { access: 'public', title: { $iLike: searchTerm } };
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = authentication.verifyToken(token);
    const userRole = authentication.getUserRole(decoded)

    if (decoded) {
      queryOptions = (decoded.roleId === 1) ? { title: { $iLike: searchTerm } } : {
        $or: [
          { access: { $or: ['public', userRole] } },
          { userId: decoded.id }
        ],
        title: { $iLike: searchTerm } };
    }

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 20;

    return Documents
      .findAndCountAll({
        offset,
        limit,
        where: queryOptions,
        include: [{
          model: models.User,
          attributes: ['userId', 'roleId'] }],
        order: [['createdAt', 'DESC']]
      })
      .then((documents) => {
        console.log('documents',documents)
        if (documents.row.length < 0) {
          return res.status(404).send({
            message: 'No document found',
          });
        }
        const searchDocuments = decoded.roleId === 1 ? documents.rows :
        documents.rows.filter(
          doc => !(doc.access === 'role' && doc.User.roleId !== decoded.roleId)
        );
        return res.status(200).send({
          searchDocuments,
          message: 'Search Successful'
        });
      })
      .catch(error => Helpers.handleError(error, res));
  }
};
