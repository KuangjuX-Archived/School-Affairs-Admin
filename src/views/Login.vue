<template>
<div>
    <v-container style="margin-top: 5%">
        <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-title>
                        <div class="card-title-element">登录</div>
                    </v-card-title>
                    <v-card-text>
                        <div style="margin: 10%">
                            <v-form lazy-validation ref="form">
                                <v-text-field v-model="form.name" label="用户名" required></v-text-field>

                                <v-text-field v-model="form.password" label="密码" type="password" required></v-text-field>

                                <div>
                                    <v-btn v-if="isSubmit" @click="login" rounded block dark>登录</v-btn>
                                    <v-btn v-else rounded block disabled>登录</v-btn>
                                </div>
                                <v-divider></v-divider>

                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3"></v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import {login} from "../api/admin.js";
import {setUserInfo} from "../utils/cookie.js";
export default {
    name: "Login",
    data() {
        return {
            form: {
                name: "",
                password: ""
            },
        }
    },

    methods: {
        login() {
            login(this.form).then(res => {
                if (res.data.ErrorCode === 1) {
                    //TODO: 弹窗 - error
                    alert("密码或账号错误");
                } else {
                    let info= res.data.data
                    setUserInfo(info.token, info.id, info.PhoneNumber);
                    this.$router.push('/home');
                }
            })
        }
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
        }
    }

}
</script>

<style scoped>
a {
    text-align: center;
}

a:hover {
    cursor: pointer;
    color: #007bff;
}

.card-title-element {
    align-items: center;
    margin-left: 45%;
    font-weight: 900;
    font-size: 25px;
}
</style>
