import chai from 'chai';
import model from '../../models/';
import testData from '../testData';

const Role = model.Role;
const { roleTwo } = testData;
let roleId;
const expect = chai.expect;

describe('Role Model', () => {
  describe('Create Role', () => {
    it('should create a role', (done) => {
      Role.create(roleTwo)
        .then((role) => {
          expect(role.dataValues.roleName).to.equal(roleTwo.roleName);
          roleId = role.dataValues.id;
          done();
        });
    });

    it('should fail when role name already exist', (done) => {
      Role.create(roleTwo)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Role already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if name was not provided', (done) => {
      Role.create({ roleName: '' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Name cannot be empty');
          done();
        });
    });

    it('should fail when the name of a role is null', (done) => {
      Role.create({ roleName: null })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('roleName cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
  });

  describe('Update Role', () => {
    it('should update a role', (done) => {
      Role.findById(roleId)
        .then((role) => {
          role.update({ roleName: 'subscriber' })
            .then((updatedRole) => {
              expect(updatedRole.dataValues.id).to.equal(roleId);
              expect(role.dataValues.roleName).to.equal('subscriber');
              done();
            });
        });
    });
  });

  describe('Delete role', () => {
    it('should delete a role', (done) => {
      Role.destroy({ where: { id: roleId } })
        .then(() => {
          Role.findById(roleId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
