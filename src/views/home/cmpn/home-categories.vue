<template>
    <div class="categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div>{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const HomeStore = useHomeStore()
const { categories } = storeToRefs(HomeStore)

</script>

<style scoped lang="less">
.categories {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    overflow-x: auto;
    height: 50px;

    &::-webkit-scrollbar {
        display: none;
    }

    .item {
        display: flex;
        flex: auto;
        flex-direction: column;
        flex-shrink: 0;
        width: 70px;

        img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>