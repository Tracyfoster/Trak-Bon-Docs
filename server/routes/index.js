const rolesController = require('../controllers').roles;
const folderController = require('../controllers').folder;
const documentController = require('../controllers').documents;
const userController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Trakbon Docs!',
  }));

  app.post('/roles', rolesController.create);
  app.get('/roles', rolesController.list);
  app.get('/roles/:id', rolesController.retrieve);
  app.put('/roles/:id', rolesController.update);
  app.delete('/roles/:id', rolesController.destroy);

  app.post('/folders', folderController.create);
  app.get('/folders', folderController.list);
  app.get('/folders/:id', folderController.retrieve);
  app.put('/folders/:id', folderController.update);
  app.delete('/folders/:id', folderController.destroy);

  app.post('/documents', documentController.create);
  app.get('/documents', documentController.list);
  app.get('/documents/:id', documentController.retrieve);
  app.put('/documents/:id', documentController.update);
  app.delete('/documents/:id', documentController.destroy);

  app.post('/users', userController.create);
  app.get('/users', userController.list);
  app.get('/users/:id', userController.retrieve);
  app.put('/users/:id', userController.update);
  app.delete('/users/:id', userController.destroy);
  app.get('/users/:id/documents', userController.findUserDocuments);
};
