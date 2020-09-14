<template>
  <div class="index">
      <el-container>
        <el-aside width="200px">
          <div class="logo">黑马头条</div>
              <el-menu
                :default-active="$route.path"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                >
                <!-- 加router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                <el-menu-item index="/">
                  <i class="el-icon-menu"></i>
                  <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="/publish">
                  <i class="el-icon-menu"></i>
                  <span slot="title">发布文章</span>
                </el-menu-item>
              </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <img v-if="user.head_img" :src="$axios.defaults.baseURL + user.head_img" alt="">
            <span>{{user.nickname}}</span>
            <a href="#" @click.prevent="logout">退出</a>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
        // console.log(this.user)
      }
    },
    async logout () {
      try {
        await this.$confirm('确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message('取消成功')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$message('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #535b60;
      .logo {
        width: 200px;
        height: 60px;
        line-height: 60px;
        background-color: #333;
        text-align: center;
        color: #fff;
      }
    }
  }
  .el-container  {
    .el-header {
      background-color: #b1becf;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      span {
        padding: 0 10px;
        font-size: 16px;
      }
    }
    .el-main {
      height: 100%;
      background-color: #e8edf3;
    }
  }
}
</style>
