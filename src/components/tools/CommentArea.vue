<template>
    <div class="admin-answer-box">
        <div class="admin-answer-box-inline">
            <div class="author-style">{{author}}:</div>
            <div v-html="content" class="content-style"></div>
        </div>
        <div v-if="auth===1">
            <div>
                <v-card color="#42A5F5">
                    <v-card-title>学生评论</v-card-title>
                    <v-card-text>
                        <div v-html="commit"></div>
                        <div>
                            <star-rating v-bind="config"></star-rating>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div v-html="commit"></div>
        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-dynamic-star-rating'
    export default {
        name: "CommentArea",
        components: {
          StarRating
        },

        data(){
            return{
                config: {
                    rating: (this.score===-1) ? 0 : Math.floor(this.score/2),
                    isIndicatorActive: true,
                    starStyle: {
                        fullStarColor: '#ed8a19',
                        emptyStarColor: '#737373',
                        starWidth: 30,
                        starHeight: 30
                    }
                }
            }
        },
        props: {
            author:null,
            content:null,
            auth:null,
            commit:null,
            score:null
        }
    }
</script>

<style scoped>

    p{
        line-height: 25px;
    }
    .author-style{
        font-size: 30px;
        font-weight: 800;
        margin-bottom: 20px;
        color: #ffffff;
    }

    .content-style{
        color: #ffffff;
        font-size: 16px;
    }

    .admin-answer-box{
        padding: 20px;
    }

    .admin-answer-box-inline{
        margin-bottom: 20px;
    }
</style>
