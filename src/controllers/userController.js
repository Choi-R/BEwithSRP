const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { success, error } = require('../helpers/response')
const index = require('../models/index')
const sequelize = index.sequelize
const User = index.User
const User_Balance = index.User_Balance
const User_Balance_History = index.User_Balance_History
const Bank_Balance = index.Bank_Balance
const Bank_Balance_History = index.Bank_Balance_History
const createUB = async(userId) => {
    try {
        await User_Balance.create({
            userId: userId,
            balance: 0,
            balanceAchieve: 0
        })
    }
    catch(err) {console.log(err)}
}
const createUBH = async (userBalance, activity, type) => {
    try {
        await User_Balance_History.create({
            userBalanceId: userBalance.id,
            balanceBefore: userBalance.balance - userBalance.balanceAchieve,
            balanceAfter: userBalance.balance,
            activity: activity,
            type: type,
        })
    }
    catch(err) { console.log(err)}
}
const updateBalance = async (req, type, userId) => {
    try {
        req.body.money = type == "+" ? req.body.money : -req.body.money
        let data = await User_Balance.update({
            balance: sequelize.literal(`balance + ${req.body.money}`),
            balanceAchieve: req.body.money
        }, {
            returning: true,
            where: { userId: userId || req.user.id }
        })
        return data[1][0]
    }
    catch(err) { console.log(err) }
}

exports.register = async (req, res) => {
    try {
        let newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        createUB(newUser.id)
        success(res, newUser, 201)
    }
    catch(err) { error(res, err, 422) }
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } })
        let token = bcrypt.compareSync(req.body.password, user.password) ? jwt.sign({ id: user.id }, process.env.SECRET_KEY) : 'WRONG EMAIL OR PASSWORD'
        success(res, token, 200)
    }
    catch (err) { error(res, err, 422) }
}

exports.profile = async (req, res) => {
    try {
        let user = await User.findByPk(req.user.id, {
            include: {
                model: User_Balance,
                attributes: ['balance', 'balanceAchieve', 'updatedAt']
            }
        })
        success(res, user, 200)
    }
    catch(err) { error(res, err, 422) }
}

exports.topUp = async (req, res) => {
    try {
        let data = await updateBalance(req, "+") // user_balance.update()
        createUBH(data, 'top up', 'debit') // user_balance_history.create()
        success(res, data, 200)
    }
    catch (err) { error(res, err, 422) }
}

exports.transfer = async (req, res) => {
    try {
        let sender = await updateBalance(req, "-")
        createUBH(sender, 'transfer', 'credit')
        let receiver = await updateBalance(req, "+", req.params.id)
        createUBH(receiver, 'transfer', 'debit')
        success(res, sender, 200)
    }
    catch (err) { error(res, err, 422) }
}