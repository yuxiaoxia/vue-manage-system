const Validate = {
    // 手机验证
    isMobile(str) {
        return  /^1[34578]\d{9}$/.test(str)
    },
    isTel(str) {
        return  /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
    },
    // 限制中文
    onlyChinese(str) {
        return /^[\u4e00-\u9fa5]+$/.test(str)
    },
    // 姓名验证
    isName(str) {
        const reg = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
        return reg.test(str)
    },
    // 获取扩展名
    extension(name) {
        return /\.[^.]+$/.exec(name)[0]
    },
    // 价格校验
    isPrice(str) {
        return /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/.test(str)
    },
    // 必须包含字母和数字的组合，不能使用特殊字符，长度在 6-20 之间
    password(str) {
        return /^(?=.*\d)(?=.*[A-Za-z]).{6,20}$/.test(str)
    },
    // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    password2(str) {
        return /^[a-zA-Z]\w{5,17}$/.test(str)
    },
    // money
    money(str) {
        return /^\d*(?:\.\d{0,2})?$/.test(str)
    },
    // QQ
    isQQ(str) {
        return /^[1-9][0-9]{4,9}$/.test(str)
    },
    // 邮政编码
    isPostal(str) {
        return /[1-9]\d{5}(?!\d)/.test(str)
    },
    // 邮箱
    isEmail(str) {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    },
    // URL
    isURL(str) {
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    },
    // IP
    isIP(str) {
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
    },
}
export default Validate