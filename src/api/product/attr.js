/*
商品基础属性接口
*/

import request from '@/utils/request'  //相当于以前封装的ajax
import { remove } from 'nprogress'
const api_name = '/admin/product'

/*
获取商品ID
GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
*/
export default{


    getList(category1Id,category2Id,category3Id){
        // return request.get(`/${api_name}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },

    /*
    获取指定属性ID的所有属性值列表 GET /admin/product/getAttrValueList/{attrId}
    */
    getValueList(attrId){
      return request.get(`${api_name}/getAttrValueList/${attrId}`)
    },

    /*
    添加和更新属性
    POST /admin/product/saveAttrInfo
    */
   save(attrInfo){
    return request.get(`${api_name}/saveAttrInfo/`,attrInfo)
  },
    /*
    删除分类
    DELETE /admin/product/deleteAttr/{attrId}
    */
    remove(id){
      return request.delete(`${api_name}/deleteAttrt/${id}`)
    },
}
