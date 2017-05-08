import util from 'util';
import { Users, Documents } from '../models';
import Helpers from '../helper/Helpers';

export default {
  userSearch(req, res) {
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    if (limit === 'undefined') {
      limit = 10;
    }
    if (offset === 'undefined') {
      offset = 0;
    }
    const query = req.query.term;
    const nextOffset = offset + limit;
    const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    return Users
      .findAll({
        where: {
          $or: [
            { email: {
              $iLike: `%${req.query.term}%`
            },
              username: {
                $iLike: `%${req.query.term}%`
              } }
          ]
        }
      })
      .then((user) => {
        if (user.length <= 0) {
          return res.status(404)
            .send({
              message: 'Users Not Found',
            });
        }
        const meta = {
          limit,
          next: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, nextOffset),
          offset,
          previous: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, previousOffset),
          total_count: user.length
        };
        const result = Helpers.getPaginatedItems(user, offset, limit);
        return res.status(200).send({
          user: result, pageMeta: meta });
      })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving Users'
    }));
  },

  documentSearch(req, res) {
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    if (limit === 'undefined') {
      limit = 10;
    }
    if (offset === 'undefined') {
      offset = 0;
    }
    const query = req.query.term;
    const nextOffset = offset + limit;
    const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    return Documents
      .findAll({
        where: {
          $or: [{ title: { $iLike: `%${req.query.term}%` } },
            { docContent: { $iLike: `%${req.query.term}%` } }]
        }
      })
      .then((document) => {
        if (document.length <= 0) {
          return res.status(404)
            .send({
              message: 'Documents Not Found',
            });
        }
        const meta = {
          limit,
          next: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, nextOffset),
          offset,
          previous: util.format(
            '?term=%s&limit=%s&offset=%s', query, limit, previousOffset),
          total_count: document.length
        };
        const result = Helpers.getPaginatedItems(document, offset, limit);
        return res.status(200)
          .send({ document: result, pageMeta: meta });
      })
      .catch(error => res.status(400)
        .send({
          error,
          message: 'Error occurred while retrieving documents'
        }));
  }

};
