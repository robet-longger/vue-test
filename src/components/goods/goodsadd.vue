<template>
    <div class="tmpl">
        <!-- 面包屑导航 -->
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">返回上一层</el-breadcrumb-item>
                        <el-breadcrumb-item>知识内容</el-breadcrumb-item>
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>新增内容</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <div class="goodsaddForm">
            <el-row>
                <el-col :span="20">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="活动名称" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>

                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="所属类别">
                                    <el-select v-model="ruleForm.category_id" placeholder="所属类别">
                                        <!-- 这些值一定是从数据api接口请求下来的 v-for来生成  el-option-->
                                        <el-option v-for="item in catelist" :value="item.category_id">
                                            <!-- 判断item.class_layer >1 就应该添加 |- -->
                                            <span v-for="sub in (item.class_layer -1 )">&nbsp;</span>
                                            <span v-if="item.class_layer>1">|-</span>{{item.title}}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="是否发布">
                                    <el-switch v-model="ruleForm.status" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="推荐类型">
                                    <el-switch v-model="ruleForm.is_slide" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
                                    </el-switch>
                                    <el-switch v-model="ruleForm.is_top" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
                                    </el-switch>
                                    <el-switch v-model="ruleForm.is_hot" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="封面上传">
                                    <el-upload class="upload-demo" action="#" :file-list="ruleForm.imgList" list-type="picture" :on-success="imgUploaded">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="相册上传">
                                    <el-upload class="upload-demo" action="#" :file-list="ruleForm.fileList" list-type="picture" :on-success="fileUplaoded">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="商品货号" prop="goods_no">
                                    <el-input v-model="ruleForm.goods_no"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="库存数量" prop="stock_quantity">
                                    <el-input v-model="ruleForm.stock_quantity"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="市场价格" prop="market_price">
                                    <el-input v-model="ruleForm.market_price"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="销售价格" prop="sell_price">
                                    <el-input v-model="ruleForm.sell_price"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="内容摘要" prop="zhaiyao">
                            <el-input type="textarea" :rows="2" placeholder="请输入摘要" v-model="ruleForm.zhaiyao">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品详情" prop="content">
                            <quill-editor v-model="ruleForm.content" @change="onEditorChange($event)">
                            </quill-editor>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>
    // 1.0 导入富文本编辑器组件
    import { quillEditor } from 'vue-quill-editor'

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                catelist: [],  //存储分类下拉框中的数据
                ruleForm: {
                    "title": "",
                    "sub_title": "英伦轻奢 专柜同款 为不凡而生",
                    "goods_no": "NZ0000000002",
                    "category_id": "",
                    "stock_quantity": 200,
                    "market_price": 1000,
                    "sell_price": 800,
                    "status": true,
                    "is_slide": true,
                    "is_top": false,
                    "is_hot": true,
                    "zhaiyao": "为不凡而生",
                    "content": "<p><strong>产品参数：</strong></p>",
                    "imgList": [
                        // {
                        //     "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        //     "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        //     "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
                        // }
                    ],
                    "fileList": [
                        // {
                        //     "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        //     "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        //     "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
                        // }
                    ]
                },
                rules: {
                    title: [
                        { required: true, message: '请输入商品标题', trigger: 'blur' },
                    ]
                }

            }
        },
        mounted() {
            this.getcatelist();
        },
        methods: {
            // 6.0 fileUplaoded 相册上传成功以后的回调
            fileUplaoded(responese, file, filelist) {
                this.ruleForm.fileList.push(responese);
            },
            // 5--定义一个方法imgUploaded（当服务器成功响应以后回调）
            imgUploaded(responese, file, filelist) {
                console.log(responese);
                this.ruleForm.imgList = [responese];
            },
            // 4--注册富文本编辑器的内容改变事件onEditorChange-获取内容
            onEditorChange(ev) {
                // console.log(ev);//{editor: Quill, html: "<p><strong>产品参数：g</strong></p>", text: "产品参数：g↵"}
                this.ruleForm.content = ev.html;
            },
            // 3.0 获取商品下拉框分类数据
            getcatelist() {
                var url = "/admin/category/getlist/goods";
                this.$ajax.get(url).then(res => {
                    // console.log(11111);
                    // console.log(res.data.message);
                    this.catelist = res.data.message;
                })
            },
            submitForm() {
                // 1.0 重置提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 表示整个表单验证成功，应该将数据提交给服务器,完成新增工作
                        this.$ajax.post('/admin/goods/add/goods', this.ruleForm).then(res => {
                            if (res.data.status == 1) {
                                alert(res.data.message);
                            } else {
                                // 跳转到列表页面--编程式的导航
                                // this.$route : 代表接收路由对象，可以通过 this.$route.parmas获取参数
                                // this.$router：代表路由对象在vue上的一个原型对象可以调用他的push()方法完成页面的跳转
                                this.$router.push({ name: 'goodslist' });
                            }
                        });
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })

            },
            // 2.0 重置表单
            resetForm() {
                this.$refs[formName].resetFields();
            }

        },

    }

</script>
<style>
    .ql-editor {
        min-height: 200px;
        height: 200px;
        max-height: 200px;
    }

    .tmpl .goodsaddForm {
        margin-top: 20px;
    }
</style>