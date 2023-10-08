import React, { useEffect } from "react";
import { bannerPic } from "../../../service/index";
export default function NewSongs() {
  //新歌新碟/数字专辑数据请求
  const [newSongs, setNewSongs] = React.useState([]);
  useEffect(() => {
    bannerPic()
      .then((res) => {
        setNewSongs(res.data.data.blocks[2].creatives);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="pl-[3.704vw] mt-[5vw] w-[100%] overflow-x-scroll lunbo flex items-center h-[60vw]">
        {newSongs.map((item, index) => (
          <div
            className="flex flex-col mb-[3.5vw] h-[50vw] w-[310vw]"
            key={index}
          >
            {item.resources.map((item, index) => (
              <div className="flex w-[80vw] mt-[10px]" key={index}>
                <img
                  src={item.uiElement?.image?.imageUrl}
                  alt=""
                  className="w-[15vw] h-[15vw] mr-[3vw] rounded-[3vw]"
                />
                <div className="flex flex-col justify-between">
                  <p className="w-[40vw] line-clamp-1 overflow-hidden text-[1.2vw]">
                    {item.uiElement?.mainTitle?.title}
                  </p>
                  <p className="w-[40vw] line-clamp-1 overflow-hidden text-[1.2vw]">
                    {item.uiElement?.subTitle?.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
