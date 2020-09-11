import { API, request } from '../../request/index.js'

Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    cateList: [],
    // 楼层数据
    floorList: []
  },

  onLoad: function (options) {
    
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },
  // 获取轮播数据
  getSwiperList() {
    request({ url: API.swiperData })
      .then((result) => {
        this.setData({
          swiperList: result
        });

      })
  },
  // 获取导航数据
  getCateList() {
    request({ url: API.catitems })
      .then((result) => {
        this.setData({
          cateList: result
        });
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({ url: API.floordata })
      .then((result) => {
        this.setData({
          floorList: result
        });
      })
  }

})
