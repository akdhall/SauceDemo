export const users = {
  validUser: { username: 'standard_user', password: 'secret_sauce' },
  lockedOutUser: { username: 'locked_out_user', password: 'secret_sauce' },
  invalidUser: { username: 'invalid_user', password: 'invalid_password' },
  emptyUsername: { username: '', password: 'secret_sauce' },
  emptyPassword: { username: 'standard_user', password: '' },
  emptyCredentials: { username: '', password: '' },
  wrongPassword: { username: 'standard_user', password: 'wrong_Password' },
  wrongUsername: { username: 'wrong_username', password: 'secret_sauce' },
  caseSensitiveUser: { username: 'STANDARD_USER', password: 'SECRET_SAUCE' },
  usernameWithSpaces: { username: ' standard_user ', password: 'secret_sauce' },
  specialCharUser: { username: 'standard_user!@#', password: 'secret_sauce' },
  longUsername: { username: 'a'.repeat(300), password: 'secret_sauce' }
};

export const errorMessages = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  invalid: 'Epic sadface: Username and password do not match any user in this service',
  emptyUsername: 'Epic sadface: Username is required',
  emptyPassword: 'Epic sadface: Password is required',
  emptyCredentials: 'Epic sadface: Username is required',
};

export const negativeScenarios = [
  {
    name: 'Locked Out User',
    user: users.lockedOutUser,
    expectedErrorKey: 'lockedOut',
  },
  {
    name: 'Invalid User',
    user: users.invalidUser,
    expectedErrorKey: 'invalid',
  },
  {
    name: 'Invalid UserName',
    user: users.wrongUsername,
    expectedErrorKey: 'invalid',
  },
   {
    name: 'Invalid Password',
    user: users.wrongPassword,
    expectedErrorKey: 'invalid',
  },
  {
    name: 'CaseSensitive User',
    user: users.caseSensitiveUser,
    expectedErrorKey: 'invalid',
  },
  {
    name: 'UserNameWithSpace',
    user: users.usernameWithSpaces,
    expectedErrorKey: 'invalid',
  },
 {
    name: 'Special Characters',
    user: users.specialCharUser,
    expectedErrorKey: 'invalid'
  },
   {
    name: 'long Username',
    user: users.longUsername,
    expectedErrorKey: 'invalid'
  },
  {
    name: 'Empty Username',
    user: users.emptyUsername,
    expectedErrorKey: 'emptyUsername'
  },
  {
    name: 'Empty Password',
    user: users.emptyPassword,
    expectedErrorKey: 'emptyPassword'
  },
  {
    name: 'Empty Credentials',
    user: users.emptyCredentials,
    expectedErrorKey: 'emptyCredentials'
  },
];

export const expectedProducts = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)'
];

export const sortOptions = {
    NAME_ASC: 'az',
    NAME_DESC: 'za',
    PRICE_LOW_HIGH: 'lohi',
    PRICE_HIGH_LOW: 'hilo'
};

export const ProductsToRemove = [
  'Sauce Labs Bike Light',
  'Sauce Labs Fleece Jacket',
  ];