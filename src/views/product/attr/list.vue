<template>
  <div>
    <el-card>
        <CategorySelector @categoryChange="handleCategoryChange"/>
    </el-card>
    <el-card style="margin-top:20px" v-if="isShowList">
        <el-button type="primary" icon="el-icon-plus"  style="margin-bottom:20px">添加属性</el-button>

        <el-table :data="attrs" border v-loading="loading">
           <el-table-column label="序号" type="index" width="80" align="center" />
           <el-table-column label="属性名称" prop="attrName" align="center" width="150"/>
           <el-table-column label="属性值列表" align="center">
             <template slot-scope="{row,$index}">
                <el-tag type="info" v-for="value in row.attrValueList" :key="value.id" style="margin-right:5px;">
                {{value.valueName}}
                </el-tag>
             </template>
          </el-table-column>

          <!-- 操作 -->


          <el-table-column label="操作" align="center" width="150px">
             <template slot-scope="{row,$index}">
                  <HintButton title="修改属性" type="primary" icon="el-icon-edit" size="mini" @click="showUpadte(row)"></HintButton>
                  <HintButton title="删除属性" type="danger" icon="el-icon-delete" size="mini"></HintButton>
             </template>
          </el-table-column>
        </el-table>
    </el-card>

    <template v-else>
        <el-form inline>
            <el-form-item label="属性名">
              <el-input type="text" placeholder="请输入属性名"></el-input>
            </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="isShowList=true">取消</el-button>

    </template>
  </div>



</template>

<script>
export default {
  name: 'AttrList',
  data () {
    return {
        loading:false,     //是否正在加载中
        category1Id:null,     //一级分类id
        category2Id:null,     //二级分类id
        category3Id:null,     //三级分类id

        attrs:[],    //属性列表
        isShowList:true,  //是否显示属性列表界面,如果是false显示添加修改的界面
        attr:{},    //当前操作的属性对象
    }
  },
  mounted() {
    this.category1Id = 2
    this.category2Id = 13
    this.category3Id = 61
    this.getAttrs()
  },
  methods: {
    /*
      显示修改界面
    */
   showUpadte(attr){

   },

    /*
    分类ID发生改变的监听回调
    */
    handleCategoryChange({categoryId,level}){
        if(level===1){
          // 重置二级三级分类
          this.category2Id = null
          this.category3Id= null
          this.category1Id = categoryId
        }else if(level === 2){
          // 重置三级分类ID
          this.category3Id=null
          this.category2Id = categoryId
        }else{
          this.category3Id = categoryId
          // 只有当选择了三级分类ID,才会去请求获取属性列表
          this.getAttrs()
        }
    },
    /*
      获取属性列表
    */
    async getAttrs(){
      const {category1Id,category2Id,category3Id} = this
      this.loading = true
      const result = await this.$API.attr.getList(category1Id,category2Id,category3Id)
      this.loading = false
      this.attrs =result.data
    }


  },

}
</script>
