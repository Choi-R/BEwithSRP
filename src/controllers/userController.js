const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {success, error} = require('../helpers/response')
const index = require('../models/index')
const User = index.User

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({where: { email: req.body.email }})
        let token = bcrypt.compareSync(req.body.password, user.password) ? jwt.sign({id: user.id}, process.env.SECRET_KEY) : 'WRONG EMAIL OR PASSWORD'
        success(res, token, 200)
    }
    catch(err) {error(res, err, 422)}
}