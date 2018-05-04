'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async echo() {
    console.log(this.ctx.request.body);
    this.ctx.body = {
      speech: 'Seems like some problem.speak oliver',
      displayText: 'Seems like some problem.speak oliver',
      source: 'webhook-echo-sample',
    };
  }
}

module.exports = HomeController;
