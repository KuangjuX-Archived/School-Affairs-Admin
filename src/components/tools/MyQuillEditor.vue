<template>
    <div>
        <el-upload
                id="quill-upload"
                class="avatar-uploader"
                :action="actionUrl"
                name="newImg"
                :data="data"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
        <el-row v-loading="quillUpdateImg">
            <quill-editor
                    v-model="comment"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)"
                    class="my-quill-editor"
            >
            </quill-editor>
        </el-row>

        <div
                style="width: 100%; top: 0px; height: auto; justify-content: center;text-align: center;"
                class="btn-box-style"
        >
            <v-btn
                    center-active
                    large
                    @click="postParent"
                    width="300px"
                    color="#66BB6A"
            >
                <span class="btn-font-style">
                    提交
                </span>
            </v-btn>
        </div>

    </div>
</template>

<script>

    import {getUser} from "../../utils/cookie";

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];

    export default {

        name: "MyQuillEditor",
        data() {
            return {
                comment:null, //富文本内容
                quillUpdateImg: false,
                data:{
                    id: getUser().id,
                    token: getUser().token
                },    //上传的时候的请求参数
                actionUrl: 'http://47.93.253.240:10805/api/admin/image/add', //文件上传请求URL
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }

            }
        },

        props:{
          questionId:Number
        },

        methods: {
            onEditorReady() {
            },
            onEditorChange() {
            },
            // 上传图片前
            beforeUpload() {

                this.quillUpdateImg = true
            },
            // 上传图片成功
            uploadSuccess(res) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.ErrorCode === 0 && res.data !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.data为服务器返回的数据
                    quill.insertEmbed(length, 'image', res.data.url)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },

            //向父组件传值
            postParent(){
                this.$emit('getAnswerByChild',this.comment,this.questionId)
            }
        }

    }
</script>

<style scoped>

    .btn-box-style{
        margin-top: 15px;
    }

    .btn-font-style{
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
    }

    .my-quill-editor >>> .ql-container{
        height: 360px;
    }
</style>
