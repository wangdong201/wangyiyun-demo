import axios from "axios";
import store from "storejs";
const http = axios.create({
  baseURL: "https://netease-cloud-music-api-five-roan-88.vercel.app",
});

// 请求拦截器(请求成功,请求失败)
http.interceptors.request.use(
  (config) => {
    const cookie = store.get("_m_cookie") ?? ""; // 从 store 中获取 cookie 值，默认为空字符串
    config.params = config.params || {}; // 如果请求参数中不存在 params 字段，则创建一个空对象
    config.params.cookie = cookie; // 将 cookie 值添加到 params 对象中的 cookie 属性中
    return config;
  },
  (error) => {
    console.log(error);
  }
);
// 响应拦截器(收到响应,没收到响应)
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        alert("请求参数或格式不正确");
        break;
      case 401:
        alert("没有权限,请先登录");
        break;
      case 403:
        alert("禁止访问!");
        break;
      case 404:
        alert("请求路径错误,请仔细核对");
        break;
      default:
        break;
    }
  }
);

// 轮播图 - 推荐歌单 - 新歌新碟/数字专辑 - 排行榜
export const bannerPic = () => http.get("/homepage/block/page");
export const bannerText = () => http.get("/homepage/block/page");
// export const getBannerData = () => {
//   return Promise.all([http.get("/homepage/block/page"), http.get("/homepage/block/page")])
//     .then(([bannerPicRes, bannerTextRes]) => {
// 返回一个包含两个响应数据的数组
//       return [bannerPicRes.data, bannerTextRes.data];
//     });
// };

//菜单
export const menuList = () => http.get("/homepage/dragon/ball");

//音乐日历
export const CalendarData = () =>
  http.get("/calendar?startTime=1606752000000&endTime=1609430399999");

// 搜索页面排行榜
export async function fetchToplistDetail() {
  const res = await http.get("/toplist/detail");
  const playlist = await Promise.all(
    res.data.list.map(({ id }) =>
      http.get("/playlist/detail", { params: { id } })
    )
  );
  return playlist.map((item) => item.data.playlist);
}

//搜索框内容
export const SearchBox = (params) => http.get(`cloudsearch?keywords=${params}`);

//MV
export const MVList = (area) =>
  http.get("/top/mv", { params: { limit: 50, area } });

// MV视频
export const featMvUrl = (id) => http.get("/mv/url", { params: { id } });

// MV视频信息
export const featMvDetail = (mvid) =>
  http.get("/mv/detail", { params: { mvid } });

// MV点赞转发评论数
export const featMvDetailInfo = (mvid) =>
  http.get("/mv/detail/info", { params: { mvid } });

// 获取生成二维码所需要的key
export const createLoginQrKey = () => http.get("/login/qr/key");

// 获取扫码登录的二维码
export const createLoginQrImage = (params) =>
  http.get("/login/qr/create", { params });

// 二维码检测扫码状态接口
export const checkLoginQr = (params) => http.get("/login/qr/check", { params });

// 获取用户信息资料 -- 收藏歌单
export const getUserInfo = (uid) =>
  http.get("/user/detail", { params: { uid } });

export const getCollectPlaylists = (uid) =>
  http.get("/user/playlist", { params: { uid } });

export const getUserAccount = () => http.get("/user/account");

//歌单
export const getPlistDetail = (id) =>
  http.get("playlist/detail", { params: { id } });

// 歌单音乐数据
export const getPlayListTrackAll = (id) =>
  http.get("/playlist/track/all", { params: { id } });

// 播放歌曲 -- 歌曲信息
export const getSongUrl = (id) =>
  http.get("/song/url/v1", { params: { id, level: "standard" } });

export const getSongDetail = (id) =>
  http.get("/song/detail", { params: { ids: id } });

// 更多收听
export const musicSlider = (id) =>
  http.get("related/playlist", { params: { id } });

//歌词
export const lyricText = (id) => http.get("/lyric", { params: { id } });

//歌单广场
export const getHighquality = (cat) =>
  http.get("/top/playlist/highquality", { params: { cat } });

// 标签
export const getHighqualityTags = () => http.get("/playlist/highquality/tags");

// 歌单评论
export const getCommentPlaylist = (id) =>
  http.get("/comment/playlist", { params: { id } });
