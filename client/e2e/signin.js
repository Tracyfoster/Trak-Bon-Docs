const config = require('./config/config');

module.exports = {
  'User sign in without email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', 'password')
      .click('.signin-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter an email address');
  },
  'User sign in without password': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=email]', 'test@email.com')
      .setValue('input[name=password]', '')
      .click('.signin-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter a password');
  },
  'User sign in with invalid email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=email]', 'test@email')
      .setValue('input[name=password]', 'password')
      .click('.signin-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter a valid email');
  },
  'User sign in with valid credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=email]', 'test@email.com')
      .setValue('input[name=password]', 'testing')
      .click('.signin-button')
      .waitForElementVisible('#textfield-Search', config.waitFor)
      .assert.urlEquals(`${config.url}#/documents`)
      .assert.containsText('h4', 'My Documents')
      .end();
  },
};
