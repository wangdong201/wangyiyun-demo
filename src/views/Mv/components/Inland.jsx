import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { MVList } from "../../../service";
export default function Inland(props) {
  const navigate = useNavigate();
  const dataTruncation = (playVolume) => {
    if (playVolume > 100000000) {
      return `${Math.floor(playVolume / 100000000)}亿`;
    } else if (playVolume > 100000) {
      return `${Math.floor(playVolume / 10000)}万`;
    } else {
      return playVolume.toString();
    }
  };

  const Num = (num) => {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  };
  //mv数据请求
  const [mv, setMv] = useState([]);
  useEffect(() => {
    MVList(props.data)
      .then((res) => {
        setMv(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);
  return (
    <>
      <div>
        <div className="flex pl-[4.103vw] mt-[3.726vw] items-center">
          <p className="pr-[2.65vw] text-[3.5vw]">最近更新:今天</p>
          <Icon
            icon="mdi:warning-circle-outline"
            rotate="2"
            width={20}
            className="text-[#ccc]"
          />
        </div>
        {mv.map((item, index) => (
          <div className="w-[91.795vw] mx-auto mt-[6.838vw]" key={item.id}>
            <div className="w-[91.795vw] h-[51.538vw] relative">
              <img
                src={item.cover}
                alt=""
                className="w-[91.795vw] h-[51.538vw] rounded-[3vw]"
                onClick={() => navigate("/PlayMv")}
              />
              <div className="absolute text-[#fff] top-[1.5vw] right-[3vw] flex items-center">
                <Icon icon="basil:play-outline" width="15" />
                <p className="whitespace-nowrap">
                  {dataTruncation(item.playCount)}
                </p>
              </div>
            </div>
            <div className="h-[9.402vw] mt-[2.65vw] flex items-center">
              <div className="h-[9.402vw] w-[8.889vw] text-center leading-[9.402vw] text-red-500 text-[8vw]">
                {/* {Num(item.lastRank)} */}
                {Num(index + 1)}
              </div>
              <div className="w-[75vw] overflow-hidden">
                <p className="whitespace-nowrap overflow-ellipsis overflow-hidden pl-[2vw]">
                  {item.name}
                </p>
                <p>
                  - <span className="text-[2vw]"> {item.artistName} </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
