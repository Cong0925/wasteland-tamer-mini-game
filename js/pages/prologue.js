/**
 * 前言页面模块
 * 负责显示游戏前言和背景故事（流式布局）
 */

import gameConfig from '../config/gameConfig';

export default class ProloguePage {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.allText = '';
    this.wrappedLines = [];
    this.charIndex = 0;
    this.isTyping = false;
    this.typingTimer = null;
    this.scrollY = 0;
    this.lineHeight = 30;
    this.isFinished = false;
    this.touchStartY = 0;

    // 安全区域
    this.safeAreaTop = 0;
    this.safeAreaBottom = 0;

    // 布局区域
    this.titleY = 0;
    this.contentTop = 0;
    this.contentBottom = 0;
    this.contentHeight = 0;
  }

  /**
   * 初始化前言页面
   */
  init() {
    this.canvas = GameGlobal.canvas;
    this.ctx = GameGlobal.ctx;
    this.safeAreaTop = GameGlobal.safeAreaTop || 0;
    this.safeAreaBottom = GameGlobal.safeAreaBottom || 0;

    this.scrollY = 0;
    this.charIndex = 0;
    this.isTyping = false;
    this.isFinished = false;

    // 计算布局区域
    this.titleY = this.safeAreaTop + 25;
    this.contentTop = this.safeAreaTop + 55;
    this.contentBottom = this.canvas.height - this.safeAreaBottom - 80;
    this.contentHeight = this.contentBottom - this.contentTop;

    // 将所有前言文本合并成一个完整文本
    this.allText = gameConfig.prologue.join('\n\n');

    // 预先计算换行后的所有行
    const font = '20px sans-serif';
    const maxWidth = this.canvas.width - 60;
    this.wrappedLines = this.wrapText(this.allText, maxWidth, font);

    // 开始打字效果
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

      if (char === '\n') {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        // 段落间隔
        if (i + 1 < text.length && text[i + 1] === '\n') {
          lines.push('');
          i++;
        }
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
   * 绘制前言页面
   */
  draw() {
    const { width, height } = this.canvas;

    // 清空画布
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, width, height);

    // 绘制标题
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('序 章', width / 2, this.titleY);

    // 绘制分隔线
    this.ctx.strokeStyle = '#555';
    this.ctx.beginPath();
    this.ctx.moveTo(30, this.contentTop - 10);
    this.ctx.lineTo(width - 30, this.contentTop - 10);
    this.ctx.stroke();

    // 绘制内容（流式布局）
    const font = '20px sans-serif';
    const maxWidth = width - 60;
    const displayText = this.allText.substring(0, this.charIndex);
    const currentWrappedLines = this.wrapText(displayText, maxWidth, font);

    this.ctx.font = font;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    let drawY = this.contentTop - this.scrollY;

    currentWrappedLines.forEach((line) => {
      // 只绘制屏幕内的行
      if (drawY + this.lineHeight > this.contentTop - 10 &&
          drawY < this.contentBottom + 10) {
        if (line !== '') {
          this.ctx.fillStyle = '#e0e0e0';
          this.ctx.fillText(line, 30, drawY);
        }
      }
      drawY += this.lineHeight;
    });

    // 绘制打字光标
    if (this.isTyping && currentWrappedLines.length > 0) {
      const lastLine = currentWrappedLines[currentWrappedLines.length - 1];
      const lastLineWidth = this.ctx.measureText(lastLine).width;
      const lastLineIndex = currentWrappedLines.length - 1;
      const cursorY = this.contentTop + lastLineIndex * this.lineHeight - this.scrollY;
      const cursorX = 30 + lastLineWidth;

      if (cursorY > this.contentTop && cursorY < this.contentBottom) {
        if (Math.floor(Date.now() / 500) % 2 === 0) {
          this.ctx.fillStyle = '#d4a574';
          this.ctx.fillRect(cursorX, cursorY, 2, this.lineHeight);
        }
      }
    }

    // 绘制底部遮罩和提示
    this.drawBottomArea();

    // 自动滚动
    this.autoScroll(currentWrappedLines);
  }

  /**
   * 绘制底部区域
   */
  drawBottomArea() {
    const { width, height } = this.canvas;
    const bottomY = height - this.safeAreaBottom;

    // 绘制底部渐变遮罩
    const gradient = this.ctx.createLinearGradient(0, bottomY - 80, 0, bottomY);
    gradient.addColorStop(0, 'rgba(26, 26, 26, 0)');
    gradient.addColorStop(1, 'rgba(26, 26, 26, 1)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, bottomY - 80, width, 80);

    // 绘制提示文字
    if (this.isFinished) {
      this.ctx.fillStyle = '#d4a574';
      this.ctx.font = '16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('点击继续', width / 2, bottomY - 30);
    } else if (this.isTyping) {
      this.ctx.fillStyle = '#666';
      this.ctx.font = '14px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('点击跳过文字动画', width / 2, bottomY - 30);
    } else {
      this.ctx.fillStyle = '#666';
      this.ctx.font = '14px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('向上滑动查看更多', width / 2, bottomY - 30);
    }
  }

  /**
   * 自动滚动
   */
  autoScroll(currentWrappedLines) {
    if (currentWrappedLines.length === 0) return;

    const lastLineY = (currentWrappedLines.length - 1) * this.lineHeight;

    // 如果最后一行超出可见区域，自动滚动
    if (lastLineY > this.contentHeight - this.lineHeight) {
      this.scrollY = lastLineY - this.contentHeight + this.lineHeight * 2;
    }

    // 限制滚动范围
    const totalHeight = this.wrappedLines.length * this.lineHeight;
    const maxScroll = Math.max(0, totalHeight - this.contentHeight);
    this.scrollY = Math.min(this.scrollY, maxScroll);
    this.scrollY = Math.max(0, this.scrollY);
  }

  /**
   * 开始打字效果
   */
  startTyping() {
    this.isTyping = true;
    this.charIndex = 0;

    this.typingTimer = setInterval(() => {
      this.charIndex++;

      if (this.charIndex >= this.allText.length) {
        clearInterval(this.typingTimer);
        this.isTyping = false;
        this.isFinished = true;
      }

      this.draw();
    }, 60);
  }

  /**
   * 处理触摸开始事件
   */
  onTouchStart(x, y) {
    // 如果正在打字，点击跳过打字效果
    if (this.isTyping) {
      clearInterval(this.typingTimer);
      this.isTyping = false;
      this.charIndex = this.allText.length;
      this.isFinished = true;
      this.draw();
      return;
    }

    // 如果打字完成，点击进入角色创建
    if (this.isFinished) {
      GameGlobal.pageManager.navigate('characterCreate');
      return;
    }

    // 记录触摸起始位置（用于滚动）
    this.touchStartY = y;
  }

  /**
   * 处理触摸移动事件（滚动）
   */
  onTouchMove(x, y) {
    if (this.isTyping) return;

    const deltaY = this.touchStartY - y;
    this.touchStartY = y;

    const totalHeight = this.wrappedLines.length * this.lineHeight;
    const maxScroll = Math.max(0, totalHeight - this.contentHeight);

    this.scrollY = Math.min(this.scrollY + deltaY, maxScroll);
    this.scrollY = Math.max(0, this.scrollY);

    this.draw();
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
