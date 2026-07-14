/**
 * 新手教程页面模块
 * 负责处理新手教程的5个场景
 */

import gameConfig from '../config/gameConfig';

export default class TutorialPage {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentScene = 0;
    this.isTyping = false;
    this.charIndex = 0;
    this.typingTimer = null;
  }

  /**
   * 初始化新手教程页面
   */
  init() {
    this.canvas = GameGlobal.canvas;
    this.ctx = GameGlobal.ctx;
    this.currentScene = 0;
    this.isTyping = false;
    this.charIndex = 0;
    this.draw();
    this.startTyping();
  }

  /**
   * 将文字按最大宽度自动换行
   */
  wrapText(text, maxWidth, font) {
    this.ctx.font = font;
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // 遇到\n直接换行
      if (char === '\n') {
        lines.push(currentLine);
        currentLine = '';
        continue;
      }

      const testLine = currentLine + char;
      const metrics = this.ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * 绘制新手教程页面
   */
  draw() {
    const { width, height } = this.canvas;

    // 清空画布
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, width, height);

    if (this.currentScene < gameConfig.tutorialScenes.length) {
      const scene = gameConfig.tutorialScenes[this.currentScene];

      // 绘制场景标题
      this.ctx.fillStyle = '#d4a574';
      this.ctx.font = 'bold 24px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(scene.title, width / 2, 40);

      // 绘制教学提示
      this.ctx.fillStyle = '#ffd700';
      this.ctx.font = '14px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('【教学：' + scene.teaching + '操作】', width / 2, 70);

      // 绘制分隔线
      this.ctx.strokeStyle = '#555';
      this.ctx.beginPath();
      this.ctx.moveTo(30, 90);
      this.ctx.lineTo(width - 30, 90);
      this.ctx.stroke();

      // 绘制场景内容（打字效果 + 自动换行）
      const fullContent = scene.content;
      const displayContent = fullContent.substring(0, this.charIndex);

      const font = '16px sans-serif';
      const maxWidth = width - 60; // 左右各留30px边距
      const wrappedLines = this.wrapText(displayContent, maxWidth, font);

      this.ctx.fillStyle = '#e0e0e0';
      this.ctx.font = font;
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'top';

      const lineHeight = 28;
      const contentStartY = 110;
      const maxContentHeight = height / 2 - 20; // 内容最多占屏幕上半部分

      wrappedLines.forEach((line, index) => {
        const y = contentStartY + index * lineHeight;
        if (y < contentStartY + maxContentHeight) {
          this.ctx.fillText(line, 30, y);
        }
      });

      // 如果打字完成，绘制选择按钮
      if (!this.isTyping && this.charIndex >= fullContent.length) {
        this.drawChoices(scene.choices);
      }
    } else {
      // 新手教程结束
      this.drawTutorialEnd();
    }
  }

  /**
   * 绘制选择按钮
   */
  drawChoices(choices) {
    const { width, height } = this.canvas;
    const buttonWidth = 200;
    const buttonHeight = 40;
    const spacing = 15;
    const totalHeight = choices.length * (buttonHeight + spacing) - spacing;
    const startY = height / 2 + 30;

    choices.forEach((choice, index) => {
      const y = startY + index * (buttonHeight + spacing);
      this.drawButton(choice.text, width / 2, y, buttonWidth, buttonHeight);
    });
  }

  /**
   * 绘制按钮
   */
  drawButton(text, x, y, width, height) {
    // 绘制按钮背景
    this.ctx.fillStyle = '#8b4513';
    this.ctx.fillRect(x - width / 2, y - height / 2, width, height);

    // 绘制按钮边框
    this.ctx.strokeStyle = '#d4a574';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    this.ctx.lineWidth = 1;

    // 绘制按钮文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
  }

  /**
   * 绘制新手教程结束页面
   */
  drawTutorialEnd() {
    const { width, height } = this.canvas;

    // 绘制提示文字
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('新手教程完成！', width / 2, height / 3);

    // 绘制说明文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText('你已经学会了基本操作。', width / 2, height / 3 + 40);
    this.ctx.fillText('现在可以开始你的冒险了！', width / 2, height / 3 + 70);

    // 绘制"开始游戏"按钮
    this.drawButton('开始游戏', width / 2, height / 2 + 50, 200, 50);
  }

  /**
   * 开始打字效果
   */
  startTyping() {
    if (this.currentScene >= gameConfig.tutorialScenes.length) {
      return;
    }

    const scene = gameConfig.tutorialScenes[this.currentScene];
    this.isTyping = true;
    this.charIndex = 0;

    this.typingTimer = setInterval(() => {
      this.charIndex++;
      this.draw();

      if (this.charIndex >= scene.content.length) {
        clearInterval(this.typingTimer);
        this.isTyping = false;
        this.draw();
      }
    }, 50);
  }

  /**
   * 处理触摸事件
   */
  onTouchStart(x, y) {
    const { width, height } = this.canvas;

    // 如果正在打字，点击跳过打字效果
    if (this.isTyping) {
      clearInterval(this.typingTimer);
      this.isTyping = false;
      this.charIndex = gameConfig.tutorialScenes[this.currentScene].content.length;
      this.draw();
      return;
    }

    // 如果是结束页面，检查是否点击了"开始游戏"按钮
    if (this.currentScene >= gameConfig.tutorialScenes.length) {
      if (y >= height / 2 + 25 && y <= height / 2 + 75 &&
          x >= width / 2 - 100 && x <= width / 2 + 100) {
        GameGlobal.pageManager.navigate('home');
        return;
      }
      return;
    }

    // 检查是否点击了选择按钮
    const scene = gameConfig.tutorialScenes[this.currentScene];
    const buttonWidth = 200;
    const buttonHeight = 40;
    const spacing = 15;
    const startY = height / 2 + 30;

    scene.choices.forEach((choice, index) => {
      const buttonY = startY + index * (buttonHeight + spacing);
      if (y >= buttonY - buttonHeight / 2 && y <= buttonY + buttonHeight / 2 &&
          x >= width / 2 - buttonWidth / 2 && x <= width / 2 + buttonWidth / 2) {
        // 进入下一个场景
        this.currentScene++;
        this.draw();
        this.startTyping();
      }
    });
  }

  /**
   * 销毁页面
   */
  destroy() {
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
    }
    this.canvas = null;
    this.ctx = null;
  }
}
