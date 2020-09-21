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

                            <!--子管理员-->
                            <div v-if="isLB==='false'">
                                <!--未处理-->
                                <div v-if="!isSolvedPage">
                                    <v-card-text  v-for="(item,index) in unsolvedQuestions" :key="index">
                                        <div class="answer-item-box" >
                                            <div class="question-title">{{item.name}}</div>
                                            <!--这里放置问题标签-->
                                            <div>
                                                <v-chip-group>
                                                    <v-chip v-bind:color="color[tagIndex%15]" v-for="(tag,tagIndex) in item.tags" :key="tagIndex">
                                                        {{tag.name}}
                                                    </v-chip>
                                                </v-chip-group>
                                            </div>

                                            <!--流转原因-->
                                            <div>
                                                <v-chip style="margin-top: 15px">流转原因: {{ item.admin_commit }}</v-chip>
                                            </div>

                                            <!--问题描述-->
                                            <div class="question-description-block">
                                                <v-textarea
                                                        label="问题描述"
                                                        v-bind:value="item.description"
                                                        solo
                                                        auto-grow
                                                        readonly
                                                >
                                                </v-textarea>
                                            </div>

                                            <!--学生评论-->
                                            <div class="admin-student-icon">
                                                <admin-answer :current-question="item"></admin-answer>
                                                <student-comment :current-question="item"></student-comment>
                                            </div>





                                            <!--退回操作-->
                                            <div class="btn-block">
                                                <v-btn width="300px" color="#E53935" >
                                                    <span @click="returnBack(item.id)" class="btn-inline-font">
                                                        退回
                                                    </span>
                                                </v-btn>
                                            </div>


                                            <!--管理员回复-->
                                            <div style="margin-top: 25px">
                                                    <my-quill-editor
                                                            :question-id="Number(item.id)"
                                                            v-on:getAnswerByChild="getAnswerByChild">
                                                    </my-quill-editor>
                                            </div>

                                        </div>
                                        <v-divider></v-divider>
                                    </v-card-text>
                                </div>

                                <!--已解决-->
                                <div v-else>
                                    <v-card-text  v-for="(item,index) in solvedQuestions" :key="index">
                                        <div class="answer-item-box" >
                                            <div class="question-title">{{item.name}}</div>
                                            <!--这里放置问题标签-->
                                            <div>
                                                <v-chip-group v-for="(tag,tagIndex) in item.tags" :key="tagIndex">
                                                    <v-chip v-bind:color="color[tagIndex%15]">{{tag.name}}</v-chip>
                                                </v-chip-group>
                                            </div>

                                            <!--流转原因-->
                                            <div>
                                                <v-chip style="margin-top: 15px">流转原因: {{ item.admin_commit }}</v-chip>
                                            </div>


                                            <!--问题描述-->
                                            <div class="question-description-block">
                                                <v-textarea
                                                        label="问题描述"
                                                        v-bind:value="item.description"
                                                        solo
                                                        auto-grow
                                                        readonly
                                                >
                                                </v-textarea>
                                            </div>

                                            <!--评论图标-->
                                            <div class="admin-student-icon">
                                                <admin-answer :current-question="item"></admin-answer>
                                                <student-comment :current-question="item"></student-comment>
                                            </div>

                                        </div>

                                        <v-divider></v-divider>
                                    </v-card-text>
                                </div>
                            </div>

                            <!--两办管理员-->
                            <div v-else>
                                <!--未解决问题-->
                                <div v-if="!isSolvedPage">
                                    <v-card-text  v-for="(item,index) in unsolvedQuestions" :key="index">
                                        <div class="answer-item-box" >
                                            <div class="question-title">{{item.name}}</div>
                                            <!--这里放置问题标签-->
                                            <div>
                                                <v-chip-group v-for="(tag,tagIndex) in item.tags" :key="tagIndex">
                                                    <v-chip v-bind:color="color[tagIndex%15]">{{tag.name}}</v-chip>
                                                </v-chip-group>
                                            </div>

                                            <!--问题描述-->
                                            <div class="question-description-block">
                                                <v-textarea
                                                        label="问题描述"
                                                        v-bind:value="item.description"
                                                        solo
                                                        readonly
                                                        auto-grow
                                                >
                                                </v-textarea>
                                            </div>


                                            <!--学生评论-->
                                            <div class="admin-student-icon">
                                                <admin-answer :current-question="item"></admin-answer>
                                                <student-comment :current-question="currentStudentComment"></student-comment>
                                            </div>


                                            <!--这里放置增加标签的操作-->
                                            <!--focus时传递数据-->
                                            <!--父传子-->
                                            <div>
                                                <tag-search-column :currentQuestion="item"></tag-search-column>
                                            </div>




                                        </div>
                                        <v-divider></v-divider>
                                    </v-card-text>
                                </div>

                                <!--已解决问题-->
                                <div v-else>
                                    <v-card-text  v-for="(item,index) in solvedQuestions" :key="index">
                                        <div class="answer-item-box" >
                                            <div class="question-title">{{item.name}}</div>
                                            <!--这里放置问题标签-->
                                            <div>
                                                <v-chip-group v-for="(tag,tagIndex) in item.tags" :key="tagIndex">
                                                    <v-chip v-bind:color="color[tagIndex%15]">{{tag.name}}</v-chip>
                                                </v-chip-group>
                                            </div>

                                            <!--问题描述-->
                                            <div class="question-description-block">
                                                <v-textarea
                                                        label="问题描述"
                                                        v-bind:value="item.description"
                                                        readonly
                                                        solo
                                                        auto-grow
                                                >
                                                </v-textarea>
                                            </div>

                                            <!--学生评论-->
                                            <div class="admin-student-icon">
                                                <admin-answer :current-question="item"></admin-answer>
                                                <student-comment :current-question="item"></student-comment>
                                            </div>


                                        </div>

                                        <v-divider></v-divider>
                                    </v-card-text>
                                </div>
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
    import TagSearchColumn from "../components/TagSearchColumn";
    import StudentComment from "../components/StudentComment";
    import AdminAnswer from "../components/AdminAnswer";
    import MyQuillEditor from "../components/tools/MyQuillEditor";
    import {getUser} from "../utils/cookie";
    import {
        getSolvedQuestions,
        getUnsolvedQuestions,
        getTagByQuestion,
        removeTagByQuestion,
        addQuestionTag,
        getCommitByQuestion,
        addComment
    } from "../api/admin";

    export default {
        name: "Message",
        components: {
            TagSearchColumn,
            MyHeader,
            StudentComment,
            AdminAnswer,
            MyQuillEditor
        },
        data(){
          return {
              isLB: getUser().isLB,
              solvedQuestions:[],
              unsolvedQuestions:[],
              isSolvedPage: false,
              color:["#DCE775","#FFF176","#FFD54F","#FFB74D","#FF8A65",
                  "#F06292","#BA68C8","#9575CD","#7986CB","#64B5F6",
                  "#29B6F6","#26C6DA","#26A69A","#81C784","#AED581",
                  ],
              isOverlay: false,
              currentStudentComment:[],
              tagsList:[],
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
                            return;
                        }else {
                            this.unsolvedQuestions[i].tags = response.data
                            return;
                        }
                    }
                })

            },


            //退回问题到两办
            returnBack(questionId){
                let reason = prompt("请输入退回原因")
                const data = {
                    id: getUser().id,
                    token: getUser().token,
                    question_id: questionId
                }
                let tagList=[]
                getTagByQuestion(data).then(res => {
                    const response = res.data
                    if(response.ErrorCode === 1){
                        alert("获取问题所属标签失败")
                    }else {
                        const tagData = response.data
                        for(let i=0;i<tagData.length;i++){
                            tagList.push(tagData[i].id)
                        }


                        tagList=JSON.stringify(tagList)

                        // data.tagList=tagList
                        const removeData = {
                            id: getUser().id,
                            token: getUser().token,
                            question_id: questionId,
                            tagList: tagList
                        }

                        //删除该所属问题下所有标签
                        removeTagByQuestion(removeData).then(res => {
                            const removeResponse = res.data
                            if(removeResponse.ErrorCode === 1){
                                alert("删除问题标签失败")
                            }else {
                                //这里增加"其他"标签
                                //然后还要写退回原因
                                const addData = {
                                    id: getUser().id,
                                    token: getUser().token,
                                    question_id: questionId,
                                    tagList: JSON.stringify([this.searchTagId("其他")]),
                                    reason: reason
                                }

                                addQuestionTag(addData).then(res => {
                                    const addResponse = res.data
                                    if(addResponse.ErrorCode === 1){
                                        alert("退回失败")
                                    }else {
                                        alert("退回成功")
                                        location.reload()
                                    }
                                })
                            }
                        })
                    }
                })
            },

            //打开学生评论
            openComment(questionId){
                const data = {
                    question_id: questionId
                }

                getCommitByQuestion(data).then(res => {
                    const response = res.data
                    if(response.ErrorCode === 1){
                        alert("获取学生评论失败")
                    }else {
                        //获取当前问题学生评论
                        this.currentStudentComment = response.data
                        //打开遮罩
                        this.isOverlay =true
                    }
                })
            },

            //子传父，获取管理员回复的内容
            getAnswerByChild(comment,questionId){
                const data = {
                    id : getUser().id,
                    token : getUser().token,
                    question_id: questionId,
                    answer_contain: comment
                }

                addComment(data).then(res => {
                    const response = res.data
                    if(response.ErrorCode === 1){
                        alert("回复失败")
                    }else {
                        alert("回复成功")
                        location.reload()
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

                    //获得已解决问题的列表
                    getSolvedQuestions(data).then(res => {
                        const response = res.data
                        if(response.ErrorCode === 1){
                            alert("拉取失败")
                        }else {
                            this.solvedQuestions=response.data

                            //获取问题标签
                            for(let i=0;i<this.unsolvedQuestions.length;i++){
                                let questionId=this.unsolvedQuestions[i].id
                                this.initTagOnQuestion(questionId,i,false)
                            }

                            for(let j=0;j<this.solvedQuestions.length;j++){
                                let questionId=this.solvedQuestions[j].id
                                this.initTagOnQuestion(questionId,j,true)
                            }


                        }
                    })
                }
            })




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

    .btn-block{
        margin-top: 15px;
        height: auto;
        justify-content: center;
        text-align: center;
    }

    .btn-inline-font{
        color: #ffffff;
        font-weight: 700;
        font-size: 16px;
    }

    .admin-student-icon{
        display: flex;
        margin-bottom: 20px;
    }

    .question-description-block{
        margin-top: 15px;
    }
</style>
