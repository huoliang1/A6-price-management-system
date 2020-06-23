/* 
包含所有sku管理的接口请求函数
*/

import request from '@/utils/request'  //相当于以前封装的ajax
import { remove } from 'nprogress'


/*
获取商品ID
GET /admin/product/baseSaleAttrList
*/
export default{

    /*
    商品下架的SKU
      GET /admin/product/cancelSale/{skuId}
    */
      downShelves(skuId){
        return request.get(`/admin/product/cancelSale/${skuId}`)
      },

    /* 
    上架SKU
    GET /admin/product/onSale/{skuId}
    */
      upShelves(skuId){
      return request.get(`/admin/product/onSale/${skuId}`)
    },

     /* 
      删除指定id的sku
      DELETE /admin/product/deleteSku/{skuId}
      */
    removeShelves(skuId){
      return request.delete(`/admin/product/deleteSku/${skuId}`)
    },

      /* 
      根据指定的SPU的id查询所有对应的SKU的列表
      GET /admin/product/findBySpuId/{spuId}
      */
    getSpuList(spuId){
      return request.get(`/admin/product/findBySpuId/${spuId}`)
    },
      /* 
      根据SKU的id查询SKU的详细信息
      GET /admin/product/getSkuById/{skuId}
      */
    getSkulist(skuId){
      return request.get(`/admin/product/getSkuById/${skuId}`)
    },
      /* 
      获取SKU的分页列表
      GET /admin/product/list/{page}/{limit}
      */
    getSkuPaging(page,limit){
      return request.get(`/admin/product/list/${page}/${limit}`)
    },

      /* 
      保存SKU
      POST /admin/product/saveSkuInfo
      POST /admin/product/updateSkuInfo
      */




      /* 
      获取指定SPU的id对应的图片列表
      GET /admin/product/spuImageList/{spuId}
      */
    getSpuImg(spuId){
      return request.get(`/admin/product/spuImageList/${spuId}`)
    },

      /* 
      获取指定SPU的id对应的销售属性列表
      GET /admin/product/spuSaleAttrList/{spuId}
      */

    getSpuIdSales(spuId){
      return request.get(`/admin/product/spuSaleAttrList/${spuId}`)
    }

}



