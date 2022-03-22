import axios from "axios";
import Vue from "vue";
import router from "@/router";

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        switch (response.data.code) {
            case 40001:
                Vue.prototype.$message({
                    type: "error",
                    message: response.data.message
                });
                router.push({path: "/login"}).then();
                break;
            case 50000:
                Vue.prototype.$message({
                    type: "error",
                    message: response.data.message
                });
                break;
        }
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

const requests = axios.create({
    baseURL: "/api",
    timeout: 10000,

})

export default requests