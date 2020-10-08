<template>
  <div class="login-page">
    
    <div class="login-img">
      <div class="cover">
        <p class="bigger">天津大学校务管理平台</p>
        <p class="smaller">Welcome</p>
      </div>
    </div>
    <div class="login-box">
      <div class="login-name">
        <img src="../assets/logo.svg" alt="logo" />
      </div>
      <div class="login-card">
        <div class="login-card-title">管理员登录</div>
        <div class="login-card-text">
          <v-form lazy-validation ref="form" class="login-form">
            <v-text-field
              v-model="form.name"
              label="用户名"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="密码"
              type="password"
              required
            ></v-text-field>

            <div>
              <v-btn
                v-if="isSubmit"
                @click="login"
                rounded
                block
                dark
                class="login-btn"
                >登录</v-btn
              >
              <v-btn v-else rounded block disabled>登录</v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "../api/admin.js";
import { setUserInfo } from "../utils/cookie.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      login(this.form).then((res) => {
        if (res.data.ErrorCode === 1) {
          //TODO: 弹窗 - error
          alert("密码或账号错误");
        } else {
          let info = res.data.data;
          setUserInfo(
            info.token,
            info.id,
            info.PhoneNumber,
            info.is_lb,
            this.form.name
          );
          this.$router.push({
            name: "Home",
          });
        }
      }).catch(()=>{
        this.$message.error('登陆失败，密码或账号错误');
      })
    },
  },
  computed: {
    isSubmit() {
      for (let item in this.form) {
        let arri = this.form[item];
        if (arri === undefined || arri === "" || arri == null) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped>
a {
  text-align: center;
}
a:hover {
  cursor: pointer;
  color: #007bff;
}
.login-page {
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 60% 40%;
}
.login-box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}
.login-card {
  max-width: 40%;
  min-width: 400px;
  margin: 0 auto;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-shadow: 7px 7px 10px rgba(200, 200, 200, 0.2);
}
.login-img {
  position: relative;
  background-image: linear-gradient(
    45deg,
    #00a0e9 0%,
    #00a0e9 20%,
    #004ea2 100%
  );
}
.over {
  top: 0;
  z-index: 9;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0);
}
.login-cover {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.login-name {
  bottom: 10px;
  position: absolute;
  text-align: center;
  width: 60px;
}
.login-card-title {
  color: #555555;
  text-align: center;
  font-size: 24px;
  margin: 14px 0;
  /*margin-left: 45%;*/
  font-size: 28px;
  flex: 2;
  margin-top: 8px;
  width: 100%;
}

.login-title-box {
  display: flex;
  width: 100%;
}
.login-btn {
  border: none;
}
.login-card-text {
  padding: 14px 20px;
}
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  height: 100%;
  letter-spacing: 14px;
}
.bigger {
  font-size: 3rem;
}
.smaller {
  font-size: 2rem;
}
</style>