/**
 * 获取电池积分的接口
 * over
 * 
 */
const GATEWAY = "https://vaskka.com/mpc"
const got = require('got');

const moment = require('moment-timezone');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let resu = {
    serv_datetime: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS"),
    status: "SUCCESS",
    reason: "success",
  };

  let resp = await got(GATEWAY + '/drinkorder/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    }
  });

  resu.orders = JSON.parse(resp.body).data;

  return resu;
}