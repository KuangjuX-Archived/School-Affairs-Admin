<template>
  <div>
    <my-header></my-header>
    <my-sidebar
      @onChangeTag="onChangeTag"
      @onTagsLoaded="onTagsInit"
    ></my-sidebar>

    <div class="content">
      <v-container>
        <v-row>
          <v-col cols="12">
            <!--这里显示管理员个人卡片-->
            <profile-card></profile-card>

            <!--这里显示管理员说明文档-->


            <div v-if="ifUsageShowed">
              <v-card style="margin-top: 10px">
                <v-card-title>
                  <div class="content-title">
                    说明
                  </div>
                </v-card-title>

                <v-card-text class="content-text">
                  <p>
                    本平台分为两办管理员和子管理员。两办管理员可以管理学生提出问题的“其他”标签和子管理员退回的标签。
                    同时可以在问题下添加标签。子管理员可以管理自己标签下的问题并进行回复，如果觉得不属于本标签的问题，可以退回问题。
                  </p>

                </v-card-text>
              </v-card>
            </div>


            <div id="question-block">
              <v-card>
                <!--这里显示问题-->
                <div v-if="permission==='false'" class="question-field">
                  <!--扩展面板-->
                  <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item, i) in currentQuestions"
                        :key="i"
                        style="margin-top: 15px"
                    >
                      <div>
                        <v-expansion-panel-header>
                          <p style="font-size: 26px; font-weight: 900; text-align: center">{{ item.name }}</p>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>



                          <!--问题描述-->
                          <div>
                            <v-card>
                              <v-card-title>描述</v-card-title>
                              <v-card-text>
                                <div>
                                  {{item.description}}
                                </div>
                                <!--问题图片-->
                                <div>
                                  <image-grid :question-id="item.id"></image-grid>
                                </div>

                              </v-card-text>
                            </v-card>
                          </div>


                          <v-divider></v-divider>
                          <v-tabs center-active grow v-model="controlTab">
                            <v-tab
                                v-for="item in controlTabItems"
                                :key="item.tab"
                            >{{ item.title }}</v-tab>
                          </v-tabs>
                          <v-tabs-items v-model="controlTab">
                            <v-tab-item key="updateTag">
                              <v-card flat>
                                <v-chip style="margin-top: 15px">流转原因: {{ item.admin_commit }}</v-chip>

                                <v-divider style="margin-top: 15px"></v-divider>

                                <v-list two-line>
                                  <v-list-item
                                      v-for="tag in item.tags"
                                      :key="tag.id"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title
                                          v-text="tag.name"
                                      ></v-list-item-title>

                                    </v-list-item-content>
                                  </v-list-item>
                                </v-list>
                                <v-divider></v-divider>


                                <div style="margin-top: 15px;height: auto; justify-content: center; text-align: center">
                                  <v-btn width="300px" color="#E53935" >
                              <span style="color: #ffffff; font-weight: 700; font-size: 16px" @click="returnBack(item.id)">
                                退回
                              </span>
                                  </v-btn>
                                </div>
                              </v-card>
                            </v-tab-item>


                            <!--这里要加上其他管理员的评论-->
                            <v-tab-item key="addComment">
                              <v-card flat >

                                <div v-if="!item.solved">
                                  <v-btn color="#E53935" width="300px">
                                <span class="btn-font-style">
                                  未解决
                                </span>
                                  </v-btn>
                                </div>

                                <div v-else>
                                  <v-btn color="#66BB6A" width="300px" >
                                <span class="btn-font-style">
                                  已解决
                                </span>
                                  </v-btn>

                                  <!--管理员回复图标-->
                                  <!--学生评论图标-->
                                  <div class="admin-student-icon">
                                    <admin-answer :current-question="item"></admin-answer>
                                    <student-comment :current-question="item"></student-comment>
                                  </div>

                                </div>



                                <!--富文本编辑器-->
                                <div style="margin-top: 25px">
                                  <my-quill-editor
                                      :question-id="Number(item.id)"
                                      v-on:getAnswerByChild="getAnswerByChild">
                                  </my-quill-editor>
                                </div>



                              </v-card>
                            </v-tab-item>
                          </v-tabs-items>
                        </v-expansion-panel-content>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>



                <!--这里是两办管理员-->
                <div v-else-if="permission==='true'" style="margin-top: 15px">
                  <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item, i) in currentQuestions"
                        :key="i"
                        style="margin-top: 15px"
                    >
                      <div>
                        <v-expansion-panel-header>
                          <p style="font-size: 26px; font-weight: 900; text-align: center">{{ item.name }}</p>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>

                          <div>
                            <v-card>
                              <v-card-title>描述</v-card-title>
                              <v-card-text>
                                <div>
                                  {{item.description}}
                                </div>
                                <!--问题图片-->
                                <div>
                                  <image-grid :question-id="item.id"></image-grid>
                                </div>

                              </v-card-text>
                            </v-card>
                          </div>


                          <v-divider></v-divider>
                          <v-tabs center-active grow v-model="controlTab">
                            <v-tab
                                v-for="item in controlTabItems"
                                :key="item.tab"
                            >{{ item.title }}</v-tab
                            >
                          </v-tabs>
                          <v-tabs-items v-model="controlTab">
                            <v-tab-item key="updateTag">
                              <v-card flat>
                                <v-chip style="margin-top: 15px">流转原因: {{ item.admin_commit }}</v-chip>

                                <v-divider style="margin-top: 15px"></v-divider>
                                <v-list two-line>
                                  <v-list-item
                                      v-for="tag in item.tags"
                                      :key="tag.id"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title
                                          v-text="tag.name"
                                      ></v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                      <v-btn
                                          icon
                                          @click="deleteTag(item.id, tag.id)"
                                      >
                                        <v-icon color="grey lighten-1"
                                        >mdi-delete</v-icon
                                        >
                                      </v-btn>
                                    </v-list-item-action>
                                  </v-list-item>
                                </v-list>
                                <v-divider></v-divider>

                                <!--流转原因封装成组件-->
                                <div>
                                  <tag-search-column :current-question="item"></tag-search-column>
                                </div>

                              </v-card>
                            </v-tab-item>


                            <v-tab-item key="addComment">
                              <v-card flat>
                                <div v-if="!item.solved" class="status-answer-box">
                                  <v-btn color="#E53935" width="300px">
                                <span class="btn-font-style">
                                  未解决
                                </span>
                                  </v-btn>

                                  <!--管理员回复图标-->
                                  <!--学生评论图标-->
                                  <div class="admin-student-icon">
                                    <admin-answer :current-question="item"></admin-answer>
                                    <student-comment :current-question="item"></student-comment>
                                  </div>



                                </div>

                                <div v-else>
                                  <v-btn color="#66BB6A" width="300px" >
                                <span class="btn-font-style">
                                  已解决
                                </span>
                                  </v-btn>

                                  <!--管理员回复图标-->
                                  <!--学生评论图标-->

                                  <div class="admin-student-icon">
                                    <admin-answer :current-question="item"></admin-answer>
                                    <student-comment :current-question="item"></student-comment>
                                  </div>


                                </div>

                              </v-card>

                            </v-tab-item>
                          </v-tabs-items>

                        </v-expansion-panel-content>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-card>
            </div>



          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import MyHeader from "../components/Header";
  import MySidebar from "../components/Sidebar";
  import ProfileCard from "../components/ProfileCard";
  import TagSearchColumn from "../components/TagSearchColumn";
  import AdminAnswer from "../components/AdminAnswer";
  import StudentComment from "../components/StudentComment";
  import MyQuillEditor from "../components/tools/MyQuillEditor";
  import ImageGrid from "../components/tools/ImageGrid";
  import {
    addComment,
    addQuestionTag,
    getAnswerByQuestion,
    getQuestionsByTag,
    getTagByQuestion,
    removeTagByQuestion,
    getCommitByQuestion
  } from "../api/admin";
  import {getUser} from "../utils/cookie";

  const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons

  [{ header: 1 }, { header: 2 }], // custom button values

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],
  ["clean"],
];
export default {
  name: "Home",
  data: function() {
    return {
      isShowComment: false,
      permission:getUser().isLB,
      tagsList: [],
      currentTagId: 0,
      ifUsageShowed: true,
      currentQuestions: [],

      editorOption: {
        placeholder: "请输入评论",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions,
          },
        },
      },
      controlTab: null,
      controlTabItems: [
        { tab: "updateTag", title: "修改标签" },
        { tab: "addComment", title: "添加回复" },
      ],
    };
  },

  components: {
    TagSearchColumn,
    MyHeader,
    MySidebar,
    ProfileCard,
    StudentComment,
    AdminAnswer,
    MyQuillEditor,
    ImageGrid
  },
  methods: {
    onChangeTag: function(tagId) {
      if (tagId.length === 0 || tagId[0] === 0) {
        this.ifUsageShowed = true;
      } else {
        this.ifUsageShowed = false;
        this.currentTagId = tagId[0];

        const data = {
          id: getUser().id,
          token: getUser().token,
          tag_id: tagId[0],
        };

        //获取当前问题列表
        getQuestionsByTag(data)
          .then((res) => {
            if (res.data.ErrorCode === 1) {
              alert("拉取问题失败:" + res.data.msg);
            } else if (res.data.ErrorCode === 0) {
              //对tags排序
              res.data.data.forEach((quesItem) => {
                quesItem.tags.sort((a, b) => {
                  return a.id - b.id;
                });
              });
              this.currentQuestions = res.data.data;

              //获取当前问题的管理员的回复
              //获取当前问题学生的评论

              for(let i=0;i<this.currentQuestions.length;i++){
                const id= this.currentQuestions[i].id
                this.getAnswerByQuestion(id,i)
                this.getCommentByQuestion(id,i)
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }



    },

    //删除问题标签
    deleteTag(questionId, tagId) {

      const data = {
        id : Number(getUser().id),
        token : getUser().token,
        question_id: questionId,
        tagList: JSON.stringify([tagId])
      }

      removeTagByQuestion(data).then(res => {
        const response = res.data
        if(response.ErrorCode === 1){
          alert("删除失败"+response.msg)
          console.log(data);
        }else {
          alert("删除成功")
        }
      })
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

        //增加标签
        addQuestionTag(data).then(res => {
          const response = res.data
          if(response.ErrorCode === 1){
            alert("添加标签失败")
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
      return question;
    },


    onTagsInit(tagsTree) {
      //当标签获取完成时，向home组件发出事件，传递标签树，展平
      let that = this;
      let dfs = function(obj) {
        obj.children.forEach((item) => {
          dfs(item);
        });
        that.tagsList.push(obj);
      };
      tagsTree.forEach((item) => {
        dfs(item);
      });
      that.tagsList.sort((a, b) => {
        return a.id - b.id;
      });

      this.$store.commit("setTagsList",this.tagsList)

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

      //通过问题获取答复
      getAnswerByQuestion(questionId,i){
        const data={
            question_id: questionId,
            user_id: 0
        }
          getAnswerByQuestion(data).then(res => {
          const response = res.data
          if (response.ErrorCode === 1) {
            alert("拉取数据失败")
            console.log(1);
          } else {
            this.currentQuestions[i].answer = response.data
          }
        });
      },

    //通过问题获取评论
      getCommentByQuestion(questionId,i){
        const data={
          question_id: questionId,
          user_id: 0
        }
        getCommitByQuestion(data).then(res => {
          const response = res.data
          if (response.ErrorCode === 1) {
            alert("拉取数据失败")
            console.log(2);
          } else {
            this.currentQuestions[i].commit = response.data
          }
        });
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
    }
  },
  created() {

  },

};
</script>

<style scoped>
.content {
  margin-top: 50px;
  margin-left: 25%;
}

.content-title {
  width: 100%;
  color: #1e88e5;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
}

.content-text {
  font-size: 18px;
  font-weight: 500;
}

p {
  line-height: 180%;
  text-indent: 20px;
}

.question-field {
  margin-top: 25px;
}

.select-control >>> .v-menu__content {
  top: 70px !important;
  left: 12px !important;
}


.btn-font-style{
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
}

.status-answer-box{
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
}

  .admin-student-icon{
    width: 100%;
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  #question-block{
    margin-top: 25px;
  }
  #question-block >>> .v-sheet.v-card{
    padding: 20px;
  }
</style>
