const UserModel = require('../models/user');
const FruitModel = require('../models/fruits');
const createToken = require('../token/createToken');
const jwt = require('jsonwebtoken')

const login = async (ctx, next) => {
  let req = ctx.request.body;
  const userInfo = await UserModel.findOne({
    email: req.email,
    passwd: req.passwd
  })
  ctx.status = 200
  if (userInfo) {
    let token = createToken(req.email)
    ctx.cookies.set('token', token, {
      domain: 'localhost',
      path: '/',
      maxAge: 60 * 60 * 24 * 60 * 1000,
      // expires: new Date('2019-05-01'),
      overwrit: false
    })
    ctx.body = {
      error: 0,
      msg: '登录成功',
      data: userInfo,
      token: token
    }
  } else {
    ctx.body = {
      error: 10000,
      msg: '账户名或者密码有误'
    }
  }
}

const register = async (ctx, next) => {
  const req = ctx.request.body;
  console.log(typeof req.email)
  const userInfo = await UserModel.find({ 'email': req.email })
  console.log(userInfo)
  ctx.status = 200
  if (userInfo.length) {
    ctx.body = {
      error: 10001,
      msg: '用户名已经存在'
    }
    return;
  }
  var newUser = UserModel.create({
    passwd: req.passwd,
    email: req.email
  })
  console.log(newUser)
  if (newUser) {
    ctx.body = {
      error: 0,
      msg: '注册成功'
    }
  } else {
    ctx.body = {
      error: 10002,
      msg: '注册失败'
    }
  }
}

const collectFruit = async (ctx, next) => {
  const req = ctx.request.body
  const cookieToken = ctx.cookies.get('token')
  try {
    const tokenContext = jwt.verify(cookieToken, 'token')
    const email = tokenContext.email
    const userInfo = await UserModel.find({ email: email })
    console.log(userInfo, email)
    const collected_list = userInfo[0].collected_list
    const tempInfo = await FruitModel.find({ _id: req.id })
    console.log('req', req)
    collected_list.push(tempInfo[0])
    const update = await UserModel.updateOne({ email: email }, { $set: { collected_list: collected_list } })
    ctx.body = {
      error: 0,
      data: collected_list
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      error: 401
    }
  }
}

const cancleCollect = async (ctx, next) => {
  const req = ctx.request.body;
  const cookieToken = ctx.cookies.get('token');
  try {
    const tokenContext = await jwt.verify(cookieToken, 'token')
    const userEmail = tokenContext.email
    const userInfo = await UserModel.find({ email: userEmail })
    const collectedList = userInfo[0].collected_list
    let deletdIndex
    for (let i = 0; i < collectedList.length; i++) {
      console.log(req.id == collectedList[i]._id)
      if (req.id == collectedList[i]._id) {
        deletdIndex = i
        console.log('-0---------')
      }
    }
    // console.log('is_id', collectedList[0]._id)
    console.log('deletdIndex', deletdIndex)
    // console.log(collectedList.length)
    collectedList.splice(deletdIndex, 1)
    const updateInfo = await UserModel.updateOne({ email: userEmail }, { $set: { collected_list: collectedList } })
    // console.log('updateInfo', collectedList.length)
    ctx.body = {
      error: 0,
      msg: '取消成功',
      data: collectedList
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      error: 100010,
      msg: error
    }
  }

}

const cancleAdmire = async (ctx, next) => {
  const req = ctx.request.body;
  const cookieToken = ctx.cookies.get('token');
  try {
    const tokenContext = await jwt.verify(cookieToken, 'token')
    const userEmail = tokenContext.email
    const userInfo = await UserModel.find({ email: userEmail })
    const admiredList = userInfo[0].admired_list
    let deletdIndex
    for (let i = 0; i < admiredList.length; i++) {
      console.log(req.id == admiredList[i]._id)
      if (req.id == admiredList[i]._id) {
        deletdIndex = i
        console.log('-0---------')
      }
    }
    // console.log('is_id', collectedList[0]._id)
    console.log('deletdIndex', deletdIndex)
    // console.log(collectedList.length)
    admiredList.splice(deletdIndex, 1)
    const updateInfo = await UserModel.updateOne({ email: userEmail }, { $set: { admired_list: admiredList } })
    // console.log('updateInfo', collectedList.length)
    ctx.body = {
      error: 0,
      msg: '取消成功',
      data: admiredList
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      error: 100010,
      msg: error
    }
  }
}

const admireFruit = async (ctx, next) => {
  const req = ctx.request.body;
  const cookieToken = ctx.cookies.get('token');
  try {
    const tokenContext = jwt.verify(cookieToken, 'token')
    const email = tokenContext.email
    const userInfo = await UserModel.find({ email: email })
    const admired_list = userInfo[0].admired_list
    const tempInfo = await FruitModel.find({ _id: req.id })
    console.log('req', req)
    admired_list.push(tempInfo[0])
    const update = await UserModel.updateOne({ email: email }, { $set: { admired_list: admired_list } })
    ctx.body = {
      error: 0,
      data: admired_list
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      error: 401
    }
  }
}

const getUserInfo = async (ctx, next) => {
  const cookieToken = ctx.cookies.get('token')
  try {
    const tokenContext = jwt.verify(cookieToken, 'token')
    const userEmail = tokenContext.email
    const userInfo = await UserModel.find({ email: userEmail })
    ctx.body = {
      error: 0,
      data: userInfo[0]
    }
  } catch (error) {
    ctx.body = {
      error: 100004,
      msg: '获取信息失败'
    }
  }

}
module.exports = {
  login,
  register,
  collectFruit,
  admireFruit,
  cancleCollect,
  getUserInfo,
  cancleAdmire
}