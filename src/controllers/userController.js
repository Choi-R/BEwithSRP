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

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } })
        let token = bcrypt.compareSync(req.body.password, user.password) ? jwt.sign({ id: user.id }, process.env.SECRET_KEY) : 'WRONG EMAIL OR PASSWORD'
        success(res, token, 200)
    }
    catch (err) { error(res, err, 422) }
}

exports.topUp = async (req, res) => {
    try {
        let data = await updateBalance(req, "+")
        createUBH(data, 'top up', 'debit')
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