$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullWeather(remote_ip_info.city)
    // console.log(remote_ip_info.city);
});

var data;
$.ajax({
    url:"http://api.jisuapi.com/weather/city?appkey=baeb80d1079b2863&city",
    dataType:"jsonp",
    success:function(r) {
        data = r.result;
        console.log(r)
        var province=$.grep(data,function(val,index){
            return  val.parentid==0;
        });
        $.each($(".province ul li"),function(index,ele){
            $(ele).html(province[index].city);
            $(ele).attr("provinceid",province[index].cityid)
        });
    }
})
$(".province ul li").each(function(index,ele){
    $(ele).click(function(){
        $(".city ul").html("");
        $(".province ul li").removeClass("selected");
        $(ele).addClass("selected");
        var city=$.grep(data,function(val,index){
            return val.parentid==$(ele).attr("provinceid");
        });
        $.each(city,function(index,ele){
            $("<li>").html(city[index].city).appendTo($(".city ul"));
        });
        $(".city ul li").each(function(index,ele){
            $(ele).click(function(){
                getFullWeather($(ele).html());
            })
        });
    })
});
function getFullWeather(city){
    $(".h-middle").html(city);
    $.ajax({
        url: "http://api.jisuapi.com/weather/query?appkey=baeb80d1079b2863&city="+city,
        dataType: "jsonp",
        success: function (r) {
            console.log(r);
            var weatherObj = r.result;
            $(".n-temp").html(weatherObj.temp + "°");
            $(".n-city").html(weatherObj.city);
            $(".n-w").html(weatherObj.weather);

            $(".daily").each(function (index, ele) {
                $(ele).find(".date").html(weatherObj.daily[index + 1].week);
                $(ele).find(".imgbox img").attr("src", "img/weathercn02/" + weatherObj.daily[index + 1].day.img + ".png");
                $(ele).find(".temp").html(weatherObj.daily[index + 1].day.temphigh + "°");
            });

            $(".n-top-lie").each(function (index, ele) {
                $(ele).find(".wind-zhi").html(weatherObj.winddirect);
            });
            $(".n-top-lie").each(function (index, ele) {
                $(ele).find(".wind-li").html(weatherObj.windpower);
            });
            $(".n-top-lie").each(function (index, ele) {
                $(ele).find(".wind-qi").html(weatherObj.windspeed);
            });

        }
    });
}
$(".h-left").click(function(){
    $(".city-cover").show(500);
});
$(".return").click(function(){
    $(".city-cover").hide(500);
});