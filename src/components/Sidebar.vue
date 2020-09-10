<template>
<div id="sidebar">
    <v-card height="100%" width="100%" class="mx-auto">

        <div id="sidebar-inner">
            <div id="sidebar-text">
                <p>分类列表</p>
            </div>
            <v-divider></v-divider>
            <v-sheet class="pa-4 primary lighten-2">

                <v-text-field v-model="search" label="选择标签" light flat hide-details clearable clear-icon="mdi-close-circle-outline"></v-text-field>

            </v-sheet>

            <v-divider></v-divider>

            <v-treeview :active.sync="selection" item-disabled="lock" :items="items" :hoverable="true" :activatable="true" :search="search">

            </v-treeview>

        </div>
        <p>{{selection + "has selected"}}</p>

    </v-card>

</div>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            items: [{
                    id: 7,
                    name: 'Applications :'
                },
                {
                    id: 5,
                    name: "example2 :",
                    children: [{
                            id: 2,
                            name: 'Calendar : app',
                            lock: true
                        },
                        {
                            id: 3,
                            name: '中文 : app'
                        },
                        {
                            id: 4,
                            name: '英文 : app'
                        },
                    ],
                },
                {
                    id: 6,
                    name: "example2 :"
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
    width: 13%;
    height: 100%;
}

#sidebar-inner {
    left: 50%;
}

#sidebar-text {
    background-color: rbga(255, 251, 240, 0.8);
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
</style>
