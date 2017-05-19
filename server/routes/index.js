import controllers from '../controllers';
import middleware from '../middlewares';

const { roles, users, folder, documents, search } = controllers;
const auth = middleware.authentication;

const verify = auth.verifyToken;
const adminAccess = auth.adminAccess;

const Routes = (router) => {
  router.get('/lol', (req, res) => res.status(200).send({
    message: 'Welcome to the Trakbon Docs!',
  }));

  /**
   * crud api for role model
   */
  router
    .route('/roles')
    .post(verify, adminAccess, roles.create)
    .get(verify, adminAccess, roles.list);
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
    .post(folder.create)
    .get(folder.list);
  router
    .route('/folders/:id')
    .get(folder.retrieve)
    .put(folder.update)
    .delete(folder.destroy);

  /**
   * crud api for document model
   */
  router
    .route('/documents')
    .post(documents.create)
    .get(documents.list);
  router
    .route('/documents/:id')
    .get(documents.retrieve)
    .put(documents.update)
    .delete(documents.destroy);

  /**
   * crud api for user model
   */
  router
    .route('/users')
    .post(users.create)
    .get(users.list);
  router
    .route('/users/:id')
    .get(users.retrieve)
    .put(users.update)
    .delete(users.destroy);
  router
    .route('/users/:id/documents')
    .get(users.findUserDocuments);
  router
    .route('/users/:id/folders')
    .get(users.findUserFolders);
  router
    .route('/users/login')
    .post(users.login);
  router
    .route('/users/logout')
    .post(users.logout);
  /**
   * Api for search
   */
  router
    .route('/search/users/')
    .get(search.userSearch);
  router
    .route('/search/documents/')
    .get(search.documentSearch);
};

export default Routes;