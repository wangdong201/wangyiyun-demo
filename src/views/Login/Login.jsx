import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "storejs";
import { Icon } from "@iconify/react";
import {
  createLoginQrKey,
  createLoginQrImage,
  checkLoginQr,
} from "../../service";
const Login = () => {
  const navigate = useNavigate();
  const unikey = useRef("");
  const timer = useRef(null);
  const qr = useRef("");
  const [status, setStatus] = useState();
  const checkScanStatus = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      const timestamp = Date.now();
      checkLoginQr({ key: unikey.current, timestamp })
        .then((res) => {
          setStatus(res.data.code);
          if ([800, 803].includes(res.data.code)) clearInterval(timer);
          if (res.data.code === 803) {
            store.set("_m_cookie", res.data.cookie);
            navigate("/Home");
          }
        })
        .catch((err) => {
          clearInterval(timer);
        });
    }, 1500);
  };
  useEffect(() => {
    createLoginQrKey()
      .then((res) => (unikey.current = res.data.data.unikey))
      .then((key) => createLoginQrImage({ key, qrimg: true }))
      .then((res) => (qr.current = res.data.data.qrimg))
      .then(() => checkScanStatus())
      .catch((err) => console.log(err));
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <div className="w-[100%] h-[7.6vw] mt-[3vw] px-[3vw] text-[2.5vw] flex items-center justify-between">
          <div onClick={() => navigate(-1)}>
            <Icon icon="uiw:left" width="20" height="20" />
          </div>
          <p className="text-[#6e6e6e]">游客登录</p>
        </div>
        <div className="w-[38.8vw] h-[25.5vw] mx-auto mt-[13.8vw]">
          <img src="/static/logo.fill.svg" alt="" />
        </div>

        {[800, 801].includes(status) ? (
          <div>
            {status === 800 ? (
              <div className="mask">
                <div class="w-[39.6vw] h-[39.6vw] mx-auto mt-[9.5vw] relative">
                  <img src={qr.current} alt="" />
                  <div class="w-[100%] h-[100%] bg-[#ccc] opacity-50 absolute bottom-0 top-0 left-0 right-0"></div>
                  <div class="w-[20.6vw] h-[7.7vw] rounded-[6vw] absolute bg-gradient-to-r from-[#fc5734] to-[#f31928] left-[25%] top-[40%] text-[1.2vw] text-center leading-[7.7vw] z-10">
                    点击刷新
                  </div>
                </div>
              </div>
            ) : null}
            <div className="w-[100%]">
              <img
                src={qr.current}
                alt=""
                className="w-[39.6vw] h-[39.6vw] mx-auto"
              />
              <div className="w-[43.3vw] mx-auto whitespace-nowrap text-[1.2vw] text-center">
                使用
                <span className="text-[#2a64b8] whitespace-nowrap ">
                  网易云音乐APP
                </span>
                扫码登录
              </div>
            </div>
          </div>
        ) : null}
        {status === 802 ? (
          <div className="w-[100%]">
            <img
              src="/static/05.png"
              alt=""
              className="w-[38.7] mx-auto h-[40vw]"
            />
            <div className="w-[100%] text-center whitespace-nowrap text-[5.2vw]">
              扫描成功
            </div>
            <div className="w-[100%] text-center whitespace-nowrap">
              请在手机上确认登录
            </div>
          </div>
        ) : null}
        <div className="bottom-0 absolute w-[100%] h-[50vw]">
          <img src="/static/04.png" alt="" className="w-[100%] h-[50vw]" />
        </div>
      </div>
    </>
  );
};
export default Login;
