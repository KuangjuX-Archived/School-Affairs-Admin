<template>
    <div>
        <v-app-bar dense fixed>
            <div class="admin-header">
                <div class="admin-title">天津大学校务系统管理后台</div>
                <div class="admin-logout" @click="logout()">登出</div>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            logout(){

            }
        }
    }
</script>

<style scoped>

    .admin-header{
        display: flex;
        width: 100%;
    }

    .admin-title{
        font-size: 24px;
        font-weight: 900;
        color: #1E88E5;
        width: 100%;
        text-align: center;
        flex: 8;
    }

    .admin-logout{
        flex: 1;
        text-align: center;
        margin-top: 8px
    }

    .admin-logout:hover{
        color: #E53935;
        font-weight: 900;
        cursor: pointer;
    }

</style>
