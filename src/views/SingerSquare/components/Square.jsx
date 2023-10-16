import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getHighquality } from "../../../service";
import { dataTruncation } from "../../../hooks/index";

const Square = (props) => {
  const [HighqualityData, setHighqualityData] = useState([]);
  useEffect(() => {
    getHighquality(
      props.data === "推荐" || "官方" || "精品" || "共享歌单"
        ? null
        : props.data
    )
      .then((res) => {
        setHighqualityData(res.data.playlists);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);

  return (
    <>
      {props.data === "推荐" ? (
        <div className="mt-[2vw] flex items-center">
          <Icon icon="material-symbols:refresh" width="28" />
          <p className="text-[4.5vw] text-[#2D374A] pl-[2vw]">
            Hi 时间总会过 , 快来听听
          </p>
        </div>
      ) : null}

      {props.data === "精品" ? (
        <div className=" text-[3.5vw] py-[3vw] flex justify-between items-center">
          <div>全部精品</div>
          <div className=" flex justify-between items-center">
            <Icon icon="foundation:indent-more" />
            <span>筛选</span>
          </div>
        </div>
      ) : null}

      {/* 歌单部分 */}
      <div className="flex flex-wrap justify-between">
        {HighqualityData?.map((item, index) => (
          <div className="relative w-[28.704vw] mt-[3vw]" key={index}>
            <div className="w-[28.704vw] h-[28.704vw] rounded-[3vw] border">
              <img src={item?.coverImgUrl} alt="" />
            </div>
            <p className="line-clamp-2 w-[28.704vw]">{item?.name}</p>
            <div className="px-[2vw] py-[1vw] bg-[#a2a3ae] text-[#fff] absolute top-[3vw] right-[3vw] flex items-center rounded-[3vw]">
              <Icon icon="ph:play" width="10" />
              <span className="text-[1vw]">
                {dataTruncation(item.playCount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Square;
