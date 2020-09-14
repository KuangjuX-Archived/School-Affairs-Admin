<template>
    <div>
        <v-card>
            <v-card-title>
                您好，管理员！
            </v-card-title>
            <v-card-text>
                <div class="profile-title">
                    <div class="profile-info">
                        <div class="profile-headline">
                            <span class="nickname-style"></span>
                            <span></span>
                        </div>

                        <div class="profile-info-line">
                            <svg t="1600071808928" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2733" width="32" height="32"><path d="M950.66749 734.408834a31.970084 31.970084 0 0 0-45.213286 0l-60.985194 60.959906a15.085545 15.085545 0 0 1-10.750618 4.425238 15.085545 15.085545 0 0 1-10.750618-4.42885l-85.546166-85.553391 71.724974-71.721363a31.970084 31.970084 0 1 0-45.213285-45.20606l-71.721363 71.721362-177.898167-177.937904a254.991226 254.991226 0 0 0 61.686007-166.667095c0-141.383635-114.615462-255.999097-255.999097-255.999097S64.00158 178.61343 64.00158 320.000677s114.615462 255.999097 255.999097 255.999097a254.821442 254.821442 0 0 0 146.899829-46.318692l202.032872 202.079834c0.216746 0.231196 0.42988 0.466005 0.657464 0.689976s0.455167 0.433493 0.682751 0.650239L777.758101 840.574801a78.592221 78.592221 0 0 0 55.953066 23.159346 78.603059 78.603059 0 0 0 55.963904-23.152121l60.985194-60.970744a31.952022 31.952022 0 0 0 0.007225-45.202448z m-555.929064-237.416712a191.722971 191.722971 0 0 1-182.066922-17.70095 192.80309 192.80309 0 0 1-69.655047-84.556358 191.722971 191.722971 0 0 1 17.700951-182.066922 192.80309 192.80309 0 0 1 84.541908-69.662272 191.722971 191.722971 0 0 1 182.066922 17.70095 192.806703 192.806703 0 0 1 69.655047 84.556358 191.722971 191.722971 0 0 1-17.700951 182.066922 192.806703 192.806703 0 0 1-84.541908 69.662272z" fill="" p-id="2734"></path></svg>
                            <span style="margin-left: 25px; font-size: 16px; font-weight: 600">{{permission}}</span>
                        </div>

                        <div class="profile-info-line">
                            <svg t="1599016546643" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2648" width="32" height="32"><path d="M767.516999 1023.032976 256.481977 1023.032976c-30.264281 0-54.753021-23.670096-54.753021-52.862975L201.728956 53.831023c0-29.193903 24.488741-52.865022 54.753021-52.865022l511.035022 0c30.264281 0 54.754045 23.671119 54.754045 52.865022l0 916.337955C822.270021 999.36288 797.78128 1023.032976 767.516999 1023.032976zM511.999488 970.168977c20.141736 0 36.503379-15.774265 36.503379-35.237549 0-19.464307-16.361643-35.254945-36.503379-35.254945-20.142759 0-36.500309 15.792685-36.500309 35.254945C475.498156 954.394712 491.857752 970.168977 511.999488 970.168977zM767.516999 106.695021 749.26531 106.695021 274.733667 106.695021 256.481977 106.695021l0 740.117464 18.251689 0L749.26531 846.812485l18.251689 0L767.516999 106.695021z" p-id="2649" fill="#2c2c2c"></path></svg>
                            <v-text-field v-model="phoneNumber" label="电话号码" style="margin-left: 25px; position: relative; bottom: 16px"></v-text-field>
                            <v-btn outlined color="#1E88E5" style="margin-left: 25px; position: relative; bottom: 5px" width="125px" @click="changePhoneNumber">修改手机号</v-btn>
                        </div>

                        <div class="profile-info-line">
                            <svg t="1599799236649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3878" width="32" height="32"><path d="M807.936 336.384h-12.288c-5.12-66.56-33.792-128.512-81.92-176.64C659.968 106.496 589.312 76.8 514.56 76.8c-147.968 0-269.312 114.688-280.576 259.072h-12.288c-78.848 0-143.36 64.512-143.36 143.36v327.168c0 78.848 64.512 143.36 143.36 143.36h586.24c78.848 0 143.36-64.512 143.36-143.36V479.744c0-79.36-64.512-143.36-143.36-143.36zM514.56 158.72c53.248 0 102.912 20.992 140.8 58.88 32.768 32.768 52.736 74.24 57.344 118.784H315.904C327.168 236.544 412.16 158.72 514.56 158.72z m354.816 647.68c0 33.792-27.648 61.44-61.44 61.44H221.696c-33.792 0-61.44-27.648-61.44-61.44V479.744c0-33.792 27.648-61.44 61.44-61.44h586.752c33.792 0 61.44 27.648 61.44 61.44v326.656z" fill="#333333" p-id="3879"></path><path d="M514.56 507.904c-22.528 0-40.96 18.432-40.96 40.96v158.72c0 22.528 18.432 40.96 40.96 40.96s40.96-18.432 40.96-40.96v-158.72c0-22.528-18.432-40.96-40.96-40.96z" fill="#333333" p-id="3880"></path></svg>
                            <v-text-field type="password" v-model="password" label="密码" style="margin-left: 25px; position: relative; bottom: 16px"></v-text-field>
                            <v-btn outlined color="#1E88E5" style="margin-left: 25px; position: relative; bottom: 5px" width="125px" @click="changePassword">修改密码</v-btn>
                        </div>


                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {getUser} from "../utils/cookie";
    import {changePassword,changePhoneNumber} from "../api/admin";

    export default {
        name: "ProfileCard",
        data(){
            return{
                phoneNumber: getUser().phoneNumber,
                password: "",
                permission: (getUser().isLB===true) ? "子管理员" : "两办管理员"

            }
        },

        methods:{
            changePhoneNumber(){
                let data= {
                    id: getUser().id,
                    token: getUser().token,
                    newPhoneNumber: this.phoneNumber
                }

                changePhoneNumber(data).then(res => {
                    let response = res.data
                    if(response.ErrorCode===1){
                        alert("修改失败")
                    }else {
                        alert("修改成功")
                    }
                })
            },

            changePassword(){
                let data= {
                    id: getUser().id,
                    token: getUser().token,
                    newPassword: this.password
                }

                changePassword(data).then(res => {
                    let response = res.data
                    if(response.ErrorCode===1){
                        alert("修改失败")
                    }else {
                        alert("修改成功")
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .profile-title{
        display: flex;
    }

    .profile-info{
        display: flex;
        flex-direction: column;
        margin-left: 22px;
    }

    .profile-headline{
        top:8px;
        margin: 10px;
        display: flex;
    }

    .profile-info-line{
        margin-top: 20px;
        display: flex;
    }

    .profile-info-font-style{
        color: #000000;
        font-size: 15px;
        margin-left: 20px;
        position: relative;
        bottom: 10px;
    }

    .nickname-style{
        font-weight: 900;
        font-size: 30px;
        color: #000000;
    }

    .profile-info-link{
        position: relative;
        margin-left: 20px;
        bottom:10px;
    }

</style>
