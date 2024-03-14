const crypto = require('crypto');

// Create a hash object
const hash = crypto.createHash('sha256');

// Data to be hashed
const data = 'A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.A wiki is a form of online hypertext publication that is collaboratively edited and managed by its own audience directly through a web browser.';

// Update the hash object with the data
hash.update(data);

// Generate the hashed value in hexadecimal format
const hashedValue = hash.digest('hex');

console.log('SHA-256 Hash:', hashedValue);
