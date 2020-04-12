// 云函数入口文件
const GATEWAY = "https://vaskka.com/mpc"

const got = require('got');

const moment = require('moment-timezone');

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = {
    serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS"),
    orders : null
  }

  await got(GATEWAY + '/batteryorder/get/' + wxContext.OPENID, {
    method: 'GET'
  }).then(function (resolve) {
    let list = JSON.parse(resolve.body).data;

    result.orders = list;
  });

  return result;

}