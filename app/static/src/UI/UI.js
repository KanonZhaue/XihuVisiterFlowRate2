var UIDataList={
    startTime:'2022-01-01',
    endTime:'2022-01-01',
    //startTime and endTime seems usless but i dont want to delete it
    pp:0.1,
    pr:0.1,
    batch:5,
    ap:70,
    RadarIndex:-1,
    
}
var sight2 = {
    "Autumn Moon and Calm Lake":{position:[120.139,30.253],color:'#336633'},
    "Jindai Bridge":{position:[120.141,30.255],color:'#0099CC'},
    "Bai Causeway":{position:[120.143,30.257],color:'#FF8C00'},
    "Broken Bridge Canxue sites":{position:[120.145,30.259],color:'#FFD700'},
    "Baopu Taoist Temple":{position:[120.147,30.261],color:'#556B2F'},
    "Former Residence of Sha Menghai":{position:[120.143,30.263],color:'#7FFF00'},
    "Jixian Pavilion":{position:[120.142,30.263],color:'#008000'},
    "King Qian's temple":{position:[120.138,30.262],color:'#00FA9A'},
    "Orioles Singing in the Willows":{position:[120.154, 30.264],color:'#008080'},
    "Wansong Academy":{position:[120.156, 30.256],color:'#00FFFF'},
    "Lei Feng afterglow":{position:[120.158, 30.253],color:'#4682B4'},
    "Fish Viewing at the Flower Pond":{position:[120.155, 30.250],color:'#8A2BE2'},
    "Sudi Chunxiao":{position:[120.153, 30.245],color:'#8B008B'},
    "Maojiabu":{position:[120.153, 30.244],color:'#BA55D3'},
    "Three pools mirroring the moon":{position:[120.152, 30.242],color:'#D8BFD8'},
    "Yang Gong causeway":{position:[120.150,30.235],color:'#FF00FF'},
    "Guo's Villa":{position:[120.151, 30.234],color:'#FF1493'},
    "JinxiHotel":{position:[120.156, 30.230],color:'#FFB6C1'},
    "Breeze-ruffled Lotuses Beside Winery":{position:[120.144, 30.234],color:'#F5DEB3'},
    "Tomb of Su Xiaoxiao":{position:[120.144, 30.232],color:'#8B4513'},
    "Two Peaks Piercing the Clouds":{position:[120.138, 30.229],color:'#D2691E'},
    "Zhejiang Provincial Museum":{position:[120.137, 30.234],color:'#BC8F8F'},
    "West Lake Museum":{position:[120.136, 30.239],color:'#F0FFF0'},
    "Yuewang Temple":{position:[120.127, 30.238],color:'#006400'},
    "Lingyin Temple":{position:[120.122, 30.242],color:'#1E90FF'},
    "Jingci Temple":{position:[120.140, 30.240],color:'#9400D3'},
    "Baochu Tower":{position:[120.127, 30.243],color:'#808000'},
    "Dingjiashan":{position:[120.127, 30.246],color:'#FFFF00'},
    "Jiulisong":{position:[120.126, 30.248],color:'#136985'},
    "Baoshi Mountain":{position:[120.126, 30.251],color:'#FF0000'},
    "West Lake Music Fountain":{position:[120.128, 30.254],color:'rgb(101, 103, 171)'},
    "Xihu new land":{position:[120.130, 30.254],color:'rgb(178, 111, 73)'},
    "Hangzhou Garden":{position:[120.134, 30.254],color:'rgb(255, 107, 106)'},
    "Zhejiang Art Museum":{position:[120.118, 30.252],color:'rgb(175, 150, 134)'},
    "Changqiao Park":{position:[120.108, 30.247],color:'rgb(78, 155 , 109)'},
    "Prince Bay Park":{position:[120.101, 30.243],color:'rgb(88, 204, 254)'},
}
function yiyuanChange(){
    value = document.getElementById("youKeYiYuanRange").value
    document.getElementById("YiyuanValue").innerHTML=value+"%"
    UIDataList.ap = parseFloat(value)

}function gengxinChange(){
    value = document.getElementById("youKeGengXinJianGe").value
    document.getElementById("GengxinValue").innerHTML=value
    UIDataList.batch=parseFloat(value)

}function luxianChange(){
    value = document.getElementById("PRrange").value
    document.getElementById("PRValue").innerHTML=parseFloat(value)*100+"%"
    UIDataList.pr = parseFloat(value)
    DrawRectMap()

}function jingquChange(){
    value = document.getElementById("PPrange").value
    document.getElementById("PPValue").innerHTML=parseFloat(value)*100+"%"
    UIDataList.pp = parseFloat(value)
    DrawRectMap()

}
// function inputSceneData(){
//     value = document.getElementById("jingquData").value
//     DrawRiverView(value)
// }
function drawRIverTotalMap(){
    DrawRiverView()
}