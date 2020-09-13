<template>
<div>
    <my-header></my-header>
    <my-sidebar @onChangeTag="onChangeTag"></my-sidebar>
    <div class="content">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <profile-card></profile-card>
                    <v-card v-if="ifUsageShowed" style="margin-top: 10px">
                        <v-card-title>
                            <div class="content-title">
                                说明
                            </div>
                        </v-card-title>

                        <v-card-text class="content-text">
                            <p>本后台系统使用了bootstrap插件,所以强烈推荐使用
                                chrome,firefox,搜狗浏览器
                                等现代浏览器.请不要使用ie浏览器.
                                同时:希望老师能推荐学生使用以上三个浏览器进行党校系统的学习,这样浏览效果会更好!
                            </p>
                            <v-divider></v-divider>
                            <p>
                                后台共有15个部分模块组成,分别是 通知公告 栏目管理 党建专项 学习小组 党校培训 重要文件 理论学习 消息管理

                                申请人培训 院级积极分子培训 预备党员培训 支部管理 学生信息管理 管理员控制 系统功能锁这些部分组成.

                                其中前7个部分都是对前台页面新闻的管理和党校相关信息的发表.

                                后面的几个模块是对党校课程的控制盒学生状态的控制.
                            </p>
                            <v-divider></v-divider>
                            <p>
                                后台共分3种权限:超级管理员院级管理员栏目管理员.超级管理员可以管理所有后台的所有权限,包括超级管理员,院级管理员,栏目管理员的添加,删除等操作.但是不包括院级培训的添加和学生成绩的录入
                                院级管理员可以进行消息的处理操作以及院级积极分子培训的考试.学生信息管理的操作.但是请广大院级管理员注意:不得操作其他学院的相关数据,如果发现,将会封号处理.

                                栏目管理员是由超级管理员下放的权限:它以单个的模块为单位,只显示其拥有的权限.但是栏目管理员无法查看管理员控制盒系统锁模块.
                            </p>
                            <v-divider></v-divider>
                            <p>
                                请超级管理员注意:在给栏目管理员分配权限的时候,是不能分配管理员控制系统功能锁 这两个模块的.

                                以免栏目管理员对其权限进行修改.
                            </p>
                            <v-divider></v-divider>
                            <p>
                                栏目管理:主要管理的是前台党建专项的下拉菜单,在后台添加二级栏目,并且二级栏目未被删除,则在前台菜单栏内即可显示

                                同时请注意:栏目名称不可太长,否则影响前台效果的显示.
                            </p>
                        </v-card-text>
                    </v-card>

                    <div v-else class="question-field">
                        <v-card v-for="(item,index) in currentQuestions" :key="index">
                            <v-card-title>
                                <div class="question-title">{{item.name}}</div>
                            </v-card-title>
                            <v-card-text>
                                <div class="question-description">
                                    {{item.description}}
                                </div>



                                <!--删除标签，增添标签 -->
                                <div class="question-tag-button-group">
                                    <div class="question-tag-item" @click="popCommit(item.admin_commit)">
                                        <svg t="1599913305188" class="icon" viewBox="0 0 1178 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4909" width="32" height="32"><path d="M1177.6 0 1177.6 787.692314 420.571418 787.692314 168.228582 1024 168.228582 787.692314 0 787.692314 0 0 1177.6 0 1177.6 0ZM925.257142 472.615373C971.688228 472.615373 1009.371428 437.405542 1009.371428 393.846144 1009.371428 350.286771 971.688228 315.076915 925.257142 315.076915 878.741942 315.076915 841.142858 350.286771 841.142858 393.846144 841.142858 437.405542 878.741942 472.615373 925.257142 472.615373L925.257142 472.615373ZM588.8 472.615373C635.231086 472.615373 672.914286 437.405542 672.914286 393.846144 672.914286 350.286771 635.231086 315.076915 588.8 315.076915 542.368914 315.076915 504.685722 350.286771 504.685722 393.846144 504.685722 437.405542 542.368914 472.615373 588.8 472.615373L588.8 472.615373ZM252.342861 472.615373C298.858061 472.615373 336.457139 437.405542 336.457139 393.846144 336.457139 350.286771 298.858061 315.076915 252.342861 315.076915 205.827661 315.076915 168.228582 350.286771 168.228582 393.846144 168.228582 437.405542 205.827661 472.615373 252.342861 472.615373L252.342861 472.615373Z" p-id="4910"></path></svg>
                                        <span class="question-tag-font">评论</span>
                                    </div>
                                    <div class="question-tag-item">
                                        <svg t="1599912808587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2749" width="32" height="32"><path d="M511.43519704 1026.5354601c-280.14224905 0-510.58184012-230.43959107-510.58184012-510.58184012s230.43959107-510.58184012 510.58184012-510.58184012 510.58184012 230.43959107 510.58184012 510.58184012-225.92116813 506.06341718-510.58184012 510.58184012zM511.43519704 86.70340124C276.47718233 86.70340053 86.70340053 276.47718233 86.70340124 511.43519704s189.77378109 424.73179651 424.7317958 424.73179581 424.73179651-189.77378109 424.73179581-424.73179581-189.77378109-424.73179651-424.73179581-424.7317958z" fill="#1afa29" p-id="2750"></path><path d="M768.98532857 470.76938636L556.61943067 466.25096342l0-216.88432084c0-27.11054046-18.07369317-45.18423363-45.18423363-45.18423363-27.11054046 0-45.18423363 18.07369317-45.18423362 45.18423363L466.25096342 466.25096342 253.88506551 470.76938636c-27.11054046 0-45.18423363 18.07369317-45.18423362 45.18423362 0 27.11054046 18.07369317 45.18423363 45.18423362 45.18423363L466.25096342 556.61943067l0 216.88432084c0 27.11054046 18.07369317 45.18423363 45.18423362 45.18423363 27.11054046 0 45.18423363-18.07369317 45.18423363-45.18423363L556.61943067 556.61943067l216.88432084 0c27.11054046 0 45.18423363-18.07369317 45.18423363-45.18423363-9.03684658-27.11053975-27.11054046-45.18423363-49.70265657-40.66581068z" fill="#1afa29" p-id="2751"></path></svg>
                                        <span class="question-tag-font" style="color: green">增加标签</span>
                                    </div>
                                    <div class="question-tag-item">
                                        <svg t="1599912939162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4057" width="32" height="32"><path d="M512 1024C229.233778 1024 0 794.766222 0 512S229.233778 0 512 0s512 229.233778 512 512-229.233778 512-512 512z m0-938.666667C276.366222 85.333333 85.333333 276.366222 85.333333 512c0 235.633778 191.032889 426.666667 426.666667 426.666667 235.633778 0 426.666667-191.032889 426.666667-426.666667A426.666667 426.666667 0 0 0 512 85.333333z m213.333333 462.933334h-426.666666a42.666667 42.666667 0 0 1 0-85.333334h426.666666a42.666667 42.666667 0 0 1 0 85.333334z" fill="#d81e06" p-id="4058"></path></svg>
                                        <span class="question-tag-font" style="color: red">减少标签</span>
                                    </div>


                                    <!-- 设置遮罩层 -->
                                    <v-overlay :value="isOverlay">
                                        <v-btn
                                                icon
                                                @click="isOverlay = false"
                                        >
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-card width="600" height="600" color="#42A5F5">
                                            <v-card-title>{{overlayCard.title}}</v-card-title>
                                            <v-card-text>{{overlayCard.content}}</v-card-text>
                                        </v-card>
                                    </v-overlay>


                                </div>
                            </v-card-text>
                        </v-card>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </div>
</div>
</template>

<script>
import MyHeader from '../components/Header'
import MySidebar from "../components/Sidebar"
import ProfileCard from "../components/ProfileCard";
import {getQuestionsByTag} from "../api/admin";
import {getUser} from "../utils/cookie";

export default {
    name: "Home",
    data: function () {
        return {
            currentTagId: 0,
            ifUsageShowed: true,
            currentQuestions: [],
            isOverlay: false,
            overlayCard: {
                title: "",
                content: ""
            }
        }
    },
    methods: {
        onChangeTag: function (tagId) {
            if (tagId.length === 0 || tagId[0] === 0) {
                this.ifUsageShowed = true;
            } else {
                this.ifUsageShowed = false;
                this.currentTagId = tagId[0];

                const data = {
                    id: getUser().id,
                    token: getUser().token,
                    tag_id: tagId[0]
                }

                getQuestionsByTag(data).then(res => {
                    if(res.data.ErrorCode === 1){
                        alert("拉取问题失败:"+res.data.msg)
                    }else if(res.data.ErrorCode === 0){
                        this.currentQuestions = res.data.data
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },


        popCommit(commit){
            this.isOverlay=true
            this.overlayCard.title="评论"
            this.overlayCard.content=commit
        }


    },

    created() {

    },

    components: {
        MyHeader,
        MySidebar,
        ProfileCard
    }
}
</script>

<style scoped>
.content {
    margin-top: 50px;
    margin-left: 25%;
}

.content-title {
    width: 100%;
    text-align: center;
    color: #1E88E5;
    font-size: 24px;
    font-weight: 900;
}

.content-text {
    font-size: 18px;
    font-weight: 500;
}

p {
    text-indent: 20px;
    line-height: 180%;
}

.question-field{
    margin-top: 25px;
}

.question-title{
    width: 100%;
    text-align: center;
    margin-top: 12px;
    margin-bottom: 4px;
    font-size: 22px;
    font-weight: 600;
    font-synthesis: style;
    line-height: 32px;
    color: #121212;
}

.question-description{
    font-size: 16px;
}

.question-admin-commit{
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;

}

.question-tag-button-group{
    display: flex;
}

.question-tag-font{
    position: relative;
    bottom: 10px;
    font-size: 16px;
    font-weight: 600;
}

.question-tag-item{
    margin-right: 25px;
}
.question-tag-item:hover{
    cursor: pointer;
    background-color: #E3F2FD;
    opacity: 0.7;
}
</style>
