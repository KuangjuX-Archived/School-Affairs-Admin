<template>
    <div>
        <div class="image-box" >
            <div class="row-box" v-for="n in 3" :key="n">
                <div class="block-row" v-for="(item, index) in imageUrl.slice((n-1)*3,(n-1)*3+3)" :key="index">
                    <div class="image-frame">
                        <v-img :src="item"  max-width="280px" height="300px"></v-img>
                    </div>
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
                        // while(this.imageUrl.length<9){
                        //     this.imageUrl.push([])
                        // }
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
    
    }

    .block-row{
        flex: 1;
        margin: 10px;
    
    }

    .image-frame{
        margin: 10px;
    }

</style>
