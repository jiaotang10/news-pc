<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list' }">文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 引入 卡片组件 在里面再插入表格 -->
    <el-card class="box-card">
      <el-table :data="list" border style="width: 100%">
          <el-table-column type="index" :index="indexMethod" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="250" align="center">
          </el-table-column>
          <el-table-column prop="user.nickname" label="作者" width="130" align="center">
          </el-table-column>
          <el-table-column label="创建时间" width="150" align="center">
            <template v-slot="scope">
              {{scope.row.create_date | time}}
            </template>
          </el-table-column>
          <el-table-column label="封面"  align="center">
            <template v-slot="scope">
              <!-- 要加上基地址 -->
              <img :src="getUrl(scope.row.cover[0].url)" alt="">
              <!-- <el-button>{{scope.row}}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </el-table-column>
      </el-table>
        <!--
          layout 组件布局，子组件名用逗号分隔
          page-size 每页显示条目个数
          total 总条目数
          page-sizes 每页显示个数选择器的选项设置
          current-page 当前页数
         -->
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[4, 8, 16, 33]"
          :page-size="pageSize"
          :current-page="pageIndex"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      total: 0,
      pageIndex: 1,
      pageSize: 4
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.list = data
        this.total = total
        console.log(this.total)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getList()
    },
    getUrl (url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    },
    indexMethod (index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    }
  }
}
</script>

<style lang='scss' scoped>
.el-card {
  margin-top: 20px;
  img {
    width: 200px;
    height: 100px;
    object-fit: cover;
  }
}

</style>
