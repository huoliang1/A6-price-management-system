/*
商品基础属性接口
*/

import request from '@/utils/request'  //相当于以前封装的ajax
import { remove } from 'nprogress'
const api_name = '/admin/product'

/*
获取商品ID
GET /admin/product/baseSaleAttrList
*/
export default{

    /*
    获取销售属性列表
    GET /admin/product/baseSaleAttrList
    */
   getSaleAttrList(){
    return request.get(`/admin/product/baseSaleAttrList`)
  },

  /*
  根据ID删除指定的SPU
  DELETE /admin/product/deleteSpu/{spuId}
  */
  remove(spuId){
    return request.delete(`/admin/product/deleteSpu/${spuId}`)
  },

  /*
  根据id获取spu信息
  GET /admin/product/getSpuById/{spuId}
  spuList:包含多个spu简单信息的数组
  spuInfo:包含一个spu详细的对象
  */
 get(spuId){
    return request.get(`/admin/product/getSpuById/${spuId}`)
  },

  /*
  添加SPU详情信息
 POST /admin/product/saveSpuInfo
 POST /admin/product/updateSpuInfo
  */
  addUpdate(spuInfo){
    return request.post(`/admin/product/${spuInfo.id ? 'update':'save'}SpuInfo`,spuInfo)
    // return request({
    //     url:`/admin/product/${spuInfo.id ? 'update':'save'}SpuInfo`,
    //     method:'POST',
    //     data:spuInfo
    // })
  },


  /*
  获取列表
  GET /admin/product/{page}/{limit}
  query参数:category3Id
  */
  getList(page,limit,category3Id){
    return request.get(`/admin/product/${page}/${limit}`,{params:{category3Id}})

    // return request({
    //   url:`/admin/product/${page}/${limit}`,
    //   method:'GET',
    //   params:{category3Id}
    // })
  }
}
