const jwt = require('jsonwebtoken');
const userData = {
  id: 123,
  name: 'John Doe',
  email: 'johndoe@example.com'
};
const secretKey = 'mysecretkey';
const token = jwt.sign(userData, secretKey);
console.log(token);
const decoded = jwt.verify(token, secretKey);
console.log(decoded);