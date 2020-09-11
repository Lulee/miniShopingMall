export  const API={
      "baseUrl": "https://api-hmugo-web.itheima.net/api/public/v1", 
      "swiperData":"/home/swiperdata",
      "catitems": "/home/catitems",
      "floordata":"/home/floordata",
      "categories":"/categories"
}

// 同时发送异步代码的次数
let ajaxTimes=0;
export const request=(params)=>{
    wx.showLoading({
        title:"加载中...",
        mask:true
    });

    ajaxTimes++;
    let header = {...params.header}
    return new Promise((resolve,reject)=>{
        wx.request({
            header:header,
            ...params,
            url: API.baseUrl+params.url,
            success:(result)=>resolve(result.data.message),
            fail:(err)=>reject(err),
            complete:()=>{
                ajaxTimes--;

                if(ajaxTimes === 0){
                    wx.hideLoading();
                }
            }
        })
    })

}