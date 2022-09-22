const DataView = {template:'<div id="DataViewDiv"><label id="DataViewLabel1">推荐位分析/直播数据分析</label><label id="DataViewLabel2">数据查询</label><input type="date" id="StartTimeInput" value="2022-01-01" min="2022-01-01" max="2022-01-20"><label id="DataViewLabel3">——</label><input type="date" id="EndTimeInput" value="2022-01-01" min="2022-01-01" max="2022-01-20"><div id="DataViewUiDiv">    <h4>控制面板</h4></div><div id="DataViewMinPathDiv">    <h4>网络视图</h4></div><div id="DataViewRiverDiv">    <h4>河流视图</h4>    <svg id="RiverViewSvg"></svg></div><div id="DataViewHeatDiv">    <h4>地图-热力图</h4>    <div id="DataViewHeatMap"></div></div></div>'}
const Main = {template:'<div >Main</div>'}

const routes=[
    {path:'/main',component:Main},
    {path:'/DataView',component:DataView}
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')





