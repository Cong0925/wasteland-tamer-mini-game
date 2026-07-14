/**
 * 全局状态管理器模块
 * 负责管理游戏的全局状态数据
 */

let instance;

export default class DataBus {
  frame = 0;
  score = 0;
  isGameOver = false;

  // 玩家数据
  playerData = null;

  constructor() {
    if (instance) return instance;

    instance = this;
  }

  /**
   * 重置游戏状态
   */
  reset() {
    this.frame = 0;
    this.score = 0;
    this.isGameOver = false;
    this.playerData = null;
  }

  /**
   * 游戏结束
   */
  gameOver() {
    this.isGameOver = true;
  }

  /**
   * 设置玩家数据
   * @param {Object} data 玩家数据
   */
  setPlayerData(data) {
    this.playerData = data;
    console.log('[DataBus] 设置玩家数据:', data);
  }

  /**
   * 获取玩家数据
   * @returns {Object} 玩家数据
   */
  getPlayerData() {
    return this.playerData;
  }

  /**
   * 更新玩家数据
   * @param {Object} updateData 更新数据
   */
  updatePlayerData(updateData) {
    if (this.playerData) {
      this.playerData = { ...this.playerData, ...updateData };
      console.log('[DataBus] 更新玩家数据:', updateData);
    }
  }

  /**
   * 检查是否有存档
   * @returns {boolean} 是否有存档
   */
  hasSaveData() {
    return this.playerData !== null;
  }
}
