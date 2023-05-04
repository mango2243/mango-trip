<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position">
                <span class="text" @click="getOpsition">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期范围 -->
        <div class="section date-range bottom-gray-line " @click="show = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDate }}</span>
                </div>
                <div class="stay">共{{ stayDay }}晚</div>
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDate }}</span>
                </div>
            </div>
        </div>
        <!-- 日历ui -->
        <van-calendar v-model:show="show" type="range" @confirm="onConfirm" color="#ff9854" title="选择入住时间" />

        <!-- 价格/人数选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword">关键字/位置/民宿名</div>

        <!-- 热门建议区 -->
        <div class="section hot-suggests">
            <template v-for="(item, index) in hostSugessts" :key="index">
                <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="section search-btn">
            <button class="btn" @click="SearchClick">开始搜索</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from "pinia";
import { formatMonthDay, getDiffDays } from "@/utils/format_date"
import {ref } from "vue"
import useMainStor from "@/stores/modules/main.js";
import { computed } from '@vue/reactivity';
const router = useRouter()


// 获取城市数据及路由跳转
const cityClick = () => {
    router.push('/city')
}
const getOpsition = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功", res);
    }, err => {
        console.log("获取位置失败", err);
    })
}
// 获取当前城市数据
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 处理日期
// 为使时间数据得到共享，把时间放入MainStore中
const MainStore = useMainStor()
const { nowDate, newDate } = storeToRefs(MainStore)

const startDate = computed(() => formatMonthDay(nowDate.value))
const endDate = computed(()=>formatMonthDay(newDate.value))

// 调用封装的getDiffDays处理日期差，传递的参数一定是未格式化的日期
const stayDay = ref(getDiffDays(nowDate.value, newDate.value))

// 日历ui处理
const show = ref(false)
const onConfirm = (value) => {
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    // 更新选择后的日期与时间间隔
    MainStore.nowDate = selectStartDate
    MainStore.newDate= selectEndDate

    stayDay.value = getDiffDays(selectStartDate, selectEndDate)

    show.value = false
}

//获取热门建议的数据
defineProps({
    hostSugessts: {
        type: Array,
        default: () => ([])
    }
})

// 开始搜索按钮设置
const SearchClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value,
        }
    })
}


</script>


<style lang="less" scoped>
.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        font-size: 12px;
    }

    .position {
        width: 74px;

        .text {
            position: relative;
            font-size: 12px;
            top: 2px;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}



.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid #f8f7f6;
    }
}

.hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: linear-gradient(99deg, #fa8c1d, #fcaf3f);
    }
}
</style>