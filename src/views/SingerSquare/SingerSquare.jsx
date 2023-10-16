import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { AppstoreOutline } from "antd-mobile-icons";
import { Tabs } from "antd-mobile";
import Square from "./components/Square";
import styled from "styled-components";
const Wrapper = styled.div`
  .adm-tabs-content {
    padding: 0px !important;
  }
  .adm-tabs-header {
    width: 82vw;
  }
  .moreIcon {
    font-size: var(--adm-font-size-9);
    margin: 0 12px;
    transform: translateY(-2px);
  }
`;

const Squares = () => {
  const navigate = useNavigate();
  const tabOptions = [
    "推荐",
    "官方",
    "精品",
    "轻音乐",
    "摇滚",
    "共享歌单",
    "民谣",
    "华语",
    "粤语",
  ];

  return (
    <Wrapper>
      <div className="px-[3.796vw]">
        {/* 标题 */}
        <div className="text-[#000] mt-[2vw] flex items-center">
          <div onClick={() => navigate(-1)}>
            <Icon icon="ph:arrow-left-light" width={30} />
          </div>
          <span className="pl-[3vw] text-[#2D374A] text-[4.5vw]">歌单广场</span>
        </div>
        {/* 标签导航栏 */}
        <div className="relative">
          <Tabs>
            {tabOptions.map((option) => (
              <Tabs.Tab title={option} key={option}>
                <Square data={option} />
              </Tabs.Tab>
            ))}
          </Tabs>
          <AppstoreOutline
            className="moreIcon absolute top-[3vw] right-0"
            onClick={() => navigate("/MusicLabel")}
          />
        </div>
      </div>
    </Wrapper>
  );
};
export default Squares;
