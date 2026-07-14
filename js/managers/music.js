/**
 * 音乐管理器模块
 * 负责背景音乐和音效的播放控制
 */
let instance;

export default class MusicManager {
  bgmAudio = null;
  sfxAudio = null;

  constructor() {
    if (instance) return instance;

    instance = this;

    this.initAudioContexts();
  }

  /**
   * 初始化音频上下文
   */
  initAudioContexts() {
    this.bgmAudio = wx.createInnerAudioContext();
    this.bgmAudio.loop = true;

    this.sfxAudio = wx.createInnerAudioContext();
  }

  /**
   * 播放背景音乐
   * @param {String} src - 音频文件路径
   */
  playBGM(src) {
    if (!src) return;

    this.bgmAudio.src = src;
    this.bgmAudio.autoplay = true;
  }

  /**
   * 停止背景音乐
   */
  stopBGM() {
    this.bgmAudio.stop();
  }

  /**
   * 播放音效
   * @param {String} src - 音频文件路径
   */
  playSFX(src) {
    if (!src) return;

    this.sfxAudio.src = src;
    this.sfxAudio.currentTime = 0;
    this.sfxAudio.play();
  }

  /**
   * 暂停所有音频
   */
  pauseAll() {
    this.bgmAudio.pause();
    this.sfxAudio.pause();
  }

  /**
   * 恢复所有音频
   */
  resumeAll() {
    this.bgmAudio.play();
  }
}
