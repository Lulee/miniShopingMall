import {request,API} from '../../request/index.js'

Page({

  data: {
    // 左边菜单
    leftMenusList:[],
    //当前点中的菜单索引
    currentIndex:0,
    // 右边商品分类
    rightContentList:[],
    // 右侧滚动条距离顶部的位置
    scrollTop:0,
  },
   //分类数组
   categoryList:[],

  onLoad: function (options) {
    // 性能优化，使用本地缓存
    const catesStore = wx.getStorageSync('catesStore');
    if(!catesStore){
      this.getCategoryList();
    }else{
      // 到了缓存时间期限 10s ,则重新请求数据，否则从缓存中读取数据
      if(Date.now() - catesStore.time > 10000){
        this.getCategoryList();
      }else{
        this.categoryList = catesStore.data;
        this.initData();
      }
    } 
  },
  
  initData(){
    let leftMenusList = this.categoryList.map(x=>x.cat_name);
    let rightContentList = this.categoryList[0].children;
    this.setData({
      leftMenusList,
      rightContentList
    }
    )
  },
  // 获取分类数据
  getCategoryList(){
    request({url:API.categories}).then(data=>{
      // 将数据缓存在本地
      wx.setStorageSync("catesStore", {data:data,time:Date.now()});    
      this.categoryList= data;
      this.initData();
    });
  },

  handleItemTap(e){
    let {index} = e.currentTarget.dataset;
    let rightContentList = this.categoryList[index].children;
      this.setData({
        rightContentList,
        currentIndex:index,
        // 每次点击左侧菜单，右侧滚动条置顶
        scrollTop:0
      }
      )
   
  }
})