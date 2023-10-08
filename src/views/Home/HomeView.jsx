import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import RecommendedSong from "./components/RecommendedSong";
import TitleComponent from "../../components/TitleComponent";
import NewSongs from "./components/NewSongs";
import RankingList from "./components/RankingList";
import MusicCalendar from "./components/MusicCalendar";
import HotTopic from "./components/HotTopic";
import LeftPopup from "./components/LeftPopup";
import { Input, Popup } from "antd-mobile";
import styled from "styled-components";
const Wrapper = styled.div``;
export default function Home() {
  const navigate = useNavigate();
  const [visible3, setVisible3] = useState(false);
  return (
    <Wrapper>
      <div className="w-full">
        {/* 头部搜索栏 */}
        <div className="fixed top-0 bg-[#fff] p-4 w-full z-[22] h-[14vw] voerflow-hidden">
          <div className="flex justify-center items-center relative">
            <div
              onClick={() => {
                setVisible3(true);
              }}
            >
              <Icon icon="basil:menu-solid" width="35" height="35" />
            </div>
            <Input
              onClick={() => navigate("/SearchView")}
              type="text"
              placeholder="男孩别哭"
              className="border rounded-[5vw] px-4 py-2 w-[75vw] h-[8.7vw] dark:bg-[#2c2e35] pl-[10vw]"
            />
            <Icon icon="system-uicons:microphone" width="35" height="35" />
            <Icon
              icon="ei:search"
              width="20"
              height="20"
              className="absolute left-[12vw]"
            />
            <Icon
              icon="tabler:scan"
              width="25"
              className="absolute right-[13vw] text-[#ccc]"
            />
          </div>
        </div>
        {/* 轮播图 */}
        <div className="mt-[15vw] h-[35.5vw] px-[3.8vw] rounded-[2vw]">
          <Carousel />
        </div>
        {/* 菜单 */}
        <Menu />
        {/* 推荐歌单 */}
        {/* 标题组件 */}
        <TitleComponent title="推荐歌单" />
        <RecommendedSong />
        {/* 新歌新碟/数字专辑 */}
        <TitleComponent title="新歌新碟/数字专辑" />
        <NewSongs />
        {/* 排行榜 */}
        <TitleComponent title="排行榜" />
        <RankingList />
        {/* 音乐日历 */}
        <TitleComponent title="音乐日历" />
        <MusicCalendar />
        {/* 热门话题 */}
        <TitleComponent title="热门话题" />
        <HotTopic />
        {/* 左侧弹出层 */}
        <Popup
          visible={visible3}
          onMaskClick={() => {
            setVisible3(false);
          }}
          position="left"
          bodyStyle={{ width: "85vw" }}
        >
          <LeftPopup />
        </Popup>
      </div>
    </Wrapper>
  );
}
