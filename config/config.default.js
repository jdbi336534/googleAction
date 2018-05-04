'use strict';

module.exports = appInfo => {
  const config = (exports = {
    security: {
      csrf: {
        enable: false,
      },
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524796185288_9716';

  // add your config here
  config.middleware = [];

  config.reqUrl = 'http://hs.kaifakuai.com:8184';
  config.info = {
    appkey: 'b2ce041a-ae7e-010001',
    secretkey: 'b8db10692edcf31b64c65bb9aa9615c8',
    username: 'google',
    nickname: 'google home',
  };
  config.callbackurl = 'http://eleps.iok.la:29236';
  config.kfktoken = 'googlehomeandkaifakuai';
  config.access_token = '';
  config.uid = '';

  return config;
};
