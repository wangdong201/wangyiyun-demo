import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { bannerPic } from "../../../service/index";
export default function RankingList() {
  //排行榜数据请求
  const [rankingList, setRankingList] = React.useState([]);
  useEffect(() => {
    bannerPic()
      .then((res) => {
        // console.log(res);
        setRankingList(res.data.data.blocks[3].creatives);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="pl-[3.704vw] mt-[5vw] w-[100%] overflow-x-scroll lunbo flex items-center h-[60vw]">
        {rankingList.map((item, index) => (
          <div
            className="w-[90vw] h-[54vw] rounded-[3vw] mr-[3vw] opacity-0.4 bg-[#FFFFFF] shadow-md"
            key={index}
          >
            <div className="m-[2vw]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p>{item.uiElement?.mainTitle?.title}</p>
                  <Icon
                    icon="iconamoon:arrow-right-2-thin"
                    width="20"
                    height="20"
                  />
                </div>
                <span className="text-[#ccc]">
                  {item.uiElement?.mainTitle?.titleDesc}
                </span>
              </div>
              {item.resources.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center mt-[2vw]">
                    <img
                      src={item.uiElement?.image?.imageUrl}
                      alt=""
                      className="w-[12vw] h-[12vw] rounded-[3vw]"
                    />
                    <div className="w-[12vw] h-[12vw] text-center leading-[12vw] text-[red]">
                      {index + 1}
                    </div>
                    <div className="text-[1.2vw] w-[52vw]">
                      <p className="line-clamp-1 overflow-hidden">
                        {item.resourceExtInfo?.songData?.album.name}
                      </p>
                      <p className="line-clamp-1 overflow-hidden">
                        {item.resourceExtInfo?.artists[0].name}
                      </p>
                    </div>
                    <p className="text-[1.2vw] text-[red]">
                      {item.uiElement.labelText?.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
