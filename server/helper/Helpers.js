
const Helpers = {
  /**
   * Verify if the requester is an admin
   * @param  {Object} req Request Object
   * @param  {Object} res Response Object
   * @returns {Boolean} returns true or false
   */
  isAdmin(req) {
    return req.decoded.roleId === 1;
  },

  /**
   * Check if a user is the owner of a document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @param {Object} document the document to compare with
   * @returns {Boolean} returns true or false
   */
  isOwner(req, res, document) {
    const checkUser = document ? String(document.userId) : req.params.id;
    return String(req.decoded.id) === checkUser;
  },

  /**
   * Define the required user attributes
   * @param {Object} user Request object
   * @returns {Object} returns an object
   */
  requiredAttributes(user) {
    const attributes = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    return attributes;
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
  },

  pagination(containerObject, offset, limit) {
    return {
      metaData: {
        totalCount: containerObject.count,
        pages: Math.ceil(containerObject.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: containerObject.rows.length,
      } || null
    } 
  }
};

export default Helpers;
