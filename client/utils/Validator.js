import checkIt from 'lodash-checkit';

export default class Validator {

  static signIn(userInput) {
    if (!userInput.email) {
      return 'please enter an email address';
    }

    if (!checkIt.isEmail(userInput.email)) {
      return 'please enter a valid email';
    }

    if (!userInput.password) {
      return 'please enter a password';
    }

    return true;
  }

  static signUp(userInput) {
    if (!userInput.firstName) {
      return 'please enter your first name';
    }

    if (!userInput.lastName) {
      return 'please enter your last name';
    }

    if (!userInput.email) {
      return 'please enter an email address';
    }

    if (!checkIt.isEmail(userInput.email)) {
      return 'please enter a valid email';
    }

    if (!userInput.password) {
      return 'please enter a password';
    }

    if (!userInput.confirmPassword) {
      return 'please confirm your password';
    }

    if (!userInput.password === userInput.confirmPassword) {
      return 'password does not match';
    }
    return true;
  }
}
