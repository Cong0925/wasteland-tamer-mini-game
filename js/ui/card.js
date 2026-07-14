/**
 * 卡片组件模块
 * 用于创建游戏中的卡片式界面元素
 */
import Emitter from '../libs/tinyemitter';

export default class Card extends Emitter {
  /**
   * 创建卡片
   * @param {Object} options - 配置选项
   * @returns {Card} 卡片实例
   */
  static create(options = {}) {
    return new Card(options);
  }

  constructor(options = {}) {
    super();

    this.options = {
      title: '',
      content: '',
      footer: '',
      ...options
    };

    this.element = this.createElement();
    this.bindEvents();
  }

  /**
   * 创建卡片元素
   * @returns {HTMLElement} 卡片元素
   */
  createElement() {
    const { title, content, footer } = this.options;

    const element = document.createElement('div');
    element.className = 'card';

    let html = '';

    if (title) {
      html += `<div class="card-header">${title}</div>`;
    }

    html += `<div class="card-body">${content}</div>`;

    if (footer) {
      html += `<div class="card-footer">${footer}</div>`;
    }

    element.innerHTML = html;

    return element;
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    this.element.addEventListener('click', (e) => {
      this.emit('click', e);
    });
  }

  /**
   * 获取卡片元素
   * @returns {HTMLElement} 卡片元素
   */
  getElement() {
    return this.element;
  }

  /**
   * 设置卡片内容
   * @param {String} content - 卡片内容
   */
  setContent(content) {
    this.options.content = content;
    const body = this.element.querySelector('.card-body');
    if (body) {
      body.innerHTML = content;
    }
  }

  /**
   * 销毁卡片
   */
  destroy() {
    this.element.remove();
  }
}
