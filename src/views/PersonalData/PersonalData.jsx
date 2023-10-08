import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
const PersonalData = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="bg-[#F5F5F5] w-screen">
          {/* 头部 */}
          <div className="bg-[#fff]">
            <div className="w-[91.296vw] h-[13.556vw] bg-[#FFFFFF] mx-auto flex items-center">
              <Icon
                icon="ph:arrow-left-light"
                width="25"
                height="25"
                onClick={() => navigate(-1)}
              />
              <p className="pl-[4.722vw]">我的资料</p>
            </div>
          </div>
          {/* 头像板块 */}
          <div className="bg-[#fff] mt-[2.13vw]">
            <div className="w-[91.296vw] h-[55.093vw] bg-[#FFFFFF] mx-auto ">
              <div className="h-[16.111vw] flex border-b items-center justify-between">
                <p>头像</p>
                <img
                  //   src={this.userDetail.avatarUrl}
                  src=""
                  alt=""
                  className="w-[11.481vw] h-[11.481vw] rounded-[50%]"
                />
              </div>
              <div className="h-[12.111vw] flex border-b items-center justify-between">
                <p>昵称</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  {/* {this.userDetail.nickname} */}
                  理塘丁真王
                </p>
              </div>
              <div className="h-[12.111vw] flex border-b items-center justify-between">
                <p>性别</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  男
                </p>
              </div>
              <div className="h-[12.111vw] flex items-center justify-between">
                <p>二维码</p>
                <Icon
                  icon="ph:qr-code-light"
                  width="20"
                  height="20"
                  className=" text-[#999999]"
                />
              </div>
            </div>
          </div>
          {/* 生日板块 */}
          <div className="bg-[#fff] mt-[2.13vw]">
            <div className="w-[91.296vw] h-[62.963vw] bg-[#FFFFFF] mx-auto ">
              <div className="h-[12.111vw] flex border-b items-center justify-between">
                <p>生日</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  2099-9-2
                </p>
              </div>
              <div className="h-[12.111vw] flex border-b items-center justify-between">
                <p>地区</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  湖北武汉
                </p>
              </div>
              <div className="h-[12.111vw] flex border-b items-center justify-between">
                <p>大学</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  未填写
                </p>
              </div>
              <div className="h-[12.111vw] flex border-b items-center justify-between">
                <p>音乐标签</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  选择标签
                </p>
              </div>
              <div className="h-[12.111vw] flex items-center justify-between">
                <p>简介</p>
                <p className="whitespace-nowrap text-[2vw] text-[#999999]">
                  还没有简介
                </p>
              </div>
            </div>
          </div>
          {/* 个人主页设置板块 */}
          <div className="bg-[#fff] mt-[2.13vw]">
            <div className="w-[91.296vw] h-[25.741vw] bg-[#FFFFFF] mx-auto ">
              <div className="h-[12.111vw] flex border-b items-center">
                <p className="whitespace-nowrap">个人主页隐私设置</p>
              </div>
              <div className="h-[12.111vw] flex items-center">
                <p className="whitespace-nowrap">主页模块顺序设置</p>
              </div>
            </div>
          </div>
          <div className="bg-[#fff] mt-[2.13vw]">
            <div className="w-[91.296vw] h-[18.741vw] bg-[#FFFFFF] mx-auto ">
              <p className="whitespace-nowrap pt-[3.611vw]">个人主页隐私设置</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PersonalData;
