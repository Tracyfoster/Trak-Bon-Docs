/**
 * controllers helper functions
 */
const Helpers = {
  /**
   * isAdmin - Verify if the requester is an admin
   * @param  {Object} req Request Object
   * @param  {Object} res Response Object
   * @returns {Boolean} returns true or false
   */
  isAdmin(req) {
    return req.decoded.roleId === 1;
  },

  /**
   * isOwner - checks if a user is the owner of a document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {Object} document the document to compare with
   * @returns {Boolean} returns true or false
   */
  isOwner(req, res, document) {
    const itemToCheck = document ? String(document.userId) : req.params.id;
    return String(req.decoded.id) === itemToCheck;
  },

  /**
   *getPaginatedItems - get items to paginate
   *@param {object} items  Users | Documents
   *@param {number} offset Number to offset
   *@param {number} limit Number to return
   *@returns {object} returns an object is not empty
   */
  getPaginatedItems(items, offset, limit) {
    return items.slice(offset, offset + limit);
  },

  /**
   * Get the user's role name
   *
   * @param {Object} req request object
   * @returns {Response} response object
   */
  getUserRole(req) {
    return req.decoded.roleId;
  },

  /**
   * Handle promise errors
   *
   * @param {Object} error error object
   * @param {Function} res server response function
   * @returns {Function} function that displays an error message
   */
  handleError(error, res) {
    return error.errors ?
      res.status(400).send({ message: error.errors[0].message }) :
      res.status(400).send({ message: error.message });
  }
};

export default Helpers;
