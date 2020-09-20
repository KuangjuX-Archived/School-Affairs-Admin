<template>
    <div>
        <div class="author-style">{{author}}:</div>
        <div v-html="content"></div>
        <div v-if="auth===1">
            <div>{{score}}</div>
            <div v-html="commit"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommentArea",
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

    .author-style{
        font-size: 24px;
    }
</style>
