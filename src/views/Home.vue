<template>
  <div>
    <my-header></my-header>
    <my-sidebar @onChangeTag="onChangeTag"></my-sidebar>
    <div class="content">
      <v-container>
        <v-row>
          <v-col cols="12">
            <profile-card></profile-card>
            <v-card v-if="ifUsageShowed" style="margin-top: 10px">
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
            <div v-else class="question-field">
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, i) in currentQuestions"
                  :key="i"
                >
                  <div>
                    <v-expansion-panel-header>
                      <p>{{ item.name }}</p>
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
                            <v-list two-line>
                              <!-- 等待后端完善接口，标签相关的一系列这里暂时做不了 -->
                              <!-- <v-list-item
                                v-for="tag in currentQuestions[i].tagsList"
                                :key="item.title"
                              > -->
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="'标题'"
                                  ></v-list-item-title>
                                  <v-list-item-subtitle
                                    v-text="'修改原因 / 未修改则为空'"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn icon>
                                    <v-icon color="grey lighten-1"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>
                                                            <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="'标题'"
                                  ></v-list-item-title>
                                  <v-list-item-subtitle
                                    v-text="'修改原因 / 未修改则为空'"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn icon>
                                    <v-icon color="grey lighten-1"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>
                                                            <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="'标题'"
                                  ></v-list-item-title>
                                  <v-list-item-subtitle
                                    v-text="'修改原因 / 未修改则为空'"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn icon>
                                    <v-icon color="grey lighten-1"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>
                            </v-list>
                            <v-divider></v-divider>

                            <!-- 添加标签 -->
                            <v-card>
                              <v-container fluid>
                                <v-row align="center">
                                  <v-col cols="6">
                                    <v-select
                                      v-model="e1Fake"
                                      :items="statesFake"
                                      menu-props="auto"
                                      label="选择添加标签"
                                      hide-details
                                      dense
                                    ></v-select>
                                  </v-col>
                                </v-row>
                                <v-text-field
                                  label="添加原因"
                                  dense
                                  light
                                  clearable
                                  clear-icon="mdi-close-circle-outline"
                                ></v-text-field>
                              </v-container>
                              <div
                                style="width: 100%; top: 0px; height: auto; justify-content: center;text-align: center;"
                              >
                                <v-btn block center-active large>提交</v-btn>
                              </div>
                            </v-card>
                          </v-card>
                        </v-tab-item>
                        <v-tab-item key="addComment">
                          <v-card flat v-if="currentQuestions[i].solved">
                            <quill-editor
                              v-model="comment"
                              ref="myQuillEditor"
                              :options="editorOption"
                            >
                            </quill-editor>
                            <div
                              style="width: 100%; top: 0px; height: auto; justify-content: center;text-align: center;"
                            >
                              <v-btn block center-active large>提交</v-btn>
                            </div>
                          </v-card>
                          <v-card flat v-else>
                            <!-- TODO 这里该怎么显示 -->
                            <p>已经解决了</p>
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
import { getQuestionsByTag } from "../api/admin";
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
      currentTagId: 0,
      ifUsageShowed: true,
      currentQuestions: [],
      isOverlay: false,
      overlayCard: {
        title: "",
        content: "",
      },
      comment: "",
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
        { tab: "addComment", title: "添加评论" },
      ],
      e1Fake: null,
      statesFake: ["awaa", "qwqq", "awa", "awawa"],
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
              this.currentQuestions = res.data.data;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    popCommit(commit) {
      this.isOverlay = true;
      this.overlayCard.title = "评论";
      this.overlayCard.content = commit;
    },
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

.question-description {
  font-size: 16px;
}

.question-admin-commit {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}

.question-tag-button-group {
  display: flex;
}

.question-tag-font {
  position: relative;
  bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}

.question-tag-item {
  margin-right: 25px;
}

.question-tag-item:hover {
  background-color: #e3f2fd;
  cursor: pointer;
  opacity: .7;
}

.function-control {
  display: flex;
  justify-content: space-around;
}
</style>
