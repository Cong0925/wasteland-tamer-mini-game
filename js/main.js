/**
 * 游戏主入口模块
 * 负责初始化游戏和管理页面切换
 */
import DataBus from './databus';
import MusicManager from './managers/music';
import StorageManager from './managers/storage';
import CloudManager from './managers/cloud';
import PageManager from './pages/index';

GameGlobal.databus = new DataBus();
GameGlobal.musicManager = new MusicManager();
GameGlobal.storageManager = new StorageManager();
GameGlobal.cloudManager = new CloudManager();
GameGlobal.pageManager = new PageManager();

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.init();
  }

  /**
   * 初始化游戏
   */
  async init() {
    // 初始化页面管理器
    GameGlobal.pageManager.init();

    // 检查是否有存档
    const hasSave = await this.checkSaveData();

    if (hasSave) {
      // 有存档，直接进入主界面
      GameGlobal.pageManager.navigate('home');
    } else {
      // 无存档，从Logo开始
      GameGlobal.pageManager.navigate('logo');
    }
  }

  /**
   * 检查是否有存档
   * @returns {Promise<boolean>} 是否有存档
   */
  async checkSaveData() {
    try {
      // 获取用户openid
      const openid = await GameGlobal.cloudManager.getOpenId();
      if (!openid) {
        return false;
      }

      // 查询玩家数据
      const playerData = await GameGlobal.cloudManager.getPlayer(openid);
      if (playerData) {
        // 有存档，设置到DataBus
        GameGlobal.databus.setPlayerData(playerData);
        return true;
      }

      return false;
    } catch (error) {
      console.error('[Main] 检查存档失败:', error);
      return false;
    }
  }
}
