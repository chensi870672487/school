<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>学校管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增学校</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="地区">
                        <el-select v-model="area_value" placeholder="请选择">
                            <el-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label" style="width:360px"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="学校logo">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="学校校徽">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <!--<el-form-item label="选择器">-->
                        <!--<el-select v-model="form.region" placeholder="请选择">-->
                            <!--<el-option key="bbk" label="步步高" value="bbk"></el-option>-->
                            <!--<el-option key="xtc" label="小天才" value="xtc"></el-option>-->
                            <!--<el-option key="imoo" label="imoo" value="imoo"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文本框">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>-->
                </el-form>
            </div>
            <el-input placeholder="标题" style="width:220px;margin-right:20px"></el-input>
            <el-input placeholder="作者" style="width:220px;margin-right:20px"></el-input>
            <el-date-picker
                    type="date"
                    placeholder="选择日期" style="margin-right:20px">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">添加文章</el-button>
            <div style="margin:20px 0">
                <el-button type="primary">上线</el-button>
                <el-button type="primary">下线</el-button>
            </div>
            <div class="custom-tree-container">
                <div class="block">
                    <el-row>
                        <el-col :span="4">
                            <p class="p_title">栏目列表</p>
                            <el-tree
                                    :data="data5"
                                    :props="defaultProps"
                                    accordion
                                    node-key="id"
                                    :highlight-current="true"
                                    :expand-on-click-node="false"
                                    @node-click="handleNodeClick">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                <!--<span>{{ node.label }}</span>-->
                                <el-input type="text" v-model="data.label" :disabled="data.isDisabled" class="col_input" :title="node.label" placeholder="请输入内容"></el-input>
                                <i class="el-icon-edit el-input__icon" v-if="!data.isDisabled" style="margin-right:6px;"></i>
                                <el-button
                                        type="text"
                                        v-if="data.isShowAppend"
                                        size="mini"
                                        @click="() => append(data)">
                                    <i class="el-icon-plus m_color_red"></i>
                                </el-button>
                                <span>
                                    <el-button
                                            type="text"
                                            v-if="data.isShowDelete"
                                            size="mini"
                                            @click="() => remove(node, data)">
                                    <i class="el-icon-close m_color_red"></i>
                                  </el-button>
                              </span>
                          </span>
                            </el-tree>
                        </el-col>
                        <el-col :span="20">
                            <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    height="350"
                                    tooltip-effect="dark"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection">
                                </el-table-column>
                                <el-table-column
                                        label="日期">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="作者">
                                </el-table-column>
                                <el-table-column
                                        prop="title"
                                        label="标题"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        label="状态"
                                        show-overflow-tooltip>
                                        <template slot-scope="scope">{{ scope.row.isOnline ? '上线':'下线'}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                                        <el-button type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div style="text-align:center;margin:50px 0 80px 0">
                <el-button type="primary" @click="onSubmit">新增学校</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
        <el-dialog title="添加文章" :visible.sync="dialogFormVisible" :close-on-click-modal="closeModal" width="70%">
            <el-form :model="form">
                <el-form-item label="一级栏目" :label-width="formLabelWidth">
                    <el-select v-model="form.level1" placeholder="请选择一级栏目">
                        <el-option label="111" value="shanghai"></el-option>
                        <el-option label="222" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级栏目" :label-width="formLabelWidth">
                    <el-select v-model="form.level2" placeholder="请选择二级栏目">
                        <el-option label="111" value="shanghai"></el-option>
                        <el-option label="222" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="文章名称" style="width:25%;margin-right: 2%;"></el-input>
                    <el-input v-model="form.publisher" autocomplete="off" placeholder="发布人" style="width:25%;margin-right: 2%;"></el-input>
                    <el-date-picker
                            v-model="form.publishTime"
                            type="date"
                            placeholder="发布日期"
                            style="width:25%;margin-right: 2%;">
                    </el-date-picker>
                    <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 84%;margin:0 auto"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="作者"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="文章标题"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    let id = 1000;
    export default {
        name: 'addschool',
        data: function(){
            const data = [{
                id: 1,
                label: '首页',
                isShowAppend: true,
                isShowDelete: false,
                isDisabled: true,
                children: [
                    {
                        id: 4,
                        label: '广告位',
                        isShowAppend: false,
                        isShowDelete: false,
                        isDisabled: true
                    },
                    {
                        id: 9,
                        label: '通知公告',
                        isShowAppend: false,
                        isShowDelete: false,
                        isDisabled: true
                    }, {
                        id: 10,
                        label: '校园动态',
                        isShowAppend: false,
                        isShowDelete: false,
                        isDisabled: true
                    }, {
                        id: 11,
                        label: '校长寄语',
                        isShowAppend: false,
                        isShowDelete: false,
                        isDisabled: true
                    }
                ]
            }, {
                id: 2,
                label: '学校概况',
                isShowAppend: true,
                isShowDelete: false,
                isDisabled: true,
                children: [
                    {
                    id: 5,
                    label: '二级 2-1',
                    isShowAppend: false,
                    isShowDelete: false,
                    isDisabled: true
                }, {
                    id: 6,
                    label: '二级 2-2',
                    isShowAppend: false,
                    isShowDelete: false,
                    isDisabled: true
                }]
            }, {
                id: 3,
                label: '教学教研',
                isShowAppend: true,
                isShowDelete: false,
                isDisabled: true,
                children: [
                    {
                    id: 7,
                    label: '二级 3-1',
                    isShowAppend: false,
                    isShowDelete: false,
                    isDisabled: true
                }, {
                    id: 8,
                    label: '二级 3-2',
                    isShowAppend: false,
                    isShowDelete: true,
                    isDisabled: true
                }]
            }];
            return {
                dialogFormVisible: false,
                formLabelWidth: '120px',
                closeModal: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: true
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: true
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: true
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: true
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: false
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: false
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    title: '我的老师',
                    isOnline: false
                }],
                multipleSelection: [],
                data5: JSON.parse(JSON.stringify(data)),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                imageUrl: '',
                options: [
                    {vlaue: '开封',label: '开封'},
                    {vlaue: '许昌',label: '许昌'},
                    {vlaue: '濮阳',label: '濮阳'},
                    {vlaue: '商丘',label: '商丘'},
                    {vlaue: '南阳',label: '南阳'}
                ],
                area_value: '',
                form: {
                    name: '',
                    publisher: '',
                    publishTime: '',
                    level1: '',
                    level2: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                }
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleNodeClick(data) {
                console.log(data);
            },
            append(data) {
                const newChild = { id: id++, label: '', isShowAppend: false, isShowDelete: true, isDisabled: false, children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                console.log(node)
                console.log(data)
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            renderContent(h, { node, data, store }) {
                return (
                    `<span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                    <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
                </span>`);
            },
            onSubmit() {
                this.$message.success('提交成功！');
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style>
    .p_title{
        height:40px;
        background-color: #409EFF;
        color:#fff;
        line-height: 40px;
        padding-left: 30px;
    }
    .el-table thead th, .el-table thead tr{
        background-color: #409EFF;
        color:#fff;
    }
    .el-table th, .el-table tr {
        background-color: #FFF;
    }
    .col_input input.el-input__inner{
        border:none;
        background-color: inherit!important;
        color:#333!important;
        min-width:50px;
        max-width:96px;
    }
    .m_color_red{
        color: red;
        font-weight: 700;
        margin-top: 4px;
    }
    .custom-tree-node {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .el-tree{
        width:20%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 180px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
