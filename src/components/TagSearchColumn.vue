<template>
    <div>
        <v-card>
            <v-container fluid>
                <v-row align="center">
                    <v-col cols="6">
                        <div data-app="true" class="select-control">
                            <v-select
                                    @focus="currentQuestion = showSelectTags(currentQuestion)"
                                    v-model="currentQuestion.select"
                                    :items="currentQuestion.tagsListForShow"
                                    menu-props="auto"
                                    label="选择添加标签"
                                    hide-details
                            ></v-select>
                        </div>
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
            <div style="height: auto; justify-content: center;text-align: center;padding: 15px">
                <v-btn color="#66BB6A" width="300px"
                       @click="onAddTag(item.id, item.select, item.reason)"
                >
                      <span class="btn-font-style">
                        提交
                      </span>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>


    export default {
        name: "TagSearchColumn",
        data(){
            return {
                tagsList: [],
                currentQuestionId: null,
            }
        },

        props: {
            currentQuestion:{}
        },

        methods: {
            showSelectTags(question) {
                question.tagsListForShow = [];
                question.tags.sort((a, b) => {
                    return a.id - b.id;
                });
                let idx = 0;
                this.tagsList.forEach(function(item) {
                    if (idx < question.tags.length) {
                        if (question.tags[idx].id !== item.id) {
                            question.tagsListForShow.push("id:" + item.id + "-" + item.name);
                        } else {
                            idx++;
                        }
                    } else {
                        question.tagsListForShow.push("id:" + item.id + "-" + item.name);
                    }
                });
                return question;
            },
        },

        created() {
           this.tagsList = this.$store.getters.tagsList
        }
    }
</script>

<style scoped>
    .select-control{
        margin-bottom: 15px;
    }

    .select-control >>> .v-menu__content{
        top: 70px !important;
        left: 12px !important;
    }
</style>
