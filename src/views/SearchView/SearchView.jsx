import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { fetchToplistDetail, SearchBox } from "../../service/index";

export default function SearchView() {
  const LikeData = ["郁可唯", "王卓", "男孩别哭", "我要找到你"];
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [like, setLike] = useState([]);

  useEffect(() => {
    SearchBox(searchData)
      .then((res) => {
        setLike(res.data.result.songs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchData]);

  //数据请求
  let [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchToplistDetail();
        setList(data?.slice(0, 10));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(); // 在组件加载时调用该函数，开始数据获取
  }, []);

  return (
    <div className="w-full p-[4vw] text-[black] bg-[#f7fafc] relative">
      {/* 搜索框 */}
      <div className="flex justify-between w-[90vw] h-[9vw] items-center">
        <span onClick={() => navigate(-1)}>
          <Icon icon="ep:arrow-up" rotate={3} className="w-[6vw] h-[6vw]" />
        </span>
        <Icon
          icon="iconamoon:search"
          className="absolute ml-[10vw] w-[4vw] h-[4vw]"
        />
        <input
          onChange={(event) => {
            let searchData = event.target.value;
            setSearchData(searchData);
          }}
          type="text"
          className="w-[72vw] h-[9vw] border rounded-[20px] indent-[8vw]"
          placeholder=""
        />
        <span className="text-[4vw]">搜索</span>
      </div>

      {/* 分类 */}
      <ul className="flex w-[90vw] mt-[5vw]">
        <li className="w-[25vw] h-[5vw] flex justify-center items-center border-[#E3E5EA] border-r-[1px]">
          <Icon icon="uil:user" color="red" className="w-[5vw] h-[5vw]" />
          <span className="text-[3vw]">歌手</span>
        </li>
        <li className="w-[25vw] h-[5vw] flex justify-center items-center border-[#E3E5EA] border-r-[1px]">
          <Icon icon="mdi:music-box" color="red" className="w-[5vw] h-[5vw]" />
          <span className="text-[3vw]">曲风</span>
        </li>
        <li className="w-[25vw] h-[5vw] flex justify-center items-center border-[#E3E5EA] border-r-[1px]">
          <Icon
            icon="mingcute:music-2-fill"
            color="red"
            className="w-[5vw] h-[5vw]"
          />
          <span className="text-[3vw]">专区</span>
        </li>
        <li className="w-[25vw] h-[5vw] flex justify-center items-center">
          <Icon icon="ph:microphone" color="red" className="w-[5vw] h-[5vw]" />
          <span className="text-[3vw]">识曲</span>
        </li>
      </ul>

      {/* 猜你喜欢 */}
      <div>
        <div className="flex items-center justify-between px-[3vw] mt-[5vw]">
          <p className="text-[20px]">猜你喜欢</p>
          <Icon icon="ion:refresh" rotate={1} width={30} />
        </div>
        <div className="flex items-center">
          {LikeData.map((item, index) => (
            <div
              className="px-[3vw] py-[2vw] rounded-[20px] bg-[#fff] mr-[3vw] mt-[3vw] ml-[2vw] whitespace-nowrap"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* 榜单 */}
      <div className="flex lunbo w-[100%] mt-[5vw] mb-[15vw] mx-auto overflow-x-scroll scrollBar">
        {list.map((item, index) => (
          <div
            key={index}
            className="w-[61vw] bg-[#fff] rounded-[2vw] ml-[2.344vw]"
          >
            <div className="ml-[2vw] w-[54vw] h-[12.422vw] flex items-center border-b-[1px] border-b-[#fff] ">
              <span className="text-[4vw] mr-[3.359vw] ml-[4vw]">
                {item.name}
              </span>
              <div className="h-[5.235vw] bg-[#F1F4F4] flex items-center px-[2vw] rounded-[3vw]">
                <Icon
                  icon="solar:play-bold"
                  className="mr-[0.7vw] text-[2.6vw]"
                />
                <span className="text-[2.6vw]">播放</span>
              </div>
            </div>
            <div className="pr-[2vw]">
              {item.tracks.slice(0, 20).map((item, index) => (
                <div
                  key={index}
                  className="my-[2.7vw] flex items-center h-[8vw]"
                >
                  <span
                    className={
                      index < 3
                        ? "text-[3.2vw] w-[8.83vw] text-center text-[red] font-[400]"
                        : "text-[3.2vw] w-[8.83vw] text-center font-[400]"
                    }
                  >
                    {index + 1}
                  </span>
                  <span className="text-[3.2vw] mr-[1vw] w-[50vw] overflow-hidden truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {searchData ? (
        <div className="absolute top-[13vw] left-0 right-0 z-[999] bg-[#fff] h-[100%] px-[10vw]">
          {like.map((item, index) => (
            <div
              className="p-[5vw] leading-[5vw] flex items-center  border-b border-[#282a31]"
              key={index}
            >
              <Icon icon="basil:search-outline" width={20} />
              <p className="pl-[3vw]">{item.name}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
