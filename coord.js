/*------------------------
 * 经纬度获取
 * 2015.3.18 yang
 ------------------------*/
var P=(function(){
  var isGeolocation,
      obj,
      watchId,
      callback=null,
      option={
        enableHighAccuracy:false,//默认值 如果设为true,就要求客户端提供更精确的位置信息,这会导致更长的定位时间和更大的耗电,默认设为false
        timeout:10000,//默认值 等待客户端做出回应的最大毫秒数,默认值为Infinity(无限)
        maximumAge:0//默认值 客户端可以使用缓存数据的最大毫秒数,如果设为0,客户端不读取缓存,如果设为infinity,客户端只读取缓存
      },
      getSuccess=function(o){
        obj={
          is:!0,
          longitude:(o.coords.longitude||null),//经度
          latitude:(o.coords.latitude||null),//纬度
          accuracy:(o.coords.accuracy||null),//精度     
          altitude:(o.coords.altitued||null),//海拔
          altituedAccuracy:(o.coords.altituedAccuracy||null),//海拔精度(单位:m)
          heading:(o.coords.heading||null),//方向 360度表示
          speed:(o.coords.speed||null)//每秒速度(单位:m)
        };
        callback.call(obj);
      },
      handleError=function(o){
      /*            
        0: 未知错误,浏览器没有提示出错的原因,相当于常量event.UNKNOWN_ERROR
        1: 用户拒绝授权,相当于常量event.PERMISSION_DENIED
        2: 没有得到位置,GPS或其他定位机制无法定位,相当于常量event.POSITION_UNAVAILABLE
        3: 超时,GPS没有在指定时间内返回结果,相当于常量event.TIMEOUT
      */
      obj={
        is:!1,
        code:o.code,
        message:o.message
      };
      callback.call(obj);
    };
    navigator.geolocation&&(isGeolocation=!0);
    return {
      coords:function(fn){
        callback=fn;
        if(isGeolocation){
          navigator.geolocation.getCurrentPosition(getSuccess,handleError,option);
        }
        return this;
      },
      watchPosition:function(fn){
        callback=fn;
        if(isGeolocation){
          watchId=navigator.geolocation.watchPosition(getSuccess,handleError,option);
        }
        return this;
      },
      clearWatch:function(){
        watchId&&navigator.geolocation.clearWatch(watchId);
      },
      config:function(opt){
        if(typeof opt==='object'){
          for(var i in option){
            option.i=opt.i;
          }
        }
        return this;
      }
    };
}());

P.coords(function(){
  alert('您的经度:'+this.longitude+';您的纬度:'+this.latitude);
});