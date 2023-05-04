<template>
    <dic class="city">
        <div class="top">
            <!-- 搜索框 -->
            <van-search v-model="value" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />
            <!-- tab切换栏 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <template v-for="(value, key, index) in allCities">
            <!-- <h2 v-show="tabActive === key">{{ value.title }}</h2> -->
            <tab-city v-show="tabActive === key" :group_data="value" />
        </template>
    </dic>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";
import TabCity from './cmpn/tab-city.vue'
// 搜索框功能
const searchValue = ref("")
const router = useRouter()
const cancelClick = () => {
    router.back()
}

// tab切换
const tabActive = ref(0)

//1.直接调用方法获取城市数据 (请求过多不方便管理)
/* const allCity = ref({})
getCityAll().then(res => {
    allCity.value=res.data
})  */

//2.仓库中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)


// 获取选中标签的数据
/* 目的：获取选中标签后的数据
1.获取正确key:将tabs中绑定的tabAction正确绑定
2.根据key从allcities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed */
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style>
.top {
    position: relative;
    z-index: 999;

}


.van-index-bar {
    height: calc(100vh - 98px);
    overflow-y: auto;
}
</style>