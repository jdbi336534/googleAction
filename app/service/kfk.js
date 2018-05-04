'use strtic';

const Service = require('egg').Service;

class KfkService extends Service {
  // 获取getUID
  async getUID(data) {
    const { ctx, config } = this;
    const result = await ctx.curl(config.reqUrl + '/ham_add_user', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    if (result.status === 200) {
      if (result.data && result.data.code === 0) {
        return result.data;
      }
      return null;
    }
    return null;
  }
  // setConfig
  async setConfig(data) {
    const { ctx, config } = this;
    const result = await ctx.curl(config.reqUrl + '/set_config', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    if (result.status === 200) {
      if (result.data && result.data.code === 0) {
        return result.data;
      }
      return null;
    }
    return null;
  }
  // 获取获取AccessToken，AccessToken默认有效时间是7200秒（2小时）
  async getAccessToken(data) {
    const { ctx, config } = this;
    const result = await ctx.curl(config.reqUrl + '/get_access_token', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    if (result.status === 200) {
      if (result.data && result.data.code === 0) {
        return result.data;
      }
      return null;
    }
    return null;
  }
  async sendMsg(data) {
    const { ctx, config } = this;
    const result = await ctx.curl(
      config.reqUrl + '/send_msg?access_token=' + config.access_token,
      {
        method: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      }
    );
    if (result.status === 200) {
      if (result.data && result.data.code === 0) {
        return result.data;
      }
      return null;
    }
    return null;
  }
  async commonReq(path, data) {
    const { ctx, config } = this;
    const result = await ctx.curl(
      config.reqUrl + path + '?access_token=' + config.access_token,
      {
        method: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      }
    );
    if (result.status === 200) {
      if (result.data && result.data.code === 0) {
        return result.data;
      }
      return null;
    }
    return null;
  }
}
module.exports = KfkService;
