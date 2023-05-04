<template>
    <!--   <div class="content">
        <template v-for="group in group_data.cities">
            <h3 class="title">{{ group.group }}</h3>
            <li v-for="city in group.cities" class="item">
                {{ city.cityName }}
            </li>
        </template>
    </div> -->
    <van-index-bar>
        <div class="hostCityList">
            <van-cell title="热门" />
            <template v-for="item in group_data.hotCities">
                <div class="city" @click="cityClick(item)">
                    {{ item.cityName }}
                </div>
            </template>
        </div>
        <template v-for="group in group_data.cities">
            <van-index-anchor :index="group.group" />
            <li v-for="city in group.cities">
                <van-cell :title="city.cityName" @click="cityClick(city)" />
            </li>
        </template>
    </van-index-bar>
</template>

<script setup>
import useCityStore from '@/stores/modules/city'
import { useRouter } from 'vue-router'
defineProps({
    group_data: {
        type: Object,
        default: () => ({})
    }
})


// 监听城市的点击
const cityStore = useCityStore()
const router=useRouter()
const cityClick = (city) => {
    console.log(city)
    cityStore.currentCity = city
    router.back()
}
</script>

<style scoped lang="less">
.hostCityList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
    }
}
</style>