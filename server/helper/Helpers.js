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
    console.log('document', document)
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
  }
};

export default Helpers;
