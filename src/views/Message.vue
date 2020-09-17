<template>
    <div>
        <my-header></my-header>
        <div style="margin-top: 50px" id="message-box">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title style="margin-bottom: 15px; background-color: #f5f5f5">
                                <v-btn-toggle>
                                    <v-btn height="60" width="125" @click="isSolvedPage=false">待处理</v-btn>
                                    <v-btn height="60" width="125" @click="isSolvedPage=true">已回复</v-btn>
                                </v-btn-toggle>
                            </v-card-title>

                            <div v-if="isLB==='false'">
                                <!--未处理-->
                                <div v-if="!isSolvedPage">
                                    <v-card-text  v-for="(item,index) in unsolvedQuestions" :key="index">
                                        <div class="answer-item-box" >
                                            <div class="question-title">{{item.name}}</div>
                                            <!--这里放置问题标签-->
                                            <div>
                                                <v-chip-group v-for="(tag,tagIndex) in item.tags" :key="tagIndex">
                                                    <v-chip>{{tag.name}}</v-chip>
                                                </v-chip-group>
                                            </div>
                                            <div>{{item.description}}</div>
                                            <div></div>
                                        </div>
                                        <v-divider></v-divider>
                                    </v-card-text>
                                </div>

                                <div v-else>
                                    <v-card-text  v-for="(item,index) in solvedQuestions" :key="index">
                                        <div class="answer-item-box" >
                                            <div class="question-title">{{item.name}}</div>
                                            <!--这里放置问题标签-->
                                            <div>
                                                <v-chip-group v-for="(tag,tagIndex) in item.tags" :key="tagIndex">
                                                    <v-chip>{{tag.name}}</v-chip>
                                                </v-chip-group>
                                            </div>
                                            <div>{{item.description}}</div>
                                        </div>

                                        <v-divider></v-divider>
                                    </v-card-text>
                                </div>
                            </div>

                            <!--两办管理员-->
                            <div v-else>

                            </div>


                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import {getUser} from "../utils/cookie";
    import {
        getSolvedQuestions,
        getUnsolvedQuestions,
        getTagByQuestion
    } from "../api/admin";

    export default {
        name: "Message",
        components: {
            MyHeader
        },
        data(){
          return {
              isLB: getUser().isLB,
              solvedQuestions:[],
              unsolvedQuestions:[],
              isSolvedPage: false
          }
        },
        methods: {
            //初始化问题时添加标签
            initTagOnQuestion(questionId,i,isSolved){
                const data = {
                    id: getUser().id,
                    token: getUser().token,
                    question_id: questionId
                }
                getTagByQuestion(data).then(res =>{
                    const response = res.data
                    if(response.ErrorCode === 1){
                        alert("获取失败")
                    }else {
                        if(isSolved===true){
                            this.solvedQuestions[i].tags = response.data
                        }else {
                            this.unsolvedQuestions[i].tags = response.data
                        }
                    }
                })

            }

        },

        created() {
            const data = {
                id: getUser().id,
                token: getUser().token
            }
            //获得未解决问题的列表
            getUnsolvedQuestions(data).then(res => {
                const response = res.data
                if(response.ErrorCode === 1){
                    alert("拉取失败")
                }else {
                    this.unsolvedQuestions=response.data
                }
            })

            //获得已解决问题的列表
            getSolvedQuestions(data).then(res => {
                const response = res.data
                if(response.ErrorCode === 1){
                    alert("拉取失败")
                }else {
                    this.solvedQuestions=response.data
                }
            })

            //获取问题标签
            for(let i=0;i<this.unsolvedQuestions.length;i++){
                let questionId=this.unsolvedQuestions[i].id
                this.initTagOnQuestion(questionId,i,false)
            }

            for(let j=0;j<this.solvedQuestions.length;j++){
                let questionId=this.solvedQuestions[j].id
                this.initTagOnQuestion(questionId,j,true)
            }

        },

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
        margin-bottom: 15px;
    }

    .answer-item-box:hover{
        border: #1E88E5 solid 2px;
    }

    .question-title{
        font-size: 24px;
        font-weight: 900;
        text-align: center;
    }
</style>
