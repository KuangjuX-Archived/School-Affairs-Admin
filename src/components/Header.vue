<!--
 * @Description: 
 * @version: 
 * @Author: LARE
 * @Date: 2020-10-06 21:16:52
 * @LastEditors: LARE
 * @LastEditTime: 2020-10-08 22:00:17
-->
<template>
  <div>
    <div class="admin-header">
      <div class="header-content">
        <div class="admin-title">
          <span class="title-text">天津大学校务平台后台管理中心</span>
        </div>
        <div class="header-btns">
          <div class="admin-home link" @click="transferURL('/home')">首页</div>
          <div class="admin-message link" @click="transferURL('/message')">
            消息
          </div>
          <div class="admin-logout link" @click="logout()">登出</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteToken, getUser } from "../utils/cookie.js";
import { logout } from "../api/admin.js";
export default {
  name: "Header",
  methods: {
    logout() {
      var user = getUser();
      logout(user).then(() => {
        deleteToken();
        this.$router.push("/login");
      });
    },
    transferURL(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
.admin-header {
  box-shadow: 7px 7px 10px rgba(200, 200, 200, 0.2);
  display: flex;
  width: 100%;
}

.admin-title {
  font-size: 24px;
  font-weight: 900;
  color: #1e88e5;
  width: 100%;
  text-align: center;
  flex: 18;
  display: flex;
}

.admin-logout {
  cursor: pointer;
  font-size: 14px;
  line-height: 48px;
}
.header-content {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
.admin-home {
  cursor: pointer;
  font-size: 14px;
  line-height: 48px;
}

.admin-message {
  cursor: pointer;
  font-size: 14px;
  line-height: 48px;
}

.title-text {
  position: relative;
  font-weight: normal;
  letter-spacing: 4px;
  line-height: 48px;
  text-align: center;
  width: 100%;
}
.header-btns {
  position: absolute;
  right: 0;
  display: flex;
}
.twt-logo img {
  height: 48px;
}

.link {
  padding: 0 10px;
}
.link:hover {
  color: #1e88e5;
}
@media screen and (max-width: 625px) {
  .title-text {
    letter-spacing: 0;
    text-align: left;
    font-size: 18px;
    padding: 0 14px;
  }
  .header-btns{
    padding-right: 4px;
  }
}
</style>
