<template>
  <div class="return-back-filed">
    <v-textarea filled v-model="reason" :value="reason"></v-textarea>

    <div class="btn-block">
      <v-btn width="150px" color="#E53935" @click="sendReason">
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
  font-weight: 700;
  font-size: 16px;
}

.btn-block {
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>