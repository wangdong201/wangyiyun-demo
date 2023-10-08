import React, { useEffect } from "react";
import { CalendarData } from "../../../service/index";
export default function MusicCalendar() {
  //音乐日历数据请求
  const [musicCalendarData, setMusicCalendarData] = React.useState([]);
  useEffect(() => {
    CalendarData()
      .then((res) => {
        setMusicCalendarData(res.data.data.calendarEvents.slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="pl-[3.704vw] mt-[5vw] h-[30vw] shadow-lg mx-[3.704vw] rounded-[5px]">
        {musicCalendarData.map((item, index) => (
          <div
            className="flex items-center justify-between mt-[10px]"
            key={index}
          >
            <div className="text-[12px] ml-[1.5vw]"> {item.title} </div>
            <img
              src={item.imgUrl}
              alt=""
              className="w-[11vw] h-[11vw] rounded-[5px] mr-[20px] mt-[10px]"
            />
          </div>
        ))}
      </div>
    </>
  );
}
