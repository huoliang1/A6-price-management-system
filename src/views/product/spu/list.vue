<template>
  <div>
    <el-card style="margin-bottom:20px;">
        <CategorySelector @categoryChange="handleCategoryChange"/>
    </el-card>
    <el-card>

    <div v-show="!isShowSpuForm">
           <el-button type="primary" icon="el-icon-plus" @click="isShowSpuForm=true" style="margin-bottom:20px;">添加SPU</el-button>
      <el-table border :data="spuList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="{row, $index}">
                  <hint-button title="添加SKU" type="primary" icon="el-icon-plus" size="mini"/>
                  <hint-button title="修改SKU" type="primary" icon="el-icon-edit" size="mini"/>
                  <hint-button title="查看所有SKU" type="info" icon="el-icon-info" size="mini"/>
                  <hint-button title="删除SPU" type="danger" icon="el-icon-delete" size="mini"/>
              </template>
          </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
      style="text-align:center"
      :current-page="page" :page-sizes="[5,10,15]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total" background
      @current-change="getSpuList"
      @size-change="handleSizeChange" />

    </div>
     <!--  .sync 本质
      <SpuForm @update:visible="isShowSpuForm=$event"></SpuForm>
     -->
    <SpuForm :visible.sync="isShowSpuForm"></SpuForm>
    </el-card>

  </div>
</template>

<script>
import SpuForm from '../components/SpuForm'
export default {
  name: 'SpuList',
  data() {
    return {
      category1Id: null, // 一级分类ID
      category2Id: null, // 二级分类ID
      category3Id: null, // 三级分类ID

      spuList:[],  //当前页面的spu数组
      total:0,    //总数量
      page:1,     //当前页码
      limit:5,   //每页数量
      isShowSpuForm:false,  //是否显示spu的添加修改界面
    }
  },
    async mounted() {
      // const result = await this.$API.spu.getList(1,3,61)
      //   console.log('----',result);

        // this.category1Id = 1
        // this.category2Id = 13
        // this.category3Id = 61
        // this.getSpuList(1)
    },
    methods: {
     async getSpuList(page){
        const result = await this.$API.spu.getList(page,this.limit,this.category3Id)
            const {records,total} = result.data
            this.spuList =records  //数据
            this.total = total  //总数量
      },

      /*
        每页数量改变的监听
       */
      handleSizeChange(pageSize) {
        //更新limit
        this.limit = pageSize
        // 重新获取第一页显示
        this.getSpuList(1) //也阔以不穿
      },

        /*
        分类ID发生改变的监听回调
        */
        handleCategoryChange ({categoryId, level}) {
          if (level===1) {
            // 重置二级与三级分类的数据
            this.category2Id = null
            this.category3Id = null
            this.spuList = []   //重置属性列表
            this.total = 0      //重置总数量
            this.category1Id = categoryId
          } else if (level===2) {
            // 重置三级分类的数据
            this.category3Id = null
            this.spuList = []   //重置属性列表
             this.total = 0     //重置总数量
            this.category2Id = categoryId
          } else {
            this.category3Id = categoryId
            // 只有当选择了三级的分类ID, 才去请求获取属性列表
            this.getSpuList(1)
          }
        },
    },
    components:{
      SpuForm,
    }

}
</script>
