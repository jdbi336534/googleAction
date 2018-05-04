'use strict';

const Controller = require('egg').Controller;

class KfkController extends Controller {
  async callback() {
    let query = this.ctx.query;
    //字符按照大小写排序后，再MD5
    let str = this.config.kfktoken + query.timestamp + query.echostr;
    let strArray = str.split('');
    strArray.sort();
    let strMd5 = this.ctx.helper.md5(strArray.toString().replace(/,/g, ''));
    if (strMd5 == query.signature) {
      this.ctx.body = query.echostr;
      this.ctx.status = 200;
    } else {
      this.ctx.body = 'Error!';
      this.ctx.status = 401;
    }
  }
  async registerUID() {
    const { ctx, service, config } = this;
    const res = await service.kfk.getUID(config.info);
    if (!res) {
      ctx.body = {
        code: 500,
        msg: 'getUID Error',
      };
    }
    config.uid = res.userid;
    console.log(config.uid);
    const setconfig = await service.kfk.setConfig({
      ...config.info,
      uid: res.userid,
      url: config.callbackurl + '/setConfigCallback',
      token: config.kfktoken,
    });
    if (!setconfig) {
      ctx.body = {
        code: 500,
        msg: 'SetConfig Error',
      };
    }
    const accessToken = await service.kfk.getAccessToken({
      ...config.info,
      uid: res.userid,
      url: config.callbackurl + '/setConfigCallback',
      token: config.kfktoken,
    });
    if (!accessToken) {
      ctx.body = {
        code: 500,
        msg: 'accessToken Error',
      };
    } else {
      config.access_token = accessToken.access_token;
      ctx.body = accessToken;
    }
  }
  async sendMsg() {
    const { ctx, service, config } = this;
    if (config.access_token === '') {
      ctx.body = {
        code: 500,
        msg: 'please get access_token!',
      };
    }
    let message = ctx.request.body.message || 'test';
    // base64解密
    // let msg = new Buffer(message, 'base64').toString();
    // base64加密
    let msg = new Buffer(message).toString('base64');
    const msgResult = await service.kfk.sendMsg({
      send_uid: config.uid, // Fc5wGsTuvumvyVvyAoTR5tsbEMqGDz9Nuv
      accept_uid: 'Fc5wGsTuvumomVomDg4VMfARkvxHKA8BvY',
      msg_type: 1, // 1 文本消息，2 文件消息
      content: msg,
    });
    if (msgResult) {
      ctx.body = {
        code: 200,
        msg: '发送消息成功！',
      };
    } else {
      ctx.body = {
        code: 400,
        msg: '发生错误！',
      };
    }
  }
  async isOnline() {
    const { ctx, service, config } = this;
    let uid_list = ctx.request.body.uid_list || [];
    const accessToken = await service.kfk.commonReq('/ham_user', {
      send_uid: res.userid,
      action_type: 1,
      uid_list
    });
  }
}

module.exports = KfkController;
