<template>
<div>
    <my-header></my-header>
    <my-sidebar @onChangeTag="onChangeTag"></my-sidebar>
    <div class="content">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card v-if="ifUsageShowed">
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
                </v-col>
            </v-row>
        </v-container>
    </div>
</div>
</template>

<script>
import MyHeader from '../components/Header'
import MySidebar from "../components/Sidebar"
export default {
    name: "Home",
    data: function () {
        return {
            currentTagId: 0,
            ifUsageShowed: true
        }
    },
    methods: {
        "onChangeTag": function (tagId) {
            if (tagId.length == 0 || tagId[0] === 0) {
                this.ifUsageShowed = true;
            } else {
                this.ifUsageShowed = false;
                alert("TODO: 获取标签id为" + tagId[0] + "的组件");
            }
        }
    },
    components: {
        MyHeader,
        MySidebar
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
</style>
