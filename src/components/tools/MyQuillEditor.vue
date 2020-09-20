<template>
    <div>
        <el-upload
                id="quill-upload"
                class="avatar-uploader"
                :action="actionUrl"
                name="img"
                :headers="headerToken"
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
            >
            </quill-editor>
        </el-row>
    </div>
</template>

<script>

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
                comment:null,
                quillUpdateImg: false,
                headerToken: {'X-Auth-Token': localStorage.getItem('accessToken')},
                actionUrl: process.env.VUE_APP_URL + '/api/upload',
                detailContent: '', // 富文本内容
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

        methods: {
            onEditorReady() {
            },
            onEditorChange() {
            },
            // 上传图片前
            beforeUpload(res, file) {

                this.quillUpdateImg = true
            },
            // 上传图片成功
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code === 1 && res.info !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    const img = "<img src='" + res.data.imageUrl + "'/>"
                    quill.insertEmbed(length, 'image', res.data.imageUrl)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },
            // 上传图片失败
            uploadError(res, file) {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            }
        }

    }
</script>

<style scoped>

    .list-content {
        margin: 30px 0;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9;

    }

    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }

</style>
