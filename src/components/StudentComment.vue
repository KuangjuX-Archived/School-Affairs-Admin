<template>
  <div style="margin-left: 15px">
    <div @click="openComment(currentQuestion.id)" class="func-btn">评论</div>
    <div>
      <v-overlay :value="isOverlay">
        <v-btn icon @click="isOverlay = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="comment-card">
          <v-card-title>
            <div class="comment-card-title">评论</div>
          </v-card-title>
          <v-card-text
            v-for="(comment, commentIndex) in currentStudentComment"
            :key="commentIndex"
            class="card"
          >
            <comment-area
              :author="comment.username"
              :content="comment.contain"
              :datetime="comment.updated_at"
            ></comment-area>
            <div class="css-ydodb">{{ comment.likes }}次点赞</div>
          </v-card-text>
        </div>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import { getCommitByQuestion } from "../api/admin";
import CommentArea from "./tools/CommentArea";

export default {
  name: "StudentComment",
  data() {
    return {
      //currentQuestion:{},
      isOverlay: false,
      currentStudentComment: [],
    };
  },

  props: {
    currentQuestion: {},
  },

  components: {
    CommentArea,
  },

  methods: {
    //打开学生评论
    openComment(questionId) {
      const data = {
        question_id: questionId,
        user_id: 0,
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
          console.log(this.currentStudentComment);
        }
      });
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: 1px solid #dddddd;
  box-shadow: 7px 7px 10px rgba(200, 200, 200, 0.2);
  margin: 14px 0;
}
.card:hover {
  border-color: #1e88e5;
}
.comment-card {
  padding: 14px;
  width: 600px;
  height: 80vh;
  overflow-x: auto;
  background: #ffffff;
  border-radius: 10px;
}
div.comment-card-title {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #1e88e5;
}

.css-ydodb {
  color: #1e88e5;
  text-align: right;
  padding: 0 14px 14px 14px;
}

.func-btn {
  cursor: pointer;
  color: #1e88e5;
}
@media screen and (max-width: 426px) {
  .comment-card {
    width: 90vw;
  }
}
</style>
