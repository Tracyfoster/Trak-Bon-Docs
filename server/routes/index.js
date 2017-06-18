import controllers from '../controllers';
import authentication from '../helper/authentication';

const { roles, users, folder, documents, search } = controllers;
const verify = authentication.verifyToken;
const adminAccess = authentication.adminAccess;
const validateAccess = authentication.validateAccess;

const Routes = (router) => {
  router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Trakbon Docs!',
  }));

  /**
   * crud api for role model
   */
  router
    .route('/roles')
    .post(verify, adminAccess, roles.create)
    .get(verify, adminAccess, roles.getAllRoles);
  router
    .route('/roles/:id')
    .get(verify, adminAccess, roles.retrieve)
    .put(verify, adminAccess, roles.update)
    .delete(verify, adminAccess, roles.destroy);

  /**
   * crud api for folder model
   */
  router
    .route('/folders')
    .post(verify, folder.create)
    .get(verify, folder.getAllFolders);
  router
    .route('/folders/:id')
    .get(verify, folder.retrieve)
    .put(verify, folder.update)
    .delete(verify, folder.destroy);
  router
    .route('/users/:id/folders')
    .get(verify, folder.findUserFolders);

  /**
   * crud api for document model
   */
  router
    .route('/documents')
    .post(verify, documents.create)
    .get(verify, validateAccess, documents.getAllDocuments);
  router
    .route('/documents/:id')
    .get(verify, documents.retrieve)
    .put(verify, documents.update)
    .delete(verify, documents.destroy);
  router
    .route('/users/:id/documents')
    .get(verify, documents.findUserDocuments);
  router
    .route('/search/documents/')
    .get(validateAccess, documents.documentSearch);

  /**
   * crud api for user model
   */
  router
    .route('/users/login')
    .post(users.login);
  router
    .route('/users/logout')
    .post(verify, users.logout);
  router
    .route('/users')
    .post(users.create)
    .get(verify, adminAccess, users.getAllUsers);
  router
    .route('/users/:id')
    .get(users.retrieve)
    .put(verify, users.update)
    .delete(verify, adminAccess, users.destroy);
  router
    .route('/search/users/')
    .get(users.userSearch);
};

export default Routes;
