import React, { useEffect, useState } from "react";
import { menuList } from "../../../service/index";
import styled from "styled-components";

//样式
const Wrapper = styled.div`
  .red-image {
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
  }
`;
export default function Menu() {
  const date = new Date().getDate(); //日期

  //菜单数据请求
  let [menuListData, setMenuListData] = useState([]);
  useEffect(() => {
    menuList()
      .then((res) => {
        setMenuListData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Wrapper>
      <div className="mt-[6vw] w-[89.5vw] mx-auto overflow-x-scroll lunbo">
        <ul className="flex w-[160vw] h-[18vw]">
          {menuListData.map((item, index) => (
            <div key={index} className="mr-[2vw]">
              <div className="w-[13vw] h-[13vw] mr-[3vw]">
                <div className="w-[13vw] h-[13vw] relative">
                  <img
                    src={item.iconUrl}
                    alt=""
                    className="red-image w-[13vw] h-[13vw]"
                  />
                  {index === 0 ? (
                    <span className="text-[#fff] absolute top-[45%] left-[40%] text-[1vw]">
                      {date < 10 ? "0" + date : date}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-[1.2vw] text-center">{item.name}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
