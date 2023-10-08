import React from "react";
import { Icon } from "@iconify/react";
export default function HotTopic() {
  const HotData = Array.from({ length: 5 }, (_, index) => index);
  const colors = ["pink", "skyblue", "brown"];
  return (
    <>
      <div className="pl-[3.704vw] mt-[5vw] w-[100%] overflow-x-scroll lunbo flex items-center h-[40vw] mb-[5vw]">
        {HotData.map((index) => (
          <ul className="w-[350vw] flex mb-[6.31vw] scroll-content" key={index}>
            <li
              style={{ backgroundColor: colors[index % colors.length] }}
              v-for="item in 5"
              className="relative w-[68vw] h-[28vw] rounded-[3vw] py-[4vw] px-[3vw] mr-[2.83vw]"
            >
              <div className="flex items-center">
                <Icon
                  icon="uil:comment-chart-line"
                  color="white"
                  className="w-[5vw] h-[5vw] mr-[2vw]"
                />

                <h4 className="text-[4vw] text-[#fff]">音乐节</h4>
              </div>

              <p className="text-[2.6vw] text-[#D7D7D7]">182万热度</p>

              <p className="text-[2.6vw] text-[#fff] w-[40vw] mt-[2vw]">
                BMTH_official:什么是[全场大合唱]
              </p>
              <img
                src="https://p4.music.126.net/em_fXgUJDApoV_3_8HYkNg==/109951164362973668.jpg"
                alt=""
                className="w-[13.75vw] h-[13.75vw] rounded-[12px] absolute right-[2.9vw] bottom-[2.9vw]"
              />
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
