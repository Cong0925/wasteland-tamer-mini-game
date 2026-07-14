/**
 * 游戏配置文件
 * 包含游戏的基本配置信息
 */

export default {
  // 游戏基本信息
  gameName: '末日废土驯兽师',
  version: '1.0.0',

  // 云开发配置
  cloud: {
    envId: 'cloud1-d6gi9bt2998d70d84', // 云开发环境ID
    traceUser: true
  },

  // 职业配置
  professions: [
    {
      id: 'warrior',
      name: '战士',
      description: '近战输出，高生命值',
      recommendedPet: 'iron_turtle',
      stats: {
        hp: 150,
        mp: 50,
        attack: 12,
        defense: 10,
        speed: 8
      }
    },
    {
      id: 'ranger',
      name: '游侠',
      description: '远程输出，高敏捷',
      recommendedPet: 'wind_eagle',
      stats: {
        hp: 100,
        mp: 80,
        attack: 15,
        defense: 6,
        speed: 12
      }
    },
    {
      id: 'mage',
      name: '法师',
      description: '元素魔法，高智力',
      recommendedPet: 'fire_fox',
      stats: {
        hp: 80,
        mp: 120,
        attack: 18,
        defense: 5,
        speed: 10
      }
    },
    {
      id: 'healer',
      name: '治疗者',
      description: '辅助治疗，高精神',
      recommendedPet: 'heal_deer',
      stats: {
        hp: 90,
        mp: 100,
        attack: 8,
        defense: 7,
        speed: 9
      }
    }
  ],

  // 初始宠物配置
  initialPets: [
    {
      id: 'iron_turtle',
      name: '铁甲龟',
      type: '防御型',
      element: '地系',
      recommendedFor: 'warrior',
      stats: {
        hp: 120,
        mp: 30,
        attack: 8,
        defense: 15,
        speed: 5
      },
      skills: ['防御姿态', '甲壳反击']
    },
    {
      id: 'wind_eagle',
      name: '疾风鹰',
      type: '攻击型',
      element: '风系',
      recommendedFor: 'ranger',
      stats: {
        hp: 80,
        mp: 60,
        attack: 14,
        defense: 6,
        speed: 14
      },
      skills: ['疾风斩', '鹰眼']
    },
    {
      id: 'fire_fox',
      name: '火焰狐',
      type: '魔法型',
      element: '火系',
      recommendedFor: 'mage',
      stats: {
        hp: 70,
        mp: 80,
        attack: 16,
        defense: 5,
        speed: 12
      },
      skills: ['火球术', '火焰护盾']
    },
    {
      id: 'heal_deer',
      name: '治愈鹿',
      type: '辅助型',
      element: '木系',
      recommendedFor: 'healer',
      stats: {
        hp: 90,
        mp: 70,
        attack: 6,
        defense: 8,
        speed: 10
      },
      skills: ['治愈之光', '自然恢复']
    }
  ],

  // 性别配置
  genders: [
    { id: 'male', name: '男' },
    { id: 'female', name: '女' }
  ],

  // 随机名字库
  randomNames: {
    male: [
      '废土行者', '荒野猎人', '钢铁意志', '流浪者', '拾荒者',
      '废墟守护者', '荒原之子', '钢铁战士', '废土幸存者', '荒野行者'
    ],
    female: [
      '废土玫瑰', '荒野之花', '钢铁女战士', '流浪者', '幸存者',
      '废墟守护者', '荒原之女', '钢铁少女', '废土幸存者', '荒野行者'
    ]
  },

  // 前言内容
  prologue: [
    '2040年，环海之国开始向太平洋排放核废水。',
    '2045年，变异海洋生物登陆，沿海城市沦陷。',
    '2050年，核战争爆发，人类文明崩溃。',
    '2060年，废土时代开始，人类在废墟中挣扎求生。',
    '2100年，你从昏迷中醒来...'
  ],

  // 新手教程场景
  tutorialScenes: [
    {
      id: 1,
      title: '醒来',
      content: '你从昏迷中醒来，发现自己躺在一堆废墟中。周围是破败的建筑和生锈的车辆。',
      teaching: '移动',
      choices: [
        { text: '查看周围环境', next: 2 },
        { text: '寻找有用物品', next: 2 },
        { text: '向前走', next: 2 }
      ]
    },
    {
      id: 2,
      title: '遇到老者',
      content: '一位衣衫褴褛的老者向你走来。\n"年轻人，你醒了？你已经昏迷了三天。这里是废墟城市，2100年的世界。"',
      teaching: '对话',
      choices: [
        { text: '询问身世', next: 3 },
        { text: '询问世界现状', next: 3 },
        { text: '表示感谢', next: 3 }
      ]
    },
    {
      id: 3,
      title: '探索废墟',
      content: '你决定探索周围的废墟。在一个破旧的商店里，你发现了一些有用的物品。',
      teaching: '探索',
      choices: [
        { text: '搜索货架', next: 4 },
        { text: '检查柜台', next: 4 },
        { text: '查看后门', next: 4 }
      ]
    },
    {
      id: 4,
      title: '遭遇敌人',
      content: '突然，一群变异鼠向你们扑来！老者大喊："小心！这些变异鼠很危险！"',
      teaching: '战斗',
      choices: [
        { text: '普通攻击', next: 5 },
        { text: '使用技能', next: 5 },
        { text: '使用道具', next: 5 }
      ]
    },
    {
      id: 5,
      title: '获得宠物',
      content: '战斗结束后，你发现一只受伤的小动物。它看起来很虚弱，但眼中透露出灵性。\n你决定帮助它，它成为了你的伙伴。',
      teaching: '宠物',
      choices: [
        { text: '查看宠物属性', next: 6 },
        { text: '喂食宠物', next: 6 },
        { text: '让宠物休息', next: 6 }
      ]
    }
  ],

  // 颜色配置
  colors: {
    background: '#1a1a1a',
    text: '#e0e0e0',
    accent: '#d4a574',
    button: '#8b4513',
    highlight: '#ffd700'
  }
};
