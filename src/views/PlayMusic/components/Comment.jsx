import React from "react";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import { getCommentPlaylist, getPlistDetail } from "../../../service/index";
const Comment = (props) => {
  const { data } = useRequest(() => getCommentPlaylist(props.Id));
  const comments = data?.data?.comments;
  const { data: plist } = useRequest(() => getPlistDetail(props.Id));
  const plistData = plist?.data;
  console.log(plistData);

  return (
    <>
      <div className="bg-[#F7FAFC]">
        <div className="flex items-center justify-between pl-[45%] px-[3vw] py-[3vw] bg-[#fff]">
          <span className="text-[4.5vw]">
            评论({plistData?.playlist?.commentCount})
          </span>
          <Icon icon="fluent:share-20-regular" width="20" />
        </div>
        <div className="py-[2.667vw] px-[3.822vw] h-[18.933vw] flex items-center bg-[#fff]">
          <div className="flex items-center">
            <div className="h-[18.933vw] w-[18.933vw] border border-red-400 rounded-[3vw]">
              <img
                src={plistData?.playlist?.coverImgUrl}
                alt=""
                className="h-[18.933vw] w-[18.933vw] rounded-[3vw]"
              />
            </div>
            <div className="w-[67vw]">
              <div className="flex items-center pl-[2vw]">
                <span className="block p-[1vw] border border-[#C84A3B] text-[#C84A3B] rounded-[2vw]">
                  歌单
                </span>
                <span className=" pl-[2vw]">{plistData?.playlist?.name}</span>
              </div>
              <p className=" pl-[2vw]">
                <span>by</span>
                <span className="text-[#81B4DC] pl-[2vw]">
                  {plistData?.playlist?.creator?.nickname}
                </span>
              </p>
            </div>
          </div>
          <Icon icon="uiw:right" width="20" />
        </div>
        <div className="mt-[3vw] px-[3.822vw] bg-[#fff]">
          <div className="pt-[4.267vw] flex items-center justify-between">
            <div className="text-[4.5vw]">评论区</div>
            <div>
              <span>推荐</span>
              <span className="px-[2.7vw] text-[#ccc]">|</span>
              <span>最热</span>
              <span className="px-[2.7vw] text-[#ccc]">|</span>
              <span>最新</span>
            </div>
          </div>
          {/* 评论 */}
          <div className="mt-[4.178vw]">
            {comments?.map((item, index) => (
              <div>
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-[9.422vw] h-[9.422vw] rounded-[50%] border border-[red]">
                        <img
                          src={item?.user?.avatarUrl}
                          alt=""
                          className="w-[9.422vw] h-[9.422vw] rounded-[50%]"
                        />
                      </div>
                      <div className="pl-[2.4vw]">
                        <p>{item?.user?.nickname}</p>
                        <p>{item?.timeStr}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span>{item?.likedCount}</span>
                      <Icon icon="iconamoon:like-light" width="20" />
                    </div>
                  </div>
                  <p className="w-[100%] pl-[11.5vw] break-words text-[4.5vw] mt-[1.689vw]">
                    {item?.content}
                  </p>
                  <div className="w-[100%] ml-[11.5vw] mt-[3vw] flex items-center">
                    <span className="text-[#93A8C9]">4条回复</span>
                    <Icon
                      icon="mingcute:right-line"
                      width="20"
                      color="#93A8C9"
                    />
                  </div>
                </div>
                <div className="h-[1px] bg-[#ccc] my-[3.467vw] w-[100%] ml-[11.5vw]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;
