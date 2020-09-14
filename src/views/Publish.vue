<template>
  <div class="publish">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox :label="item.id" name="type" v-for="item in tabList" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <!--
          action 必选参数，上传的地址
          element-ui 会帮我们发请求
          验证token，指定请求头 => headers 设置上传的请求头部
          文件上传成功后，把地址存到cover里 => on-success 文件上传成功时的钩子
        -->
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :headers="headers"
          :on-success="handleSuccess"
          multiple="multiple"
          :on-remove="remove"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="onSubmit">发布</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      tabList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getTabList()
    // console.log(this.form)
  },
  methods: {
    getchange (arr) {
      return arr.map(item => {
        return { id: item }
      })
    },
    async onSubmit () {
      // console.log(this.form)
      // const res = await this.$axios.post('/post', this.form)
      const res = await this.$axios.post('/post', {
        ...this.form,
        categories: this.getchange(this.form.categories)
      })
      console.log(res)
      this.$router.push('/')
    },
    async getTabList () {
      const res = await this.$axios.get('/category')
      // console.log(this.form)
      if (res.data.statusCode === 200) {
        this.tabList = res.data.data.filter(item => item.name !== '关注' && item.name !== '头条')
      }
      // console.log(this.tabList)
    },
    handleSuccess (response, file, fileList) {
      console.log(response.data)
      if (response.statusCode === 200) {
        // 因为是数组，会上传多张照片，所以要用push方法上传
        // this.form.cover.push(response.data.url)
        // 因为接口文档需要传递的cover是个对象，所以将整个response赋值给cover
        this.form.cover.push(response.data)
        // console.log(this.form.cover)
      }
    },
    remove (file, fileList) {
      console.log(file)
      this.form.cover = this.form.cover.filter(item => item.id !== file.response.data.id)
    }
  }
}
</script>

<style lang='scss' scoped>
.el-form {
  margin-top: 20px;
}
.quill-editor {
  background-color: #fff;
}
::v-deep .ql-editor {
    height: 200px;
}
</style>
