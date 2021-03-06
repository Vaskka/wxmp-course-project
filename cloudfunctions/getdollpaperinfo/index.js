/**
 * 获去抓娃娃券的信息
 * over
 */
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
    status: "SUCCESS",
    reason: "success",
  }

  let resp = await got(GATEWAY + '/dollpaper/get/' + wxContext.OPENID, {
    method: 'GET',
    headers: {
      accept: "*/*"
    }

  });

  let resp_obj = JSON.parse(resp.body);

  if (resp_obj.data == 0) {
    result.doll_paper = [];
  }
  else {
    result.doll_paper = resp_obj.data;
  }
  return result;
}