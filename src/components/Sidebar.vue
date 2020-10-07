<template>
  <div id="sidebar">
    <div id="sidebar-inner">
      <div id="sidebar-text">
        <p>分类列表</p>
      </div>
      <v-sheet class="pa-4 primary lighten-2 filter-input">
        <v-text-field
          v-model="search"
          label="搜索标签"
          light
          flat
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-sheet>

      <div class="classification-list">
        <v-treeview
          class="classification-items"
          @update:active="onSelect"
          item-disabled="lock"
          :items="items"
          :hoverable="true"
          :activatable="true"
          :search="search"
        >
        </v-treeview>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags } from "../api/admin";
import { getUser, deleteToken } from "../utils/cookie";

export default {
  name: "Sidebar",
  data() {
    return {
      items: [],
      search: null,
      caseSensitive: false,
    };
  },
  // props: [items, selection],
  methods: {
    onSelect: function (id) {
      this.$emit("onChangeTag", id);
    },
  },

  created() {
    const data = {
      id: getUser().id,
      token: getUser().token,
    };
    getTags(data).then((res) => {
      if (res.data.ErrorCode === 1) {
        deleteToken();
        this.$router.push("/login");
      } else if (res.data.ErrorCode === 0) {
        this.items = res.data.data;
        this.$emit("onTagsLoaded", this.items);
      }
    });
  },
};
</script>

<style>
#sidebar {
  left: 0%;
  top: 48px;
  height: 100%;
  overflow-y: auto;
}

#sidebar-inner {
  left: 50%;
}

#sidebar-text {
  position: relative;
  width: 100%;
  padding: 14px;
}

#sidebar-text p {
  color: #2196f3;
  font-size: 25px;
  text-align: center;
  font-weight: bold;
  line-height: 100px;
}
.filter-input {
  padding: 0 14px;
}

.classification-items {
  font-size: 1em;
  font-weight: 400;
  display: inline-block;
  color: #2c3e50;
  border-left: 0.25rem solid transparent;
  padding: 0.35rem;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
}

.classification-list {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.classification-list >>> .v-treeview-node {
  height: 700px;
  overflow-y: scroll;
}
</style>
