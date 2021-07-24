import Vue from "vue"
import Vuex from "vuex"
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,//state只能通过muatations修改
    //设置仓库的子模块
    modules:{
        player
    }
})