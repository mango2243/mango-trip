<template>
    <!-- 导航栏 -->
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <template v-for="item in mainPart.topModule.housePicture.housePics">
            <van-swipe-item><img :src="item.url" alt=""></van-swipe-item>
        </template>
        <!-- 自定义指示器 -->
        <template #indicator="{ active, total }">
            <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
        </template>
    </van-swipe>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailList } from "@/services/modules/detail.js";
import { computed, ref } from "vue";
const route = useRoute()
const router = useRouter()

const onClickLeft = () => {
    router.back()
}

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
const houseId = route.params.id
getDetailList(houseId).then(res => {
    detailInfos.value = res.data
})
</script>

<style scope lang="less">
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;

    img {
        width: 100%;
    }
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
}
</style>