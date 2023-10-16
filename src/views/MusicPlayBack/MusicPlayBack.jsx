import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { ProgressBar, Popup } from "antd-mobile";
import { getSongUrl, getSongDetail } from "../../service/index";
import { useRequest } from "ahooks";
import Glass from "react-blur";
const Wrapper = styled.div`
  .rotateAnimation1 {
    animation: rotate 10s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: translateX(0%) translateY(0%) rotate(0deg);
    }
    to {
      transform: translateX(0%) translateY(0%) rotate(360deg);
    }
  }
  .paused-animation {
    animation-play-state: paused;
  }

  .rotated {
    transition: all 0.5s;
    transform-origin: left top;
  }

  .react-blur-canvas {
    position: absolute;
    width: 100% !important;
  }
`;

const MusicPlayBack = () => {
  const navigate = useNavigate();
  const [visible5, setVisible5] = useState(false);
  const { id } = useParams();
  const { data } = useRequest(() => getSongUrl(id));
  const songUrl = data?.data?.data[0]?.url;
  const { data: songDetail } = useRequest(() => getSongDetail(id));
  const songDetailData = songDetail?.data?.songs[0];

  // 歌曲播放与暂停
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioClick = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  };
  const rotateClass = isPlaying ? "rotateAnimation1" : "";
  // 时间转换函数
  const formatTime = (time) => {
    time = parseInt(time);
    // 计算分钟和秒数
    const minute = Math.floor(time / 60000);
    const second = Math.round((time % 60000) / 1000);
    return `${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;
  };


  // 格式化时间函数
  // const currentPlayback = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60)
  //     .toFixed(0)
  //     .padStart(2, "0");
  //   return `${minutes < 10 ? "0" + minutes : minutes}:${
  //     seconds < 10 ? "0" + seconds : seconds
  //   }`;
  // };

  //进度条
  const [progress, setProgress] = useState(0);
  const [currentPlaybackDuration, setCurrentPlaybackDuration] = useState(0); //当前播放时长
  // 更新进度条状态
  const updateProgress = (currentTime) => {
    const totalTime = data?.data?.data[0]?.time; // 歌曲总时长
    const percentage = (currentTime / totalTime) * 100000; // 计算百分比,转换为1-100的数字
    setProgress(percentage);
    setCurrentPlaybackDuration(percentage);
  };

  return (
    <Wrapper>
      <Glass
        img={songDetailData?.al?.picUrl} // 设置模糊背景图片
        blurRadius={40}
      >
        <div className=" relative text-[#fff]">
          <div>
            {/* 头部 */}
            <div className="w-[89.829vw] mx-auto h-[10.256vw] flex items-center justify-between">
              <div>
                <Icon
                  icon="ep:arrow-up"
                  width="20"
                  height="20"
                  rotate="2"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="text-[2vw] w-[63.504vw] text-center">
                <p className="whitespace-nowrap overflow-hidden text-[4.5vw]">
                  {songDetailData?.name}
                </p>
                <span className="mr-[1vw] whitespace-nowrap overflow-hidden">
                  {songDetailData?.ar[0]?.name}
                </span>
                <span className="h-[4.188vw] w-[7.863vw] bg-[#555D5A] rounded-[3px] inline-block leading-[4.188vw] whitespace-nowrap">
                  关注
                </span>
              </div>
              <div>
                <Icon icon="ri:share-circle-line" width="20" height="20" />
              </div>
            </div>
            {/* 播放器部分 */}
            <div className="mt-[30vw] w-[89.829vw] mx-auto relative ">
              <img
                src="/static/01.png"
                alt=""
                className="w-[71vw] h-[71vw] mx-auto"
              />
              <img
                src={songDetailData?.al?.picUrl}
                alt=""
                className={`${rotateClass} w-[45vw] h-[45vw] absolute top-[18%] left-[25%] rounded-[50%] border-[3px] border-[#000] `}
              />
              <div
                className="absolute w-[21.63vw] h-[35.043vw] top-[-20vw] left-[50%] translate-x-[-50%] rotated"
                style={{
                  transform: isPlaying ? "rotate(2deg)" : "rotate(-30deg)",
                }}
              >
                <img
                  src="/static/needle-ab.png"
                  alt=""
                  className={`w-[21.63vw] h-[35.043vw] ${
                    isPlaying ? "paused-animation" : ""
                  }`}
                />
              </div>
            </div>
            {/* 喜欢,下载部分 */}
            <div className="h-[7.009vw] w-[78.12vw] mx-auto flex items-center justify-between mt-[10vw]">
              <Icon icon="icon-park-outline:like" width="20" height="20" />
              <Icon
                icon="streamline:interface-download-circle-arrow-circle-down-download-internet-network-server-upload"
                width="20"
                height="20"
              />
              <Icon
                icon="iconoir:emoji-sing-right-note"
                width="20"
                height="20"
              />
              <Icon icon="bx:message-detail" width="20" height="20" />
              <Icon icon="ri:more-2-line" width="20" height="20" />
            </div>
            {/* 进度条 */}
            <div className="w-[91.026vw] mx-auto flex items-center justify-between text-[2vw] mt-[6vw]">
              <span>{currentPlaybackDuration}</span>
              <ProgressBar
                percent={progress}
                style={{
                  "--fill-color": "var(--adm-color-success)",
                  "--track-width": "4px",
                  "--track-color": "#CDE2FF",
                  width: "100%",
                }}
              />
              <span>{formatTime(data?.data?.data[0]?.time)}</span>
            </div>
            {/* 播放组件 */}
            <div className="h-[16.752vw] w-[81.88vw] mx-auto flex items-center justify-between mt-[3vw]">
              <Icon icon="ps:random" width="20" height="20" />
              <Icon icon="fluent:previous-32-filled" width="20" height="20" />
              <div
                className="w-[12vw] h-[12vw] rounded-[50%]  flex items-center justify-center border-[3px]"
                onClick={audioClick}
              >
                <Icon
                  icon={
                    isPlaying ? "carbon:pause-filled" : "mingcute:play-fill"
                  }
                  width="30"
                />
              </div>
              <Icon
                icon="fluent:previous-32-filled"
                width="20"
                height="20"
                rotate="2"
              />
              <Icon
                icon="foundation:indent-more"
                width="20"
                height="20"
                onClick={() => {
                  setVisible5(true);
                }}
              />
            </div>
            <audio
              ref={audioRef}
              src={songUrl}
              autoPlay={isPlaying}
              onTimeUpdate={(e) => updateProgress(e.target.currentTime)}
              loop
            ></audio>
          </div>
        </div>
      </Glass>
      {/* 播放列表内容 */}
      <Popup
        visible={visible5}
        onMaskClick={() => {
          setVisible5(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "60%",
        }}
      >
        <div className="mt-[5.47vw] pl-[4.701vw]">
          当前播放
          <span className="text-[2vw] text-[##ACACAC]">(55)</span>
        </div>
        <div className="h-[15.068vw] border-b flex items-center justify-between">
          <div className="flex px-[4.701vw]">
            <Icon
              icon="icon-park-outline:loop-once"
              width="20"
              height="20"
              className="text-[#ACACAC]"
            />
            <span className="text-[2vw] text-[#ACACAC] pl-[2vw]">列表循环</span>
          </div>
          <div className="text-[#ACACAC] flex w-[31.026vw] px-[4.701vw] justify-between">
            <Icon
              icon="streamline:interface-download-button-1-arrow-button-down-download-internet-network-server-upload"
              width="20"
              height="20"
            />
            <Icon icon="icon-park-outline:add" width="20" height="20" />
            <Icon icon="uiw:delete" width="20" height="20" />
          </div>
        </div>
        <div className="flex h-[13.504vw] border-b items-center justify-between">
          <div className="pl-[4.701vw] text-[2vw]">
            <p className="whitespace-nowrap">
              根据当前列表在下方推荐你喜欢的歌曲
            </p>
          </div>
          <div className="px-[4.701vw]">
            <div className="w-[7.35vw] h-[4.4vw] bg-[#E54F42] rounded-[4vw] relative">
              <div className="h-[4.359vw] w-[4.017vw] rounded-[50%] bg-[#FDFEFF] absolute right-[0vw]"></div>
            </div>
          </div>
        </div>
        <div className="h-[13.504vw] flex items-center justify-between pl-[4.701vw]">
          <div className="text-[2vw]">
            <span>123-</span>
            <span className="text-[#ACACAC]">hahaha</span>
          </div>
          <div className="px-[4.701vw] text-[#ACACAC]">
            <Icon
              icon="fluent-mdl2:status-circle-error-x"
              width="20"
              height="20"
            />
          </div>
        </div>
      </Popup>
    </Wrapper>
  );
};
export default MusicPlayBack;
