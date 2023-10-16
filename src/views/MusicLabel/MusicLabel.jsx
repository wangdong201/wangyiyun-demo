import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getHighqualityTags } from "../../service/index";
const Label = () => {
  const navigate = useNavigate();
  const [labelData, setLabelData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [style, setStyle] = useState([]);
  const [scene, setScene] = useState([]);
  const [emotion, seteMotion] = useState([]);
  const [theme, setTheme] = useState([]);
  useEffect(() => {
    getHighqualityTags()
      .then((res) => {
        setLabelData(res.data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const languagesArr = labelData.filter((item) => item.category === 0); //语种
    const styleArr = labelData.filter((item) => item.category === 1); //风格
    const sceneArr = labelData.filter((item) => item.category === 2); //场景
    const emotionArr = labelData.filter((item) => item.category === 3); //情感
    const themeArr = labelData.filter((item) => item.category === 4); //主题
    setLanguages(languagesArr);
    setStyle(styleArr);
    setScene(sceneArr);
    seteMotion(emotionArr);
    setTheme(themeArr);
    console.log(themeArr);
  }, [labelData]);

  return (
    <>
      <div className="px-[3vw]">
        {/* 标题 */}
        <div className="text-[#000] mt-[2vw] flex items-center">
          <div onClick={() => navigate(-1)}>
            <Icon icon="ph:arrow-left-light" width={30} />
          </div>
          <span className="pl-[3vw] text-[#2D374A] text-[4.5vw]">歌单广场</span>
        </div>
        {/* 我的歌单广场 */}
        <div className="mt-[8.796vw]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[3.5vw]">我的歌单广场</span>
              <span className="text-[#989898] pl-[2vw]">(长按可编辑)</span>
            </div>
            <div className="py-[1.019vw] px-[3vw] text-[#FC3C3A] border border-[#FC3C3A] rounded-[5vw]">
              编辑
            </div>
          </div>
          <div className="mt-[4.907vw]">
            <div className="py-[2.5vw] w-[21.091vw] text-center bg-[#F3F3F3] rounded-[5vw]">
              推荐
            </div>
          </div>
        </div>
        {/* 语种 */}
        <div className="mt-[8.796vw]">
          <div>
            <span className="text-[3.5vw]">语种</span>
          </div>
          <div className="mt-[4.907vw] flex items-center flex-wrap">
            {languages.map((item, index) => (
              <div
                className="py-[2.5vw] w-[21.091vw] text-center bg-[#F3F3F3] rounded-[5vw] mr-[2vw] mt-[2vw]"
                key={index}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {/* 风格 */}
        <div className="mt-[8.796vw]">
          <div>
            <span className="text-[3.5vw]">风格</span>
          </div>
          <div className="mt-[4.907vw] flex items-center flex-wrap">
            {style.map((item, index) => (
              <div
                className="py-[2.5vw] w-[21.091vw] text-center bg-[#F3F3F3] rounded-[5vw] mr-[2vw] mt-[2vw]"
                key={index}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {/* 场景 */}
        <div className="mt-[8.796vw]">
          <div>
            <span className="text-[3.5vw]">场景</span>
          </div>
          <div className="mt-[4.907vw] flex items-center flex-wrap">
            {scene.map((item, index) => (
              <div
                key={index}
                className="py-[2.5vw] w-[21.091vw] text-center bg-[#F3F3F3] rounded-[5vw] mr-[2vw] mt-[2vw]"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {/* 情感 */}
        <div className="mt-[8.796vw]">
          <div>
            <span className="text-[3.5vw]">情感</span>
          </div>
          <div className="mt-[4.907vw] flex items-center flex-wrap">
            {emotion.map((item, index) => (
              <div
                key={index}
                className="py-[2.5vw] w-[21.091vw] text-center bg-[#F3F3F3] rounded-[5vw] mr-[2vw] mt-[2vw]"
              >
                {item.name}
                {item.hot}
              </div>
            ))}
          </div>
        </div>
        {/* 主题 */}
        <div className="mt-[8.796vw] mb-[3vw]">
          <div>
            <span className="text-[3.5vw]">主题</span>
          </div>
          <div className="mt-[4.907vw] flex items-center flex-wrap">
            {theme.map((item, index) => (
              <div
                key={index}
                className="py-[2.5vw] w-[21.091vw] text-center bg-[#F3F3F3] rounded-[5vw] mr-[2vw] mt-[2vw]"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Label;
