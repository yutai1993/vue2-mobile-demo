const axios = require('axios');


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export const $ajax = (params)=>{
  return new Promise((resolve, reject)=>{
    let promise;
    // 判断 请求类型  如果没传 默认 GET
    let type = params.type ? params.type : 'GET';
    // 判断 data 存不存在 不存在 默认 空对象{}
    let data = params.data ? params.data : {};
    // 判断 请求类型 是不是 GET
    if (type.toLocaleUpperCase() === 'GET'){
      promise= axios.get(params.url, {
        params: data
      })
    }
    // 判断 请求类型 是不是 POST
    if (type.toLocaleUpperCase() === 'POST'){
      promise= axios.post(params.url, data)
    }

      promise.then( res => resolve(res.data))
        .catch( error => reject(error))
  })

}


