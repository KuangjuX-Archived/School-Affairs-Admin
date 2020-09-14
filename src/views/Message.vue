<template>
    <div>
        <my-header></my-header>
        <div style="margin-top: 50px" id="message-box">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title style="margin-bottom: 15px">
                                <v-btn-toggle>
                                    <v-btn height="60" width="125">新消息</v-btn>
                                    <v-btn height="60" width="125">待处理</v-btn>
                                    <v-btn height="60" width="125">已回复</v-btn>
                                </v-btn-toggle>
                            </v-card-title>
                            <v-card-text>
                                <div class="answer-item-box">
                                    <h1>校门关门关闭太早了</h1>
                                    <p>1234567</p>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    export default {
        name: "Message",
        components: {
            MyHeader
        }
    }
</script>

<style scoped>
    #message-box >>> .v-card__text, .v-card__title{
        padding: 0;
    }

    .answer-item-box{
        padding: 10px;
        width: 100%;
        outline: none;
        border: #1E88E5 solid 2px;
    }
</style>
