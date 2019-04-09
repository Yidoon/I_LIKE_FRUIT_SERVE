const fruitModel = require('../models/fruits')

class HomeController {
    async getBanner(ctx, next) {
        console.log('mes', ctx.tokenMes)
        const isLogin = ctx.isLogin
        const userInfo = ctx.userInfo[0]
        const data = await fruitModel.find({isBanner: true})
        ctx.body = {
            data,
            isLogin,
            userInfo
        }
    }
    async getBestRecommand (ctx, next) {
        const data = await fruitModel.find({ hot: '1'})
        ctx.body = {
            data
        }
    }

    async getOtherRecommand (ctx, next) {
        const data = await fruitModel.find({isBanner: false})
        ctx.body = {
            data
        }
    }

    async insertFruits (ctx, next) {
        const data = [
            {
                name: '香蕉',
                description: '好吃',
                up_time_season: '春季',
                up_time_month: '3-8',
                keep_fresh: '三天',
                hot: '1',
                belong_province: '450000',
                belong_city: '450100',
                belong_region: '450102',
                price_min: '2',
                price_max: '4',
                price: '2-4',
                best_buy: '春季三月份，这个时候产量大价格实惠',
                imgPath: 'http://localhost:3000/images/2.jpg',
                tasty: '好吃',
                nutrition: '膳食纤维',
                un_fit: '糖尿病患者',
                isBanner: true
            },
            {
                name: '香蕉',
                description: '好吃',
                up_time_season: '春季',
                up_time_month: '3-8',
                keep_fresh: '三天',
                hot: '1',
                belong_province: '450000',
                belong_city: '450100',
                belong_region: '450102',
                price_min: '2',
                price_max: '4',
                price: '2-4',
                best_buy: '春季三月份，这个时候产量大价格实惠',
                imgPath: 'http://localhost:3000/images/2.jpg',
                tasty: '好吃',
                nutrition: '膳食纤维',
                un_fit: '糖尿病患者',
                isBanner: true
            },
            {
                name: '香蕉',
                description: '好吃',
                up_time_season: '春季',
                up_time_month: '3-8',
                keep_fresh: '三天',
                hot: '1',
                belong_province: '450000',
                belong_city: '450100',
                belong_region: '450102',
                price_min: '2',
                price_max: '4',
                price: '2-4',
                best_buy: '春季三月份，这个时候产量大价格实惠',
                imgPath: 'http://localhost:3000/images/2.jpg',
                tasty: '好吃',
                nutrition: '膳食纤维',
                un_fit: '糖尿病患者',
                isBanner: true
            },
            {
                name: '香蕉',
                description: '好吃',
                up_time_season: '春季',
                up_time_month: '3-8',
                keep_fresh: '三天',
                hot: '1',
                belong_province: '450000',
                belong_city: '450100',
                belong_region: '450102',
                price_min: '2',
                price_max: '4',
                price: '2-4',
                best_buy: '春季三月份，这个时候产量大价格实惠',
                imgPath: 'http://localhost:3000/images/2.jpg',
                tasty: '好吃',
                nutrition: '膳食纤维',
                un_fit: '糖尿病患者',
                isBanner: true
            }
        ]
        const a =  fruitModel.insertMany(data)
        ctx.body = {
            a
        }
    }
}

module.exports = new HomeController()