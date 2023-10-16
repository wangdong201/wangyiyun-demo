import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Popup, Toast } from "antd-mobile";
const OnePopup = () => {
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const report = [
    "政治反动",
    "淫秽色情",
    "违法信息",
    "恶意攻击谩骂",
    "营销广告",
    "虚假信息",
    "低俗",
    "其他",
  ];
  const KebabsSort = [
    {
      icon: "pepicons-pop:file",
      text: "默认排序",
    },
    {
      icon: "fa6-solid:a",
      text: "按单曲名排序",
    },
    {
      icon: "cil:album",
      text: "按专辑名排序",
    },
    {
      icon: "ant-design:user-switch-outlined",
      text: "按歌手名排序",
    },
  ];
  return (
    <>
      <div className="px-[3.932vw]">
        <div
          className="py-[6.1vw] flex items-center"
          onClick={() => {
            setVisible3(true);
          }}
        >
          <Icon icon="octicon:multi-select-16" width="20" />
          <p className="pl-[3vw]">选择歌曲排序</p>
        </div>
        <div className="py-[3.1vw] flex items-center">
          <Icon
            icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
            width="20"
          />
          <p className="pl-[3vw]">清空下载文件</p>
        </div>
        <div
          className="py-[3.1vw] flex items-center"
          onClick={() => {
            setVisible2(true);
          }}
        >
          <Icon icon="ic:outline-report-problem" width="20" />
          <p className="pl-[3vw]">举报</p>
        </div>
      </div>
      {/* 举报弹出层 */}
      <Popup
        visible={visible2}
        onMaskClick={() => {
          setVisible2(false);
        }}
        bodyStyle={{
          height: "69%",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div>
          <div className="pl-[3.822vw] py-[6.25vw] border-b border-[#ccc]">
            选择举报类型
          </div>
          <div className="pl-[3.822vw]">
            {report.map((item, index) => (
              <div
                className="h-[13.156vw] border-b border-[#ccc]"
                key={index}
                onClick={() =>
                  Toast.show({
                    content: "举报成功",
                  })
                }
              >
                <span className="leading-[13.156vw]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Popup>
      {/* 选择歌曲排序弹出层 */}
      <Popup
        visible={visible3}
        onMaskClick={() => {
          setVisible3(false);
        }}
        bodyStyle={{
          height: "40%",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div>
          <div className="pl-[3.822vw] py-[6.25vw] border-b border-[#ccc]">
            选择歌曲排序
          </div>
          <div className="pl-[3.822vw]">
            {KebabsSort.map((item, index) => (
              <div key={index} className="flex h-[13vw] items-center">
                <Icon icon={item.icon} width="20" />
                <span className="pl-[3vw]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    </>
  );
};
export default OnePopup;
