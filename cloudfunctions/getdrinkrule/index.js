/**
 * 
 * 
 * 获取奶茶兑换规则
 */
const GATEWAY = "https://vaskka.com/mpc"
// moment
const moment = require("moment-timezone");

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// database
const db = cloud.database({ env: "vaskka-d208x"});

// collection
const coll = db.collection("drink_rule");


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = { serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS")};

  result.status = "SUCCESS";
  result.reason = "success";

  result.rules = [];

  await coll.get().then(function(res) {
    result.rules = res.data;
  });

  return result;

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}