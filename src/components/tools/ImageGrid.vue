<template>
    <div>
        <div class="image-box" >
            <div class="row-box" v-for="n in 3" :key="n">
                <div class="block-row" v-for="(item, index) in imageUrl.slice((n-1)*3,(n-1)*3+3)" :key="index">
                    <div class="image-frame">
                        <v-img :src="item"  max-width="260px" height="300px"></v-img>
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
              console.log(data);
              getImageByQuestion(data).then(res => {
                    const response = res.data
                    if(response.ErrorCode === 1){
                        alert("获取图片失败")
                      //console.log(1);
                    }else {
                        //console.log(this.imageUrl);
                        this.imageUrl=response.data.url_list.map(url => {
                          let arr = url.split("images");
                          console.log(arr);
                          url = arr[0]+"thumb_images"+arr[1];
                          return url;
                        })
                      console.log(this.imageUrl);
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
