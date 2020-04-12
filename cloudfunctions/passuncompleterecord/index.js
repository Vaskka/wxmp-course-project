// 云函数入口文件
const GATEWAY = "https://vaskka.com/mpc"
const got = require('got');
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let type = event.type == 'battery' ? true : false;

  if (type) {
    await got(GATEWAY + '/batteryorder/change/' + String(event.id), {
      method: 'PUT',
      headers: {
        accept: "*/*"
      }
    });
  }
  else {
    await got(GATEWAY + '/drinkorder/change/' + String(event.id), {
      method: 'PUT',
      headers: {
        accept: "*/*"
      }
    });
  }

  return {
    status: 'success',
    reason: 'success'
  }
}