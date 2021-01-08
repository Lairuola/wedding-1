"use strict";

/*
 * @Author       : 濑若拉
 * @Date         : 2021-01-05 15:10:43
 * @LastEditors  : 濑若拉
 * @LastEditTime : 2021-01-07 14:47:02
 * @FilePath     : /slidebar/js/main.js
 */
// js文件头部注释之后的内容
var app = new Vue({
  el: "#apps",
  data: {
    offers: [],
    deleteOffers: [],
    singleOption: [],
    box: null,
    finalTotal: 0,
    dateTime: new Date(),
    planners: [{
      id: 0,
      name: "策划师1"
    }, {
      id: 1,
      name: "策划师2"
    }],
    curPlaner: 0,
    imageUrl: "",
    exports: [{
      id: 0,
      name: "配置1"
    }, {
      id: 1,
      name: "配置2"
    }, {
      id: 3,
      name: "配置3"
    }],
    curExports: 0
  },
  computed: {
    allPrice: function allPrice() {
      var allTotal = 0;
      this.offers.map(function (item) {
        if (!isNaN(item.total)) allTotal += item.total;
      });

      if (isNaN(allTotal)) {
        return 0;
      }

      this.finalTotal = allTotal;
      return allTotal;
    }
  },
  methods: {
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      return regeneratorRuntime.async(function handleAvatarSuccess$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.imageUrl = URL.createObjectURL(file.raw);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type === "image/jpeg";
      var isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return isJPG && isLt2M;
    },
    // 测算所有总价
    calAllPrice: function calAllPrice() {
      var allTotal = 0;
      this.offers.map(function (item) {
        if (!isNaN(item.total)) allTotal += item.total;
      });

      if (isNaN(allTotal)) {
        return 0;
      }

      return allTotal;
    },
    // 单条求和
    calTotal: function calTotal(index) {
      var offer = this.offers[index];
      offer.total = offer.price * offer.number;
      this.judgeStatus(index); // this.changeStatus(index, 2)
    },
    // 修改状态
    changeStatus: function changeStatus(index, status) {
      var offer = this.offers[index];
      offer.js_status = status;
    },
    // 判断状态
    judgeStatus: function judgeStatus(index) {
      var offer = this.offers[index];

      if (offer.js_status === 0) {
        this.changeStatus(index, 2);
      }
    },
    // 开场50条
    init: function init() {
      var dataLength = this.offers.length;

      if (dataLength >= 50) {
        return;
      }

      var count = 50 - dataLength;
      console.log(count, "count");

      for (var i = 0; i < count; i++) {
        this.offers.push({
          id: 0,
          item_id: 0,
          single: "",
          description: "",
          price: 0,
          cost: 0,
          number: 0,
          total: 0,
          js_status: 4,
          dispatched: 0
        });
      }
    },
    // 滚动添加5条
    onScrollAdd: function onScrollAdd() {
      var scrollDiv = this.$refs.scrollDiv;
      var offsetHeight = scrollDiv.offsetHeight;
      var scrollTop = scrollDiv.scrollTop;
      var scrollHeight = scrollDiv.scrollHeight;

      if (offsetHeight + scrollTop >= scrollHeight) {
        console.log("onScrollAdd");
        var dataLength = this.offers.length;

        for (var i = 0; i <= 5; i++) {
          this.offers.push({
            id: 0,
            item_id: 0,
            single: "",
            description: "",
            price: 0,
            cost: 0,
            number: 0,
            total: 0,
            js_status: 4,
            dispatched: 0
          });
        }
      }
    },
    // 条目删除
    deleteOffer: function deleteOffer(index) {
      var offer = this.offers[index];

      if (offer.js_status === 0) {
        this.changeStatus(index, 3);
        this.deleteOffers.push(offer);
      }

      this.offers.splice(index, 1);
    },
    // 单项选择填入表单
    singleChange: function singleChange(value, index) {
      var result = this.singleOption.filter(function (item) {
        return item.title === value;
      }); // 选择已有单项

      if (result[0]) {
        var _offer = this.offers[index];
        _offer.cost = result[0].cost;
        _offer.price = result[0].price;
        _offer.item_id = result[0].id;
        _offer.description = result[0].description;
      } else {
        // 新增填写单项
        offer.item_id = 0;
      } // 判断状态


      var offer = this.offers[index];

      if (offer.js_status === 0) {
        this.changeStatus(index, 2);
      } else {
        this.changeStatus(index, 1);
      }

      console.log("value:", value, "index:", index, "result:", result[0], "| singleChange");
    },
    // 过滤初始数据
    filterInitData: function filterInitData(offer) {
      console.log(offer);

      if (offer.length !== 0) {
        var result = offer.filter(function (item) {
          return item.js_status !== 4;
        });
        return result;
      } else {
        return [];
      }
    },
    // 提交数据
    postData: function postData() {
      var offers = this.filterInitData(this.offers);
      var deletes = this.filterInitData(this.deleteOffers);
      var result = offers.concat(deletes);

      if (result.length === 0) {
        this.$message("暂未修改，无法提交");
      } else {
        // const case_id = getQueryVariable('id');
        var case_id = 5;
        var all_total_price = this.allPrice;
        var real_total_price = this.finalTotal;
        var data = result;
        console.log(all_total_price, real_total_price, data);

        if (all_total_price === 0) {
          this.$message("总价为0,无法提交报价单");
          return;
        }

        $.ajax({
          url: "http://uding.com/store/api/post_items",
          type: "POST",
          data: {
            case_id: case_id,
            all_total_price: all_total_price,
            real_total_price: real_total_price,
            data: data
          },
          success: function success(result) {
            console.log(result, "postData");
          }
        });
      }
    },
    // 获取所有单项
    getAllSingle: function getAllSingle() {
      var that = this;
      $.ajax({
        url: "http://uding.com/store/api/items",
        type: "GET",
        success: function success(result) {
          var data = result.data;
          console.log(data, "getAllSingle");
          that.singleOption = data;
        }
      });
    },
    // 获取详情
    getDetail: function getDetail() {
      var that = this; // let case_id = getQueryVariable('id')

      var case_id = 5;
      $.ajax({
        url: "http://uding.com/store/api/last_item?case_id=".concat(case_id),
        type: "GET",
        success: function success(result) {
          var data = result.data;
          console.log(data, "getDetail");
          var has_details = data.has_details;

          if (has_details === 0) {
            return;
          }
        }
      });
    },
    // 获取url参数
    getQueryVariable: function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        if (pair[0] == variable) {
          return pair[1];
        }
      }

      return false;
    }
  },
  mounted: function mounted() {
    this.init();
    this.getAllSingle();
    this.getDetail();
  }
});
$(".my-table-mid .row").focusin(function () {
  $(this).addClass("active");
});
$(".my-table-mid .row").focusout(function () {
  $(this).removeClass("active");
});
var mySwiper1 = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});