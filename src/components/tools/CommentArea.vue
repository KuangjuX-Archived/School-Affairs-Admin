<template>
  <div class="admin-answer-box">
    <div class="admin-answer-box-inline">
      <div class="author-style">
        {{ author }} :
        <div class="datetime-style">{{ formatTime(datetime) }}</div>
      </div>
      <div v-html="content" class="content-style"></div>
    </div>
    <div v-if="auth === 1">
      <div class="comment">
        <p class="stu-comment">学生评论</p>
          <div v-html="commit"></div>
          <star-rating v-bind="config"></star-rating>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
export default {
  name: "CommentArea",
  components: {
    StarRating,
  },
  methods: {
    formatTime: function (updated_at) {
      let now = new Date();
      let target_year = updated_at.substr(0, 4);
      let target_month = updated_at.substr(5, 2);
      let target_day = updated_at.substr(8, 2);
      let target_hour = (updated_at.substr(11, 2) - 0 + 8) % 24; //后端bug相差8小时
      let target_minute = updated_at.substr(14, 2);
      let out_year = "",
        out_month = "",
        out_day = "",
        out_hour = target_hour,
        out_minute = target_minute;
      switch (now.getFullYear() - target_year) {
        case 0:
          out_year = "";
          break;
        case 1:
          out_year = "去年";
          break;
        case 2:
          out_year = "前年";
          break;
        default:
          out_year = target_year + "年";
          break;
      }
      if (now.getMonth() + 1 - target_month == 0) {
        if (now.getDate() - target_day < 3) {
          switch (now.getDate() - target_day) {
            case 0:
              out_day = "今天";
              break;
            case 1:
              out_day = "昨天";
              break;
            case 2:
              out_day = "前天";
              break;
          }
        } else {
          out_month = target_month - 0 + "月";
          out_day = target_day - 0 + "日";
        }
      } else {
        out_month = target_month - 0 + "月";
        out_day = target_day - 0 + "日";
      }

      return out_year + out_month + out_day + " " + out_hour + ":" + out_minute;
    },
  },
  data() {
    return {
      config: {
        rating: this.score === -1 ? 0 : Math.floor(this.score / 2),
        isIndicatorActive: true,
        starStyle: {
          fullStarColor: "#1e88e5",
          emptyStarColor: "#737373",
          starWidth: 20,
          starHeight: 20,
        },
      },
    };
  },
  props: {
    author: null,
    content: null,
    auth: null,
    commit: null,
    score: null,
    datetime: null,
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
p {
  line-height: 25px;
}
.author-style {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 14px;
  color: #000000;
}

.content-style {
  color: #000000;
  font-size: 16px;
}

.content-style img {
  width: 100%;
}

.admin-answer-box {
  padding: 20px;
}

.comment {
  color: #000000;
  margin-top: 14px;
}

.datetime-style {
  color: #aaaaaa;
  font-size: 16px;
}
.stu-comment {
  color: #1e88e5;
  font-size: 18px;
}
@media screen and (max-width: 625px) {
  .admin-answer-box {
    padding: 14px;
  }
}
</style>
