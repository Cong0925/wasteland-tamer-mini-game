import Main from './js/main';

// 微信小游戏第一个createCanvas就是主画布，自动显示
const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

// 获取屏幕尺寸
const systemInfo = wx.getSystemInfoSync();
canvas.width = systemInfo.windowWidth;
canvas.height = systemInfo.windowHeight;

// 获取安全区域信息
let safeAreaTop = 0;
let safeAreaBottom = 0;
if (systemInfo.safeArea) {
  safeAreaTop = systemInfo.safeArea.top;
  safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
} else {
  // 没有safeArea信息时，使用默认值
  safeAreaTop = systemInfo.statusBarHeight || 20;
  safeAreaBottom = 0;
}

// 将画布和上下文设置为全局变量
GameGlobal.canvas = canvas;
GameGlobal.ctx = ctx;
GameGlobal.screenWidth = systemInfo.windowWidth;
GameGlobal.screenHeight = systemInfo.windowHeight;
GameGlobal.pixelRatio = systemInfo.pixelRatio;
GameGlobal.safeAreaTop = safeAreaTop;
GameGlobal.safeAreaBottom = safeAreaBottom;

console.log('[Game] 屏幕尺寸:', systemInfo.windowWidth, 'x', systemInfo.windowHeight);
console.log('[Game] 安全区域顶部:', safeAreaTop, '底部:', safeAreaBottom);

// 监听触摸开始事件
wx.onTouchStart((e) => {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  if (GameGlobal.pageManager) {
    GameGlobal.pageManager.onTouchStart(x, y);
  }
});

// 监听触摸移动事件（用于滚动）
wx.onTouchMove((e) => {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  if (GameGlobal.pageManager) {
    GameGlobal.pageManager.onTouchMove(x, y);
  }
});

// 初始化游戏
const main = new Main();

console.log('[Game] 游戏初始化完成');
