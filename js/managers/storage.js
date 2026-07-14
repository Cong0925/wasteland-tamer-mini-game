/**
 * 存储管理器模块
 * 负责游戏存档的读写
 */
let instance;

export default class StorageManager {
  constructor() {
    if (instance) return instance;

    instance = this;
  }

  /**
   * 保存数据
   * @param {String} key - 存储键
   * @param {*} value - 存储值
   */
  save(key, value) {
    try {
      wx.setStorageSync(key, value);
    } catch (error) {
      console.error('[StorageManager] 保存数据失败:', error);
    }
  }

  /**
   * 读取数据
   * @param {String} key - 存储键
   * @param {*} defaultValue - 默认值
   * @returns {*} 存储值
   */
  load(key, defaultValue = null) {
    try {
      const value = wx.getStorageSync(key);
      return value !== '' ? value : defaultValue;
    } catch (error) {
      console.error('[StorageManager] 读取数据失败:', error);
      return defaultValue;
    }
  }

  /**
   * 删除数据
   * @param {String} key - 存储键
   */
  remove(key) {
    try {
      wx.removeStorageSync(key);
    } catch (error) {
      console.error('[StorageManager] 删除数据失败:', error);
    }
  }

  /**
   * 清空所有数据
   */
  clear() {
    try {
      wx.clearStorageSync();
    } catch (error) {
      console.error('[StorageManager] 清空数据失败:', error);
    }
  }
}
