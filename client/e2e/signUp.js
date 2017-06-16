const config = require('./config/config');

module.exports = {
  'User sign up without firstName': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', '')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', 'jamigo@email.com')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', 'jamigo')
      .click('button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter your first name');
  },

  'User sign up without lastName': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', '')
      .setValue('input[name=email]', 'jamigo@email.com')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', 'jamigo')
      .click('.signup-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter your last name');
  },

  'User sign up without email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', 'jamigo')
      .click('.signup-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter an email address');
  },
  'User sign up with invalid email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', 'jamigo@email')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', 'jamigo')
      .click('.signup-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter a valid email');
  },
  'User sign up without password': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', 'jamigo@email.com')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', 'jamigo')
      .click('.signup-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please enter a password');
  },

  'User sign up without confirmPassword': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', 'jamigo@email.com')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', '')
      .click('.signup-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'please confirm your password');
  },

  'User sign up without matching password and confirmPassword': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', 'jamigo@email.com')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', 'jami')
      .click('.signup-button')
      .waitForElementVisible('#toast-container', config.waitFor)
      .assert.containsText('.toast-message', 'password does not match');
  },

  'User sign up with valid credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.signup-tab')
      .setValue('input[name=firstName]', 'Ugoeze')
      .setValue('input[name=lastName]', 'James')
      .setValue('input[name=email]', 'jamigo@email.com')
      .setValue('input[name=password]', 'jamigo')
      .setValue('input[name=confirmPassword]', 'jamigo')
      .click('.signup-button')
      .waitForElementVisible('#textfield-Search', config.waitFor)
      .assert.urlEquals(`${config.url}#/documents`)
      .assert.containsText('h4', 'My Documents')
      .end();
  },
};
