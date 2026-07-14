/**
 * 列表组件模块
 * 用于创建游戏中的可滚动列表
 */
import Emitter from '../libs/tinyemitter';

export default class List extends Emitter {
  /**
   * 创建列表
   * @param {Object} options - 配置选项
   * @returns {List} 列表实例
   */
  static create(options = {}) {
    return new List(options);
  }

  constructor(options = {}) {
    super();

    this.options = {
      items: [],
      renderItem: null,
      ...options
    };

    this.element = this.createElement();
    this.renderItems();
    this.bindEvents();
  }

  /**
   * 创建列表元素
   * @returns {HTMLElement} 列表元素
   */
  createElement() {
    const element = document.createElement('div');
    element.className = 'list';

    return element;
  }

  /**
   * 渲染列表项
   */
  renderItems() {
    const { items, renderItem } = this.options;

    if (!renderItem) return;

    this.element.innerHTML = '';

    items.forEach((item, index) => {
      const itemElement = renderItem(item, index);
      itemElement.dataset.index = index;
      this.element.appendChild(itemElement);
    });
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    this.element.addEventListener('click', (e) => {
      const itemElement = e.target.closest('[data-index]');
      if (!itemElement) return;

      const index = parseInt(itemElement.dataset.index, 10);
      const item = this.options.items[index];

      this.emit('itemClick', { item, index });
    });
  }

  /**
   * 获取列表元素
   * @returns {HTMLElement} 列表元素
   */
  getElement() {
    return this.element;
  }

  /**
   * 更新列表数据
   * @param {Array} items - 新的列表数据
   */
  updateItems(items) {
    this.options.items = items;
    this.renderItems();
  }

  /**
   * 销毁列表
   */
  destroy() {
    this.element.remove();
  }
}
