import Vue from 'vue'
import router from 'vue-router'
// import Login from './components/Login'
import LoginTwo from './components/LoginTwo'
import ApiPage from './components/ApiPage'

Vue.use(router)
 
const VueRouter = new router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    { path: '/', name:'loginTwo',component: LoginTwo},
    { path: '/apipage',name:'api', component: ApiPage},
    ]
})

export default VueRouter