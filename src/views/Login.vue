<template>
  <div class="login">
    <div class="box">
      <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          // 正则 用pattern, trigger的 change是改变时触发，blur是失去焦点触发
          { pattern: /^\d{5,11}$/, message: '长度在 5 到 11 个数字', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { pattern: /^\d{3,9}$/, message: '长度在 3 到 9 个数字', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async login () {
      // validate 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      try {
        await this.$refs.user.validate()
      } catch (error) {
        return console.log('失败')
      }
      console.log('成功')
      const res = await this.$axios.post('/login', this.user)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.data.user.id)
        this.$router.push('/index')
        this.$message(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
    },
    reset () {
      this.$refs.user.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  .box {
    // background-color: pink;
    // width: 100%;
    height: 240px;
    line-height: 240px;
    text-align: center;
    border: 1px solid #ccc;
    .demo-ruleForm {
      padding: 40px 50px 0 0;
      width: 400px;
  }
  }
}
</style>
