import React from "react";
import { Tabs } from "antd-mobile";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import Inland from "./components/Inland";
const Wrapper = styled.div`
  .adm-tabs-tab-active {
    color: #2a3146;
    font-size: 3.5vw;
  }
  .adm-tabs-tab {
    font-size: 3.5vw;
  }
  .adm-tabs-tab-line {
    background-color: red;
  }
`;
export default function RankingList() {
  const MvTitle = ["内地", "港台", "欧美", "韩国", "日本"];
  return (
    <Wrapper>
      <div>
        <div className="w-[100%] px-[4.5vw] h-[6.838vw] mx-auto flex items-center mt-[6.325vw]">
          <div className="w-[34.359vw]">
            <Icon icon="uiw:left" width="25" height="25" />
          </div>
          <div>
            <p className="text-[4vw] font-[800]">MV排行榜</p>
          </div>
        </div>
        <div className="mt-[5.128vw]">
          <Tabs>
            {MvTitle.map((index) => (
              <Tabs.Tab title={index} key={index}>
                <Inland data={index} />
              </Tabs.Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </Wrapper>
  );
}
