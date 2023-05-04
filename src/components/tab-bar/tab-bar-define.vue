<template>
    <div class="tab-bar">
        <div class="tab-bar-item" v-for="(item, index) in tabbar" :class="{ active: currentIndex === index }"
            @click="clickItem(index, item)">
            <img v-if="currentIndex != index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
            <span class="text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script setup>
import tabbar from '@/assets/data/tabbar.js'
import { getAssetURL } from '../../utils/load_assets.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const currentIndex = ref(0)
const router=useRouter()
function clickItem(index,item) {
    currentIndex.value = index
    router.push(item.path)
}
</script>

<style lang="less" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    border-top: 1px solid #f3f3f3;

    .tab-bar-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &.active {
            color: var(--primary-color);
        }

        img {
            width: 32px;

        }

        .text {
            font-size: 12px;
        }
    }
}
</style>