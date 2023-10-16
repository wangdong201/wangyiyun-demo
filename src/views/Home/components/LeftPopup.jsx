import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "antd-mobile";
import { getUserAccount } from "../../../service/index";
import storejs from "storejs";
const LeftPopup = () => {
  const navigate = useNavigate();
  //音乐服务
  const musicServices = [
    {
      icon: "streamline:religion-hexagram-star-jew-jewish-judaism-hexagram-culture-religion-david",
      text: "趣测",
      extraContent: (
        <span className="text-[#ccc] text-[1.2vw]">点击查看今日运势</span>
      ),
    },
    {
      icon: "ion:ticket-outline",
      text: "云村有票",
    },
    {
      icon: "fluent:cube-20-regular",
      text: "多多西西口袋",
    },
    {
      icon: "icon-park-outline:shopping-bag",
      text: "商城",
    },
    {
      icon: "ph:heartbeat",
      text: "Beat专区",
      extraContent: (
        <span className="text-[#ccc] text-[1.2vw]">顶尖制作邀你创作</span>
      ),
    },
    {
      icon: "tabler:bell-ringing-2",
      text: "口袋彩铃",
    },
    {
      icon: "icon-park-outline:gamepad",
      text: "游戏专区",
      extraContent: (
        <span className="text-[#ccc] text-[1.2vw]">音乐浇灌治愈花园</span>
      ),
    },
  ];
  //其他
  const otherServices = [
    {
      icon: "ph:nut-light",
      text: "设置",
    },
    {
      icon: "fluent:weather-moon-16-regular",
      text: "深色模式",
    },
    {
      icon: "mingcute:alarm-2-line",
      text: "定时关闭",
    },
    {
      icon: "streamline:shopping-catergories-shirt-clothing-t-shirt-men-top",
      text: "个性装扮",
    },
    {
      icon: "iconoir:headset-charge",
      text: "边听边存",
      extraContent: <span className="text-[#ccc] text-[1.2vw]">未开启</span>,
    },
    {
      icon: "icon-park-outline:radio-one",
      text: "在线听歌免流量",
    },
    {
      icon: "ph:prohibit-light",
      text: "音乐黑名单",
    },
    {
      icon: "icon-park-outline:protect",
      text: "青少年模式",
      extraContent: <span className="text-[#ccc] text-[1.2vw]">未开启</span>,
    },
    {
      icon: "pepicons-pencil:alarm",
      text: "音乐闹钟",
    },
  ];
  //我的订单
  const myOrders = [
    {
      icon: "pepicons-pencil:file",
      text: "我的订单",
    },
    {
      icon: "ion:ticket-outline",
      text: "优惠劵",
    },
    {
      icon: "ph:headset",
      text: "我的客服",
    },
    {
      icon: "ri:share-circle-line",
      text: "分享网易云音乐",
    },
    {
      icon: "ic:outline-file-open",
      text: "个人信息收集与使用清单",
    },
    {
      icon: "icons8:share",
      text: "个人信息第三方共享清单",
    },
    {
      icon: "carbon:ibm-cloud-key-protect",
      text: "个人信息与隐私保护",
    },
    {
      icon: "mdi:about-circle-outline",
      text: "关于",
    },
  ];

  //个人信息数据请求
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getUserAccount()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 退出登录
  const cookie = storejs.get("_m_cookie");
  const logout = async () => {
    const result = await Dialog.confirm({
      content: "确认退出登录吗",
    });
    if (result) {
      storejs.remove("_m_cookie");
      navigate("/Login");
    }
  };
  return (
    <div className=" bg-[#f5f5f5]">
      {/* 用户信息 */}
      <div className="h-[10vw] px-[3.519vw] flex items-center justify-between fixed bg-[#fff] w-[100%]">
        <div className="flex items-center">
          <div className="rounded-[50%] w-[7.5vw] h-[7.5vw]">
            <img
              src={userData.profile?.avatarUrl}
              alt=""
              className="rounded-[50%] w-[7.5vw] h-[7.5vw]"
            />
          </div>
          {userData.profile?.nickname ? (
            <p className="pl-[2vw] pr-[1vw] text-[2.5vw]">
              {userData.profile?.nickname}
            </p>
          ) : (
            <p className="pl-[2vw] pr-[1vw] text-[2.5vw]">立即登录</p>
          )}

          <Icon icon="ph:caret-right-light" width="15" height="15" />
        </div>
        <div>
          <Icon icon="tabler:scan" width="25" className="text-[#000]" />
        </div>
      </div>
      <div
        className="px-[3.519vw] w-[100%] pt-[10vw]"
        style={{ height: "100vh", overflowY: "scroll" }}
      >
        {/* vip卡 */}
        <div className="h-[29.1vw] bg-gradient-to-r from-[#3C3A38] to-[#5B504C] rounded-[4vw] mt-[5vw] mx-auto">
          <div className="h-[13vw] w-[68vw] my-[3vw] mx-auto pt-[3vw]">
            <div className="flex justify-between">
              <p className="leading-[6.7vw] text-[#FDE4DD] font-bold text-[3.2vw]">
                黑胶VIP·壹
              </p>
              <div className="w-[17.8vw] h-[6.7vw] rounded-[6vw] text-center border leading-[6.7vw] text-[#FDE4DD] border-[#FDE4DD] text-[1.2vw]">
                会员中心
              </div>
            </div>
            <div className="text-[#998783] text-[1.2vw]">黑胶有效期仅剩3天</div>
          </div>
          <div className="h-[10.8vw] w-[68vw] pt-[3vw] flex mx-auto justify-between border-t border-[#FDE4DD]">
            <p className="text-[#998783] text-[1.2vw]">
              您的黑胶VIP即将到期,点击立即续费
            </p>
          </div>
        </div>
        {/* 我的消息 */}
        <div className="w-[76.6vw] h-[38.7vw] mx-auto mt-[3.7vw] bg-[#FFFFFF] rounded-[3vw]">
          <div className="flex justify-between items-center w-[67.8vw] h-[12.3vw] border-b mx-auto">
            <div className="flex items-center h-[12.3vw]">
              <Icon icon="ion:mail-outline" width="20" />
              <span className="pl-[3.6vw]">我的消息</span>
            </div>
            <div>
              <Icon icon="ph:caret-right-light" width="15" height="15" />
            </div>
          </div>
          <div className="flex justify-between items-center w-[67.8vw] h-[12.3vw] border-b mx-auto">
            <div className="flex items-center h-[12.3vw]">
              <Icon icon="iconamoon:cloud-remove-light" width="20" />
              <span className="pl-[3.6vw]">云贝中心</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#ccc] text-[1.2vw]">签到</span>
              <Icon icon="ph:caret-right-light" width="15" height="15" />
            </div>
          </div>
          <div className="flex justify-between items-center w-[67.8vw] h-[12.3vw] mx-auto">
            <div className="flex items-center h-[12.3vw]">
              <Icon
                icon="streamline:interface-lighting-light-bulb-on-lighting-light-shine-incandescent-bulb-lights"
                width="20"
              />
              <span className="pl-[3.6vw]">创作者中心</span>
            </div>
            <div>
              <Icon icon="ph:caret-right-light" width="15" height="15" />
            </div>
          </div>
        </div>
        {/* 音乐服务 */}
        <div className="w-[76.6vw] mx-auto mt-[3.7vw] bg-[#FFFFFF] rounded-[3vw]">
          <div className="w-[67.8vw] h-[10vw] border-b mx-auto">
            <span className="pl-[1.6vw] leading-[10vw] text-[#ccc]">
              音乐服务
            </span>
          </div>
          {musicServices.map(({ icon, text, extraContent }, index) => (
            <div
              className="flex justify-between items-center w-[67.8vw] h-[12.3vw] mx-auto"
              key={index}
            >
              <div className="flex items-center h-[12.3vw]">
                <Icon icon={icon} width="20" />
                <span className="pl-[3.6vw]">{text}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#ccc] text-[1.2vw]">{extraContent}</span>
                <Icon icon="ph:caret-right-light" width="15" height="15" />
              </div>
            </div>
          ))}
        </div>
        {/* 其他 */}
        <div className="w-[76.6vw] mx-auto mt-[3.7vw] bg-[#FFFFFF] rounded-[3vw]">
          <div className="w-[67.8vw] h-[10vw] border-b mx-auto">
            <span className="pl-[1.6vw] leading-[10vw] text-[#ccc]">其他</span>
          </div>
          {otherServices.map(({ icon, text, extraContent }, index) => (
            <div
              className="flex justify-between items-center w-[67.8vw] h-[12.3vw] mx-auto"
              key={index}
            >
              <div className="flex items-center h-[12.3vw]">
                <Icon icon={icon} width="20" />
                <span className="pl-[3.6vw]">{text}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#ccc] text-[1.2vw]">{extraContent}</span>
                <Icon icon="ph:caret-right-light" width="15" height="15" />
              </div>
            </div>
          ))}
        </div>
        {/* 我的订单 */}
        <div className="w-[76.6vw] mx-auto mt-[3.7vw] bg-[#FFFFFF] rounded-[3vw]">
          {myOrders.map(({ icon, text, extraContent }, index) => (
            <div
              className="flex justify-between items-center w-[67.8vw] h-[12.3vw] mx-auto"
              key={index}
            >
              <div className="flex items-center h-[12.3vw]">
                <Icon icon={icon} width="20" />
                <span className="pl-[3.6vw]">{text}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#ccc] text-[1.2vw]">{extraContent}</span>
                <Icon icon="ph:caret-right-light" width="15" height="15" />
              </div>
            </div>
          ))}
        </div>
        {/* 登录 */}
        {cookie ? (
          <div
            onClick={() => logout()}
            className="w-[76.6vw] h-[12.8vw] mx-auto mt-[3.7vw] bg-[#FFFFFF] rounded-[3vw] text-[#ff3a3a] mb-[3vw]"
          >
            <p className="text-center leading-[12.8vw]">退出登录</p>
          </div>
        ) : (
          <div
            className="w-[76.6vw] h-[12.8vw] mx-auto mt-[3.7vw] bg-[#FFFFFF] rounded-[3vw] text-[#ff3a3a] mb-[3vw]"
            onClick={() => navigate("/Login")}
          >
            <p className="text-center leading-[12.8vw]">立即登录</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LeftPopup;
