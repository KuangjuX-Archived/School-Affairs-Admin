<template>
  <div>
    <my-header></my-header>
    <div id="message-box">
      <div class="card">
        <v-card-title style="background-color: #f5f5f5">
          <v-btn-toggle>
            <v-btn class="tab-btn" @click="isSolvedPage = false">待处理</v-btn>
            <v-btn class="tab-btn" @click="isSolvedPage = true">已回复</v-btn>
          </v-btn-toggle>
        </v-card-title>

        <!--子管理员-->
        <div v-if="isLB === 'false'">
          <!--未处理-->
          <div v-if="!isSolvedPage">
            <v-card-text>
              <div
                class="answer-item-box"
                v-for="(item, index) in unsolvedQuestions"
                :key="index"
              >
                <div class="question-title">{{ item.name }}</div>
                <!--这里放置问题标签-->
                <div>
                  <v-chip-group>
                    <v-chip
                      v-bind:color="color[tagIndex % 15]"
                      v-for="(tag, tagIndex) in item.tags"
                      :key="tagIndex"
                    >
                      {{ tag.name }}
                    </v-chip>
                  </v-chip-group>
                </div>

                <!--流转原因-->
                <div>
                  <v-chip style="margin-top: 15px"
                    >流转原因: {{ item.admin_commit }}</v-chip
                  >
                </div>

                <!--问题描述-->
                <div class="question-description-block">
                  <div class="card">
                    <v-card-title>
                      <div class="question-title-fake">描述</div>
                    </v-card-title>
                    <v-card-text>
                      <div class="question-description">
                        {{ item.description }}
                      </div>
                      <!--问题图片-->
                      <div>
                        <image-grid :question-id="item.id"></image-grid>
                      </div>
                    </v-card-text>
                  </div>
                </div>

                <!--学生评论-->
                <div class="admin-student-icon">
                  <admin-answer :current-question="item"></admin-answer>
                  <student-comment :current-question="item"></student-comment>
                </div>

                <!--退回操作-->

                <div>
                  <return-back-text-editor
                    :questionId="item.id"
                    v-on:getReason="getReason"
                  ></return-back-text-editor>
                </div>

                <!--管理员回复-->
                <div style="margin-top: 25px">
                  <my-quill-editor
                    :question-id="Number(item.id)"
                    v-on:getAnswerByChild="getAnswerByChild"
                  >
                  </my-quill-editor>
                </div>
              </div>
              <v-divider></v-divider>
            </v-card-text>

            <div class="pagination-box">
              <v-pagination
                v-model="page_1"
                :length="unsolvedQuestionsPage"
              ></v-pagination>
            </div>
          </div>

          <!--已解决-->
          <div v-else>
            <v-card-text v-for="(item, index) in solvedQuestions" :key="index">
              <div class="answer-item-box">
                <div class="question-title">{{ item.name }}</div>
                <!--这里放置问题标签-->
                <div>
                  <v-chip-group
                    v-for="(tag, tagIndex) in item.tags"
                    :key="tagIndex"
                  >
                    <v-chip v-bind:color="color[tagIndex % 15]">{{
                      tag.name
                    }}</v-chip>
                  </v-chip-group>
                </div>

                <!--流转原因-->
                <div>
                  <v-chip style="margin-top: 15px"
                    >流转原因: {{ item.admin_commit }}</v-chip
                  >
                </div>

                <!--问题描述-->
                <div class="question-description-block">
                  <div class="card">
                    <v-card-title>
                      <div class="question-title-fake">描述</div>
                    </v-card-title>
                    <v-card-text>
                      <div class="question-description">
                        {{ item.description }}
                      </div>
                      <!--问题图片-->
                      <div>
                        <image-grid :question-id="item.id"></image-grid>
                      </div>
                    </v-card-text>
                  </div>
                </div>

                <!--评论图标-->
                <div class="admin-student-icon">
                  <admin-answer :current-question="item"></admin-answer>
                  <student-comment :current-question="item"></student-comment>
                </div>
              </div>

              <v-divider></v-divider>
            </v-card-text>

            <div class="pagination-box">
              <v-pagination
                v-model="page_2"
                :length="solvedQuestionPage"
              ></v-pagination>
            </div>
          </div>
        </div>

        <!--两办管理员-->
        <div v-else>
          <!--未解决问题-->
          <div v-if="!isSolvedPage">
            <v-card-text
              v-for="(item, index) in unsolvedQuestions"
              :key="index"
            >
              <div class="answer-item-box">
                <div class="question-title">{{ item.name }}</div>
                <!--这里放置问题标签-->
                <div>
                  <v-chip-group
                    v-for="(tag, tagIndex) in item.tags"
                    :key="tagIndex"
                  >
                    <v-chip v-bind:color="color[tagIndex % 15]">{{
                      tag.name
                    }}</v-chip>
                  </v-chip-group>
                </div>

                <!--问题描述-->
                <div class="question-description-block">
                  <div class="card">
                    <v-card-title>
                      <div class="question-title-fake">描述</div>
                    </v-card-title>
                    <v-card-text>
                      <div class="question-description">
                        {{ item.description }}
                      </div>
                      <!--问题图片-->
                      <div>
                        <image-grid :question-id="item.id"></image-grid>
                      </div>
                    </v-card-text>
                  </div>
                </div>

                <!--学生评论-->
                <div class="admin-student-icon">
                  <admin-answer :current-question="item"></admin-answer>
                  <student-comment :current-question="item"></student-comment>
                </div>

                <!--这里放置增加标签的操作-->
                <!--focus时传递数据-->
                <!--父传子-->
                <div>
                  <tag-search-column
                    :currentQuestion="item"
                  ></tag-search-column>
                </div>
              </div>
              <v-divider></v-divider>
            </v-card-text>

            <div class="pagination-box">
              <v-pagination
                v-model="page_3"
                :length="unsolvedQuestionsPage"
              ></v-pagination>
            </div>
          </div>

          <!--已解决问题-->
          <div v-else>
            <v-card-text v-for="(item, index) in solvedQuestions" :key="index">
              <div class="answer-item-box">
                <div class="question-title">{{ item.name }}</div>
                <!--这里放置问题标签-->
                <div>
                  <v-chip-group
                    v-for="(tag, tagIndex) in item.tags"
                    :key="tagIndex"
                  >
                    <v-chip v-bind:color="color[tagIndex % 15]">{{
                      tag.name
                    }}</v-chip>
                  </v-chip-group>
                </div>

                <!--问题描述-->
                <div class="question-description-block">
                  <div class="card">
                    <v-card-title>
                      <div class="question-title-fake">描述</div>
                    </v-card-title>
                    <v-card-text>
                      <div class="question-description">
                        {{ item.description }}
                      </div>
                      <!--问题图片-->
                      <div>
                        <image-grid :question-id="item.id"></image-grid>
                      </div>
                    </v-card-text>
                  </div>
                </div>

                <!--学生评论-->
                <div class="admin-student-icon">
                  <admin-answer :current-question="item"></admin-answer>
                  <student-comment :current-question="item"></student-comment>
                </div>
              </div>
            </v-card-text>

            <div class="pagination-box">
              <v-pagination
                v-model="page_4"
                :length="solvedQuestionPage"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/Header";
import TagSearchColumn from "../components/TagSearchColumn";
import StudentComment from "../components/StudentComment";
import AdminAnswer from "../components/AdminAnswer";
import MyQuillEditor from "../components/tools/MyQuillEditor";
import ImageGrid from "../components/tools/ImageGrid";
import returnBackTextEditor from "@/components/tools/returnBackTextEditor";
import { getTagList, getUser } from "../utils/cookie";
import {
  getSolvedQuestions,
  getUnsolvedQuestions,
  getTagByQuestion,
  getCommitByQuestion,
  addComment,
  removeTagByQuestion,
  addQuestionTag,
} from "../api/admin";

export default {
  name: "Message",
  components: {
    TagSearchColumn,
    MyHeader,
    StudentComment,
    AdminAnswer,
    MyQuillEditor,
    ImageGrid,
    returnBackTextEditor,
  },
  data() {
    return {
      isLB: getUser().isLB,
      solvedQuestions: [],
      unsolvedQuestions: [],
      solvedQuestionPage: 0,
      unsolvedQuestionsPage: 0,
      isSolvedPage: false,
      color: [
        "#DCE775",
        "#FFF176",
        "#FFD54F",
        "#FFB74D",
        "#FF8A65",
        "#F06292",
        "#BA68C8",
        "#9575CD",
        "#7986CB",
        "#64B5F6",
        "#29B6F6",
        "#26C6DA",
        "#26A69A",
        "#81C784",
        "#AED581",
      ],
      isOverlay: false,
      currentStudentComment: [],
      tagsList: [],
      page_1: 0,
      page_2: 0,
      page_3: 0,
      page_4: 0,
    };
  },
  watch: {
    page_1: function (page) {
      const data = {
        id: getUser().id,
        token: getUser().token,
        limits: 10,
        page: page,
      };
      getUnsolvedQuestions(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("拉取未解决问题列表失败");
        } else {
          this.unsolvedQuestions = response.data.data;
        }
      });
    },

    page_2: function (page) {
      const data = {
        id: getUser().id,
        token: getUser().token,
        limits: 10,
        page: page,
      };
      getSolvedQuestions(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("拉取未解决问题列表失败");
        } else {
          this.solvedQuestions = response.data.data;
        }
      });
    },

    page_3: function (page) {
      const data = {
        id: getUser().id,
        token: getUser().token,
        limits: 10,
        page: page,
      };
      getUnsolvedQuestions(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("拉取未解决问题列表失败");
        } else {
          this.unsolvedQuestions = response.data.data;
        }
      });
    },

    page_4: function (page) {
      const data = {
        id: getUser().id,
        token: getUser().token,
        limits: 10,
        page: page,
      };
      getSolvedQuestions(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("拉取未解决问题列表失败");
        } else {
          this.solvedQuestions = response.data.data;
        }
      });
    },
  },
  methods: {
    //初始化问题时添加标签
    initTagOnQuestion(questionId, i, isSolved) {
      const data = {
        id: getUser().id,
        token: getUser().token,
        question_id: questionId,
      };
      getTagByQuestion(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("通过问题获取标签失败");
          //console.log(2);
        } else {
          if (isSolved === true) {
            this.solvedQuestions[i].tags = response.data;
            return;
          } else {
            this.unsolvedQuestions[i].tags = response.data;
            return;
          }
        }
      });
    },

    //打开学生评论
    openComment(questionId) {
      const data = {
        question_id: questionId,
      };

      getCommitByQuestion(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("获取学生评论失败");
        } else {
          //获取当前问题学生评论
          this.currentStudentComment = response.data;
          //打开遮罩
          this.isOverlay = true;
        }
      });
    },

    //子传父，获取管理员回复的内容
    getAnswerByChild(comment, questionId) {
      const data = {
        id: getUser().id,
        token: getUser().token,
        question_id: questionId,
        answer_contain: comment,
      };

      addComment(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("回复失败");
        } else {
          alert("回复成功");
          location.reload();
        }
      });
    },

    //退回问题到两办
    returnBack(questionId, reason) {
      //console.log(1);
      const data = {
        id: getUser().id,
        token: getUser().token,
        question_id: questionId,
      };
      let tagList = [];
      getTagByQuestion(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("获取问题所属标签失败");
        } else {
          const tagData = response.data;
          for (let i = 0; i < tagData.length; i++) {
            tagList.push(tagData[i].id);
          }
          tagList = JSON.stringify(tagList);

          const removeData = {
            id: getUser().id,
            token: getUser().token,
            question_id: questionId,
            tagList: tagList,
          };

          //删除该所属问题下所有标签
          removeTagByQuestion(removeData).then((res) => {
            const removeResponse = res.data;
            if (removeResponse.ErrorCode === 1) {
              alert("删除问题标签失败");
            } else {
              //这里增加"其他"标签
              //然后还要写退回原因
              //console.log(1);
              const addData = {
                id: getUser().id,
                token: getUser().token,
                question_id: questionId,
                tagList: JSON.stringify([this.searchTagId("其他")]),
                reason: reason,
              };
              addQuestionTag(addData).then((res) => {
                const addResponse = res.data;
                //console.log(addResponse);
                if (addResponse.ErrorCode === 1) {
                  alert("退回失败");
                } else {
                  alert("退回成功");
                  location.reload();
                }
              });
            }
          });
        }
      });
    },

    getReason: function (questionId, reason) {
      this.returnBack(questionId, reason);
    },

    //通过标签名找标签ID
    searchTagId(tag_name) {
      const tagsList = JSON.parse(this.tagsList);
      for (let i = 0; i < tagsList.length; i++) {
        if (tagsList[i].name === tag_name) {
          return tagsList[i].id;
        }
      }
      return -1;
    },
  },

  created() {
    //获取标签列表
    this.tagsList = getTagList();
    const data = {
      id: getUser().id,
      token: getUser().token,
      limits: 10,
      page: 1,
    };
    //获得未解决问题的列表
    getUnsolvedQuestions(data).then((res) => {
      const response = res.data;
      if (response.ErrorCode === 1) {
        alert("拉取未解决问题列表失败");
      } else {
        this.unsolvedQuestions = response.data.data;
        this.unsolvedQuestionsPage = Math.ceil(response.data.total / 10);

        //获得已解决问题的列表
        getSolvedQuestions(data).then((res) => {
          const response = res.data;
          if (response.ErrorCode === 1) {
            alert("拉取已解决问题列表失败");
          } else {
            this.solvedQuestions = response.data.data;
            this.solvedQuestionPage = Math.ceil(response.data.total / 10);

            //获取问题标签
            for (let i = 0; i < this.unsolvedQuestions.length; i++) {
              let questionId = this.unsolvedQuestions[i].id;
              //console.log(this.unsolvedQuestions);
              this.initTagOnQuestion(questionId, i, false);
            }

            for (let j = 0; j < this.solvedQuestions.length; j++) {
              let questionId = this.solvedQuestions[j].id;
              this.initTagOnQuestion(questionId, j, true);
            }
          }
        });
      }
    });
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: 1px solid #dddddd;
  box-shadow: 7px 7px 10px rgba(200, 200, 200, 0.2);
  margin: 14px 0;
  overflow: hidden;
}
#message-box {
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 50px;
}
#message-box >>> .v-card__text,
.v-card__title {
  padding: 0;
}
.tab-btn {
  border: 0 !important;
}
.answer-item-box {
  padding: 10px;
  width: 100%;
  outline: none;
  margin-bottom: 15px;
  border: 1px solid #a9a9a9;
}

.answer-item-box:hover {
  border: 1px solid #1e88e5;
}

.question-title-fake {
  font-size: 24px;
  position: relative;
  right: 0;
  width: 100%;
  padding: 14px 0;
}

.admin-student-icon {
  display: flex;
  margin-bottom: 20px;
}

.question-description-block {
  margin-top: 15px;
  margin-bottom: 15px;
}

.question-title {
  width: 100%;
  text-align: center;
  padding: 0 0 14px 0;
  font-size: 26px;
  font-weight: 900;
}

.pagination-box {
  margin: 20px;
}
.theme--light.v-pagination .v-pagination__item--active {
  color: #1e88e5 !important;
}
</style>
