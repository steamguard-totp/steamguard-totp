const axios = require('axios');

class TimeCorrector {
  constructor() {
    this.refresh();
  }

  static async getValveTime() {
    const url = 'https://api.steampowered.com/ITwoFactorService/QueryTime/v1/';
    const response = await axios.post(url, {
      responseType: 'json',
    });
    return response.data.response.server_time;
  }

  static async getTimeOffset() {
    const start = Date.now();
    let valveTime = await TimeCorrector.getValveTime() * 1000;
    const end = Date.now();

    // account for network latency
    const elapsed = end - start;
    valveTime += elapsed;

    return end - valveTime;
  }

  async refresh() {
    this.timeOffset = TimeCorrector.getTimeOffset();
  }

  async now() {
    return Date.now() - await this.timeOffset;
  }
}

module.exports = TimeCorrector;
