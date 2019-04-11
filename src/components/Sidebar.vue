<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="$route.path" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" unique-opened router>
             <el-menu-item index="dashboard" key="dashboard">
                <i class="el-icon-setting"></i><span slot="title">首页</span>
            </el-menu-item>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.resourceCode" :key="item.resourceCode">
                        <template slot="title">
                            <i class="el-icon-setting"></i><span slot="title">{{ item.resourceName }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.resourceUrl">
                            {{ subItem.resourceName }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.resourceCode" :key="item.resourceCode">
                        <i class="el-icon-setting"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { menuList } from 'api'
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                menuLists: [],
                items: [
                    {
                        icon: '',
                        index: '/dashboard',
                        title: '首页',
                        resourceCode: '/dashboard',
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            getData() {
                // menuList().then((data) => {
                //     this.menuLists = data
                // })
            },
        },
        created(){
            this.getData()
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {

                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: relative;
        left: 0;
        top: 0px;
        bottom:0;
        overflow-y: scroll;
        font-size: 12px;
            height: 100%;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 180px;
        font-size: 12px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
