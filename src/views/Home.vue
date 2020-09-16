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
                    本后台系统使用了bootstrap插件,所以强烈推荐使用
                    chrome,firefox,搜狗浏览器 等现代浏览器.请不要使用ie浏览器.
                    同时:希望老师能推荐学生使用以上三个浏览器进行党校系统的学习,这样浏览效果会更好!
                  </p>
                  <v-divider></v-divider>
                  <p>
                    后台共有15个部分模块组成,分别是 通知公告 栏目管理 党建专项
                    学习小组 党校培训 重要文件 理论学习 消息管理 申请人培训
                    院级积极分子培训 预备党员培训 支部管理 学生信息管理 管理员控制
                    系统功能锁这些部分组成.
                    其中前7个部分都是对前台页面新闻的管理和党校相关信息的发表.
                    后面的几个模块是对党校课程的控制盒学生状态的控制.
                  </p>
                  <v-divider></v-divider>
                  <p>
                    后台共分3种权限:超级管理员院级管理员栏目管理员.超级管理员可以管理所有后台的所有权限,包括超级管理员,院级管理员,栏目管理员的添加,删除等操作.但是不包括院级培训的添加和学生成绩的录入
                    院级管理员可以进行消息的处理操作以及院级积极分子培训的考试.学生信息管理的操作.但是请广大院级管理员注意:不得操作其他学院的相关数据,如果发现,将会封号处理.
                    栏目管理员是由超级管理员下放的权限:它以单个的模块为单位,只显示其拥有的权限.但是栏目管理员无法查看管理员控制盒系统锁模块.
                  </p>
                  <v-divider></v-divider>
                  <p>
                    请超级管理员注意:在给栏目管理员分配权限的时候,是不能分配管理员控制系统功能锁
                    这两个模块的. 以免栏目管理员对其权限进行修改.
                  </p>
                  <v-divider></v-divider>
                  <p>
                    栏目管理:主要管理的是前台党建专项的下拉菜单,在后台添加二级栏目,并且二级栏目未被删除,则在前台菜单栏内即可显示
                    同时请注意:栏目名称不可太长,否则影响前台效果的显示.
                  </p>
                </v-card-text>
              </v-card>
            </div>


            <!--这里显示问题-->
            <div v-else-if="permission==='false'" class="question-field">
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
                      {{ item.description }}
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


                            <div v-if="!item.solved" class="status-answer-box">
                              <v-btn color="#E53935" width="300px">
                                <span class="btn-font-style">
                                  未解决
                                    {{getAnswerByQuestion(item.id)}}
                                </span>
                              </v-btn>
                            </div>

                            <div v-else class="status-answer-box">
                              <v-btn color="#66BB6A" width="300px" >
                                <span class="btn-font-style">
                                  已解决
                                </span>
                              </v-btn>
                            </div>


                            <quill-editor
                              v-model="item.comment"
                              ref="myQuillEditor"
                              :options="editorOption"
                            >
                            </quill-editor>

                            <div
                              style="width: 100%; top: 0px; height: auto; justify-content: center;text-align: center;"
                              class="btn-box-style"
                            >
                              <v-btn
                                center-active
                                large
                                @click="postCommit(item.id, item.comment)"
                                width="300px"
                                color="#66BB6A"
                                >
                                <span class="btn-font-style">
                                  提交
                                </span>
                              </v-btn
                              >
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
                      {{ item.description }}
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



                            <v-card>
                              <v-container fluid>
                                <v-row align="center">
                                  <v-col cols="6">
                                    <div data-app="true" class="select-control">
                                      <v-select
                                        @focus="item = showSelectTags(item)"
                                        v-model="item.select"
                                        :items="item.tagsListForShow"
                                        menu-props="auto"
                                        label="选择添加标签"
                                        hide-details
                                      ></v-select>
                                    </div>
                                  </v-col>
                                </v-row>
                                <v-text-field
                                  v-model="item.reason"
                                  label="添加原因"
                                  dense
                                  light
                                  clearable
                                  clear-icon="mdi-close-circle-outline"
                                ></v-text-field>
                              </v-container>

                              <div
                                style="height: auto; justify-content: center;text-align: center;padding: 15px"
                              >
                                <v-btn
                                  color="#66BB6A"
                                  width="300px"
                                  @click="
                                    onAddTag(item.id, item.select, item.reason)
                                  "
                                  >
                                  <span class="btn-font-style">
                                    提交
                                  </span>
                                </v-btn
                                >
                              </div>
                            </v-card>

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
                            </div>

                            <div v-else class="status-answer-box">
                              <v-btn color="#66BB6A" width="300px" >
                                <span class="btn-font-style">
                                  已解决
                                </span>
                              </v-btn>
                            </div>


                            <quill-editor
                                    v-model="item.comment"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                            >
                            </quill-editor>

                            <div style="margin-top: 15px;justify-content: center; align-items: center; text-align: center;">
                              <v-btn
                                      @click="postCommit(item.id, item.comment)"
                                      width="300px"
                                      color="#66BB6A"
                              >
                                <span class="btn-font-style"  @click="returnBack(item.id)">
                                提交
                              </span>
                              </v-btn>

                            </div>
                          </v-card>

                        </v-tab-item>
                      </v-tabs-items>

                    </v-expansion-panel-content>
                  </div>
                </v-expansion-panel>
              </v-expansion-panels>
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
import { getQuestionsByTag ,addComment,
  removeTagByQuestion,getTagByQuestion,
  addQuestionTag,getAnswerByQuestion} from "../api/admin";
import { getUser } from "../utils/cookie";
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

      console.log(data);
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

    //提交评论
    postCommit(questionId, comment) {

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


    onAddTag(questionId, select, reason) {
      if (typeof select === "undefined") {
        //TODO: 报错提示框
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
      var idx = 0;
      this.tagsList.forEach(function(item) {
        if (idx < question.tags.length) {
          if (question.tags[idx].id != item.id) {
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
      var that = this;
      var dfs = function(obj) {
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

      getAnswerByQuestion(questionId){
        let answer = null
        const data={
            question_id: questionId
        }
            getAnswerByQuestion(data).then(res => {
                const response = res.data
                if(response.ErrorCode === 1){
                    alert("拉取数据失败")
                }else {
                    //alert("拉取数据成功")
                    answer = response.data
                    console.log(answer);
                }
            })

          return answer
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

  created() {},
  components: {
    MyHeader,
    MySidebar,
    ProfileCard,
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

.question-title {
  width: 100%;
  margin-top: 12px;
  margin-bottom: 4px;
  color: #121212;
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;

  font-synthesis: style;
}



.select-control >>> .v-menu__content {
  top: 70px !important;
  left: 12px !important;
}

.btn-box-style{
  margin-top: 15px;
}

.btn-font-style{
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
}

.status-answer-box{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
