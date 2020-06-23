<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showAdd">添加</el-button>
    <el-table style="margin:20px 0;" v-loading="loading" :data="trademaks" border>

      <el-table-column type="index" width="80" label="序号" align="center" />
      <!--
      1.显示数据 prop  property
      2.如果需要显示一个特定的标签结构:
     -->
      <el-table-column prop="tmName" label="品牌名称" align="center" />

      <el-table-column label="品牌LOGO" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" style="width:100px;height:60px">
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" icon="el-icon-edit" @click="showUpdate(row)">修改</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

      <!-- 分页 -->
    <el-pagination style="text-align:center" :current-page="page" :page-sizes="[3,6,9]" :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total" :total="total" background @current-change="getTrademarks"
      @size-change="handleSizeChange" />

    <!-- 表单效验 -->
    <el-dialog :title="form.id ? '修改品牌': '添加品牌'" :visible.sync="isShowDialog">
      <el-form :model="form" :rules="rules" ref="ruleForm" style="width:80%">
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片
              show-file-list:指定是否显示上传图片的列表，如果是false 只显示一张
              POST /admin/product/fileUpload
              action: 处理上传图片请求的地址 ===>通过代理解决跨域的问题
              on-success：用来指定上传成功时的回调函数
              before-upload:在准备发上传请求前调用,如果返回false不发请求，用来检查文件类型和大小
             -->
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Trademark',
    data() {
      return {
        trademaks: [], //当前页的品牌列表
        total: 0, //总数量
        page: 1, //当前页码
        limit: 3, //每页数量
        current: 1,

        isShowDialog: false, //是否显示添加的对话框

        form: { //用来收集品牌添加的数据
          tmName: '', //品牌名称
          logoUrl: '', //品牌logo的url
        },
        loading: false, //是否正在请求中

        // 表单效验
        /*
        品牌名称:
              必须输入  输入过程中触发效验
              长度必须是2-10之间  失去焦点触发效验
        品牌LOGO
            必须有 点击提交按钮
        */
        rules: {
          tmName: [{
              required: true,
              message: '请输入品牌名称',
              // trigger: 'change'     //默认输入输入过程中触发检查 change
            },
            {
              min: 2,
              max: 10,
              message: '长度必须是2-10个字符',
              trigger: 'blur' //触发校验的时机是失去焦点
            }
          ],
          logoUrl: [{
            required: true,
            message: 'LOGO必须指定',
          }],
        }
      }
    },
    async mounted() {
      // 异步获取第一页列表显示
      this.getTrademarks()

    },
    methods: {
      /*
      删除指定的品牌
      */

      remove(trademark) {
        this.$confirm(`确定删除${trademark.tmName} 吗？`, '提示', {
          type: 'warning'
        }).then(async () => {

          // 发删除品牌的请求
          const result = await this.$API.trademark.remove(trademark.id)
          // 如果成功,提示成功
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 当前页  如果列表只剩一个(上一页)
            this.getTrademarks(this.trademaks.length === 1 && this.page > 1 ? this.page - 1 : this.page)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
          // 如果失败了，提示删除失败

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },



      /*
      添加或者更新
      */
       addOrUpdate() {
        // 对所有表单项进行统一效验
        this.$refs['ruleForm'].validate(async(valid) => { //校验完成的回调
          //  如果通过才进行后面请求的操作
          if (valid) {
            // 准备请求
            const trademark = this.form
            // 提交请求
            let result
            if (trademark.id) { //更新
              result = await this.$API.trademark.update(trademark)
            } else { //添加
              result = await this.$API.trademark.add(trademark)
            }
            // 如果成功重新获取列表显示
            if (result.code === 200) {
              this.$message.success(`${trademark.id ? '更新' :'添加'} 成功！`)
              // 关闭当前dialog
              this.isShowDialog = false
              // 重新获取列表显示
              //如果更新显示当前页,如果添加显示第一页
              this.getTrademarks(trademark.id ? this.page : 1)
            } else { // 失败提示
              this.$message.success(`${trademark.id ? '更新' :'添加'} 失败！`)
            }

          } else {  //可以不写
            console.log('校验不通过！！');
          }
        });


      },


      /*
      上传成功时的回调函数
      res:上传请求返回的响应体数据对象 {code:200,data:图片url}
      */
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log('handleAvatarSuccess()',res);
        // 保存请求返回的图片url数据
        this.form.logoUrl = res.data
      },
      /*
      在准备发上传请求前调用,如果返回false不发请求，用来检查文件类型和大小
      兑图片类型的要求
      类型: jpg/png  ===> imagae/jpeg | image/png
      大小小于500k
      */
      beforeAvatarUpload(file) {
        const isJPGOrPNG = ['image/jpeg', 'image/png'].indexOf(file.type) >= 0 //也可以利用数组判断
        // const isJPGOrPNG = file.type === 'image/jpeg'|| file.type === 'image/png' ;
        const isLt500k = file.size / 1024 < 500;

        if (!isJPGOrPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt500k) {
          this.$message.error('上传头像图片大小不能超过 500k!');
        }
        return isJPGOrPNG && isLt500k;
      },

      /*
        显示修改的界面
      */
      showUpdate(trademark) {
        // 将trademark 指定为form
        // 两个引用变量指向同一个对象
        // this.form = trademark
        // 对trademark 进行一个浅拷贝
        this.form = {
          ...trademark
        }
        // 让文本框显示
        this.isShowDialog = true

      },
      /*
      显示添加的界面
      */
      showAdd() {
        // 显示之前重置form中的数据
        this.form = {
          tmName: '',
          logoUrl: '',
        }
        //显示dialog
        this.isShowDialog = true
        /*
        数据变化必然导致界面变化
        此时界面还没有变化
        */
        // 在现实了提示信息之后，立即清除提示信息
        this.$nextTick(() =>{   //回调函是延迟到界面更新显示之后执行的
            this.$refs.ruleForm.clearValidate()
        })

      },
      /*
      当修改煤业数量的监听回调
      */
      handleSizeChange(pageSize) {
        //更新limit
        this.limit = pageSize
        // 重新获取第一页显示
        this.getTrademarks(1) //也阔以不穿
      },


      /*
      异步获取指定页码的数据列表
      */
      async getTrademarks(page = 1) {
        // 跟新当前页码
        this.page = page
        this.loading = true //显示加载中 lodaing
        // 调用接口函数发请求 获取列表数据的请求
        const result = await this.$API.trademark.getList(page, this.limit)
        this.loading = false //显示加载完成 lodaing
        // 如果成功了更新数据显示
        if (result.code === 200) {
          const {
            records,
            total
          } = result.data
          this.trademaks = records
          this.total = total
        } else { //如果失败
          // this.$message({
          // type:'error',
          // message:'获取分页列表失败'
          // })
          this.$message.error('获取分页列表失败')
        }

      }
    },
  }

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
