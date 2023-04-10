'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {User} = require('../models');

async function basicAuth(req, res){

  /*
    req.headers.authorization is : "Basic am9objpmb28="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */
  console.log(req.body, req.headers);
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop();  // am9objpmb28=
  //let decodedString = base64.decode(encodedString); // "username:password"
  console.log(base64.decode(encodedString), encodedString);
  let [username, password] = base64.decode(encodedString).split(':'); // username, password
  console.log(basicHeaderParts);
  console.log(encodedString);
  // console.log(decodedString);
  console.log(password);
  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    const user = await User.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

}

module.exports = basicAuth;