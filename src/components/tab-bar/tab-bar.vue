<template>
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
        <template v-for="(item,index) in tabbar">
            <van-tabbar-item  :to="item.path">
                <span>{{ item.text}}</span>
                <template #icon>
                    <img v-if="currentIndex!==index" :src="getAssetURL(item.image)" />
                    <img v-else :src="getAssetURL(item.imageActive)" alt="">
                </template>
            </van-tabbar-item>
        </template>
    </van-tabbar>
</template>

<script setup>
import tabbar from '@/assets/data/tabbar.js'
import { getAssetURL } from '@/utils/load_assets.js'
import { ref,watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbar.findIndex(item => item.path === newRoute.path)
    if(index==-1) return
    currentIndex.value=index
})
</script>

<style lang="less" scoped>

</style>