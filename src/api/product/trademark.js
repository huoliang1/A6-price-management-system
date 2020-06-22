/*
包含品牌相关的请求接口
*/

/*
后台用户管理相关的API请求函数
*/
import request from '@/utils/request'  //相当于以前封装的ajax

const api_name = '/admin/product/baseTrademark'


export default {

  /*
  获取品牌分页列表
  获取所有品牌的品牌列表
  */
  getList(page, limit) {
    /* return request({
       url: `${api_name}/${page}/${limit}`,
       method: 'get',
     })
    */
    if(page && limit){
      return request.get(`${api_name}/${page}/${limit}`)
    }
    return request.get(`${api_name}/getTrademarkList`)

  },

  /*
  根据ID获取品牌
  GET /admin/product/baseTrademark/get/{id}
  */
  getByid(id) {
    return request.get(`${api_name}/get/${id}`)
  },

    /*
  获取所有品牌的品牌列表
GET /admin/product/baseTrademark/getTrademarkList
    */
  // getAllList() {

  // },

  /*
  根据ID删除品牌
  DELETE /admin/product/baseTrademark/remove/{id}
  */
  remove(id){
    return request.delete(`${api_name}/remove/${id}`)
  },

  /*
  添加品牌
  POST /admin/product/baseTrademark/save
  */
  add(trademark){
    return request.post(`${api_name}/save`,trademark)
  },

  /*
  更新品牌
   PUT /admin/product/baseTrademark/update
   trademark：有id的品牌对象
  */

  update(trademark){
    return request.put(`${api_name}/update`,trademark)
  }

}
