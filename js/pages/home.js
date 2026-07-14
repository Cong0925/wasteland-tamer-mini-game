/**
 * 主界面页面模块
 * 负责显示游戏主界面和功能入口
 */

export default class HomePage {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }

  /**
   * 初始化主界面页面
   */
  init() {
    this.canvas = GameGlobal.canvas;
    this.ctx = GameGlobal.ctx;
    this.draw();
  }

  /**
   * 绘制主界面页面
   */
  draw() {
    const { width, height } = this.canvas;

    // 清空画布
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, width, height);

    // 获取玩家数据
    const playerData = GameGlobal.databus.getPlayerData();

    // 绘制顶部信息栏
    this.drawTopBar(playerData);

    // 绘制中间内容区域
    this.drawMainContent();

    // 绘制底部导航栏
    this.drawBottomNav();
  }

  /**
   * 绘制顶部信息栏
   */
  drawTopBar(playerData) {
    const { width } = this.canvas;

    // 绘制背景
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, width, 80);

    if (playerData) {
      // 绘制角色名
      this.ctx.fillStyle = '#d4a574';
      this.ctx.font = 'bold 18px sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(playerData.角色名, 20, 30);

      // 绘制等级
      this.ctx.fillStyle = '#e0e0e0';
      this.ctx.font = '14px sans-serif';
      this.ctx.fillText('Lv.' + playerData.等级, 20, 55);

      // 绘制职业
      this.ctx.fillText('职业：' + this.getProfessionName(playerData.职业), 80, 55);

      // 绘制金币
      this.ctx.fillStyle = '#ffd700';
      this.ctx.textAlign = 'right';
      this.ctx.fillText('金币：' + playerData.金币, width - 20, 30);

      // 绘制感染度
      this.ctx.fillStyle = '#ff6b6b';
      this.ctx.fillText('感染度：' + playerData.感染度 + '%', width - 20, 55);
    }
  }

  /**
   * 获取职业名称
   */
  getProfessionName(professionId) {
    const professions = {
      'warrior': '战士',
      'ranger': '游侠',
      'mage': '法师',
      'healer': '治疗者'
    };
    return professions[professionId] || '';
  }

  /**
   * 绘制中间内容区域
   */
  drawMainContent() {
    const { width, height } = this.canvas;

    // 绘制当前区域
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('废墟城市', width / 2, 120);

    // 绘制区域描述
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '14px sans-serif';
    this.ctx.fillText('你正处于废墟城市的中心区域', width / 2, 150);

    // 绘制功能按钮
    const buttonWidth = 120;
    const buttonHeight = 60;
    const spacing = 20;
    const startX = (width - buttonWidth * 3 - spacing * 2) / 2;
    const startY = 200;

    // 探索按钮
    this.drawFunctionButton('探索', startX, startY, buttonWidth, buttonHeight);

    // 战斗按钮
    this.drawFunctionButton('战斗', startX + buttonWidth + spacing, startY, buttonWidth, buttonHeight);

    // 商店按钮
    this.drawFunctionButton('商店', startX + (buttonWidth + spacing) * 2, startY, buttonWidth, buttonHeight);

    // 绘制宠物信息
    this.drawPetInfo();
  }

  /**
   * 绘制功能按钮
   */
  drawFunctionButton(text, x, y, width, height) {
    // 绘制按钮背景
    this.ctx.fillStyle = '#8b4513';
    this.ctx.fillRect(x, y, width, height);

    // 绘制按钮文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x + width / 2, y + height / 2);
  }

  /**
   * 绘制宠物信息
   */
  drawPetInfo() {
    const { width, height } = this.canvas;
    const playerData = GameGlobal.databus.getPlayerData();

    if (playerData && playerData.初始宠物) {
      const petY = 320;

      // 绘制宠物信息背景
      this.ctx.fillStyle = '#333';
      this.ctx.fillRect(50, petY, width - 100, 100);

      // 绘制宠物名称
      this.ctx.fillStyle = '#d4a574';
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('宠物：' + this.getPetName(playerData.初始宠物), 70, petY + 30);

      // 绘制宠物状态
      this.ctx.fillStyle = '#e0e0e0';
      this.ctx.font = '14px sans-serif';
      this.ctx.fillText('状态：健康', 70, petY + 60);

      // 绘制喂食按钮
      this.drawButton('喂食', width - 120, petY + 50, 80, 30);
    }
  }

  /**
   * 获取宠物名称
   */
  getPetName(petId) {
    const pets = {
      'iron_turtle': '铁甲龟',
      'wind_eagle': '疾风鹰',
      'fire_fox': '火焰狐',
      'heal_deer': '治愈鹿'
    };
    return pets[petId] || '';
  }

  /**
   * 绘制按钮
   */
  drawButton(text, x, y, width, height) {
    // 绘制按钮背景
    this.ctx.fillStyle = '#8b4513';
    this.ctx.fillRect(x - width / 2, y - height / 2, width, height);

    // 绘制按钮文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '12px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
  }

  /**
   * 绘制底部导航栏
   */
  drawBottomNav() {
    const { width, height } = this.canvas;
    const navHeight = 60;
    const navY = height - navHeight;

    // 绘制导航栏背景
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, navY, width, navHeight);

    // 绘制导航按钮
    const navItems = [
      { text: '主页', x: width * 0.1 },
      { text: '背包', x: width * 0.3 },
      { text: '任务', x: width * 0.5 },
      { text: '宠物', x: width * 0.7 },
      { text: '设置', x: width * 0.9 }
    ];

    navItems.forEach(item => {
      this.ctx.fillStyle = '#e0e0e0';
      this.ctx.font = '14px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(item.text, item.x, navY + navHeight / 2);
    });
  }

  /**
   * 处理触摸事件
   */
  onTouchStart(x, y) {
    const { width, height } = this.canvas;

    // 检查是否点击了底部导航栏
    if (y >= height - 60) {
      // 根据x坐标判断点击了哪个导航项
      if (x < width * 0.2) {
        // 主页
        console.log('[主界面] 点击主页');
      } else if (x < width * 0.4) {
        // 背包
        console.log('[主界面] 点击背包');
      } else if (x < width * 0.6) {
        // 任务
        console.log('[主界面] 点击任务');
      } else if (x < width * 0.8) {
        // 宠物
        console.log('[主界面] 点击宠物');
      } else {
        // 设置
        console.log('[主界面] 点击设置');
      }
      return;
    }

    // 检查是否点击了功能按钮
    const buttonWidth = 120;
    const buttonHeight = 60;
    const spacing = 20;
    const startX = (width - buttonWidth * 3 - spacing * 2) / 2;
    const startY = 200;

    // 探索按钮
    if (x >= startX && x <= startX + buttonWidth && y >= startY && y <= startY + buttonHeight) {
      console.log('[主界面] 点击探索');
      return;
    }

    // 战斗按钮
    if (x >= startX + buttonWidth + spacing && x <= startX + (buttonWidth + spacing) * 2 &&
        y >= startY && y <= startY + buttonHeight) {
      console.log('[主界面] 点击战斗');
      return;
    }

    // 商店按钮
    if (x >= startX + (buttonWidth + spacing) * 2 && x <= startX + (buttonWidth + spacing) * 3 &&
        y >= startY && y <= startY + buttonHeight) {
      console.log('[主界面] 点击商店');
      return;
    }
  }

  /**
   * 销毁页面
   */
  destroy() {
    this.canvas = null;
    this.ctx = null;
  }
}
