<template>
<div id="sidebar">
    <div id="sidebar-inner">
            <div id="sidebar-text">
                <p>分类列表</p>
            </div>
            <v-divider></v-divider>
            <v-sheet class="pa-4 primary lighten-2">

                <v-text-field v-model="search" label="选择标签" light flat hide-details clearable clear-icon="mdi-close-circle-outline"></v-text-field>

            </v-sheet>

            <v-divider></v-divider>

            <div class="classification-list">
                <v-treeview class="classification-items"
                            :active.sync="selection"
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
export default {
    name: "Sidebar",
    data() {
        return {
            items: [{
                    id: 1,
                    name: '北洋园',
                    children: [
                        {
                            id: 3,
                            name: '宿舍'
                        },
                        {
                            id:5,
                            name: '生活'
                        },
                        {
                            id:7,
                            name: '学习',
                            children: [
                                {
                                    id:9,
                                    name: '高等数学'
                                },

                                {
                                    id:10,
                                    name: '大学物理'
                                },

                                {
                                    id:11,
                                    name: '数学分析'
                                },

                                {
                                    id: 12,
                                    name: '复变函数'
                                },

                                {
                                    id: 13,
                                    name: '泛函分析'
                                },

                                {
                                    id: 14,
                                    name: '概率论'
                                },

                                {
                                    id: 15,
                                    name: '随机过程'
                                },

                                {
                                    id: 16,
                                    name: '抽象代数'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    name: "卫津路",
                    children: [{
                            id: 4,
                            name: '宿舍',
                            lock: true
                        },
                        {
                            id: 6,
                            name: '吃饭'
                        },
                        {
                            id: 8,
                            name: '学习'
                        },
                    ],
                }
            ],
            search: null,
            caseSensitive: false,
            selection: []
        }
    },
    // props: [items, selection],
    methods: {

    }
}
</script>

<style>
#sidebar {
    position: fixed;
    left: 0%;
    top: 5%;
    width: 25%;
    height: 100%;
    overflow-y: scroll;

}

#sidebar-inner {
    left: 50%;
}

#sidebar-text {
    position: relative;
    width: 100%;
    height: 100px;

}

#sidebar-text p {
    color: #2196F3;
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    line-height: 100px;
}

    .classification-items{
        font-size: 1em;
        font-weight: 400;
        display: inline-block;
        color: #2c3e50;
        border-left: .25rem solid transparent;
        padding: .35rem 1rem .35rem 1.25rem;
        line-height: 1.4;
        width: 100%;
        box-sizing: border-box;

    }

    .classification-list{
        width: 100%;
        height: 100%;
    }

    .classification-list >>> .v-treeview-node{
        height: 700px;
        overflow-y: scroll;
    }


</style>
