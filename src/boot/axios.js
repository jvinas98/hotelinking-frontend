import axios from 'axios'

export default async ({ Vue, router }) => {

  axios.interceptors.request.use(function (configuration) {
    let token = localStorage.getItem('token');

    if (token) {
      configuration.headers.Authorization = `Bearer ${token}`;
    }

    return configuration;

  }, function (error) {
    console.log('error request', error)
    return Promise.reject(error);
  });

  // Response Interceptor
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log("error en axios interceptor")
    if (error.response.status === 401) {
      localStorage.clear();
      router.push('/login');
    }
    return Promise.reject(error);
  });

  Vue.prototype.$axios = axios

}
