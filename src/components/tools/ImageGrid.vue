<!--
 * @Description: 
 * @version: 
 * @Author: LARE
 * @Date: 2020-10-06 21:16:52
 * @LastEditors: LARE
 * @LastEditTime: 2020-10-07 18:38:25
-->
<template>
  <div class="image-box">
    <div class="block-row" v-for="(item, index) in imageUrl" :key="index">
      <el-image
        style="height: 100%; width: 100%"
        :src="item"
        :preview-src-list="[item]"
        fit="cover"
      >
      </el-image>
    </div>
  </div>
</template>

<script>
import { getImageByQuestion } from "../../api/admin";

export default {
  name: "ImageGrid",
  data() {
    return {
      imageUrl: [],
    };
  },
  props: {
    questionId: null,
  },

  methods: {
    getImage(questionId) {
      const data = {
        question_id: questionId,
      };
      //console.log(data);
      getImageByQuestion(data).then((res) => {
        const response = res.data;
        if (response.ErrorCode === 1) {
          alert("获取图片失败");
          //console.log(1);
        } else {
          //console.log(this.imageUrl);
          this.imageUrl = response.data.url_list.map((url) => {
            let arr = url.split("images");
            //console.log(arr);
            url = arr[0] + "thumb_images" + arr[1];
            return url;
          });
        }
      });
    },
  },

  created() {
    this.getImage(this.questionId);
  },
};
</script>

<style scoped>
.image-box {
  width: 100%;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
}

.el-image img {
  object-fit: cover;
}
</style>
