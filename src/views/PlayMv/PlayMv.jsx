import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NoticeBar, ProgressBar } from "antd-mobile";
const PlayMv = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#000000] pt-[3vw] h-[100vh]">
        {/* 头部 */}
        <div className="text-[#fff] w-[90.463vw] mx-auto flex items-center justify-between">
          <Icon
            icon="lucide:arrow-left"
            width="25"
            onClick={() => navigate(-1)}
          />
          <div className="flex w-[16.574vw] justify-between">
            <Icon icon="mdi-light:fullscreen" width="25" rotate="2" />
            <Icon icon="ri:more-2-line" width="25" />
          </div>
        </div>
        {/* 视频 */}
        <div className="w-[100%] h-[56.296vw] mt-[25vw] relative bg-[#fff]">
          {/* <video
            ref="videoPlayer"
            src="currentPlaybackVideoPath"
            loop
            autoplay
          ></video> */}
          <Icon
            icon="ph:play-fill"
            width="60"
            className="absolute top-[40%] left-[45%] text-[#ccc]"
          />
        </div>
        {/* 头像 MV 歌曲名 点赞 评论 转发 收藏 */}
        <div className="flex justify-between items-end">
          <div>
            {/* 头像 MV 歌曲名 */}
            <div className="text-[2vw] pl-[3vw] text-[#fff] flex items-center w-[32vw] justify-between">
              <div className="w-[8.9vw] h-[8.9vw] rounded-[50%]">
                <img
                  // src="currentPlayingVideoData?.artists[0]?.img1v1Url"
                  src=""
                  alt=""
                  className="w-[8.9vw] h-[8.9vw] rounded-[50%]"
                />
              </div>
              <p>程响</p>
              <div className="w-[6.852vw] h-[5.463vw] rounded-[3vw] bg-[#FE3C3A] flex items-center justify-center">
                <Icon icon="carbon:add" width="20" />
              </div>
            </div>
            <div>
              <div className="line-clamp-2 text-[2vw] pl-[3vw] text-[#fff] mt-[2vw]">
                <span className="inline-block w-[8.519vw] h-[4.722vw] bg-[#333333] text-[#fff] text-center leading-[4.722vw] rounded-[3px] text-[2vw]">
                  MV
                </span>
                {/* {{ currentPlayingVideoData?.name }} */}
                <span className="pl-[1.5vw]">可能</span>
              </div>
              <p className="pl-[3vw] pt-[3vw]">2023.05.06</p>
              {/* {{ currentPlayingVideoData?.desc }} */}
            </div>
          </div>
          <div className="w-[12.87vw] text-[#fff] text-[2vw] flex flex-col justify-between items-center">
            <div className="mb-[4vw]">
              <Icon icon="bxs:like" width="25" />
              <span>2222</span>
            </div>
            <div className="mb-[4vw]">
              <Icon icon="icon-park-solid:message" width="25" />
              <span>3333</span>
            </div>
            <div className="mb-[4vw]">
              <Icon icon="majesticons:share" width="25" />
              <span>444</span>
            </div>
            <div className="mb-[4vw]">
              <Icon icon="fluent:collections-20-filled" width="25" />
              <span>收藏</span>
            </div>
          </div>
        </div>
        {/* 滚动歌名及唱片 */}
        <div class="h-[10.833vw] flex items-center text-[#fff] justify-between px-[3vw]">
          <div class="flex items-center w-[50vw]">
            <Icon icon="ph:music-note-fill" width="20" />
            <div className="w-[60%]">
              <NoticeBar
                content={123411111111111}
                color="#000"
                icon={null}
                delay={1000}
                speed={100}
              />
            </div>
            <Icon icon="icon-park-outline:like" width="20" />
          </div>
          <div class="relative flex items-center justify-center">
            <img
              src="/static/01.png"
              alt=""
              class="w-[10vw] h-[10vw] rounded-[50%]"
            />
            <img
              // src="currentPlayingVideoData?.cover"
              src=""
              alt=""
              class="w-[7vw] h-[7vw] rounded-[50%] absolute rotateAnimation"
            />
          </div>
        </div>
        {/* 进度条 */}
        <div className="py-[3vw]">
          <ProgressBar
            percent={90}
            style={{
              "--fill-color": "var(--adm-color-success)",
              "--track-width": "1px",
            }}
          />
        </div>
        <div class="px-[3vw] py-[2vw] text-[2vw] text-[#333333] flex items-center justify-between">
          <p>发条评论结识有趣的人</p>
          <Icon icon="ci:expand" width="20" rotate="1" />
        </div>
      </div>
    </>
  );
};
export default PlayMv;
