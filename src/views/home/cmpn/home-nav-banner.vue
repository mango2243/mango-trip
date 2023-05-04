<!-- 首页头部banner区 -->
<template>.
    <div class="nav">
        <div class="title">芒果旅途</div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped lang="less">
.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    border-bottom:1px solid #f2f2f2 ;
    .title{
        font-size: 16px;
        color: var(--primary-color);
        font-weight: 500;
    }
}
</style>