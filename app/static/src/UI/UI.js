var UIDataList={
    startTime:'2022-01-01',
    endTime:'2022-01-01',
    //startTime and endTime seems usless but i dont want to delete it
}
function yiyuanChange(){
    value = document.getElementById("youKeYiYuanRange").value
    document.getElementById("YiyuanValue").innerHTML=value+"%"
}function gengxinChange(){
    value = document.getElementById("youKeGengXinJianGe").value
    document.getElementById("GengxinValue").innerHTML=value+"%"
}function luxianChange(){
    value = document.getElementById("PRrange").value
    document.getElementById("PRValue").innerHTML=value+"%"
}function jingquChange(){
    value = document.getElementById("PPrange").value
    document.getElementById("PPValue").innerHTML=value+"%"
}
function inputSceneData(){
    value = document.getElementById("jingquData").value
    DrawRiverView(value)
}