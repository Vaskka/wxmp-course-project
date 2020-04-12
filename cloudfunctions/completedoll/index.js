// 云函数入口文件
const GATEWAY = "https://vaskka.com/mpc"
const moment = require('moment-timezone');

const got = require('got');


const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  let result = {
    serv_time: moment.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:SS")
  }

  await got(GATEWAY + '/dollpaper/change/' + event.doll_id, {
    method: "PUT",
    json: true
  }).then(function (res) {
    result.status = "SUCCESS";
    result.reason = "success";
  });

  return result;
}