import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { ProgressBar, Popup } from "antd-mobile";
const Wrapper = styled.div`
  .rotateAnimation1 {
    animation: rotate 10s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }
    to {
      transform: translateX(-50%) translateY(-50%) rotate(360deg);
    }
  }
`;
const MusicPlayBack = () => {
  const navigate = useNavigate();
  const [visible5, setVisible5] = useState(false);
  return (
    <Wrapper>
      <div className=" relative">
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
              <p className="whitespace-nowrap overflow-hidden">11111</p>
              <span className="mr-[1vw] whitespace-nowrap overflow-hidden">
                222
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
          <div className="mt-[35vw] w-[89.829vw] mx-auto relative ">
            <img
              src="./static/01.png"
              alt=""
              className="w-[71vw] h-[71vw] mx-auto"
            />
            <img
              src=""
              alt=""
              className="w-[45vw] h-[45vw] absolute top-[50%] left-[50%] rounded-[50%] border-[3px] border-[#000] rotateAnimation1"
            />
            <div className="absolute w-[21.63vw] h-[35.043vw] top-[-20vw] left-[60%] translate-x-[-50%] rotated">
              <img
                src="./static/needle-ab.png"
                alt=""
                className="w-[21.63vw] h-[35.043vw]"
              />
            </div>
          </div>
          {/* 喜欢,下载部分 */}
          <div className="h-[7.009vw] w-[78.12vw] mx-auto flex items-center justify-between mt-[18.12vw]">
            <Icon icon="icon-park-outline:like" width="20" height="20" />
            <Icon
              icon="streamline:interface-download-circle-arrow-circle-down-download-internet-network-server-upload"
              width="20"
              height="20"
            />
            <Icon icon="iconoir:emoji-sing-right-note" width="20" height="20" />
            <Icon icon="bx:message-detail" width="20" height="20" />
            <Icon icon="ri:more-2-line" width="20" height="20" />
          </div>
          {/* 进度条 */}
          <div className="w-[91.026vw] mx-auto flex items-center justify-between text-[2vw] mt-[10vw]">
            <span>00:00</span>
            <ProgressBar
              percent={50}
              style={{
                "--fill-color": "var(--adm-color-success)",
                "--track-width": "4px",
                "--track-color": "#CDE2FF",
                width: "100%",
              }}
            />
            <span>04:25</span>
          </div>
          {/* 播放组件 */}
          <div className="h-[16.752vw] w-[81.88vw] mx-auto flex items-center justify-between mt-[6.154vw] mb-[15vw]">
            <Icon icon="ps:random" width="20" height="20" />
            <Icon icon="fluent:previous-32-filled" width="20" height="20" />
            <div className="w-[12vw] h-[12vw] rounded-[50%]  flex items-center justify-center border-[3px]">
              <Icon icon="carbon:pause-filled" width="30" />
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
        </div>
      </div>
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
