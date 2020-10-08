<template>
  <div class="card">
    <v-card-text>
      <div class="profile-title">
        <div class="profile-info">
          <div v-if="permission === '子管理员'">
            <p class="say-hello">
              您好!{{ name }} <span class="perm">({{ permission }})</span>
            </p>
          </div>

          <div v-else>
            <p class="say-hello">您好，两办管理员</p>
          </div>
          <div class="profile-info-line">
            <v-text-field
              v-model="phoneNumber"
              class="profile-input"
              label="电话号码"
            ></v-text-field>
            <v-btn
              outlined
              color="#1E88E5"
              width="125px"
              @click="changePhoneNumber"
              >保存修改</v-btn
            >
          </div>

          <div class="profile-info-line">
            <v-text-field
              type="password"
              v-model="password"
              class="profile-input"
              label="密码"
            ></v-text-field>
            <v-btn
              outlined
              color="#1E88E5"
              width="125px"
              @click="changePassword"
              >保存修改</v-btn
            >
          </div>
        </div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import { getUser } from "../utils/cookie";
import { changePassword, changePhoneNumber } from "../api/admin";

export default {
  name: "ProfileCard",
  data() {
    return {
      phoneNumber: getUser().phoneNumber,
      password: "",
      permission: getUser().isLB === "true" ? "两办管理员" : "子管理员",
      name: getUser().name,
    };
  },

  methods: {
    changePhoneNumber() {
      let data = {
        id: getUser().id,
        token: getUser().token,
        newPhoneNumber: this.phoneNumber,
      };

      changePhoneNumber(data).then((res) => {
        let response = res.data;
        if (response.ErrorCode === 1) {
          alert("修改失败");
        } else {
          alert("修改成功");
        }
      });
    },

    changePassword() {
      let data = {
        id: getUser().id,
        token: getUser().token,
        newPassword: this.password,
      };

      changePassword(data).then((res) => {
        let response = res.data;
        if (response.ErrorCode === 1) {
          alert("修改失败");
        } else {
          alert("修改成功");
        }
      });
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: 1px solid #dddddd;
  box-shadow: 7px 7px 10px rgba(200, 200, 200, 0.2);
  margin: 14px 0;
}
.profile-title {
  display: flex;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-headline {
  top: 8px;
  margin: 10px;
  display: flex;
}

.profile-info-line {
  margin-top: 20px;
  font-size: 18px;
  display: flex;
}
.profile-input {
  padding: 0;
  margin: 0;
  margin-right: 10px;
}

.profile-info-font-style {
  color: #000000;
  font-size: 15px;
  margin-left: 20px;
  position: relative;
  bottom: 10px;
}

.nickname-style {
  font-weight: 900;
  font-size: 30px;
  color: #000000;
}

.profile-info-link {
  position: relative;
  margin-left: 20px;
  bottom: 10px;
}
.say-hello {
  font-size: 22px;
}

.perm {
  font-size: 16px;
}
@media screen and (max-width: 426px) {
  .profile-info {
    margin: 0;
  }
  .profile-info-line {
    margin-top: 14px;
    font-size: 16px;
  }
  .say-hello {
    font-size: 18px;
  }
}
</style>
