const config = require('./config/config');

module.exports = {
  'User can create a document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=email]', 'test@email.com')
      .setValue('input[name=password]', 'testing')
      .click('.signin-button')
      .waitForElementVisible('#textfield-Search', config.waitFor)
      .assert.urlEquals(`${config.url}#/documents`)
      .click('.add-document-button')
      .waitForElementVisible('.quill', config.waitFor)
      .assert.urlEquals(`${config.url}#/editor`)
      .setValue('input[name="title"]', 'My awesome document')
      .click('select[id="access"] option[value="private"]')
      .setValue('.ql-editor', 'My awesome document content goes here')
      .click('button.save-document-button')
      .waitForElementVisible('#textfield-Search', config.waitFor)
      .assert.urlEquals(`${config.url}#/documents`);
  },
  'User can read a document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .setValue('input[name=email]', 'test@email.com')
      .setValue('input[name=password]', 'testing')
      .click('.signin-button')
      .waitForElementVisible('#textfield-Search', config.waitFor)
      .assert.urlEquals(`${config.url}#/documents`)
      .waitForElementVisible('.read-button', config.waitFor)
      .click('.read-button')
      .waitForElementVisible('.mdl-dialog', config.waitFor)
      .assert.containsText('h4.mdl-dialog__title', 'My awesome document')
      .assert.containsText('.mdl-dialog__content', 'My awesome document content goes here')
      .end();
  },

};
