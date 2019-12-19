let Cookie = (function () {
    function getItem(key) {
        let arr = document.cookie.split("; ")
        for (let i = 0, len = arr.length; i < len; i++) {
            let CookieArr = arr[i].split("=");
            if (key == CookieArr[0]) {
                return CookieArr[1];
            }
        }
    }
    function setItem(key, val, day) {
        if (day == undefined) {
            document.cookie = `${key}=${val}`
        } else {
            let date = new Date;
            date.setDate(date.getDate() + day)
            document.cookie = `${key}=${val};expires=` + date;
        }
    }
    function keys() {
        // let arr = document.cookie.split("; ");
        // let b = [];
        // let c = [];
        // let a = arr.forEach((ele) => b.push(ele.split("=")))
        // for(let i = 0; i < b.length; i++){
        //         c.push(b[i][0])
        // }
        // return c

        let arr = document.cookie.split("; ");
        let key = []
        for (let i = 0; i < arr.length; i++) {
            let info = arr[i].split("=")
            key.push(info[0])
        }
        return key
    }
    function removeItem(key) {
        setItem(key, "", -1);
    }
    function hasItem(key) {
        return keys().includes(key);
    }
    function clearItem() {
        keys().forEach((e) => removeItem(e))
    }
    return { clearItem, hasItem, removeItem, keys, getItem, setItem }
})()