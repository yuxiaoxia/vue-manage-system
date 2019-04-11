<template>
    <div>
        <el-select v-model="form.province" placeholder="请选择省份" size="medium" @change="changeProvince">
            <el-option :label="c.name" :value="i" v-for="(c,i) in provinceList" :key="i"></el-option>
        </el-select>
        <el-select v-model="form.city" placeholder="请选择城市" size="medium">
            <el-option :label="c.name" :value="i" v-for="(c,i) in cityList" :key="i"></el-option>
        </el-select>
        <el-select v-model="form.area" placeholder="请选择区县" size="medium">
            <el-option :label="c.name" :value="i" v-for="(c,i) in areaList" :key="i"></el-option>
        </el-select>
    </div>
</template>

<script>
    import address from '../../js/address'
    export default {
        data() {
            return {
                form: {
                    province: '',
                    city: '',
                    area: '',
                },
                provinceList: address,
                cityList: [],
                areaList: [],
            }
        },
        props: {
            province: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                default: ""
            },
            area: {
                type: String,
                default: ""
            },
        },
        methods: {
            initSetting () {
                this.provinceList.forEach((item, index) => {
                    if (this.province === item.name) {
                        this.form.province = index
                        return false
                    }
                })
                setTimeout(() => {
                    this.cityList.forEach((item, index) => {
                        if (this.city === item.name) {
                            this.form.city = index
                            return false
                        }
                    })
                    this.areaList.forEach((item, index) => {
                        if (this.area === item.name) {
                            this.form.area = index
                            return false
                        }
                    })
                }, 0)
            },
            changeProvince() {
                this.$emit('update:province', this.form.province)
            },
        },
        computed: {
        },
        watch:{
            'form.province': function(newValue, oldValue){
                console.log('newValue=' + newValue)
                console.log('oldValue=' + oldValue)
                this.form.city = ''
                this.cityList = address[newValue].children
            },
            'form.city': function(newValue, oldValue){
                console.log('newValue=' + newValue)
                console.log('oldValue=' + oldValue)
                this.form.area = ''
                if(newValue == '') {
                    this.areaList = []
                } if(newValue == 0) {
                    this.areaList = this.cityList[0].children
                } else {
                    this.areaList = this.cityList[newValue].children
                }
                
            },
             'form.area': function(newValue, oldValue){
                if(this.form.city == 0) {
                    this.areaList = this.cityList[0].children
                } else {
                    this.areaList = this.cityList[this.form.city].children
                }
            }
        },
        created(){
            this.initSetting()
        }
    }

</script>


<style scoped lang="scss">
.el-select{
    width: 150px;
}
</style>
