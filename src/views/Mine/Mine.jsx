import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Tabs } from "antd-mobile";
import {
  getCollectPlaylists,
  getUserInfo,
  getUserAccount,
} from "../../service/index";
export default function Mine() {
  const navigate = useNavigate();
  const tabs = ["主页", "动态", "播客"];
  const [isChange, setIsChange] = useState(false);

  //数据请求
  const [userAccount, setUserAccount] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [collectPlaylists, setCollectPlaylists] = useState([]);
  const [create, setCreate] = useState([]);
  const [collect, setCollect] = useState([]);
  const [myLove, setMyLove] = useState([]);
  //获取id
  // useEffect(() => {
  //   getUserAccount()
  //     .then((res) => {
  //       setUserAccount(res.data.profile.userId);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // useEffect(() => {
  //   getUserInfo(userAccount)
  //     .then((res) => {
  //       setUserInfo(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [userAccount]);
  // useEffect(() => {
  //   getCollectPlaylists(userAccount)
  //     .then((res) => {
  //       setCollectPlaylists(res.data);
  //       setCreate(res.data.playlist.filter((item) => !item.subscribed)); //创建的歌单
  //       setCollect(res.data.playlist.filter((item) => item.subscribed)); //收藏的歌单
  //       setMyLove(res.data.playlist[0].trackCount);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userAccount]);

  useEffect(() => {
    const fetchData = async () => {
      // 定义异步获取用户信息、歌单信息和喜欢歌曲数目的函数
      try {
        // 获取用户账号信息
        const userAccountRes = await getUserAccount();
        setUserAccount(userAccountRes.data.profile.userId);
        // 获取用户详细信息
        const userInfoRes = await getUserInfo(
          userAccountRes.data.profile.userId
        );
        setUserInfo(userInfoRes.data);
        // 获取用户收藏的歌单
        const collectPlaylistsRes = await getCollectPlaylists(
          userAccountRes.data.profile.userId
        );
        setCollectPlaylists(collectPlaylistsRes.data);
        // 过滤出用户创建的歌单和收藏的歌单
        setCreate(
          collectPlaylistsRes.data.playlist.filter((item) => !item.subscribed)
        );
        setCollect(
          collectPlaylistsRes.data.playlist.filter((item) => item.subscribed)
        );
        // 获取用户喜欢的歌曲数目
        setMyLove(collectPlaylistsRes.data.playlist[0].trackCount);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // 调用异步函数获取数据
  }, []);

  //播放次数
  function DataTruncation(playVolume) {
    if (playVolume > 100000000) {
      return `${Math.floor(playVolume / 100000000)}亿`;
    } else if (playVolume > 100000) {
      return `${Math.floor(playVolume / 10000)}万`;
    } else {
      return playVolume;
    }
  }
  //时间转换
  function TimeConversion(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}年${month}月`;
  }
  //年龄转换
  function AgeConversion(ageTime) {
    const date = new Date(ageTime);
    const year = date.getFullYear();
    return ("" + (year - (year % 5))).split("").splice(2, 4).join("");
  }
  return (
    <>
      <div>
        {/* 头部 */}
        <div className="w-[100%] h-[75vw] relative">
          <div className="w-screen px-[4.5vw] h-[13vw] flex items-center justify-between fixed top-0 z-[10]">
            <Icon icon="ph:arrow-left" className="text-[7vw] text-[#fff]" />
            <Icon
              icon="ri:more-2-line"
              className="dark:text-[#e9ebf2] text-[#fff] font-[800] text-[7vw]"
            />
          </div>
          <img
            src={userInfo.profile?.avatarUrl}
            alt=""
            className="w-[100vw] h-[74vw]"
          />
        </div>
        {/* 主要内容 */}
        <div className="bg-[#F1F1F1]  px-[3vw]">
          {/* 个人信息 */}
          <div
            style={isChange === false ? { height: "45vw" } : { height: "59vw" }}
            className="mt-[-4vw] rounded-[15px] bg-[#fff] w-[92vw]  relative pt-[11vw] text-center pb-[3.8vw]"
          >
            <img
              src={userInfo.profile?.avatarUrl}
              alt=""
              className="w-[18.056vw] h-[18.056vw] rounded-[50%]  absolute top-[-9vw] left-1/2 translate-x-[-50%]"
            />
            <p>{userInfo.profile?.nickname}</p>
            <div className="text-[#ccc] mt-[2vw] text-[1.2vw]">
              <span className="px-[2vw]">
                {userInfo.profile?.follows}
                <span>关注</span>
              </span>
              <span className="px-[2vw]">
                {userInfo.profile?.followeds}
                <span>粉丝</span>
              </span>
              <span className="px-[2vw]">
                Lv·<span>{userInfo.level}</span>
              </span>
            </div>
            {/* 用户信息 */}
            <div className="text-[1.2vw] mt-[3.426vw] h-[6vw]">
              <span className="border h-[4.73vw] whitespace-nowrap rounded-[1vw] pl-[1.5vw] pr-[1.9vw] pb-[1vw] pt-[0.8vw] mr-[1.547vw]">
                IP:武汉
              </span>
              <span className="border h-[4.73vw] whitespace-nowrap rounded-[1vw] pl-[1.5vw] pr-[1.9vw] pb-[1vw] pt-[0.8vw] mr-[1.547vw]">
                天秤座
              </span>
              <span className="border h-[4.73vw] whitespace-nowrap rounded-[1vw] pl-[1.5vw] pr-[1.9vw] pb-[1vw] pt-[0.8vw] mr-[1.547vw]">
                村龄:{Math.floor(userInfo.createDays / 365)}
              </span>
            </div>
            {/* 编辑资料 */}
            <div className="flex justify-center mt-[3.056vw] items-center">
              <span
                className="text-[3.2vw] border h-[7.5vw] w-[21.204vw] text-center leading-[7.5vw] border-[#ccc] rounded-[4vw] mr-[1.974vw]"
                onClick={() => navigate("/PersonalData")}
              >
                编辑资料
              </span>
              <div
                style={
                  isChange === true
                    ? {
                        transform: "rotate(-180deg)",
                      }
                    : null
                }
                className="w-[7.5vw]  transition h-[7.5vw] rounded-[50%] border border-[#ccc] flex items-center justify-center"
              >
                <Icon
                  onClick={() => {
                    setIsChange(!isChange);
                  }}
                  icon="formkit:down"
                  width="15"
                  height="15"
                />
              </div>
            </div>
          </div>
          <Tabs className="mt-[3vw]">
            {tabs.map((item) => (
              <Tabs.Tab title={item} key={item}>
                <div>
                  {/* 音乐品味 */}
                  <div className="w-[100%] h-[45.185vw] rounded-[4vw] bg-[#fff]">
                    <p className="pl-[4.63vw] pt-[5.37vw]">音乐品味</p>
                    <div className="flex px-[2vw]">
                      <div className="w-[26.852vw] h-[29.074vw] border mt-[2.87vw] rounded-[2vw] bg-gradient-to-b from-[#FDF2F1] to-[#FEFEFB] flex flex-col justify-between">
                        <div className="text-[1.2vw] pl-[2.13vw] pt-[1.667vw]">
                          <p className="text-[#85878E] whitespace-nowrap ">
                            我的喜欢
                          </p>
                          <p className="text-[#515A6C] whitespace-nowrap ">
                            {myLove}首
                          </p>
                        </div>
                        <div className="flex items-center pl-[2.13vw] text-[#ccc]">
                          <Icon icon="wpf:like" width="10" height="10" />
                          <p className="text-[1.2vw]">喜欢的音乐</p>
                        </div>
                      </div>
                      <div className="w-[26.852vw] h-[29.074vw] border mt-[2.87vw] ml-[1.4vw] rounded-[2vw] bg-gradient-to-b from-[#FCF8E8] to-[#FEFEFB] flex flex-col justify-between">
                        <div className="text-[1.2vw] pl-[2.13vw] pt-[1.667vw]">
                          <p className="text-[#85878E] whitespace-nowrap ">
                            累计听歌
                          </p>
                          <p className="text-[#515A6C] whitespace-nowrap ">
                            {userInfo.listenSongs}首
                          </p>
                        </div>
                        <div className="flex items-center pl-[2.13vw] text-[#ccc]">
                          <Icon icon="ri:rhythm-line" width="10" height="10" />
                          <p className="text-[1.2vw]">听歌排行</p>
                          <Icon
                            icon="majesticons:lock"
                            width="15"
                            height="15"
                          />
                        </div>
                      </div>
                      <div className="w-[26.852vw] h-[29.074vw] border mt-[2.87vw] ml-[1.4vw] rounded-[2vw] bg-gradient-to-b from-[#F0F7FC] to-[#FEFEFB] flex flex-col justify-between">
                        <div className="text-[1.2vw] pl-[2.13vw] pt-[1.667vw]">
                          <p className="text-[#85878E] whitespace-nowrap ">
                            本周关键词
                          </p>
                          <p className="text-[#515A6C] ">属于你的音乐档案</p>
                        </div>
                        <div className="flex items-center pl-[2.13vw] text-[#ccc]">
                          <Icon
                            icon="ant-design:hourglass-filled"
                            width="15"
                            height="15"
                          />
                          <p className="text-[1.2vw]">黑胶时光机</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 创建歌单 */}
                  <div className=" w-[100%] bg-[#fff] rounded-[15px] px-[4vw] pb-[4vw] pt-[5vw] mb-[3.7vw] mt-[3.796vw]">
                    <p>
                      创建的歌单 <span>({create.length}个)</span>
                    </p>
                    <div>
                      <ul>
                        {create.map((item, index) => {
                          return (
                            <li className="flex mt-[2vw]" key={index}>
                              <div className=" mr-[2.315vw]">
                                <img
                                  src={item.coverImgUrl}
                                  alt=""
                                  className="w-[12vw] h-[12vw] rounded-[2vw]"
                                />
                              </div>
                              <div className="">
                                <p className=" whitespace-nowrap overflow-hidden text-[2vw]">
                                  {item.name}
                                </p>
                                <p className="text-[1.2vw] whitespace-nowrap overflow-hidden text-[#ccc]">
                                  {item.trackCount}首,播放
                                  {DataTruncation(item.playCount)}次
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* 收藏的歌单 */}
                  <div className=" w-[100%] bg-[#fff] rounded-[15px] px-[4vw] pt-[5vw] mb-[3.7vw] mt-[3.796vw]">
                    <p>
                      收藏的歌单 <span>({collect.length}个)</span>
                    </p>
                    <div>
                      <ul>
                        {collect.slice(0, 10).map((item, index) => {
                          return (
                            <li className="flex mt-[2vw]" key={index}>
                              <div className=" mr-[2.315vw]">
                                <img
                                  src={item.coverImgUrl}
                                  alt=""
                                  className="w-[12vw] h-[12vw] rounded-[2vw]"
                                />
                              </div>
                              <div className="overflow-hidden">
                                <p className=" whitespace-nowrap text-[2vw] w-[61vw] truncate">
                                  {item.name}
                                </p>
                                <p className="text-[1.2vw] whitespace-nowrap overflow-hidden text-[#ccc]">
                                  {item.trackCount}首,播放
                                  {DataTruncation(item.playCount)}次
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="flex h-[9.722vw] border-t mt-[2.5vw] items-center justify-center text-[1.22vw] text-[#ccc]">
                      <span>查看全部</span>
                      <Icon icon="uiw:right" width="15" height="15" />
                    </div>
                  </div>
                  {/* 基本信息 */}
                  <div className="w-[92vw] h-[50vw] bg-[#fff]  rounded-[15px] mb-[15vw]">
                    <div className="h-[15vw] flex items-center justify-between mx-[3.8vw]">
                      <span className="whitespace-nowrap ">基本信息</span>
                      <span className="text-[1.2vw] text-[#ccc] whitespace-nowrap ">
                        领取村民证
                      </span>
                    </div>
                    <div className="h-[25vw] text-[1.2vw] text-[#666] mx-[3.8vw] flex flex-col justify-between">
                      <div>
                        村龄:{Math.floor(userInfo.createDays / 365)}年 ({" "}
                        {TimeConversion(userInfo.createTime)}
                        注册)
                      </div>
                      <div>性别:{userInfo.profile?.gender ? "男" : "女"}</div>
                      <div>
                        年龄:{AgeConversion(userInfo.profile?.birthday)}后
                        天秤座
                      </div>
                    </div>
                    <div className="flex h-[9.722vw] border-t mt-[2.5vw] items-center justify-center text-[1.22vw] text-[#ccc]">
                      <span>查看全部</span>
                      <Icon icon="uiw:right" width="15" height="15" />
                    </div>
                  </div>
                </div>
              </Tabs.Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
