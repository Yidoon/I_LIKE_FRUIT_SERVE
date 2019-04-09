const router = require('koa-router')()
const verifyToken = require('../token/verifyToken')

const home = require('../controller/HomeController')
const user = require('../controller/UserController')

router.get('/home/getBanner', verifyToken, home.getBanner);
router.get('/home/getBestRecommand', home.getBestRecommand);
router.get('/home/getOtherRecommand', home.getOtherRecommand);
router.get('/insertFruits', home.insertFruits);
router.post('/user/register', user.register);
router.post('/user/login', user.login);
router.post('/user/collectFruit', user.collectFruit);
router.post('/user/admireFruit', user.admireFruit);
router.post('/user/cancleCollect', user.cancleCollect);
router.post('/user/cancleAdmire', user.cancleAdmire);
router.get('/user/getUserInfo', user.getUserInfo);
module.exports = router