<template>
    <div>
        <div data-app="true" class="select-control">
            <v-select
                    label="选择添加标签"
                    hide-details
            ></v-select>
        </div>

        <v-text-field
                v-model="item.reason"
                label="添加原因"
                dense
                light
                clearable
                clear-icon="mdi-close-circle-outline"
        ></v-text-field>
    </div>
</template>

<script>


    export default {
        name: "TagSearchColumn",
        data(){
            return {
                tagsList: [],
                currentQuestionId: null
            }
        },
        methods: {

        },

        created() {
           this.tagsList = this.$store.getters.tagsList
        }
    }
</script>

<style scoped>

</style>
