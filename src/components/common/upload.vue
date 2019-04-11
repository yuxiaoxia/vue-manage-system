<template lang="html">
<el-upload
    class="myavatar-uploader"
    action="https://upload-z2.qiniup.com"
    :show-file-list="false"
    :data="qiniuData"
    :before-upload="getQiniuToken"
    :on-error="handleAvatarError"
    :on-success="handleAvatarSuccess">
    <img v-if="src" :src="src" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { qiniuDomain } from 'api'
export default {
    data() {
        return {
        }
    },
    props: {
        src: {
            type: String,
            default: ""
        },
    },
    computed: {
        ...mapState({
           qiniutoken: state => state.qiniutoken,
        }),
        qiniuData () {
			return {token: this.qiniutoken}
		},
    },
    methods: {
        ...mapActions([
			'getQiniuToken',
		]),
        beforeUpload(file) {
			this.getQiniuToken()
		},
        handleAvatarError() {
            this.$emit('update:src', '')
        },
        handleAvatarSuccess(res, file) {
			let imageUrl = qiniuDomain + res.key
            console.log(imageUrl)
			this.$emit('update:src', imageUrl)
		},
        handleRemove() {
            this.$emit('remove', '')
        },
    },
    created(){
        this.getQiniuToken()
    }
    
}

</script>

<style lang="scss" scoped>
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
