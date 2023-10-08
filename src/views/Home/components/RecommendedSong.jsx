import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bannerPic, bannerText } from "../../../service/index";
import { Swiper } from "antd-mobile";
export default function RecommendedSong() {
  const navigate = useNavigate();
  //数据请求
  const [songListData, setSongListData] = useState([]);
  const [bannerTextData, setBannerTextData] = useState([]);
  useEffect(() => {
    Promise.all([bannerPic(), bannerText()])
      .then(([bannerPicRes, bannerTextRes]) => {
        // 处理 bannerPic 的响应数据
        const picData = bannerPicRes.data.data.blocks[1].creatives.slice(1);
        setSongListData(picData);
        // 处理 bannerText 的响应数据
        const textData =
          bannerTextRes.data.data.blocks[1].creatives[0].resources;
        setBannerTextData(textData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const musicList = (music) => {
    navigate(`/PlayMusic/${music}`);
  };

  //循环小轮播图片
  const verticalItems = bannerTextData.map((item, index) => (
    <Swiper.Item key={index}>
      <div className="w-[31.852vw] h-[31.852vw] rounded-[3vw]">
        <img
          src={item.uiElement.image.imageUrl}
          alt=""
          className="w-[31.852vw] h-[31.852vw] rounded-[3vw]"
        />
      </div>
    </Swiper.Item>
  ));

  //循环小轮播图片对应文字
  const CarouselText = bannerTextData.map((item, index) => (
    <Swiper.Item key={index}>
      <div className="overflow-hidden">{item.uiElement.mainTitle.title}</div>
    </Swiper.Item>
  ));
  return (
    <>
      <div className="pl-[3.704vw] mt-[5vw] w-[100%] overflow-x-scroll lunbo flex items-center h-[43vw]">
        <div className="mr-[3vw]">
          <Swiper
            autoplay
            direction="vertical"
            autoplayInterval="3000"
            style={{ "--height": "31.852vw" }}
            indicator={() => null}
            loop
          >
            {verticalItems}
          </Swiper>

          <Swiper
            direction="vertical"
            style={{ "--height": "10vw" }}
            indicator={() => null}
            autoplayInterval="3000"
            autoplay
            loop
          >
            {CarouselText}
          </Swiper>
        </div>
        {songListData.map((item, index) => (
          <div className="flex w-[300vw] h-[41.667vw] mr-[3vw] p-0" key={index}>
            <div className="w-[31.852vw]">
              <img
                src={item.uiElement.image.imageUrl}
                alt=""
                className="w-[31.852vw] h-[31.852vw] rounded-[3vw]"
                onClick={() => musicList(item.resources[0].resourceId)}
              />
              <div className="w-[31.852vw] line-clamp-2 break-words">
                {item.uiElement.mainTitle.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
