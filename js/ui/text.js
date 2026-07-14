/**
 * 文字组件模块
 * 用于显示游戏中的文字内容
 */
export default class Text {
  /**
   * 创建文字元素
   * @param {String} content - 文字内容
   * @param {Object} options - 配置选项
   * @returns {HTMLElement} 文字元素
   */
  static create(content, options = {}) {
    const {
      className = '',
      type = 'body',
      align = 'left'
    } = options;

    const element = document.createElement('div');
    element.className = `text text-${type} ${className}`.trim();
    element.style.textAlign = align;
    element.textContent = content;

    return element;
  }

  /**
   * 创建标题文字
   * @param {String} content - 标题内容
   * @param {Object} options - 配置选项
   * @returns {HTMLElement} 标题元素
   */
  static title(content, options = {}) {
    return Text.create(content, { ...options, type: 'title' });
  }

  /**
   * 创建副标题文字
   * @param {String} content - 副标题内容
   * @param {Object} options - 配置选项
   * @returns {HTMLElement} 副标题元素
   */
  static subtitle(content, options = {}) {
    return Text.create(content, { ...options, type: 'subtitle' });
  }

  /**
   * 创建描述文字
   * @param {String} content - 描述内容
   * @param {Object} options - 配置选项
   * @returns {HTMLElement} 描述元素
   */
  static description(content, options = {}) {
    return Text.create(content, { ...options, type: 'description' });
  }

  /**
   * 创建强调文字
   * @param {String} content - 强调内容
   * @param {Object} options - 配置选项
   * @returns {HTMLElement} 强调元素
   */
  static emphasis(content, options = {}) {
    return Text.create(content, { ...options, type: 'emphasis' });
  }

  /**
   * 创建提示文字
   * @param {String} content - 提示内容
   * @param {Object} options - 配置选项
   * @returns {HTMLElement} 提示元素
   */
  static hint(content, options = {}) {
    return Text.create(content, { ...options, type: 'hint' });
  }
}
