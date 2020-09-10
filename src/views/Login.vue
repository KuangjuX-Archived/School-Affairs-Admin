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
                                <v-form
                                        lazy-validation
                                        ref="form"
                                >
                                    <v-text-field
                                            v-model="form.username"
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
                                        <v-btn v-if="isSubmit" @click="login" rounded block  dark>登录</v-btn>
                                        <v-btn v-else   rounded block disabled>登录</v-btn>
                                    </div>
                                    <v-divider></v-divider>

                                    <div style="text-align: center">
                                        <a @click="$router.push(`/register`)">没有账号？赶紧去注册！</a>
                                    </div>

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
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: "",
                    password: ""
                },
            }
        },

        methods: {
          login(){

          }
        },

        computed: {
            isSubmit() {
                for (let item in this.form){
                    let arri=this.form[item];
                    if(arri===undefined||arri===""||arri==null){
                        return false;
                    }
                }
                return true;
            }
        }

    }
</script>

<style scoped>
    a{
        text-align: center;
    }

    a:hover{
        cursor: pointer;
        color: #007bff;
    }


    .card-title-element{
        align-items: center;
        margin-left: 45%;
        font-weight: 900;
        font-size: 25px;
    }
</style>
