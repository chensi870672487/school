<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 视频管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" label-width="80px">
          <el-form-item label="视频名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="视频类型">
            <el-select placeholder="请选择">
              <el-option key="bbk" label="名师优课" value="bbk"></el-option>
              <el-option key="xtc" label="校长寄语" value="xtc"></el-option>
              <el-option key="imoo" label="教师风采" value="imoo"></el-option>
              <el-option key="imoo" label="学生风采" value="imoo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoManage'
}
</script>

<style scoped>

</style>
