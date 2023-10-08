import React from "react";
import { useNavigate } from "react-router-dom";
import { TabBar } from "antd-mobile";
import { Icon } from "@iconify/react";
import styled from "styled-components";
const Wrapper = styled.div`
  .adm-tab-bar-item-active {
    color: red;
    .adm-tab-bar-item-icon {
      height: 30px;
      width: 30px;
      padding: 2px;
      background-color: red;
      border-radius: 50%;
      color: #fff;
    }
  }
`;

export default function TabBarBlock() {
  const tabs = [
    {
      key: "/Home",
      title: "首页",
      icon: <Icon icon="ri:netease-cloud-music-fill" />,
    },
    {
      key: "/MvRankingList",
      title: "排行榜",
      icon: <Icon icon="mingcute:radar-line" />,
    },
    {
      key: "/Mine",
      title: "我的",
      icon: <Icon icon="mingcute:music-line" />,
    },
    {
      key: "/Concern",
      title: "关注",
      icon: <Icon icon="iconoir:user-love" />,
    },
    {
      key: "/Community",
      title: "社区",
      icon: <Icon icon="ph:wechat-logo" />,
    },
  ];

  const navigateTo = useNavigate();

  const setRouteActive = (value) => {
    navigateTo(value);
  };

  return (
    <Wrapper>
      <div className="fixed bottom-0 left-0 w-[100%] border-t-[1px] border-[gray] bg-[#fff]">
        <TabBar onChange={(value) => setRouteActive(value)}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </Wrapper>
  );
}
