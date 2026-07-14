/**
 * 页面管理器模块
 * 负责页面的初始化和切换
 */

import LogoPage from './logo';
import ProloguePage from './prologue';
import CharacterCreatePage from './characterCreate';
import TutorialPage from './tutorial';
import HomePage from './home';

let instance;

export default class PageManager {
  currentPage = null;
  pages = {};

  constructor() {
    if (instance) return instance;

    instance = this;
  }

  /**
   * 初始化页面管理器
   */
  init() {
    // 注册所有页面
    this.register('logo', new LogoPage());
    this.register('prologue', new ProloguePage());
    this.register('characterCreate', new CharacterCreatePage());
    this.register('tutorial', new TutorialPage());
    this.register('home', new HomePage());

    console.log('[PageManager] 初始化完成');
  }

  /**
   * 注册页面
   * @param {String} name - 页面名称
   * @param {Object} page - 页面对象
   */
  register(name, page) {
    this.pages[name] = page;
    console.log('[PageManager] 注册页面:', name);
  }

  /**
   * 导航到指定页面
   * @param {String} name - 页面名称
   */
  navigate(name) {
    if (!this.pages[name]) {
      console.error('[PageManager] 页面不存在:', name);
      return;
    }

    // 销毁当前页面
    if (this.currentPage && this.pages[this.currentPage]) {
      this.pages[this.currentPage].destroy();
    }

    this.currentPage = name;

    // 初始化新页面
    this.pages[name].init();

    console.log('[PageManager] 导航到页面:', name);
  }

  /**
   * 获取当前页面
   * @returns {Object} 当前页面对象
   */
  getCurrentPage() {
    if (this.currentPage && this.pages[this.currentPage]) {
      return this.pages[this.currentPage];
    }
    return null;
  }

  /**
   * 处理触摸开始事件
   * @param {Number} x - 触摸x坐标
   * @param {Number} y - 触摸y坐标
   */
  onTouchStart(x, y) {
    const page = this.getCurrentPage();
    if (page && page.onTouchStart) {
      page.onTouchStart(x, y);
    }
  }

  /**
   * 处理触摸移动事件
   * @param {Number} x - 触摸x坐标
   * @param {Number} y - 触摸y坐标
   */
  onTouchMove(x, y) {
    const page = this.getCurrentPage();
    if (page && page.onTouchMove) {
      page.onTouchMove(x, y);
    }
  }
}
