import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NoticeBar, Popup, Toast } from "antd-mobile";
import styled from "styled-components";
import OnePopup from "./components/OnePopup.jsx";
import Comment from "./components/Comment.jsx";
import {
  getPlistDetail,
  getPlayListTrackAll,
  musicSlider,
  getSongUrl,
} from "../../service/index.js";
const Wrapper = styled.div`
  .adm-notice-bar {
    border: 0;
    padding: 7px;
  }
`;
const PlayMusic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [playListData, setPlayListData] = useState([]);
  const [playListTrackAll, setPlayListTrackAll] = useState([]);
  const [slider, setSlider] = useState([]);
  // 数据请求
  useEffect(() => {
    Promise.all([getPlistDetail(id), getPlayListTrackAll(id), musicSlider(id)])
      .then(([detailRes, trackRes, sliderRes]) => {
        setPlayListData(detailRes.data);
        setPlayListTrackAll(trackRes.data.songs);
        setSlider(sliderRes.data.playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  //获取当前播放歌曲的id和地址
  const [trackId, setTrackId] = useState(0);
  const playMusics = (id) => {
    setTrackId(id);
  };
  const [songUrl, setSongUrl] = useState("");
  useEffect(() => {
    getSongUrl(trackId)
      .then((res) => {
        setSongUrl(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trackId]);

  //单位转换函数
  const dataTruncation = (playVolume) => {
    if (playVolume > 100000000) {
      return `${Math.floor(playVolume / 100000000)}亿`;
    } else if (playVolume > 100000) {
      return `${Math.floor(playVolume / 10000)}万`;
    } else {
      return playVolume;
    }
  };

  // 显示隐藏
  const [show, setShow] = useState(true);
  const playShow = () => {
    setShow(!show);
  };

  // 弹出层显示隐藏
  const [visible1, setVisible1] = useState(false);
  const [visible4, setVisible4] = useState(false);

  // 收藏
  const [isFavorited, setIsFavorited] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    if (isFavorited) {
      Toast.show({
        content: "取消收藏成功",
      });
    } else {
      Toast.show({
        content: "收藏成功",
      });
    }
  };
  const favoriteIcon = isFavorited
    ? "fluent:heart-24-filled"
    : "fluent:briefcase-medical-24-filled";
  return (
    <Wrapper>
      <div>
        <audio src={songUrl.data?.data[0]?.url} autoPlay={true} loop></audio>
        {/* 头部 */}
        <div className="fixed z-40 bg-[#597BA0] top-0 w-screen h-[11.5vw]">
          <div className="flex justify-between text-[#fff] w-[92.6vw] bg-[#597BA0] mx-auto h-[9.5vw] items-center">
            <div className="flex w-[46.4vw] items-center">
              <Icon
                icon="mdi:arrow-left"
                width="20"
                height="20"
                onClick={() => navigate(-1)}
              />

              <div className="w-[60%]">
                <NoticeBar
                  content={playListData.playlist?.name}
                  style={{ "--background-color": "#597BA0" }}
                  icon={null}
                  delay={1000}
                  speed={100}
                />
              </div>
            </div>
            <div className="flex justify-between w-[16.3vw]">
              <Icon icon="material-symbols:search" width="20" height="20" />
              <Icon
                icon="ri:more-2-line"
                width="20"
                height="20"
                onClick={() => {
                  setVisible1(true);
                }}
              />
            </div>
          </div>
        </div>
        {/* 主体 */}
        <div className="bg-[#597BA0]">
          <div className="px-[3.6vw] pt-[1vw]">
            {/* 封面信息 */}
            <div
              className={`transition ${
                show
                  ? "opacity-1 block animate-fadeIn"
                  : "opacity-0 hidden animate-fadeOut"
              }`}
            >
              <div className="h-[27.8vw] mt-[9.5vw] flex justify-between text-[#fff] relative">
                <div className="w-[25.7vw] h-[25.7vw] relative">
                  <img
                    src={playListData.playlist?.coverImgUrl}
                    alt=""
                    className="w-[25.7vw] h-[25.7vw] rounded-[3vw]"
                  />
                  <div className="absolute top-[1.5vw] right-[1vw] flex items-center text-[1.2vw]">
                    <Icon icon="basil:play-solid" width="15" height="15" />
                    <span>
                      {dataTruncation(playListData.playlist?.playCount)}
                    </span>
                  </div>
                  <div className="absolute w-[20.6vw] h-[1.5vw] bg-[#fff] bg-opacity-30 rounded-tl-[2vw] rounded-tr-[2vw] top-[-1.5vw] left-[3vw]"></div>
                </div>
                <div className="w-[63.5vw] h-[25.7vw]">
                  <div className="flex h-[8.3vw] items-center justify-between">
                    <p className="line-clamp-1 text-[2vw] overflow-hidden">
                      {playListData.playlist?.name}
                    </p>
                    <div
                      onClick={() => playShow()}
                      className="absolute z-10 right-[2vw] w-[5vw] h-[5vw] rounded-[50%] bg-[#6280A1] text-center text-[#fff] flex items-center justify-center"
                    >
                      {show ? (
                        <Icon
                          icon="ic:round-greater-than"
                          color="white"
                          rotate={5}
                          className="text-[3vw]"
                        />
                      ) : (
                        <Icon
                          icon="ic:round-greater-than"
                          color="white"
                          className="text-[3vw]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="h-[6.6vw] text-[1.2vw] flex items-center">
                    <div className="w-[6.6vw] h-[6.6vw] rounded-[50%] mr-[3vw]">
                      <img
                        src={playListData.playlist?.creator?.avatarUrl}
                        alt=""
                        className="w-[6.6vw] h-[6.6vw] rounded-[50%]"
                      />
                    </div>
                    <p className="mr-[2.5vw] whitespace-nowrap text-[#ccc]">
                      {playListData.playlist?.creator?.nickname}
                    </p>
                    <div className="h-[5.3vw] w-[14.3vw] bg-[#6283A6] rounded-[6vw] flex items-center justify-center">
                      <Icon icon="ic:round-add" width="20" height="20" />
                      <span className="whitespace-nowrap">关注</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {playListData.playlist?.tags?.map((item, index) => (
                      <div
                        key={index}
                        className="text-[1.2vw] flex h-[4.1vw] px-[0.5vw] items-center mt-[4.4vw] bg-[#7D9BB7] rounded-[1vw] ml-[1vw]"
                      >
                        <p className="whitespace-nowrap">{item}</p>
                        <Icon
                          icon="ic:round-greater-than"
                          width="20"
                          height="20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* 过度效果 */}
            <div
              className={`transition ${
                !show
                  ? "opacity-1 block animate-fadeIn"
                  : "opacity-0 hidden animate-fadeOut"
              }`}
            >
              <div className="w-[100%] mt-[10vw] relative">
                <div className="h-[10vw] flex items-center text-[#fff] opacity-50 text-[3vw]">
                  喜欢这个歌单的用户也听了
                  <div
                    onClick={() => playShow()}
                    className="absolute z-10 right-[3vw]"
                  >
                    {show ? (
                      <Icon
                        icon="ic:round-greater-than"
                        color="white"
                        className="text-[3vw]"
                      />
                    ) : (
                      <Icon
                        icon="ic:round-greater-than"
                        color="white"
                        className="text-[3vw]"
                        rotate={3}
                      />
                    )}
                  </div>
                </div>
                <div className="flex overflow-auto lunbo">
                  {slider.map((item) => (
                    <div className="w-[28vw] mr-[2.5vw]" key={item.id}>
                      <div className="w-[28vw] h-[28vw] rounded-[8px] overflow-hidden relative pt-[1vw]">
                        <img
                          src={item?.coverImgUrl}
                          alt=""
                          className="w-[28vw] h-[28vw] rounded-[8px] relative z-[1]"
                        />
                      </div>
                      <p className="dark:text-[#e3e5ec] text-[2.78vw] text-[#fff] mt-[2vw]">
                        {item?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 转发 */}
            <div className="mt-[3.1vw] h-[21.4vw] overflow-hidden">
              <div className="flex items-center text-[#ccc]">
                <p className="whitespace-nowrap overflow-hidden text-[1.2vw]">
                  {playListData.playlist?.description}
                </p>
                <Icon icon="ic:round-greater-than" width="20" height="20" />
              </div>
              <div className="mt-[4.5vw] flex justify-between text-[#fff]">
                <div className="h-[10.2vw] w-[29.1vw] rounded-[6vw] bg-[#7D9BB7] flex items-center justify-center dark:bg-[#648388]">
                  <Icon icon="majesticons:share" width="20" height="20" />
                  <span className="whitespace-nowrap overflow-hidden">
                    {dataTruncation(playListData.playlist?.shareCount)}
                  </span>
                </div>
                <div
                  onClick={() => {
                    setVisible4(true);
                  }}
                  className="h-[10.2vw] w-[29.1vw] rounded-[6vw] bg-[#7D9BB7] flex items-center justify-center dark:bg-[#648388]"
                >
                  <Icon
                    icon="ant-design:message-filled"
                    width="20"
                    height="20"
                  />
                  <span className="whitespace-nowrap overflow-hidden">
                    {dataTruncation(playListData.playlist?.commentCount)}
                  </span>
                </div>
                <div
                  onClick={() => handleFavoriteClick()}
                  className="h-[10.2vw] w-[29.1vw] rounded-[6vw] bg-[#ff2756] flex items-center justify-center"
                >
                  <Icon icon={favoriteIcon} width="20" height="20" />
                  <span className="whitespace-nowrap overflow-hidden">
                    {dataTruncation(playListData.playlist?.subscribedCount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fff] rounded-tr-[5vw] rounded-tl-[5vw] mt-[5vw] px-[3.6vw]">
            <div className="h-[10.2vw] flex items-center justify-between sticky">
              <div className="flex w-[26.7vw] items-center justify-between text-[1.2vw]">
                <div className="w-[5.4vw] h-[5.4vw] rounded-[50%] bg-[#ff4937] flex items-center justify-center text-[#fff]">
                  <Icon icon="basil:play-solid" width="15" height="15" />
                </div>
                <p
                  className="whitespace-nowrap"
                  onClick={() => navigate("/MusicPlayBack")}
                >
                  播放全部
                </p>
                <p className="whitespace-nowrap">
                  ({playListTrackAll?.length})
                </p>
              </div>
              <div className="flex w-[14.8vw] h-[5.4vw] justify-between">
                <Icon icon="clarity:download-line" width="20" height="20" />
                <Icon icon="foundation:indent-more" width="20" height="20" />
              </div>
            </div>
            {playListTrackAll.map((item, index) => (
              <div
                key={index}
                className="text-[1.2vw] h-[14.6vw]"
                onClick={() => playMusics(item.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-[7.8vw]">
                      <p>{index + 1}</p>
                    </div>
                    <div className="w-[56.5vw]">
                      <div className="flex">
                        <p className="whitespace-nowrap overflow-hidden">
                          {item.al?.name}
                        </p>
                      </div>
                      <div className="flex">
                        <p className="whitespace-nowrap overflow-hidden text-[#ccc]">
                          {item?.ar[0]?.name} -
                        </p>
                        <span className="whitespace-nowrap overflow-hidden text-[#ccc]">
                          {item.al?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[15.3vw] justify-between">
                    <span className="">
                      <Icon
                        icon="bi:play-btn"
                        width="20"
                        height="20"
                        color="#b2b2b2"
                      />
                    </span>
                    <span>
                      <Icon
                        icon="formkit:reorder"
                        color="#b2b2b2"
                        width="20"
                        height="20"
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 弹出层 */}
      <Popup
        visible={visible1}
        bodyStyle={{
          height: "61.538vw",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        onMaskClick={() => {
          setVisible1(false);
        }}
      >
        <div>
          <div className="px-[3.932vw] py-[6.1vw] border-b border-[#ccc]">
            {playListData.playlist?.name}
          </div>
          <OnePopup />
        </div>
      </Popup>
      {/* 评论 */}
      <Popup
        visible={visible4}
        bodyStyle={{
          height: "95%",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        onMaskClick={() => {
          setVisible4(false);
        }}
      >
        <Comment Id={id} />
      </Popup>
    </Wrapper>
  );
};
export default PlayMusic;
