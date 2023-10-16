/* eslint-disable import/no-anonymous-default-export */
import { Howl, Howler } from "howler";
import { getSongDetail, getSongUrl, lyricText } from "../../service";
import Player from "./PlayMusicCom.jsx";
import Lyric from "lyric-parser";

let lyricPlayer = null;

export default class {
  constructor() {
    // 播放器状态
    this._playing = false; // 是否正在播放中
    this._progress = 0; // 当前播放歌曲的进度
    this._duration = 0; // 当前歌曲的总时长
    this._enabled = false; // 是否启用Player
    this._repeatMode = "off"; // off | on | one
    this._shuffle = false; // true | false
    this._volume = 1; // 0 to 1
    this._volumeBeforeMuted = 1; // 用于保存静音前的音量

    // 播放信息
    this._list = []; // 播放列表 存放trackIds
    this._current = 0; // 当前播放歌曲在播放列表里的索引 index
    this._shuffledList = []; // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
    this._shuffledCurrent = 0; // 当前播放歌曲在随机列表里面的index
    this._playlistSource = { type: "album", id: 123 }; // 当前播放列表的信息
    this._currentTrack = { id: 86827685 }; // 当前播放歌曲的id
    this._playNextList = []; // 当这个list不为空时，会优先播放这个list的歌
    this._isPersonalFM = false; // 是否是私人FM模式
    this._personalFMTrack = { id: 0 }; // 私人FM当前歌曲
    this._personalFMNextTrack = { id: 0 }; // 私人FM下一首歌曲信息（为了快速加载下一首）

    // 初始化howler
    this._howler = null;
    Object.defineProperty(this, "_howler", { enumerable: false });

    // 初始化基础参数
    this._init();
    // 暴露给全局
    window.neteasePlayer = this;
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    if (this._howler) {
      this._howler.seek(value);
    }
  }

  get duration() {
    return this._duration;
  }

  async initLyricPlayer(trackId) {
    console.log(trackId);
    const res = await lyricText(trackId);
    lyricPlayer = new Lyric(res.data.lrc.lyric, ({ lineNum, txt }) => {
      this.lineIndex = lineNum; // 索引
      if (lineNum > 4) this.lineHieght = (lineNum - 3) * 12 - 20;
    });
    this.lyricLines = lyricPlayer.lines;
  }

  _init() {
    Howler.autoUnlock = false;
    Howler.usingWebAudio = true;
    Howler.volume(this.volume);
    if (this._enabled) {
      this._setIntervals();
    }
  }

  _setIntervals() {
    // 同步播放进度
    // TODO: 如果 _progress 在别的地方被改变了，这个定时器会覆盖之前改变的值，是bug
    setInterval(() => {
      this._progress = this._howler === null ? 0 : this._howler.seek();
    }, 1000);
  }

  _replaceCurrentTrack(
    id,
    autoplay = true,
    ifUnplayableThen = "playNextTrack"
  ) {
    if (lyricPlayer) lyricPlayer.stop();
    //歌词
    this.initLyricPlayer(id).then(() => {
      lyricPlayer.play();
      this.lineHieght = -20;
    });
    return getSongDetail(id).then((data) => {
      const track = data.data.songs[0];
      this._currentTrack = track;
      return this._getAudioSourceFromNetease(track).then((source) => {
        if (source) {
          this._playAudioSource(source, autoplay);
          // this._cacheNextTrack();
          return source;
        }
        ifUnplayableThen === "playNextTrack"
          ? this.playNextTrack()
          : this.playPrevTrack();
      });
    });
  }

  async _getAudioSourceFromNetease(track) {
    const data = await getSongUrl(track.id);
    console.log(data.data.data[0].url);
    return new Promise((resolve) => {
      resolve(data.data.data[0].url);
    });
  }

  _playAudioSource(source, autoplay = true) {
    Howler.unload();
    this._howler = new Howl({
      src: [source],
      html5: true,
      format: ["mp3", "flac"],
    });
    if (autoplay) {
      this.play();
      document.title = `${this._currentTrack.name} · ${this._currentTrack.ar[0].name}`;
    }
    this._howler.once("end", () => {
      this._nextTrackCallback();
    });
  }

  _nextTrackCallback() {
    this.playNextTrack();
  }

  _getNextTrack() {
    if (this._playNextList.length > 0) {
      const trackID = this._playNextList.shift();
      return [trackID, this.current];
    }
    // 当歌曲是列表最后一首 && 循环模式开启
    if (this.list.length === this.current + 1 && this.repeatMode === "on") {
      return [this.list[0], 0];
    }
    // 返回 [trackID, index]
    return [this.list[this.current + 1], this.current + 1];
  }

  /*下一曲*/
  playNextTrack() {
    const [trackID, index] = this._getNextTrack();
    if (trackID === undefined) {
      this._howler && this._howler.stop();
      this._playing = false;
      return false;
    }
    this.current = index;
    this._replaceCurrentTrack(trackID);
    return true;
  }
  /*调用_getNextTrack()方法获取下一首歌曲的ID和索引，返回值为一个数组 [trackID, index]。
  判断如果trackID为undefined，表示没有下一首歌曲可播放，此时停止当前正在播放的音乐，并将_playing状态设置为false，然后返回false。
  如果存在下一首歌曲，则将index赋值给this.current，表示当前正在播放的歌曲索引。
  调用_replaceCurrentTrack(trackID)方法，用新的歌曲ID替换当前正在播放的歌曲。
  返回true，表示成功播放下一首歌曲。
  注意：该代码片段中引用了一些未提供的方法，比如_getNextTrack()和_replaceCurrentTrack()，这些方法可能是该对象的私有方法，它们负责获取下一首歌曲和替换当前正在播放的歌曲。
  */

  pause() {
    this._howler && this._howler.pause();
    this._playing = false;
    document.title = "NeteaseMusic";
  }

  play() {
    if (this._howler && this._howler.playing()) return;
    this._howler && this._howler.play();
    this._playing = true;
    this._setIntervals();
    this._howler.on("load", () => {
      this._duration = this._howler === null ? 0 : this._howler._duration;
    });
    // document.title = `${this._currentTrack.name} · ${this._currentTrack.ar[0].name}`;
  }

  playOrPause() {
    if (this._howler && this._howler.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }

  // 替换播放列表
  replacePlaylist(
    trackIDs,
    playlistSourceID,
    playlistSourceType,
    autoPlayTrackID = "first"
  ) {
    this._isPersonalFM = false;
    if (!this._enabled) this._enabled = true;
    this.list = trackIDs;
    this.current = 0;
    this._playlistSource = {
      type: playlistSourceType,
      id: playlistSourceID,
    };
    // 如果不指定播放哪首歌曲（trackid）那么默认从第一首播放 否值传入trackid指定歌曲播放
    if (autoPlayTrackID === "first") {
      this._replaceCurrentTrack(this.list[0]);
    } else {
      this.current = trackIDs.indexOf(autoPlayTrackID);
      this._replaceCurrentTrack(autoPlayTrackID);
    }
  }
  static install(Vue) {
    Vue.prototype.$player = Vue.observable(new this());
    window.$player = Vue.prototype.$player;
    Vue.component("Player", Player);
  }
}
