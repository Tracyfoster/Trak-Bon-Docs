import { role, users, folder, documents, search } from '../controllers';
import auth from '../middlewares';

const verify = auth.verifyToken;
const adminAccess = auth.adminAccess;

const Routes = (app) => {

  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Trakbon Docs!',
  }));

  /**
   * crud api for role model
   */
  app
    .route('/roles')
    .post(verify, adminAccess, role.create)
    .get(verify, adminAccess, role.list);
  app
    .route('/roles/:id')
    .get(verify, adminAccess, role.retrieve)
    .put(verify, adminAccess, role.update)
    .delete(verify, adminAccess, role.destroy);

  /**
   * crud api for folder model
   */
  app
    .route('/folders')
    .post(verify, adminAccess, folder.create)
    .get(verify, adminAccess, folder.list);
  app
    .route('/folders/:id')
    .get(verify, adminAccess, folder.retrieve)
    .put(verify, adminAccess, folder.update)
    .delete(verify, adminAccess, folder.destroy);

  /**
   * crud api for document model
   */
  app
    .route('/documents')
    .post(verify, documents.create)
    .get(verify, adminAccess, documents.list);
  app
    .route('/documents/:id')
    .get(verify, documents.retrieve)
    .put(verify, documents.update)
    .delete(verify, documents.destroy);

  /**
   * crud api for user model
   */
  app
    .route('/users')
    .post(verify, users.create)
    .get(verify, adminAccess, users.list);
  app
    .route('/users/:id')
    .get(verify, users.retrieve)
    .put(verify, users.update)
    .delete(verify, users.destroy);
  app
    .route('/users/:id/documents')
    .get(verify, users.findUserDocuments);

  /**
   * Api for search
   */
  app
    .route('/search/users/')
    .get(verify, adminAccess, search.userSearch);
  app
    .route('/search/documents/')
    .get(verify, adminAccess, search.documentSearch);
};

export default Routes;