<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" class="hamburger is-active"><path data-v-659089ac="" d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path> <path data-v-659089ac="" d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path> <path data-v-659089ac="" d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" p-id="1694"></path></svg>
        </div>
        <el-breadcrumb class="app-breadcrumb" separator="/">
             <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
                <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{(item.meta.title)}}</span>
                <span v-else>{{(item.meta.title)}}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    import {signin, loginOut} from 'api'
    export default {
        data() {
            return {
                collapse: true,
                fullscreen: false,
                logoLeft: 180,
                levelList: null
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            getBreadcrumb() {
                
                let matched = this.$route.matched.filter(item => item.name)
                console.log(matched)
                const first = matched[0]
                if (first && first.name !== 'index') {
                    matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
                }
                this.levelList = matched
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    loginOut().then((data) => {
                        console.log(data)
                        localStorage.removeItem('ms_username')
                        this.$router.push('/login');
                    })
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                if (this.collapse) {
                    this.logoLeft = 65
                } else {
                    this.logoLeft = 180
                }
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped lang="scss">
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        color: #333;
        background: #fff;
        border-bottom: 1px solid #e6e6e6;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 50px;
    }
    .collapse-btn svg{
        width: 20px;
        height: 20px;
        margin-top: 10px;
    }
    .header .logo{
        float: left;
        line-height: 50px;
        transition: width .3s ease-in-out;
        background: rgb(50, 65, 87);
        box-sizing: border-box;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 50px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .el-menu{
        border-right: none;
    }
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 15px;
        line-height: 50px;
        margin-left: 10px;
        font-weight: 600;
        .no-redirect {
            color: #97a8be;
            cursor: text;
            font-weight: 600;
        }
    }
</style>
