/**
 * 云开发管理器模块
 * 负责处理微信云开发相关操作
 */

import gameConfig from '../config/gameConfig';

export default class CloudManager {
  constructor() {
    this.db = null;
    this.envId = gameConfig.cloud.envId;
    this.init();
  }

  /**
   * 初始化云开发
   */
  init() {
    try {
      if (typeof wx !== 'undefined' && wx.cloud) {
        wx.cloud.init({
          env: this.envId,
          traceUser: gameConfig.cloud.traceUser
        });
        this.db = wx.cloud.database();
        console.log('[云开发] 初始化成功，环境ID:', this.envId);
      } else {
        console.error('[云开发] 当前环境不支持云开发');
      }
    } catch (error) {
      console.error('[云开发] 初始化失败:', error);
    }
  }

  /**
   * 获取用户openid
   * @returns {Promise<string>} 用户openid
   */
  async getOpenId() {
    try {
      if (!this.db) {
        throw new Error('云开发未初始化');
      }

      const res = await wx.cloud.callFunction({
        name: 'getOpenId'
      });
      return res.result.openid;
    } catch (error) {
      console.error('[云开发] 获取openid失败:', error);
      throw error;
    }
  }

  /**
   * 创建玩家数据
   * @param {Object} playerData 玩家数据
   * @returns {Promise<Object>} 创建结果
   */
  async createPlayer(playerData) {
    try {
      if (!this.db) {
        throw new Error('云开发未初始化');
      }

      const res = await this.db.collection('players').add({
        data: {
          ...playerData,
          createTime: this.db.serverDate(),
          lastLogin: this.db.serverDate()
        }
      });
      console.log('[云开发] 创建玩家成功:', res._id);
      return { success: true, id: res._id };
    } catch (error) {
      console.error('[云开发] 创建玩家失败:', error);
      throw error;
    }
  }

  /**
   * 获取玩家数据
   * @param {string} openid 用户openid
   * @returns {Promise<Object>} 玩家数据
   */
  async getPlayer(openid) {
    try {
      if (!this.db) {
        throw new Error('云开发未初始化');
      }

      const res = await this.db.collection('players').where({
        _openid: openid
      }).get();

      if (res.data.length > 0) {
        console.log('[云开发] 获取玩家成功');
        return res.data[0];
      }
      return null;
    } catch (error) {
      console.error('[云开发] 获取玩家失败:', error);
      throw error;
    }
  }

  /**
   * 更新玩家数据
   * @param {string} openid 用户openid
   * @param {Object} updateData 更新数据
   * @returns {Promise<Object>} 更新结果
   */
  async updatePlayer(openid, updateData) {
    try {
      if (!this.db) {
        throw new Error('云开发未初始化');
      }

      const res = await this.db.collection('players').where({
        _openid: openid
      }).update({
        data: {
          ...updateData,
          lastLogin: this.db.serverDate()
        }
      });
      console.log('[云开发] 更新玩家成功');
      return { success: true };
    } catch (error) {
      console.error('[云开发] 更新玩家失败:', error);
      throw error;
    }
  }

  /**
   * 删除玩家数据
   * @param {string} openid 用户openid
   * @returns {Promise<Object>} 删除结果
   */
  async deletePlayer(openid) {
    try {
      if (!this.db) {
        throw new Error('云开发未初始化');
      }

      const res = await this.db.collection('players').where({
        _openid: openid
      }).remove();
      console.log('[云开发] 删除玩家成功');
      return { success: true };
    } catch (error) {
      console.error('[云开发] 删除玩家失败:', error);
      throw error;
    }
  }
}
