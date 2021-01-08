/*
 * @Author       : 濑若拉
 * @Date         : 2021-01-05 15:10:43
 * @LastEditors  : 濑若拉
 * @LastEditTime : 2021-01-07 14:47:02
 * @FilePath     : /slidebar/js/main.js
 */

// js文件头部注释之后的内容
/**
 * @example ToFalse(data)
 * @description 通过state来选择显示哪个流程 主题，布置，流程
 * @param { number } state
 * @return { void }
 */
function ToHidden(state) {
    const showFlow = ['.main-form', '.state', '.process']
    document.querySelector(showFlow.splice(state, 1)).style.display = ''
    showFlow.forEach(item => document.querySelector(item).style.display = 'none')
}

let app = new Vue({
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
        planners: [
            {id: 0, name: "策划师1"},
            {id: 1, name: "策划师2"},
        ],
        curPlaner: 0,
        imageUrl: "",
        exports: [
            {id: 0, name: "配置1"},
            {id: 1, name: "配置2"},
            {id: 3, name: "配置3"},
        ],
        curExports: 0,
    },
    computed: {
        allPrice: function () {
            let allTotal = 0;
            this.offers.map((item) => {
                if (!isNaN(item.total)) allTotal += item.total;
            });
            if (isNaN(allTotal)) {
                return 0;
            }
            this.finalTotal = allTotal;
            return allTotal;
        },
    },
    methods: {
        async handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        // 测算所有总价
        calAllPrice() {
            let allTotal = 0;
            this.offers.map((item) => {
                if (!isNaN(item.total)) allTotal += item.total;
            });
            if (isNaN(allTotal)) {
                return 0;
            }
            return allTotal;
        },
        // 单条求和
        calTotal(index) {
            let offer = this.offers[index];
            offer.total = offer.price * offer.number;
            this.judgeStatus(index);
            // this.changeStatus(index, 2)
        },
        // 修改状态
        changeStatus(index, status) {
            let offer = this.offers[index];
            offer.js_status = status;
        },
        // 判断状态
        judgeStatus(index) {
            let offer = this.offers[index];
            if (offer.js_status === 0) {
                this.changeStatus(index, 2);
            }
        },
        // 开场50条
        init() {
            let dataLength = this.offers.length;
            if (dataLength >= 50) {
                return;
            }
            let count = 50 - dataLength;
            console.log(count, "count");
            for (let i = 0; i < count; i++) {
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
                    dispatched: 0,
                });
            }
        },
        // 滚动添加5条
        onScrollAdd() {
            const scrollDiv = this.$refs.scrollDiv;
            const offsetHeight = scrollDiv.offsetHeight;
            const scrollTop = scrollDiv.scrollTop;
            const scrollHeight = scrollDiv.scrollHeight;
            if (offsetHeight + scrollTop >= scrollHeight) {
                console.log("onScrollAdd");
                let dataLength = this.offers.length;
                for (let i = 0; i <= 5; i++) {
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
                        dispatched: 0,
                    });
                }
            }
        },
        // 条目删除
        deleteOffer(index) {
            let offer = this.offers[index];
            if (offer.js_status === 0) {
                this.changeStatus(index, 3);
                this.deleteOffers.push(offer);
            }
            this.offers.splice(index, 1);
        },
        // 单项选择填入表单
        singleChange(value, index) {
            const result = this.singleOption.filter((item) => item.title === value);
            // 选择已有单项
            if (result[0]) {
                let offer = this.offers[index];
                offer.cost = result[0].cost;
                offer.price = result[0].price;
                offer.item_id = result[0].id;
                offer.description = result[0].description;
            } else {
                // 新增填写单项
                offer.item_id = 0;
            }
            // 判断状态
            let offer = this.offers[index];
            if (offer.js_status === 0) {
                this.changeStatus(index, 2);
            } else {
                this.changeStatus(index, 1);
            }
            console.log(
                "value:",
                value,
                "index:",
                index,
                "result:",
                result[0],
                "| singleChange"
            );
        },
        // 过滤初始数据
        filterInitData(offer) {
            console.log(offer);
            if (offer.length !== 0) {
                const result = offer.filter((item) => item.js_status !== 4);
                return result;
            } else {
                return [];
            }
        },
        // 提交数据
        postData() {
            const offers = this.filterInitData(this.offers);
            const deletes = this.filterInitData(this.deleteOffers);
            const result = offers.concat(deletes);
            if (result.length === 0) {
                this.$message("暂未修改，无法提交");
            } else {
                // const case_id = getQueryVariable('id');
                const case_id = 5;
                const all_total_price = this.allPrice;
                const real_total_price = this.finalTotal;
                const data = result;
                console.log(all_total_price, real_total_price, data);
                if (all_total_price === 0) {
                    this.$message("总价为0,无法提交报价单");
                    return;
                }
                $.ajax({
                    url: "http://uding.com/store/api/post_items",
                    type: "POST",
                    data: {
                        case_id,
                        all_total_price,
                        real_total_price,
                        data,
                    },
                    success: function (result) {
                        console.log(result, "postData");
                    },
                });
            }
        },
        // 获取所有单项
        getAllSingle() {
            let that = this;
            $.ajax({
                url: "http://uding.com/store/api/items",
                type: "GET",
                success: function (result) {
                    const {data} = result;
                    console.log(data, "getAllSingle");
                    that.singleOption = data;
                },
            });
        },
        // 获取详情
        getDetail() {
            let that = this;
            // let case_id = getQueryVariable('id')
            let case_id = 5;
            $.ajax({
                url: `http://uding.com/store/api/last_item?case_id=${case_id}`,
                type: "GET",
                success: function (result) {
                    const {data} = result;
                    console.log(data, "getDetail");
                    const {has_details} = data;
                    if (has_details === 0) {
                        return;
                    }
                },
            });
        },
        // 获取url参数
        getQueryVariable(variable) {
            let query = window.location.search.substring(1);
            let vars = query.split("&");
            for (let i = 0; i < vars.length; i++) {
                let pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return false;
        },
        // 控制流程按钮 上一步，下一步，完成 state:number
        controlFlow(state) {
            if (this.flow === 0 && state === -1) return
            if (this.flow === 2 && state === +1) return
            this.flow += state
            ToHidden(this.flow)
        },
        // 控制流程按钮 主题，布置，流程
        controlFlowBtn(state) {
            this.flow = state
            ToHidden(state)
        }
    },
    mounted() {
        this.init();
        this.getAllSingle();
        this.getDetail();
    },
});
$(".my-table-mid .row").focusin(function () {
    $(this).addClass("active");
});
$(".my-table-mid .row").focusout(function () {
    $(this).removeClass("active");
});

let mySwiper1 = new Swiper(".swiper-container", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
