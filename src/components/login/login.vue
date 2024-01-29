<template>
  <div class="login">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-fanhui"></use>
    </svg>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phoneNumber"
          name="phoneNumber"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写正确的手机号' }]"
        />

        <van-field
          v-model="captcha"
          name="captcha"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写正确的验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" @click="getCaptchaInfo"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="qrImg">
      <img :src="qrCodeImg" alt="" style="width:120px;height:120px"/>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/request/api/userInfoApi";
import { showNotify } from "vant";
import { ref,onMounted, onUnmounted } from "vue";
import LocalCache from "@/util/localStorageCache";
export default {
  name: "LoginPage",
  props: {
    msg: String,
  },
  setup() {
    const phoneNumber = ref("");
    const captcha = ref("");
    const qrCodeKey = ref("");
    const qrCodeImg = ref("");
    let timer = ref(null)
    async function onSubmit (values) {
      console.log("submit", values);
        let phoneNumber = values.phoneNumber;
        let captcha = values.captcha;
        let data = await userInfoApi.userInfoLogin(phoneNumber,'',captcha);
        console.log(data, "验证码信息");
        // let loginFlag = data?.data ?? false;
        // if (getInfoFlag) {
        //   showNotify({
        //     message: "发送成功",
        //     color: "#fff",
        //     background: "#07c160",
        //     className: "loginNotify",
        //   });
        //   console.log("发送成功");
        // }
    }
    async function getCaptchaInfo() {
      if (phoneNumber.value !== "") {
        let data = await userInfoApi.getCaptchaInfo(phoneNumber.value);
        console.log(data, "验证码信息");
        let getInfoFlag = data?.data ?? false;
        if (getInfoFlag) {
          showNotify({
            message: "发送成功",
            color: "#fff",
            background: "#07c160",
            className: "loginNotify",
          });
          console.log("发送成功");
        }
      }
    }

    async function getQrcode() {
      const cookie = LocalCache.getCache("cookie") ?? '';
      let loginStatusRes = await userInfoApi.getLoginStatus(cookie);
      console.log(loginStatusRes, "登录状态");
      let qrCodeKeyRes = await userInfoApi.getQrCodeKey();
      console.log(qrCodeKeyRes, "key");
      qrCodeKey.value = qrCodeKeyRes?.data?.data?.unikey ?? '';
      let qrCodeRes =await userInfoApi.getQrCode(qrCodeKey.value);
      console.log(qrCodeRes, "二维码");
      qrCodeImg.value = qrCodeRes?.data?.data?.qrimg ?? '';
    }
    function checkLoginStatus() {
      timer.value = setInterval(async () => {
        const statusRes = await userInfoApi.checkQrCodeStatus(qrCodeKey.value);
        console.log(statusRes, "二维码状态");
        if (statusRes.data.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer.value)
        }
        if (statusRes.data.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer.value)
          alert('授权登录成功')
          let loginStatusRes = await userInfoApi.getLoginStatus(statusRes.data.cookie);
          console.log(loginStatusRes, "登录状态");
          LocalCache.setCath('cookie', statusRes.data.cookie)
        }
      }, 16000)
    }
    onMounted(async ()=>{
      //获取qrCode
      await getQrcode();
      checkLoginStatus();
    });
    onUnmounted(()=>{
      if(timer.value){
        clearInterval(timer.value)
      }
      
    })
    return {
      phoneNumber,
      captcha,
      onSubmit,
      getCaptchaInfo,
      qrCodeKey,
      checkLoginStatus,
      getQrcode,
      qrCodeImg,
      timer
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.loginNotify {
  text-align: center;
}
</style>
<style lang="less" scoped></style>
