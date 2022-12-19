var UIDataList={
    startTime:'2022-01-01',
    endTime:'2022-01-01',
    //startTime and endTime seems usless but i dont want to delete it
    pp:0.1,
    pr:0.1,
    batch:1,
    ap:0.7,
    redRadarIndex:-1,
    greenRadarIndex:-1,
    
}
var sight2 = {
    "平湖秋月":{position:[120.139,30.253],color:'#336633'},
    "锦带桥":{position:[120.141,30.255],color:'#0099CC'},
    "白堤":{position:[120.143,30.257],color:'#FF8C00'},
    "断桥残雪":{position:[120.145,30.259],color:'#FFD700'},
    "抱朴道院":{position:[120.147,30.261],color:'#556B2F'},
    "沙孟海旧居":{position:[120.143,30.263],color:'#7FFF00'},
    "集贤亭":{position:[120.142,30.263],color:'#008000'},
    "钱王祠":{position:[120.138,30.262],color:'#00FA9A'},
    "柳浪闻莺":{position:[120.154, 30.264],color:'#008080'},
    "万松书院":{position:[120.156, 30.256],color:'#00FFFF'},
    "雷锋夕照":{position:[120.158, 30.253],color:'#4682B4'},
    "花港观鱼":{position:[120.155, 30.250],color:'#8A2BE2'},
    "苏堤春晓":{position:[120.153, 30.245],color:'#8B008B'},
    "茅家埠":{position:[120.153, 30.244],color:'#BA55D3'},
    "三潭印月":{position:[120.152, 30.242],color:'#D8BFD8'},
    "杨公堤":{position:[120.150,30.235],color:'#FF00FF'},
    "郭庄":{position:[120.151, 30.234],color:'#FF1493'},
    "金溪山庄":{position:[120.156, 30.230],color:'#FFB6C1'},
    "曲院风荷":{position:[120.144, 30.234],color:'#F5DEB3'},
    "苏小小之墓":{position:[120.144, 30.232],color:'#8B4513'},
    "双峰插云":{position:[120.138, 30.229],color:'#D2691E'},
    "浙江省博物馆":{position:[120.137, 30.234],color:'#BC8F8F'},
    "西湖博物馆":{position:[120.136, 30.239],color:'#F0FFF0'},
    "岳王庙":{position:[120.127, 30.238],color:'#006400'},
    "灵隐寺":{position:[120.122, 30.242],color:'#1E90FF'},
    "净慈寺":{position:[120.140, 30.240],color:'#9400D3'},
    "保俶塔":{position:[120.127, 30.243],color:'#808000'},
    "丁家山":{position:[120.127, 30.246],color:'#FFFF00'},
    "九里松":{position:[120.126, 30.248],color:'#000080'},
    "宝石山":{position:[120.126, 30.251],color:'#FF0000'},
    "西湖音乐喷泉":{position:[120.128, 30.254],color:'rgb(101, 103, 171)'},
    "西湖天地":{position:[120.130, 30.254],color:'rgb(178, 111, 73)'},
    "杭州花圃":{position:[120.134, 30.254],color:'rgb(255, 107, 106)'},
    "浙江美术馆":{position:[120.118, 30.252],color:'rgb(175, 150, 134)'},
    "长桥公园":{position:[120.108, 30.247],color:'rgb(78, 155 , 109)'},
    "太子湾公园":{position:[120.101, 30.243],color:'rgb(88, 204, 254)'},
}
function yiyuanChange(){
    value = document.getElementById("youKeYiYuanRange").value
    document.getElementById("YiyuanValue").innerHTML=value+"%"
    UIDataList.ap = value
    DrawRiverView()
}function gengxinChange(){
    value = document.getElementById("youKeGengXinJianGe").value
    document.getElementById("GengxinValue").innerHTML=value
    UIDataList.batch=value
    DrawRiverView()
}function luxianChange(){
    value = document.getElementById("PRrange").value
    document.getElementById("PRValue").innerHTML=value+"%"
    UIDataList.pr = parseFloat(value)
    DrawRectMap()
    DrawRiverView()
}function jingquChange(){
    value = document.getElementById("PPrange").value
    document.getElementById("PPValue").innerHTML=value+"%"
    UIDataList.pp = parseFloat(value)
    DrawRectMap()
    DrawRiverView()
}
// function inputSceneData(){
//     value = document.getElementById("jingquData").value
//     DrawRiverView(value)
// }