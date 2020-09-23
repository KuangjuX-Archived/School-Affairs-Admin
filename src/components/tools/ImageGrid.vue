<template>
    <div>
        <div class="image-box" v-for="n in 3" :key="n">
        <div class="row-box" v-for="(item, index) in imageUrl.slice((n-1)*3,(n-1*3)+2)" :key="index">
            <div class="block-row" >
                <v-img :src="item"></v-img>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    import {getImageByQuestion} from "../../api/admin";

    export default {
        name: "ImageGrid",
        data(){
          return{
              imageUrl: []
          }
        },
        props:{
            questionId: null
        },

        methods: {
            getImage(questionId){
                const data = {
                    question_id: questionId
                }
                getImageByQuestion(data).then(res => {
                    const response = res.data
                    if(response.ErrorCode === 1){
                        alert(response.msg)
                    }else {
                        this.imageUrl = response.data.url_list
                    }
                })
            }
        },

        created() {
            this.getImage(this.questionId)
        }
    }
</script>

<style scoped>
    .image-box{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .row-box{
        flex: 1;
        display: flex;
        flex-direction: row;
        height: 200px;
    }

    .block-row{
        flex: 1;
    }
</style>
