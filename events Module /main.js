const EventEmitter = require('events');

class AccountManager extends EventEmitter {
  constructor() {
    super();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.on('userRegistered', this.userRegister);
    this.on('userLoggedIn', this.userLoggedIn);
    this.on('passwordChanged', this.passwordChanged);
  }

  userRegister(user) {
    console.log(`Администратор: Новый пользователь зарегистрирован - ${user.email}`);
  }

  userLoggedIn(user) {
    console.log(`Администратор: Пользователь вошел в систему - ${user.email}`);
  }

  passwordChanged(user) {
    console.log(`Администратор: Пользователь изменил пароль - ${user.email}`);
  }


  registerUser(user) {
    this.emit('userRegistered', user);
  }

  loginUser(user) {
    this.emit('userLoggedIn', user);
  }

  changePassword(user) {
    this.emit('passwordChanged', user);
  }
}

const account = new AccountManager();

const user = { email: 'test@gmail.com' };

account.registerUser(user);
account.loginUser(user);
account.changePassword(user);