import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Popup } from "antd-mobile";
export default function TitleComponent(props) {
  const [visible5, setVisible5] = useState(false);
  return (
    <>
      <div className="px-[3.5vw] mt-[3.426vw]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-[4.5vw]">{props.title}</div>
            <Icon icon="mingcute:right-line" width={30} />
          </div>
          <Icon
            icon="ant-design:more-outlined"
            width={30}
            onClick={() => {
              setVisible5(true);
            }}
          />
        </div>
      </div>
      <Popup
        visible={visible5}
        onMaskClick={() => {
          setVisible5(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "25%",
        }}
      >
        <div className="w-[100%]">
          <div className="h-[10vw] flex justify-between px-[4vw] items-center text-[4vw]">
            <span>{props.title}</span>
            <Icon
              icon="codicon:error"
              onClick={() => {
                setVisible5(false);
              }}
            />
          </div>
          <div className="w-[100%] px-[4vw]">
            <div className="flex h-[12.1vw] items-center">
              <Icon icon="iconamoon:like-light" width="16" height="16" />
              <span className="pl-[2vw]">优先推荐</span>
            </div>
            <div className="flex h-[12.1vw] items-center">
              <Icon icon="ion:heart-dislike-outline" width="16" height="16" />
              <span className="pl-[2vw]">减少推荐</span>
            </div>
            <div className="flex h-[12.1vw] items-center">
              <Icon
                icon="icon-park-outline:more-three"
                width="16"
                height="16"
              />
              <span className="pl-[2vw]">更多内容</span>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
