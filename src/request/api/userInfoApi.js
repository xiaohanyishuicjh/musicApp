import * as musicApi from "@/request";
let userInfoApi = {};
userInfoApi.userInfoLogin = function (phone, password, captcha) {
  if (password !== "") {
    return musicApi.wyService({
      method: "post",
      url: `/login/cellphone`,
      data: {
        phone: phone,
        password: password,
      },
    });
  } else {
    return musicApi.wyService({
      method: "post",
      url: `/login/cellphone`,
      data: {
        phone: phone,
        captcha: captcha,
      },
      withCredentials: true,
    });
  }
};
userInfoApi.getCaptchaInfo = function (phoneNumber) {
  return musicApi.wyService({
    method: "get",
    url: `/captcha/sent?phone=${phoneNumber}`,
  });
};
//获取登录状态
userInfoApi.getLoginStatus = function (cookie) {
  return musicApi.wyService({
    url: `/login/status?timestamp=${Date.now()}`,
        method: 'post',
        data: {
          cookie,
        },
  });
}
//二维码key生成接口
userInfoApi.getQrCodeKey = function () {
    return musicApi.wyService({
      url: `/login/qr/key?timestamp=${Date.now()}`
    });
  }

  //二维码生成接口
userInfoApi.getQrCode = function (key) {
    return musicApi.wyService({
      url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`
    });
  }
    //检测二维码扫码状态接口
userInfoApi.checkQrCodeStatus = function (key) {
    return musicApi.wyService({
      url: `/login/qr/check?key=${key}&timestamp=${Date.now()}&noCookie=true`
    });
  }
export default userInfoApi;
