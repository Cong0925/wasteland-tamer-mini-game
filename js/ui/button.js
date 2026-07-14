/**
 * 按钮组件模块
 * 用于创建游戏中的可点击按钮
 */
import Emitter from '../libs/tinyemitter';

export default class Button extends Emitter {
  /**
   * 创建按钮
   * @param {Object} options - 配置选项
   * @returns {Button} 按钮实例
   */
  static create(options = {}) {
    return new Button(options);
  }

  constructor(options = {}) {
    super();

    this.options = {
      text: '',
      type: 'primary',
      size: 'medium',
      disabled: false,
      ...options
    };

    this.element = this.createElement();
    this.bindEvents();
  }

  /**
   * 创建按钮元素
   * @returns {HTMLElement} 按钮元素
   */
  createElement() {
    const { text, type, size, disabled } = this.options;

    const element = document.createElement('button');
    element.className = `btn btn-${type} btn-${size}`.trim();
    element.textContent = text;
    element.disabled = disabled;

    return element;
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    this.element.addEventListener('click', (e) => {
      if (this.options.disabled) return;

      this.emit('click', e);
    });
  }

  /**
   * 获取按钮元素
   * @returns {HTMLElement} 按钮元素
   */
  getElement() {
    return this.element;
  }

  /**
   * 设置按钮文本
   * @param {String} text - 按钮文本
   */
  setText(text) {
    this.options.text = text;
    this.element.textContent = text;
  }

  /**
   * 设置禁用状态
   * @param {Boolean} disabled - 是否禁用
   */
  setDisabled(disabled) {
    this.options.disabled = disabled;
    this.element.disabled = disabled;
  }

  /**
   * 销毁按钮
   */
  destroy() {
    this.element.remove();
  }
}
