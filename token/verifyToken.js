const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization');
  const cookieToken = ctx.cookies.get('token')
  if (!authorization) {
    ctx.body = {
      status: 401,
      error: 401,
      userStatus: 'notLogin'
    }
  }
  const token = authorization.split('')[1];
  let tokenContext;
  try {
    tokenContext = await jwt.verify(cookieToken, 'token');
    console.log('tokenContext', tokenContext.email)
     const userEmail = tokenContext.email
     const userInfo = await userModel.find({email: userEmail})
    ctx.isLogin = true
    ctx.userInfo = userInfo
  } catch (error) {
    ctx.isLogin = false
  }
  await next();
}