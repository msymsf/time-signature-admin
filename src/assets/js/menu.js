import Vue from "vue";
import router from "../../router";
import store from "../../store";
import Layout from "@/old/Layout/index.vue";
import {getMenus} from "@/api";

export function generaMenu() {
    // 查询用户菜单
    getMenus().then(({data}) => {
        if (data.flag) {
            const userMenuList = data.data;
            userMenuList.forEach(item => {
                //这里先写上，后面我会在菜单的前面加icon
                if (item.icon != null) {
                    item.icon = "iconfont " + item.icon;
                }
                //如果有子菜单的话，交给Layout加载子菜单选项，现在业务变了，所有菜单都有子菜单，默认路由为子菜单的第一个路由，所以这里注释掉了
                // if (item.component === "Layout") {
                //     item.component = Layout;
                // }

                //新的需求：我需要在这里判断是否为一级菜单，并且一级菜单有子菜单，我后端使用了Layout做了标记,
                //如果是一级菜单，我需要将默认的子菜单路由传给一级菜单

                //emm 还是得靠他加载侧边栏和导航栏的路由，交给他去控制子菜单的路由
                if (item.component === "Layout") {
                    item.component = Layout;
                }


                //判断子菜单是否为null，并加载路由
                if (item.children && item.children.length > 0) {
                    item.children.forEach(route => {
                        route.icon = "iconfont " + route.icon;
                        route.component = loadView(route.component);
                    });
                }


            });

            // 添加侧边栏菜单
            store.commit("saveUserMenuList", userMenuList);
            // 添加菜单到路由
            router.addRoutes(userMenuList);
        } else {
            Vue.prototype.$message.error(data.message);
            router.push({path: "/login"}).then();
        }
    });
}

export const loadView = view => {
    console.log(view)
    // 路由懒加载
    return resolve => require([`@/views${view}`], resolve);
};