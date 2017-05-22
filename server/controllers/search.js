import util from 'util';
import model from '../models/';
import Helpers from '../helper/Helpers';

const Users = model.Users;
const Documents = model.Documents;

export default {
  userSearch(req, res) {
    console.log('query', req.query.q);
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
      .catch((error) => {
        console.log('errovf', error);
        res.status(400)
        .send({
          error,
          message: 'Error occurred while searching documents'
        });
      });
  },

  documentSearch(req, res) {
    console.log('query', req.query);

    const searchTerm = req.query.q;
    return Documents
      .findAll({
        where: { title: { $iLike: `%${searchTerm}%` } },
        include: { model: Users }
      })
      .then((documents) => {
        if (!documents) {
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
