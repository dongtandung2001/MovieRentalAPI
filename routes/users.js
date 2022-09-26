const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const _ = require('lodash');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already existed');


    // encrypt password using 'bcrypt'
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // dont send password back to the respond
    // use Lodash JS
    // return new object with chosen properties

    res.send(_.pick(user, ['_id','name', 'email']));

    
});


module.exports = router;