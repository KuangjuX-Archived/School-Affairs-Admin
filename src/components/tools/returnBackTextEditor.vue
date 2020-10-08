<!--
 * @Description: 
 * @version: 
 * @Author: LARE
 * @Date: 2020-10-06 21:16:52
 * @LastEditors: LARE
 * @LastEditTime: 2020-10-09 00:09:44
-->
<template>
  <div class="return-back-filed">
    <v-textarea filled v-model="reason" :value="reason"></v-textarea>

    <div class="btn-block">
      <v-btn color="#1E88E5" @click="sendReason">
        <span class="btn-inline-font"> 退回 </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "returnBackTextEditor",
  data() {
    return {
      reason: null,
      tagList: [],
    };
  },

  props: {
    questionId: null,
  },

  methods: {
    sendReason() {
      this.$emit("getReason", this.questionId, this.reason);
    },
  },
};
</script>

<style scoped>
.btn-inline-font {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  min-width: 150px;
  max-width: 200px;
}

.btn-block {
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>