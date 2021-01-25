"use strict";

/*
 * @Author       : 濑若拉
 * @Date         : 2021-01-05 15:10:43
 * @LastEditors  : 濑若拉
 * @LastEditTime : 2021-01-25 10:27:20
 * @FilePath     : /wedding/js/main.js
 */
// js文件头部注释之后的内容

/**
 * @example ToFalse(data)
 * @description 通过state来选择显示哪个流程 主题，布置，流程
 * @param { number } state
 * @return { void }
 */
console.info(123123121231231);

function ToHidden(state) {
  var showFlow = [".main-form", ".state", ".process"];
  document.querySelector(showFlow.splice(state, 1)[0]).style.display = "";
  showFlow.forEach(function (item) {
    return document.querySelector(item).style.display = "none";
  });
}

var app = new Vue({
  el: "#apps",
  data: {
    // 当前显示流程
    flow: 0,
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
    // 每上传一个新的文件返回的asset_id放到这个数组，没有上传文件时这里是空数组
    assetIds: [],
    curExports: 0,
    // 上传文件模版
    showModel: false,
    // 可以关闭模版的选项
    isCloseModel: false,
    // 在模版下上传主题的的图片和视频暂存在这
    temporaryStorage: [],
    // 在模版上传布置的图片和视频暂存在这
    ArrangeTemporaryStorage: [],
    // 点击了新增图片or视频还是新增设计图
    WhoNew: true,
    // 新增索引
    NewIndex: 0,
    // 布置下所有select的选项
    selectOptionAll: [],
    // 单项的所有选项
    AllOptions: [],
    // 报价单列表
    offersList: [// {
      //     //  序号名
      //     SerialName: "签到区",
      //     // 总价
      //     totalMoney: 10000,
      //     // 图片数量
      //     photoCount: 0,
      //     // 视频
      //     videoCount: 0,
      //     // 设计数量
      //     designCount: 0,
      //     // 是否展开 ture 为展开
      //     isOpen: true,
      //     // 报价单
      //     // 视频，图片
      //     photoAndVideoList: [
      //         {
      //             isImg: true,
      //             src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
      //         },
      //         {
      //             isImg: true,
      //             src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
      //         },
      //         {
      //             isImg: true,
      //             src: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=859675797,1348073052&fm=26&gp=0.jpg"
      //         }
      //     ],
      //     //当前正在查看第几张照片
      //     curPhotoVideoNum: 0,
      //     // 设计方案 图片or视频 src是视频的话会多出一个视频类型 type = video/xxx
      //     designPhoto: [
      //         {
      //             isImg: true,
      //             src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
      //         },
      //         {
      //             isImg: true,
      //             src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
      //         },
      //         {
      //             isImg: true,
      //             src: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=859675797,1348073052&fm=26&gp=0.jpg"
      //         }
      //     ],
      //     // 当前正在查看第几张设计图
      //     curDesignNum: 0,
      //     // 布置思路
      //     layoutIdeas: '',
      //     // 搭建备注
      //     backups: "",
      //     // 操作
      //     /**
      //      * interface offers {
      //      *     id:number
      //      *     item_id:number
      //      *     single:string
      //      *     description:string
      //      *     price:number
      //      *     cost:number
      //      *     total:number
      //      *     js_status:number
      //      *     dispatched:number
      //      * }
      //      * */
      //     offers: [
      //         {
      //             id: 1,
      //             item_id: 0,
      //             single: "",
      //             singleOption: [
      //                 {id: 1, name: "黄金糕"},
      //                 {id: 2, name: '双皮奶'}
      //             ],
      //             description: 2,
      //             price: 0,
      //             cost: 0,
      //             number: 0,
      //             total: 0,
      //             js_status: 4,
      //             dispatched: 0,
      //         }
      //     ]
      // },
    ],

    /**
     *
     * ----- 流程 ------
     *
     * */

    /**
     * interface flowInpList {
     *     time: string 时间
     *     flowName: string 流程名称
     *     participant: {id:number,name:string}[] 参与者option
     *     participantVal: string 参与者
     *     desc: string 描述
     *     bgm: string bgm
     *     vcr: string vcr
     * }
     * */
    flowInpList: [{
      time: "",
      flowName: "",
      participant: [{
        id: 1,
        name: "111",
        info: "1Info"
      }, {
        id: 2,
        name: "222",
        info: "2Info"
      }, {
        id: 3,
        name: "333",
        info: "3Info"
      }, {
        id: 4,
        name: "444",
        info: "4Info"
      }],
      participantVal: [],
      desc: "",
      bgm: "",
      vcr: ""
    }],

    /**
     *
     * ------ 主题 ------
     *
     * */
    // 新郎
    groom: "",
    // 新娘
    bride: "",
    // 主题名称
    SubjectName: "",
    // 主题Logo
    logo: "",
    // 主题日期
    subjectDate: "",
    // 地址
    address: "",
    // 策划师
    planOption: [{
      id: 1,
      name: "11"
    }, {
      id: 2,
      name: "222"
    }, {
      id: 3,
      name: "333"
    }, {
      id: 4,
      name: "444"
    }],
    plan: ""
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
    // 开场20条
    init: function init() {
      var dataLength = this.offers.length;

      if (dataLength >= 20) {
        return;
      }

      var count = 20 - dataLength;
      console.log(count, "count");

      for (var i = 0; i < count; i++) {
        this.offers.push({
          id: 0,
          item_id: 0,
          single: "single",
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
    onScrollAdd: function onScrollAdd(index) {
      var _this = this;

      var scrollDiv = this.$refs.scrollDiv[index];
      var offsetHeight = scrollDiv.offsetHeight;
      var scrollTop = scrollDiv.scrollTop;
      var scrollHeight = scrollDiv.scrollHeight;

      if (offsetHeight + scrollTop + 1 >= scrollHeight) {
        for (var i = 0; i <= 5; i++) {
          this.offersList[index].offers.push({
            id: index + 1,
            item_id: 0,
            single: "",
            singleOption: this.selectOptionAll,
            description: 2,
            price: 0,
            cost: 0,
            number: 0,
            total: 0,
            js_status: 4,
            dispatched: 0
          });
        }
      }

      this.$nextTick(function () {
        $(".js-example-basic-single").select2({
          placeholder: "参与者"
        }).change(function (e) {
          return _this.selectTwoChange(e);
        });
      });
    },
    // 条目删除
    deleteOffer: function deleteOffer(index) {
      console.log("delete item");
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
    },

    /**
     *
     * ---- 通用 ----
     *
     * */
    // 自定义主题
    themeInit: function themeInit(caseId) {
      var _this2 = this;

      //    获取方案

      /**
       * interface e.data {
       *     case:{
       *     id: 5, case_date: "2020-12-22 17:28:10", case_address: null,
       *     clients_json(新郎新娘Info):[{name: "小张", phone: "18666666666"}],
       *     }
       *     colors:{id: 1, title: "新色", code: "#32C165", description: "ok"}[]
       *     styles:{id: 1, title: "样式1", icon: "images/f529ce19969841ddb99a8997624118df.png", description: "ddd"}[]
       *     user_select:{1: "cokeyang", 2: "可可可"}
       * }
       * */
      $.get("http://uding.com/store/api/case_base_info", {
        case_id: caseId
      }, function (e) {
        // finish
        var selectAll = [];
        _this2.groom = e.data["case"].clients_json[0].name;
        _this2.bride = e.data["case"].clients_json[1].name;
        _this2.subjectDate = e.data["case"].case_date;
        _this2.address = e.data["case"].case_address;

        for (var userSelectKey in e.data.user_select) {
          var h = {};
          Reflect.set(h, "id", userSelectKey);
          Reflect.set(h, "name", e.data.user_select[userSelectKey]);
          selectAll.push(h);
        }

        _this2.planOption = selectAll;
        console.log(e.data, "index!!!");
        console.log();
      });
    },
    // 删除文件接口
    deleteFile: function deleteFile(fileType, fileUrl, scFn, erFn) {
      $.ajax({
        url: "http://uding.com/store/api/file_delete",
        type: "POST",
        data: {
          type: fileType,
          path: fileUrl
        },
        success: function success(e) {
          return scFn();
        },
        error: function error(e) {
          return erFn();
        }
      });
    },
    // 新增文件接口
    addFile: function addFile(fileType, file, scFn, erFn) {
      var fileData = new FormData();
      fileData.append("content", file);
      fileData.append("key", fileType);
      $.ajax({
        url: "http://uding.com/store/api/file_upload",
        type: "POST",
        data: fileData,
        processData: false,
        contentType: false,
        success: function success(e) {
          return scFn(e);
        },
        error: function error(e) {
          return erFn(e);
        }
      });
    },
    // 显示上传文件模版
    IsShowModel: function IsShowModel() {
      var _this3 = this;

      this.showModel = true;
      setTimeout(function () {
        _this3.isCloseModel = true;
      }, 1000);
    },
    // initFlowOptions() {
    //     $.get("http://uding.com/store/api/process_select", function (e) {
    //         console.log(e.data, 'initFlowOPtion!')
    //         const optionAll = []
    //         for (const dataKey in e.data) {
    //             const h = {}
    //             Reflect.set(h, 'id', dataKey)
    //             Reflect.set(h, 'name', e.data[dataKey])
    //         }
    //         optionAll.push(optionAll)
    //     })
    // },

    /**
     *
     * ------ 主题 -------
     *
     * */
    too: function too() {
      if (this.showModel && this.isCloseModel) {
        this.showModel = false;
        this.isCloseModel = false;
      }
    },
    clickLogo: function clickLogo() {
      this.IsShowModel();
    },
    changeLogo: function changeLogo() {
      if (this.temporaryStorage[0]) {
        this.imageUrl = this.temporaryStorage[0].url;
        console.log(this.imageUrl, "imageurl");
      }

      console.log(this.temporaryStorage.length, "hahahah");
    },

    /**
     *
     * ------ 布置逻辑 -------
     * */
    initControlFlow: function initControlFlow() {
      var _this4 = this;

      var optionAll = [];
      $.ajax({
        url: "http://uding.com/store/api/items",
        type: "GET",
        success: function success(res) {
          /**
           * res.data:res[]
           * interface res {
           *    id: 1, title: "单项1", price: "100.00", cost: "90.00", description: "remark"
           * }
           * */
          _this4.AllOptions = res.data;
          res.data.forEach(function (item) {
            var h = {};
            Reflect.set(h, "id", item.id);
            Reflect.set(h, "name", item.title);
            optionAll.push(h);
          });
          _this4.selectOptionAll = optionAll;

          _this4.addArrangement();
        }
      });
    },
    // 控制流程按钮 上一步，下一步，完成 state:number
    controlFlow: function controlFlow(state) {
      console.log(state);
      if (this.flow === 0 && state === -1) return;
      if (this.flow === 2 && state === +1) return;
      this.flow += state;
      ToHidden(this.flow);
    },
    // 控制流程按钮 主题，布置，流程
    controlFlowBtn: function controlFlowBtn(state) {
      console.log(state);
      this.flow = state;
      ToHidden(state);
    },
    // 展开
    open: function open(index) {
      var Content = this.$refs["openContent".concat(index)][0];
      this.offersList[index].isOpen = !this.offersList[index].isOpen;
      console.log(this.offersList[index].openContentHeight, "this");

      if (this.offersList[index].isOpen) {
        Content.style.display = "";
      } else {
        Content.style.display = "none";
      }

      console.log("open", this.$refs["openContent".concat(index)][0].scrollHeight); // this.$refs.openContent.scrollHeight
      // this.$refs.openContent.style.height = `0px`
      // this.$refs.openContent.style.display = 'none'
    },
    // 文件类型
    fileType: function fileType(status, _fileType) {
      switch (status) {
        case 1:
          // 判断是否是照片
          return /^image/g.test(_fileType);

        case 2:
          // 判断是否是视频
          return /^video/g.test(_fileType);

        default:
          return false;
      }
    },
    // 全部input type = file
    getFileContent: function getFileContent(index) {
      var fileContentList = this.$refs.photoFile;
      if (index === 0) return fileContentList.slice(0, 2);
      if (index === 1) return fileContentList.slice(2, 4);
      if (index === 3) return fileContentList.slice(4, 6);else return fileContentList.slice(index + 2, index + 4);
    },
    // 新增图片or视频
    upload: function upload() {
      var curList = this.offersList[this.NewIndex]; // this.WhoNew ？ photoAndVideoList : designPhoto

      if (this.WhoNew) {
        this.ArrangeTemporaryStorage.forEach(function (item) {
          curList.photoAndVideoList.push({
            isImg: item.type,
            src: item.url,
            id: item.asset_id
          });
        });
      } else {
        this.ArrangeTemporaryStorage.forEach(function (item) {
          curList.designPhoto.push({
            isImg: item.type,
            src: item.url,
            id: item.asset_id
          });
        });
      }
    },
    // 新增按钮
    addEffect: function addEffect(bool, index, data) {
      this.IsShowModel();
      this.WhoNew = bool;
      this.NewIndex = index;
    },
    // 删除按钮
    deleteEffect: function deleteEffect(bool, index) {
      try {
        var usrOperation = confirm("确认删除？");
        var curList = this.offersList[index];

        if (bool && usrOperation) {
          // img = false 是视频 ，需要清除视频src
          // http://uding.com/store/api/file_delete
          if (!curList.photoAndVideoList[curList.curPhotoVideoNum].isImg) {
            this.deleteFile(2, curList.photoAndVideoList[curList.curPhotoVideoNum].src, function (e) {
              curList.photoAndVideoList.splice(curList.curPhotoVideoNum, 1);
              URL.revokeObjectURL(curList.photoAndVideoList[curList.curPhotoVideoNum].src);
              alert("删除成功！");
            }, function (e) {
              alert("删除失败，请重试");
            });
          }

          this.deleteFile(1, curList.photoAndVideoList[curList.curPhotoVideoNum].src, function (e) {
            curList.photoAndVideoList.splice(curList.curPhotoVideoNum, 1);
            alert("删除成功！");
          }, function (e) {
            alert("删除失败，请重试");
          });
        }

        if (!bool && usrOperation) {
          if (!curList.designPhoto[curList.curDesignNum].isImg) {
            this.deleteFile(2, curList.designPhoto[curList.curDesignNum].src, function (e) {
              alert("删除成功！");
              URL.revokeObjectURL(curList.designPhoto[curList.curDesignNum].src);
              curList.designPhoto.splice(curList.curDesignNum, 1);
            }, function (e) {
              alert("删除失败！请重试");
            });
          }

          this.deleteFile(1, curList.designPhoto[curList.curDesignNum].src, function (e) {
            alert("删除成功！");
            curList.designPhoto.splice(curList.curDesignNum, 1);
          }, function (e) {
            alert("删除失败！请重试");
          });
        }
      } catch (e) {
        alert("你不能删除，因为没有数据");
      }
    },
    // 左滑按钮
    leftRowing: function leftRowing(bool, state, index) {
      //  bool ？ photoAndVideoList : designPhoto
      // state === -1
      var curList = this.offersList[index];

      if (bool) {
        if (curList.curPhotoVideoNum === 0) return;
        curList.curPhotoVideoNum += state;
      } else {
        if (curList.curDesignNum === 0) return;
        curList.curDesignNum += state;
      }
    },
    // 右滑按钮
    rightRowing: function rightRowing(bool, state, index) {
      //  bool ？ photoAndVideoList : designPhoto
      if (bool) {
        if (this.offersList[index].curPhotoVideoNum === this.offersList[index].photoAndVideoList.length - 1) return;
        this.offersList[index].curPhotoVideoNum += state;
      } else {
        if (this.offersList[index].curDesignNum === this.offersList[index].designPhoto.length - 1) return;
        this.offersList[index].curDesignNum += state;
      }
    },
    // select2 change事件
    selectTwoChange: function selectTwoChange(e) {
      var target = $(e.target);
      var curList = this.offersList[target.data("group")].offers[target.data("son")];
      curList.single = target.val();
      var filterOption = this.AllOptions.filter(function (item) {
        return item.title === curList.single;
      })[0];
      curList.price = filterOption.price;
      curList.cost = filterOption.cost;
      console.log(curList);
    },
    // 新增一个布置区域
    addArrangement: function addArrangement() {
      var _this5 = this;

      console.log(this.selectOptionAll, "init!");
      this.offersList.push({
        //  序号名
        SerialName: "签到区",
        // 总价
        totalMoney: 0,
        // 图片数量
        photoCount: 0,
        // 视频
        videoCount: 0,
        // 设计数量
        designCount: 0,
        // 是否展开 ture 为展开
        isOpen: true,
        // 报价单
        // 视频，图片
        photoAndVideoList: [{
          isImg: true,
          src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
        }, {
          isImg: true,
          src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
        }, {
          isImg: true,
          src: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=859675797,1348073052&fm=26&gp=0.jpg"
        }],
        //当前正在查看第几张照片
        curPhotoVideoNum: 0,
        // 设计方案 图片or视频 src是视频的话会多出一个视频类型 type = video/xxx
        designPhoto: [{
          isImg: true,
          src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
        }, {
          isImg: true,
          src: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3387247795,819115491&fm=26&gp=0.jpg"
        }, {
          isImg: true,
          src: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=859675797,1348073052&fm=26&gp=0.jpg"
        }],
        // 当前正在查看第几张设计图
        curDesignNum: 0,
        // 布置思路
        layoutIdeas: "",
        // 搭建备注
        backups: "",
        // 操作

        /**
         * interface offers {
         *     id:number
         *     item_id:number
         *     single:string
         *     description:string
         *     price:number
         *     cost:number
         *     total:number
         *     js_status:number
         *     dispatched:number
         * }
         * */
        offers: [{
          id: 1,
          item_id: 0,
          single: "",
          singleOption: this.selectOptionAll,
          description: 2,
          price: 0,
          cost: 0,
          number: 0,
          total: 0,
          js_status: 4,
          dispatched: 0
        }]
      });
      this.loopAddOffers(this.offersList.length - 1);
      this.$nextTick(function () {
        $(".js-example-basic-single").select2({
          placeholder: "参与者"
        }).change(function (e) {
          return _this5.selectTwoChange(e);
        });
        mySwiper.forEach(function (item) {
          console.log("this is MySwiper", item.init());
        });
      });
    },
    //  循环添加选项
    loopAddOffers: function loopAddOffers(index) {
      var num = 10;

      for (var i = 1; i < num; i++) {
        this.offersList[index].offers.push({
          id: 1,
          item_id: 0,
          single: "",
          singleOption: this.selectOptionAll,
          description: 2,
          price: 0,
          cost: 0,
          number: 0,
          total: 0,
          js_status: 4,
          dispatched: 0
        });
      }
    },
    // 单项选择
    ChoseItems: function ChoseItems(findex, index) {
      // TODO：如何在chang的时候获取到对应的select2的val
      $(this.$refs.selection[index]).val();
      var curList = this.offersList[findex].offers[index].single;
      console.log(this.AllOptions[findex], curList, "qsj");
    },
    // 计算出总价
    calculateTotalPrice: function calculateTotalPrice(index) {
      var total = 0;
      var curList = this.offersList[index].offers;
      curList.forEach(function (item) {
        return total += item.total;
      });
      return total;
    },
    // 单条item求和
    flowSingleChange: function flowSingleChange(findex, index) {
      var curList = this.offersList[findex].offers[index]; // 获取单价

      var price = curList.price; // 当前输入

      var number = parseInt(curList.number); // 计算当前总价

      curList.total = number * price;
    },

    /**
     *
     * -------- 流程 ------- finish
     *
     * */
    // 默认给flowInpList 增加多少条数据
    add: function add() {
      var listLen = 12;

      for (var i = 1; i < listLen; i++) {
        this.addDate();
      }
    },
    flowAddList: function flowAddList() {
      var loopNum = 5;
      var scrollH = this.$refs.list;
      var offsetH = scrollH.offsetHeight;
      var scrollT = scrollH.scrollTop;
      var scrollHeig = scrollH.scrollHeight;

      if (offsetH + scrollT > scrollHeig) {
        for (var i = 1; i < loopNum; i++) {
          this.addDate();
        }
      }
    },
    rm: function rm(i) {
      this.flowInpList.splice(i, 1);
    },
    addDate: function addDate() {
      var _this6 = this;

      this.flowInpList.push({
        time: "",
        flowName: "",
        participant: [{
          id: 1,
          name: "111",
          info: "1Info"
        }, {
          id: 2,
          name: "222",
          info: "2Info"
        }, {
          id: 3,
          name: "333",
          info: "3Info"
        }, {
          id: 4,
          name: "444",
          info: "4Info"
        }],
        participantVal: [],
        desc: "",
        bgm: "",
        vcr: ""
      });
      this.$nextTick(function () {
        $(".js-example-basic-single").select2({
          placeholder: "参与者"
        }).change(function (e) {
          return _this6.selectTwoChange(e);
        });
      });
    },

    /**
     *
     * ----- 完成 -----
     *
     * */
    //    点击完成
    finishBtn: function finishBtn() {
      var _this7 = this;

      // 需要提交的参数
      var sendObj = {};
      var subject = {};
      Reflect.set(subject, "name", this.SubjectName);
      Reflect.set(subject, "logo", this.logo); // 布置

      var segments = [];
      this.offersList.forEach(function (item, index) {
        var h = {};
        Reflect.set(h, "name", item.SerialName);
        Reflect.set(h, "total", _this7.calculateTotalPrice(index)); // 布置思路

        Reflect.set(h, "description", item.backups); // 搭建备注

        Reflect.set(h, "remark", item.layoutIdeas);
        Reflect.set(h, "resources", []);
        Reflect.set(h, "designs", []);
        Reflect.set(h, "items", []);
        item.photoAndVideoList.forEach(function (photoItem) {
          var p = {};
          Reflect.set(p, "type", photoItem.isImg ? "image" : "video");
          Reflect.set(p, "path", photoItem.src);
          h["resources"].push(p);
        });
        item.designPhoto.forEach(function (designItem) {
          var d = {};
          Reflect.set(d, "type", designItem.isImg ? "image" : "video");
          Reflect.set(d, "path", designItem.src);
          h["designs"].push(d);
        });
        item.offers.forEach(function (offerItem) {
          // TODO: 如果不过滤会有很多空数据，需要一个过滤标准
          var o = {};
          Reflect.set(o, "id", offerItem.id);
          Reflect.set(o, "title", offerItem.single);
          Reflect.set(o, "price", offerItem.price);
          Reflect.set(o, "cost", offerItem.cost);
          Reflect.set(o, "number", offerItem.number);
          Reflect.set(o, "total_price", offerItem.total);
          h["items"].push(o);
        });
        segments.push(h);
      }); // 流程

      var process = [];
      this.flowInpList.forEach(function (flowItem, flowIndex) {
        var f = {};
        Reflect.set(f, "title", flowItem.flowName);
        Reflect.set(f, "time", flowItem.time);
        Reflect.set(f, "bgm", flowItem.bgm);
        Reflect.set(f, "vcr", flowItem.vcr);
        Reflect.set(f, "participant", flowItem.participantVal);
        Reflect.set(f, "description", flowItem.desc);
        process.push(f);
      });
      Reflect.set(sendObj, "asset_ids", this.assetIds);
      console.log("send", {
        subject: subject,
        segments: segments,
        process: process,
        asset_ids: this.assetIds
      }); // $.ajax({
      //     url: "http://uding.com/store/api/create_plan",
      //     type: "POST",
      //     subject,
      //     data: {
      //         subject,
      //         segments,
      //         process,
      //         asset_ids: this.assetIds
      //     }
      //     ,
      //     success: function (e) {
      //         console.log('callback', e)
      //     }
      // })

      console.log(sendObj);
    }
  },
  mounted: function mounted() {
    var _this8 = this;

    this.themeInit(5);
    this.initControlFlow();
    this.init();
    this.getAllSingle();
    this.getDetail();
    this.add();
    var uppy = Uppy.Core({
      locale: Uppy.locales.zh_CN,
      onBeforeUpload: function onBeforeUpload(e) {
        var progressBar = [];

        for (var eKey in e) {
          if (_this8.fileType(1, e[eKey].type)) {
            _this8.addFile(1, e[eKey].data, function (imgData) {
              imgData.data.forEach(function (item) {
                _this8.assetIds.push(item.asset_id);

                _this8.ArrangeTemporaryStorage.push(Object.assign(item, {
                  type: true
                })); // type:true 为图片，false 为视频


                _this8.temporaryStorage.push(item);
              });
              progressBar.push(true);

              _this8.upload();

              _this8.changeLogo();
            }, function () {
              return progressBar.push(false);
            });
          } else if (_this8.fileType(2, e[eKey].type)) {
            _this8.addFile(2, e[eKey].data, function (data) {
              console.log(data, "send file");
              progressBar.push(true);
              data.data.forEach(function (item) {
                _this8.assetIds.push(item.asset_id);

                _this8.ArrangeTemporaryStorage.push(Object.assign(item, {
                  type: false
                }));

                _this8.temporaryStorage.push(item);
              });

              _this8.upload();

              _this8.changeLogo();
            }, function () {
              return progressBar.push(false);
            });
          } else {
            progressBar.push(false);
          }
        } // 文件格式是否符合要求


        return true;
      }
    }).use(Uppy.Dashboard, {
      inline: true,
      target: "#drag-drop-area"
    }).use(Uppy.Tus, {
      endpoint: "https://tusd.tusdemo.net/files/"
    });
    uppy.on("complete", function (result) {
      console.log("Upload complete! We’ve uploaded these files:", result.successful);
    });
  }
});
$(".my-table-mid .row").focusin(function () {
  $(this).addClass("active");
});
$(".my-table-mid .row").focusout(function () {
  $(this).removeClass("active");
});
var mySwiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  observer: true
});
mySwiper.init();