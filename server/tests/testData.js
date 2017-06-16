import faker from 'faker';
import bcrypt from 'bcrypt-nodejs';

export default {
  newAdmin: {
    firstName: 'Zaraki',
    lastName: 'Zomee',
    email: 'Zaraki@email.com',
    password: 'bankai',
    roleId: 1
  },
  userOne: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3
  },
  userTwo: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
  },
  reviewer: {
    email: 'mercy@mercy.com',
    password: 'mercy123'
  },
  writer: {
    email: 'john@john.com',
    password: 'johny123'
  },
  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 3
  },
  privateDocument: {
    title: 'private document',
    content: 'private document2',
    access: 'private'
  },
  roleDocument: {
    title: 'check role document',
    content: 'check role document1',
    access: 'reviewers',
    userId: 3,
  },
  simpleDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidUserDetails: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'myemail@yahoo',
    password: faker.internet.password(),
    roleId: 2
  },
  invalidToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE0OTM2MjQ5MTcsImV4cCI6MTQ5MzcxMTMxN30.A3dy4bPUEa3QsML03UKDjqC9wcmAjV0ub8aWu1niaL',
  folderOne: {
    folderName: 'archives',
  },
  roleOne: {
    roleName: 'newrole',
  },
  roleTwo: {
    roleName: 'tester',
  },
  admin: {
    email: 'admin@admin.com',
    password: 'PWDis123'
  },
  regularUser: {
    email: 'john@john.com',
    password: 'johny123'
  }
};