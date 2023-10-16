import React, { useEffect } from "react";
import { Swiper } from "antd-mobile";
import { bannerPic } from "../../../service/index";
export default function Carousel() {
  //轮播数据请求
  let [bannerList, setBannerList] = React.useState([]);
  useEffect(() => {
    bannerPic()
      .then((res) => {
        setBannerList(res.data.data.blocks[0].extInfo.banners);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const items = bannerList.map((item, index) => (
    <Swiper.Item key={index}>
      <div className="h-[35.5vw] rounded-[2vw] w-[100%] text-[#ffffff] flex justify-center items-center">
        <img
          src={item.pic}
          alt=""
          className="h-[35.5vw] rounded-[2vw] w-[100%]"
        />
      </div>
    </Swiper.Item>
  ));

  return (
    <div>
      <Swiper autoplay loop>
        {items}
      </Swiper>
    </div>
  );
}
