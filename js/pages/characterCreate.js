/**
 * 角色创建页面模块
 * 负责处理角色创建流程
 */

import gameConfig from '../config/gameConfig';

export default class CharacterCreatePage {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentStep = 1; // 当前步骤：1-名字，2-性别，3-职业，4-宠物，5-确认
    this.characterName = '';
    this.selectedGender = null;
    this.selectedProfession = null;
    this.selectedPet = null;
    this.randomNameIndex = 0;
  }

  /**
   * 初始化角色创建页面
   */
  init() {
    this.canvas = GameGlobal.canvas;
    this.ctx = GameGlobal.ctx;
    this.currentStep = 1;
    this.characterName = this.getRandomName('male');
    this.selectedGender = null;
    this.selectedProfession = null;
    this.selectedPet = null;
    this.randomNameIndex = 0;
    this.draw();
  }

  /**
   * 获取随机名字
   */
  getRandomName(gender) {
    const names = gameConfig.randomNames[gender];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * 绘制角色创建页面
   */
  draw() {
    const { width, height } = this.canvas;

    // 清空画布
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, width, height);

    // 绘制标题
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('角色创建', width / 2, 50);

    // 根据当前步骤绘制内容
    switch (this.currentStep) {
      case 1:
        this.drawNameStep();
        break;
      case 2:
        this.drawGenderStep();
        break;
      case 3:
        this.drawProfessionStep();
        break;
      case 4:
        this.drawPetStep();
        break;
      case 5:
        this.drawConfirmStep();
        break;
    }
  }

  /**
   * 绘制名字输入步骤
   */
  drawNameStep() {
    const { width, height } = this.canvas;

    // 绘制提示文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '18px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('请输入你的角色名：', width / 2, 100);

    // 绘制名字输入框
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(width / 2 - 150, 130, 300, 40);
    this.ctx.strokeStyle = '#d4a574';
    this.ctx.strokeRect(width / 2 - 150, 130, 300, 40);

    // 绘制名字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '20px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.characterName, width / 2, 150);

    // 绘制"随机"按钮
    this.drawButton('随机', width / 2, 220, 100, 40);

    // 绘制"下一步"按钮
    this.drawButton('下一步', width / 2, 300, 150, 50);
  }

  /**
   * 绘制性别选择步骤
   */
  drawGenderStep() {
    const { width, height } = this.canvas;

    // 绘制提示文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '18px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('请选择你的性别：', width / 2, 100);

    // 绘制性别选择按钮
    const buttonWidth = 120;
    const buttonHeight = 50;
    const spacing = 30;

    // 男性按钮
    const maleX = width / 2 - buttonWidth - spacing / 2;
    const maleY = 180;
    this.drawButton('男', maleX, maleY, buttonWidth, buttonHeight);

    // 女性按钮
    const femaleX = width / 2 + spacing / 2;
    const femaleY = 180;
    this.drawButton('女', femaleX, femaleY, buttonWidth, buttonHeight);

    // 绘制"上一步"和"下一步"按钮
    this.drawButton('上一步', width / 2 - 100, 300, 120, 40);
    this.drawButton('下一步', width / 2 + 100, 300, 120, 40);
  }

  /**
   * 绘制职业选择步骤
   */
  drawProfessionStep() {
    const { width, height } = this.canvas;

    // 绘制提示文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '18px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('请选择你的职业：', width / 2, 100);

    // 绘制职业卡片
    const cardWidth = 150;
    const cardHeight = 120;
    const spacing = 20;
    const startX = (width - cardWidth * 2 - spacing) / 2;
    const startY = 140;

    gameConfig.professions.forEach((profession, index) => {
      const x = startX + (index % 2) * (cardWidth + spacing);
      const y = startY + Math.floor(index / 2) * (cardHeight + spacing);
      this.drawProfessionCard(profession, x, y, cardWidth, cardHeight);
    });

    // 绘制"上一步"和"下一步"按钮
    this.drawButton('上一步', width / 2 - 100, 400, 120, 40);
    this.drawButton('下一步', width / 2 + 100, 400, 120, 40);
  }

  /**
   * 绘制职业卡片
   */
  drawProfessionCard(profession, x, y, width, height) {
    // 绘制卡片背景
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(x, y, width, height);

    // 如果选中，绘制边框
    if (this.selectedProfession === profession.id) {
      this.ctx.strokeStyle = '#ffd700';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(x, y, width, height);
      this.ctx.lineWidth = 1;
    }

    // 绘制职业名称
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 18px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(profession.name, x + width / 2, y + 30);

    // 绘制职业描述
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '12px sans-serif';
    this.ctx.fillText(profession.description, x + width / 2, y + 60);

    // 绘制推荐宠物
    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '10px sans-serif';
    this.ctx.fillText('推荐：' + this.getPetName(profession.recommendedPet), x + width / 2, y + 90);
  }

  /**
   * 获取宠物名称
   */
  getPetName(petId) {
    const pet = gameConfig.initialPets.find(p => p.id === petId);
    return pet ? pet.name : '';
  }

  /**
   * 绘制宠物选择步骤
   */
  drawPetStep() {
    const { width, height } = this.canvas;

    // 绘制提示文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '18px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('请选择你的初始宠物：', width / 2, 100);

    // 绘制宠物卡片
    const cardWidth = 120;
    const cardHeight = 100;
    const spacing = 15;
    const startX = (width - cardWidth * 2 - spacing) / 2;
    const startY = 140;

    gameConfig.initialPets.forEach((pet, index) => {
      const x = startX + (index % 2) * (cardWidth + spacing);
      const y = startY + Math.floor(index / 2) * (cardHeight + spacing);
      this.drawPetCard(pet, x, y, cardWidth, cardHeight);
    });

    // 绘制"上一步"和"下一步"按钮
    this.drawButton('上一步', width / 2 - 100, 400, 120, 40);
    this.drawButton('下一步', width / 2 + 100, 400, 120, 40);
  }

  /**
   * 绘制宠物卡片
   */
  drawPetCard(pet, x, y, width, height) {
    // 绘制卡片背景
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(x, y, width, height);

    // 如果选中，绘制边框
    if (this.selectedPet === pet.id) {
      this.ctx.strokeStyle = '#ffd700';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(x, y, width, height);
      this.ctx.lineWidth = 1;
    }

    // 如果是推荐宠物，绘制推荐标记
    if (this.selectedProfession && pet.recommendedFor === this.selectedProfession) {
      this.ctx.fillStyle = '#ffd700';
      this.ctx.font = '10px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('推荐', x + width / 2, y + 15);
    }

    // 绘制宠物名称
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = 'bold 14px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(pet.name, x + width / 2, y + 35);

    // 绘制宠物类型
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '10px sans-serif';
    this.ctx.fillText(pet.type, x + width / 2, y + 55);

    // 绘制元素属性
    this.ctx.fillStyle = '#aaa';
    this.ctx.fillText(pet.element, x + width / 2, y + 75);
  }

  /**
   * 绘制确认步骤
   */
  drawConfirmStep() {
    const { width, height } = this.canvas;

    // 绘制提示文字
    this.ctx.fillStyle = '#e0e0e0';
    this.ctx.font = '18px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('确认你的角色信息：', width / 2, 100);

    // 绘制角色信息
    const infoY = 150;
    const lineHeight = 30;

    // 角色名
    this.ctx.fillStyle = '#d4a574';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('角色名：' + this.characterName, width / 2 - 100, infoY);

    // 性别
    const genderName = this.selectedGender === 'male' ? '男' : '女';
    this.ctx.fillText('性别：' + genderName, width / 2 - 100, infoY + lineHeight);

    // 职业
    const profession = gameConfig.professions.find(p => p.id === this.selectedProfession);
    this.ctx.fillText('职业：' + (profession ? profession.name : ''), width / 2 - 100, infoY + lineHeight * 2);

    // 宠物
    const pet = gameConfig.initialPets.find(p => p.id === this.selectedPet);
    this.ctx.fillText('宠物：' + (pet ? pet.name : ''), width / 2 - 100, infoY + lineHeight * 3);

    // 绘制"上一步"和"确认创建"按钮
    this.drawButton('上一步', width / 2 - 100, 350, 120, 40);
    this.drawButton('确认创建', width / 2 + 100, 350, 120, 40);
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
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
  }

  /**
   * 处理触摸事件
   */
  onTouchStart(x, y) {
    const { width, height } = this.canvas;

    switch (this.currentStep) {
      case 1:
        this.handleNameStepTouch(x, y);
        break;
      case 2:
        this.handleGenderStepTouch(x, y);
        break;
      case 3:
        this.handleProfessionStepTouch(x, y);
        break;
      case 4:
        this.handlePetStepTouch(x, y);
        break;
      case 5:
        this.handleConfirmStepTouch(x, y);
        break;
    }
  }

  /**
   * 处理名字输入步骤的触摸事件
   */
  handleNameStepTouch(x, y) {
    const { width, height } = this.canvas;

    // 检查是否点击了"随机"按钮
    if (y >= 200 && y <= 240 && x >= width / 2 - 50 && x <= width / 2 + 50) {
      this.randomNameIndex = (this.randomNameIndex + 1) % gameConfig.randomNames.male.length;
      this.characterName = this.getRandomName(this.selectedGender || 'male');
      this.draw();
      return;
    }

    // 检查是否点击了"下一步"按钮
    if (y >= 275 && y <= 325 && x >= width / 2 - 75 && x <= width / 2 + 75) {
      if (this.characterName.trim()) {
        this.currentStep = 2;
        this.draw();
      }
      return;
    }
  }

  /**
   * 处理性别选择步骤的触摸事件
   */
  handleGenderStepTouch(x, y) {
    const { width, height } = this.canvas;
    const buttonWidth = 120;
    const buttonHeight = 50;
    const spacing = 30;

    // 检查是否点击了"男"按钮
    const maleX = width / 2 - buttonWidth - spacing / 2;
    const maleY = 180;
    if (x >= maleX - buttonWidth / 2 && x <= maleX + buttonWidth / 2 &&
        y >= maleY - buttonHeight / 2 && y <= maleY + buttonHeight / 2) {
      this.selectedGender = 'male';
      this.draw();
      return;
    }

    // 检查是否点击了"女"按钮
    const femaleX = width / 2 + spacing / 2;
    const femaleY = 180;
    if (x >= femaleX - buttonWidth / 2 && x <= femaleX + buttonWidth / 2 &&
        y >= femaleY - buttonHeight / 2 && y <= femaleY + buttonHeight / 2) {
      this.selectedGender = 'female';
      this.draw();
      return;
    }

    // 检查是否点击了"上一步"按钮
    if (y >= 280 && y <= 320 && x >= width / 2 - 160 && x <= width / 2 - 40) {
      this.currentStep = 1;
      this.draw();
      return;
    }

    // 检查是否点击了"下一步"按钮
    if (y >= 280 && y <= 320 && x >= width / 2 + 40 && x <= width / 2 + 160) {
      if (this.selectedGender) {
        this.currentStep = 3;
        this.draw();
      }
      return;
    }
  }

  /**
   * 处理职业选择步骤的触摸事件
   */
  handleProfessionStepTouch(x, y) {
    const { width, height } = this.canvas;
    const cardWidth = 150;
    const cardHeight = 120;
    const spacing = 20;
    const startX = (width - cardWidth * 2 - spacing) / 2;
    const startY = 140;

    // 检查是否点击了职业卡片
    gameConfig.professions.forEach((profession, index) => {
      const cardX = startX + (index % 2) * (cardWidth + spacing);
      const cardY = startY + Math.floor(index / 2) * (cardHeight + spacing);

      if (x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight) {
        this.selectedProfession = profession.id;
        this.draw();
      }
    });

    // 检查是否点击了"上一步"按钮
    if (y >= 380 && y <= 420 && x >= width / 2 - 160 && x <= width / 2 - 40) {
      this.currentStep = 2;
      this.draw();
      return;
    }

    // 检查是否点击了"下一步"按钮
    if (y >= 380 && y <= 420 && x >= width / 2 + 40 && x <= width / 2 + 160) {
      if (this.selectedProfession) {
        this.currentStep = 4;
        this.draw();
      }
      return;
    }
  }

  /**
   * 处理宠物选择步骤的触摸事件
   */
  handlePetStepTouch(x, y) {
    const { width, height } = this.canvas;
    const cardWidth = 120;
    const cardHeight = 100;
    const spacing = 15;
    const startX = (width - cardWidth * 2 - spacing) / 2;
    const startY = 140;

    // 检查是否点击了宠物卡片
    gameConfig.initialPets.forEach((pet, index) => {
      const cardX = startX + (index % 2) * (cardWidth + spacing);
      const cardY = startY + Math.floor(index / 2) * (cardHeight + spacing);

      if (x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight) {
        this.selectedPet = pet.id;
        this.draw();
      }
    });

    // 检查是否点击了"上一步"按钮
    if (y >= 380 && y <= 420 && x >= width / 2 - 160 && x <= width / 2 - 40) {
      this.currentStep = 3;
      this.draw();
      return;
    }

    // 检查是否点击了"下一步"按钮
    if (y >= 380 && y <= 420 && x >= width / 2 + 40 && x <= width / 2 + 160) {
      if (this.selectedPet) {
        this.currentStep = 5;
        this.draw();
      }
      return;
    }
  }

  /**
   * 处理确认步骤的触摸事件
   */
  handleConfirmStepTouch(x, y) {
    const { width, height } = this.canvas;

    // 检查是否点击了"上一步"按钮
    if (y >= 330 && y <= 370 && x >= width / 2 - 160 && x <= width / 2 - 40) {
      this.currentStep = 4;
      this.draw();
      return;
    }

    // 检查是否点击了"确认创建"按钮
    if (y >= 330 && y <= 370 && x >= width / 2 + 40 && x <= width / 2 + 160) {
      this.createCharacter();
      return;
    }
  }

  /**
   * 创建角色
   */
  async createCharacter() {
    try {
      // 创建玩家数据
      const playerData = {
        角色名: this.characterName,
        性别: this.selectedGender,
        职业: this.selectedProfession,
        初始宠物: this.selectedPet,
        等级: 1,
        经验: 0,
        金币: 100,
        感染度: 0,
        游戏进度: {
          当前章节: 1,
          当前区域: '废墟城市',
          已探索地点: [],
          已完成任务: []
        },
        背包: {
          道具: [],
          装备: [],
          材料: []
        }
      };

      // 保存到云端
      const result = await GameGlobal.cloudManager.createPlayer(playerData);

      if (result.success) {
        // 设置到DataBus
        playerData._id = result.id;
        GameGlobal.databus.setPlayerData(playerData);

        // 跳转到新手教程
        GameGlobal.pageManager.navigate('tutorial');
      } else {
        console.error('[角色创建] 创建失败:', result.error);
      }
    } catch (error) {
      console.error('[角色创建] 创建失败:', error);
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
