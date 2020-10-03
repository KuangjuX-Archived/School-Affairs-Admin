<template>
<div>
    <v-app-bar dense fixed>
        <div class="admin-header">
            <div class="admin-title">
              <div class="twt-logo">
                <img src="../../public/icons/twtlogo.png">
              </div>
              <span class="title-text">天津大学校务系统管理后台</span>
            </div>
            <div class="admin-home" @click="transferURL('/home')">
                <svg  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2866" width="32" height="32"><path d="M770.133333 917.333333h-140.8c-25.6 0-44.8-19.2-44.8-44.8V618.666667s0-2.133333-2.133333-2.133334h-140.8c-2.133333 0-2.133333 0-2.133333 2.133334v253.866666c0 25.6-19.2 44.8-44.8 44.8h-140.8c-25.6 0-44.8-19.2-44.8-44.8V490.666667s0-2.133333-2.133334-2.133334H151.466667c-19.2 0-36.266667-10.666667-42.666667-29.866666-6.4-17.066667-2.133333-36.266667 12.8-49.066667L482.133333 117.333333c17.066667-14.933333 40.533333-14.933333 57.6 0l360.533334 294.4c14.933333 12.8 19.2 32 12.8 49.066667-6.4 17.066667-23.466667 29.866667-42.666667 29.866667h-53.333333c-2.133333 0-2.133333 0-2.133334 2.133333V874.666667c0 23.466667-19.2 42.666667-44.8 42.666666zM441.6 573.866667h140.8c25.6 0 44.8 19.2 44.8 44.8v253.866666s0 2.133333 2.133333 2.133334h140.8c2.133333 0 2.133333 0 2.133334-2.133334V490.666667c0-25.6 19.2-44.8 44.8-44.8h53.333333s2.133333 0 2.133333-2.133334L514.133333 149.333333h-4.266666L149.333333 443.733333c0 2.133333 2.133333 2.133333 2.133334 2.133334h53.333333c25.6 0 44.8 19.2 44.8 44.8v381.866666s0 2.133333 2.133333 2.133334h140.8c2.133333 0 2.133333 0 2.133334-2.133334V618.666667c2.133333-25.6 21.333333-44.8 46.933333-44.8z" fill="#666666" p-id="2867"></path></svg>
            </div>
            <div class="admin-message" @click="transferURL('/message')">
              <svg t="1601389963008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3369" width="32" height="32"><path d="M821.333 787.2V454.4C821.333 320 736 204.8 614.4 162.133 612.267 106.667 567.467 64 512 64s-100.267 42.667-102.4 98.133C290.133 204.8 202.667 320 202.667 454.4v332.8h-64v53.333H371.2C381.867 908.8 441.6 960 512 960s130.133-51.2 140.8-119.467h232.533V787.2h-64zM512 117.333c21.333 0 38.4 12.8 46.933 32C544 147.2 529.067 145.067 512 145.067s-32 2.133-46.933 4.266c8.533-19.2 25.6-32 46.933-32zM256 454.4c0-140.8 115.2-256 256-256s256 115.2 256 256v332.8H256V454.4z m256 452.267c-40.533 0-76.8-27.734-87.467-66.134h172.8c-8.533 38.4-44.8 66.134-85.333 66.134z" p-id="3370"></path></svg>
            </div>
            <div class="admin-logout" @click="logout()">登出</div>
        </div>
    </v-app-bar>
</div>
</template>

<script>
import {
    deleteToken,
    getUser
} from "../utils/cookie.js";
import {
    logout
} from "../api/admin.js";
export default {
    name: "Header",
    methods: {
        logout() {
            var user = getUser();
            logout(user).then(
                () => {
                    deleteToken();
                    this.$router.push('/login');
                }
            )
        },
        transferURL(url){
            this.$router.push(url)
        }
    },


}
</script>

<style scoped>
.admin-header {
    display: flex;
    width: 100%;
}

.admin-title {
    font-size: 24px;
    font-weight: 900;
    color: #1E88E5;
    width: 100%;
    /*text-align: center;*/
    flex: 18;
    display: flex;
}

.admin-logout {
    flex: 1;
    text-align: center;
    margin-top: 14px;
}

.admin-home{
    flex: 1;
    margin-top: 8px;
}

.admin-message{
    flex: 1;
    margin-top: 8px;
}

.admin-home:hover{
    color: #D4E157;
    opacity: 0.5;
}

.admin-logout:hover{
    color: #D4E157;
    opacity: 0.5;
}

.admin-message:hover{
    color: #D4E157;
    opacity: 0.5;
}

.admin-logout:hover {
    color: #E53935;
    font-weight: 900;
    cursor: pointer;
}

.title-text{
  margin-left: 30%;
  margin-top: 8px;
}

.twt-logo img{
  height: 48px;
}
</style>
