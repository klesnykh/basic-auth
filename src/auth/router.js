'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');
const bcrypt = require('bcrypt');
const {User} = require('./models');

router.post('/signin', basicAuth);
router.post('/signup', createUser);

async function createUser(req, res, next){
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (e) { res.status(403).send('Error Creating User'); }
}

module.exports = router;