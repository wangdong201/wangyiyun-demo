/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

// 自定义 Hook：useRequest，用于处理异步请求
export const useRequest = (service, option) => {
  // 默认选项
  const defaultOption = {
    manual: false, // 是否手动触发请求，默认自动触发
    params: {}, //请求参数,默认为空对象
  };
  const configure = Object.assign(defaultOption, option); //合并默认选项和传入选项
  const [loading, setLoading] = useState(true); //加载状态, 默认为true
  const [error, setError] = useState(); // 错误信息
  const [data, setData] = useState(); //数据

  const run = () => {
    //发送请求的函数
    service(configure.params) // 调用service函数并传入参数
      .then((res) => setData(res)) //成功
      .catch((err) => setError(err)) //失败时的错误信息
      .finally(() => setLoading(false)); //不管成功或者失败,停止加载状态
  };
  if (configure.manual) {
    //如果为手动触发请求,则直接返回状态和请求函数
    return { data, loading, error, run };
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(run, []); //首次渲染自动触发请求
  return { data, loading, error, run };
};

 //单位转换函数
 export const dataTruncation = (playVolume) => {
  if (playVolume > 100000000) {
    return `${Math.floor(playVolume / 100000000)}亿`;
  } else if (playVolume > 100000) {
    return `${Math.floor(playVolume / 10000)}万`;
  } else {
    return playVolume;
  }
};