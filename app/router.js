'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/echo', controller.home.echo);

  router.get('/getAccessToken', controller.kfk.registerUID);
  router.get('/setConfigCallback', controller.kfk.callback);
  router.get('/sendmsg', controller.kfk.sendMsg);
  
};
