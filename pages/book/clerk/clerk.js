var utils = require("../../../utils/helper.js");
Page({
  data: {
    hide: 1,
    qrcode: ""
  },

  // onLoad: function(e) {
  //   console.log(e);
  //   getApp().page.onLoad(this, e),
  //     this.getOrderDetails(e)
  // },

  onLoad: function(options) {
    // console.log(options.scene);
    console.log(options.order_id);
    getApp().page.onLoad(this, options),
    this.getOrderDetails(options.order_id);
  },

  onLoad2: function(query) {
    // var a = encodeURIComponent('pages/book/clerk/clerk'+'?order_id=48');
    // var a = encodeURIComponent('pages/book/clerk/clerk'+'?order_id=48&aa=100');
    // var a = encodeURIComponent('pages/book/clerk/clerk'+'?489');
    // console.log('a等于'+a);
    // var b = decodeURIComponent(a);
    var b = decodeURIComponent(query.path);
    console.log('b等于'+b);
    // var c = b.substring(23,34);
    // var c = b.substring(23,25);
    var c = b.substring(23); //截取?号之后的字符串
    console.log('c等于'+c);
    if (void 0 !== c) {
        var d = getApp().helper.scene_decode1(c);
        // var d = getApp().helper.objectToUrlParams(c);
        console.log('d等于'+d);
        console.log('d.order_id等于'+d.order_id);
        // console.log('d.aa等于'+d.aa);
    }
    getApp().page.onLoad(this, query),
    this.getOrderDetails(d.order_id);
    // this.getOrderDetails(c)
  },

  onLoad1: function(query) { //测试获取二维码参数的方法2
    var aa = this;
    var a = encodeURIComponent('pages/book/clerk/clerk'+'?order_id=48&aa=100');
    var b = decodeURIComponent(a);
    console.log('b等于'+b);
    var c = b.substring(23); //截取?号之后的字符串
    console.log('c等于'+c);
    if (void 0 !== c) {
        // var d = aa.getRequest(c);
        var d = aa.getRequest(b);
        console.log('d等于'+d);
        console.log('d.order_id等于'+d.order_id);
    }
    getApp().page.onLoad(this, query),
    this.getOrderDetails(d.order_id);
  },

//   let n= GetRequest(url);
// console.log(n + "uirsssssssssssssssss");
getRequest: function(urlStr) {
  console.log(urlStr, "urlStr")
  var url = "?" + urlStr.split("?")[1];
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
  var str = url.substr(1);
  var strs = str.split("&");
  for (var i = 0; i < strs.length; i++) {
  theRequest[strs[i].split("=")[0]] = decode
  }
  return theRequest;
  }
},

  onReady: function(e) {
    getApp().page.onReady(this)
  },
  onShow: function(e) {
    getApp().page.onShow(this)
  },
  onHide: function(e) {
    getApp().page.onHide(this)
  },
  onUnload: function(e) {
    getApp().page.onUnload(this)
  },
  onPullDownRefresh: function(e) {
    getApp().page.onPullDownRefresh(this)
  },
  onReachBottom: function(e) {
    getApp().page.onReachBottom(this)
  },
  getOrderDetails: function(e) {
    console.log('测试:'+ e);

    // var o = "";
    // if ("undefined" == typeof my) o = e.scene;
    // else if (null !== getApp().query) {
    //   var t = getApp().query;
    //   getApp().query = null, o = t.order_id
    // }

    // var o = "";
    if ("undefined" == typeof my) {
      // o = e.scene;
      var o = e;
      // var o = decodeURIComponent(e.scene);
    } else if (null !== getApp().query) {
      var t = getApp().query;
      getApp().query = null, o = t.order_id
    }

    // var o = "";
    // if ("undefined" == typeof my) {
    //   // o = e.scene;
    //   var n = decodeURIComponent(e.scene);
    //   console.log('哦哦哦'+n);
    //   if (void 0 !== n) {
    //     var d = getApp().helper.scene_decode(n);
    //     console.log('哈哈哈'+d);
    //     o = d.order_id;
    //   }
    // } else if (null !== getApp().query) {
    //   var t = getApp().query;
    //   getApp().query = null, o = t.order_id
    // }


    // var o = e.order_id; //新增


    
    var n = this;
    getApp().core.showLoading({
      title: "正在加载",
      mask: !0
    }), getApp().request({
      url: getApp().api.book.clerk_order_details,
      method: "get",
      data: {
        id: o
      },
      success: function(e) {
        0 == e.code ? n.setData({
          goods: e.data
        }) : getApp().core.showModal({
          title: "提示",
          content: e.msg,
          showCancel: !1,
          success: function(e) {
            e.confirm && getApp().core.redirectTo({
              url: "/pages/user/user"
            })
          }
        })
      },
      complete: function(e) {
        setTimeout(function() {
          getApp().core.hideLoading()
        }, 1e3)
      }
    })
  },

  goToGoodsDetails: function(e) {
    getApp().core.redirectTo({
      url: "/pages/book/details/details?id=" + this.data.goods.goods_id
    })
  },
  nowWriteOff: function(e) {
    var o = this;
    getApp().core.showModal({
      title: "提示",
      content: "是否确认核销？",
      success: function(e) {
        e.confirm ? (getApp().core.showLoading({
            title: "正在加载"
          }),
          getApp().request({
            url: getApp().api.book.clerk,
            data: {
              order_id: o.data.goods.id
            },
            success: function(e) {
              0 == e.code ? getApp().core.redirectTo({
                url: "/pages/user/user"
              }) : getApp().core.showModal({
                title: "警告！",
                showCancel: !1,
                content: e.msg,
                confirmText: "确认",
                success: function(e) {
                  e.confirm && getApp().core.redirectTo({
                    url: "/pages/index/index"
                  })
                }
              })
            },
            complete: function() {
              getApp().core.hideLoading()
            }
          })) : e.cancel
      }
    })
  }
});