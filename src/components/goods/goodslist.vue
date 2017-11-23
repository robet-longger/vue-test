<template>
    <div class="tmpl">
        <!-- 面包屑导航 -->
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <!-- button+搜索 -->
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-row>
                        <el-col :span="6">
                            <span class="wrapper">
                                <router-link to="/admin/goodsadd">
                                    <el-button size="small" type="success"><i class="el-icon-plus">&nbsp</i>新增</el-button>
                                </router-link>

                                <el-button size="small" type="warning"><i class="el-icon-check">&nbsp</i>全选</el-button>
                                    
                                <el-button size="small" type="danger"> <i class="el-icon-delete2">&nbsp</i>删除</el-button>
                                   
                            </span>
                        </el-col>
                        <el-col :offset="14" :span="4">
                            <el-input placeholder="请输入搜索内容" icon="search" @keydown.enter.native='getlist' v-model="searchValue" :on-icon-click="getlist">
                            </el-input>

                            <!-- <Input v-model="searchValue" icon="search"  @keydown.13="getlist" placeholder="请输入搜索内容..." style="width: 200px"></Input> -->

                            <!-- </template> -->
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <!-- 列表table -->
        <el-row>
            <el-col :span="24">
                <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="标题">
                        <template scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <img height="100" width="200" :src="scope.row.imgurl" alt="">
                                </div>
                                <a href="#">{{scope.row.title}}</a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="categoryname" label="所属分类" width="100">
                    </el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" width="100">
                    </el-table-column>
                    <el-table-column prop="market_price" label="市场价" width="100">
                    </el-table-column>
                    <el-table-column prop="sell_price" label="销售价" width="100">
                    </el-table-column>
                    <!-- <el-table-column prop="categoryname" label="所属分类" width="120"> -->
                    </el-table-column>
                    <el-table-column label="属性" width="80">
                        <!-- scope:代表但是当前:data中的指向的某个对象，可以通过 scope -->
                        <template scope="scope">
                            <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlinght') }"></i>
                            <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlinght') }"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <a href="#">修改</a>
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
        <!-- 实现分页 -->
        <el-row>
            <el-col :span="24">

                <div class="block">
                    <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-sizes="[1,10, 20, 30, 40]"
                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                    </el-pagination>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                pageSize: 10,//定义页面的容量
                pageIndex: 1,//默认是第一页
                totalcount: 0,//数据api的总行数
                searchValue: '',
                list: []
            }
        },
        methods: {
            //1-获取数据，渲染页面
            getlist() {
                var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
                this.$ajax.get(url).then(res => {

                    // alert(111);
                    this.list = res.data.message;
                    this.totalcount = res.data.totalcount;//获取总行数
                })

            },

            //2-分页相关事件
            // 获取当前索引
            pageIndexChange(currentPage) {
                // console.log(currentPage);
                this.pageIndex = currentPage;
                // 重新获取数据
                this.getlist();
            },
            // 获取当前页容量
            pageSizeChange(size) {
                this.totalcount = size;
                // 重新获取数据
                this.getlist();
            }
        },
        mounted() {
            this.getlist();

        }

    }
</script>
<style scoped>
    .unlinght {
        color: rgba(0, 0, 0, 0.3);
    }
</style>