import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/favor",
            component: () => import("@/views/favor/favor.vue")
        },
        {
            path: "/message",
            component: () => import("@/views/message/message.vue")
        },
        {
            path: "/order",
            component: () => import("@/views/order/order.vue")
        },
        {
            path: "/city",
            component: () => import("@/views/city/city.vue"),
            meta: {
                hideTabBar: true
            }
        },
        {
            name:'search',
            path: "/search",
            component: () => import("@/views/search/search.vue"),
            meta: {
                hideTabBar: true
            }
        },
        {
            name:'detail',
            path: "/detail//:id",
            component: () => import("@/views/detail/detail.vue"),
            meta: {
                hideTabBar: true
            }
        },
        
    ]
})


export default router