<template>
    <div>
        <v-card>
            <v-container fluid>
                <v-row align="center">
                    <v-col cols="6">
                        <div data-app="true" class="select-control">
                            <v-select
                                    @focus="showSelectTags(currentQuestion)"
                                    v-model="currentQuestionData.select"
                                    :items="currentQuestionData.tagsListForShow"
                                    menu-props="auto"
                                    label="选择添加标签"
                                    hide-details
                            ></v-select>
                        </div>
                    </v-col>
                </v-row>
                <v-text-field
                        label="添加原因"
                        dense
                        light
                        clearable
                        clear-icon="mdi-close-circle-outline"
                        v-model="currentQuestionData.reason"
                ></v-text-field>
            </v-container>
            <div style="height: auto; justify-content: center;text-align: center;padding: 15px">
                <v-btn color="#66BB6A" width="300px"
                       @click="onAddTag(currentQuestionData.id, currentQuestionData.select, currentQuestionData.reason)"
                >
                      <span class="btn-font-style">
                        提交
                      </span>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>


import {getTagList, getUser} from "../utils/cookie";
    import {addQuestionTag, removeTagByQuestion,} from "../api/admin";

    export default {
        name: "TagSearchColumn",
        data(){
            return {
                tagsList: [],
                currentQuestionId: null,
                currentQuestionData: {}
            }
        },

        props: {
            currentQuestion:{}
        },

        methods: {
            showSelectTags(question) {
                question.tagsListForShow = [];
                question.tags.sort((a, b) => {
                    return a.id - b.id;
                });
                let idx = 0;
                this.tagsList.forEach(function(item) {
                    if (idx < question.tags.length) {
                        if (question.tags[idx].id !== item.id) {
                            question.tagsListForShow.push("id:" + item.id + "-" + item.name);
                        } else {
                            idx++;
                        }
                    } else {
                        question.tagsListForShow.push("id:" + item.id + "-" + item.name);
                    }
                });
                this.currentQuestionData = question
            },


            onAddTag(questionId, select, reason) {
                if (typeof select === "undefined") {
                    alert("未选择所要添加的标签")
                } else if(reason === "undefined"){
                    alert("未填写流转原因")
                }else {
                    const data={
                        id: getUser().id,
                        token: getUser().token,
                        question_id: questionId,
                        tagList: JSON.stringify([select[3]]),//这里或许要转换一下格式,
                        reason: reason
                    }
                    console.log(data);

                    //增加标签
                    addQuestionTag(data).then(res => {
                        const response = res.data
                        if(response.ErrorCode === 1){
                            alert("添加标签失败:"+response.msg)
                        }else {
                            const otherTag = this.searchTagId("其他")
                            const removeData = {
                                id: getUser().id,
                                token: getUser().token,
                                question_id: questionId,
                                tagList: JSON.stringify([otherTag])
                            }
                            //删除“其他”标签
                            removeTagByQuestion(removeData).then(res => {
                                let removeResponse = res.data
                                if(removeResponse.ErrorCode === 1){
                                    alert("删除'其他标签'失败")
                                }else {
                                    alert("流转成功")
                                    location.reload()
                                }
                            })
                        }
                    })


                }
            },

            //通过标签名找标签ID
            searchTagId(tag_name){
                const tagsList = this.tagsList
                for(let i=0;i<tagsList.length;i++){
                    if(tagsList[i].name === tag_name){
                        return tagsList[i].id
                    }
                }
                return -1
            },
        },

        created() {
           this.tagsList = JSON.parse(getTagList())
        }
    }
</script>

<style scoped>
    .select-control{
        margin-bottom: 15px;
    }

    .select-control >>> .v-menu__content{
        top: 70px !important;
        left: 12px !important;
    }

    .btn-font-style{
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
    }
</style>
