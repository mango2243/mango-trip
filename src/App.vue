<template>
    <router-view></router-view>
    <TabBar v-if="!route.meta.hideTabBar" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import TabBar from './components/tab-bar/tab-bar.vue'
const route=useRoute()
</script>

<style>
</style>