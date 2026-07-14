/**
 * Logo页面模块
 * 负责显示游戏Logo和Loading动画
 */

export default class LogoPage {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.loadingProgress = 0;
    this.isLoading = true;
  }

  /**
   * 初始化Logo页面
   */
  init() {
    this.canvas = GameGlobal.canvas;
    this.ctx = GameGlobal.ctx;
    this.loadingProgress = 0;
    this.isLoading = true;
    this.draw();
    this.startLoading();
  }

  /**
   * 绘制Logo页面
   */
  draw() {
    const { width, height } = this.canvas;

    // 清空画布
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, width, height);

    // 绘制游戏标题
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 48px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('末日废土驯兽师', width / 2, height / 3);

    // 绘制版本号
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '24px sans-serif';
    this.ctx.fillText('v1.0.0', width / 2, height / 3 + 50);

    // 绘制Loading进度条
    if (this.isLoading) {
      this.drawLoadingBar();
    }

    console.log('[Logo] 绘制完成, 画布尺寸:', width, 'x', height);
  }

  /**
   * 绘制Loading进度条
   */
  drawLoadingBar() {
    const { width, height } = this.canvas;
    const barWidth = width * 0.6;
    const barHeight = 20;
    const barX = (width - barWidth) / 2;
    const barY = height * 2 / 3;

    // 绘制进度条背景
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(barX, barY, barWidth, barHeight);

    // 绘制进度条
    this.ctx.fillStyle = '#d4a574';
    this.ctx.fillRect(barX, barY, barWidth * this.loadingProgress, barHeight);

    // 绘制Loading文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText('Loading...', width / 2, barY + barHeight + 10);
  }

  /**
   * 开始Loading
   */
  startLoading() {
    this.isLoading = true;
    this.loadingProgress = 0;

    const loadingInterval = setInterval(() => {
      this.loadingProgress += 0.02;

      if (this.loadingProgress >= 1) {
        this.loadingProgress = 1;
        this.isLoading = false;
        clearInterval(loadingInterval);

        // Loading完成，跳转到前言页面
        setTimeout(() => {
          GameGlobal.pageManager.navigate('prologue');
        }, 500);
      }

      this.draw();
    }, 50);
  }

  /**
   * 销毁页面
   */
  destroy() {
    this.canvas = null;
    this.ctx = null;
  }
}
