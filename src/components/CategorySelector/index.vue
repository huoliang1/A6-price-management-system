<template>
<el-form inline>
    <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="category1Id" @change="handleCategory1Change">
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in category1List" :key="c1.id"/>
        </el-select>
    </el-form-item>
    <el-form-item label="二级级分类">
        <el-select placeholder="请选择" v-model="category2Id" @change="handleCategory2Change">
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in category2List" :key="c2.id"/>
        </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="category3Id" @change="handleCategory3Change">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in category3List" :key="c3.id"/>
        </el-select>
    </el-form-item>
</el-form>
</template>

<script type="text/ecmascript-6">
export default {
     name:'CategorySelector',
    data() {
      return {
        category1List:[],   //一级分类列表
        category2List:[],   //二级分类列表
        category3List:[],   //三级分类列表
        category1Id:'',     //选择的一级分类id
        category2Id:'',     //选择的二级分类id
        category3Id:'',     //选择的三级分类id

      }
    },
    mounted() {
        // 动态获取一级分类列表显示
        this.getCategory1List()
    },
    methods: {
      /*
        异步获取一级分类列表显示
      */
      async getCategory1List(){
          const result = await this.$API.category.getCategorys1()
        if (result.code === 200) {
            const category1List = result.data
            this.category1List = category1List
        }
      },

      /*
        选中的一级分类ID发生变化的事件回调
      */
      async handleCategory1Change(category1Id){

      // 分发分类ID发生改变的事件
      this.$emit('categoryChange', {categoryId: category1Id, level: 1})

            // 重置二级三级分类数据
            this.category2List =[]
            this.category3List =[]
            this.category2Id= ''
            this.category3Id= ''
            // 请求获取耳机分类列表显示
        const result = await this.$API.category.getCategorys2(category1Id)
            this.category2List = result.data
      },
       /*
        选中的二级分类ID发生变化的事件回调
      */
     async handleCategory2Change(category2Id){
      // 分发分类ID发生改变的事件
      this.$emit('categoryChange', {categoryId: category2Id, level: 2})
        //  重置三级分类数据
        this.category3List =[]
        this.category3Id= ''
         const result = await this.$API.category.getCategorys3(category2Id)
        this.category3List = result.data
    },
       /*
        选中的三级分类ID发生变化的事件回调
      */
      async handleCategory3Change(category3Id){
          //分发分类ID发生改变的事件  通知父组件
          this.$emit('categoryChange',{categoryId:category3Id,level:3})
      },
    }
}

</script>


