<template>
<div>
    <v-app-bar dense fixed>
        <div class="admin-header">
            <div class="admin-title">天津大学校务系统管理后台</div>
            <div class="admin-message">
                <svg @click="this.$router.push('/message')" t="1600078896273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2776" width="32" height="32"><path d="M512.512 844.8c20.992 0 36.864 15.872 36.864 36.864s-15.872 36.864-36.864 36.864-36.864-15.872-36.864-36.864 15.872-36.864 36.864-36.864z m-16.384-665.6c5.632-0.512 10.752 0 16.384 0h7.168c120.832 3.584 215.04 109.568 215.04 232.448v322.56c0 13.312 2.56 25.088 7.168 36.864h-457.728c4.096-11.776 7.168-24.064 7.168-36.864v-332.8c-1.024-117.76 89.6-214.016 204.8-222.208z m16.384-148.48c-40.96 0-74.24 33.28-74.24 74.24 0 3.072 1.024 6.144 1.024 9.216-128 32.768-223.232 148.992-223.232 286.72v332.8c0 20.992-15.872 36.864-36.864 36.864h-36.864v74.24h265.728c-4.096 11.776-7.168 24.064-7.168 36.864 0 60.928 50.176 111.104 111.104 111.104s111.104-50.176 111.104-111.104c0-13.312-2.56-25.088-7.168-36.864h265.728v-74.24h-36.864c-20.992 0-36.864-15.872-36.864-36.864v-322.56c0-139.264-92.672-263.168-223.232-296.96 0.512-3.072 1.024-6.144 1.024-9.216 1.024-40.96-32.256-74.24-73.216-74.24z" p-id="2777"></path></svg>
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
        }
    }
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
    text-align: center;
    flex: 18;
}

.admin-logout {
    flex: 1;
    text-align: center;
    margin-top: 8px
}

.admin-message{
    flex: 1;

}

.admin-logout:hover {
    color: #E53935;
    font-weight: 900;
    cursor: pointer;
}
</style>
