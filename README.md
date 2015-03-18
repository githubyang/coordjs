# coordjs
经纬度坐标获取

获取用户的地理位置,使用它需要得到用户的授权,浏览器会跳出一个对话框,询问用户是否许可当前页面获取他的地理位置.
目前只能支持经纬度获取和监听用户位置的持续改变.

# API

```javascript
// 获取用户位置信息
P.coords(function(){
  alert('您的经度:'+this.longitude+';您的纬度:'+this.latitude);
  // this是返回的用户地理位置信息如下
  {
    is:'布尔值 代表获取成功还是失败',
    longitude:'经度'
    latitude:'纬度',
    accuracy:'精度'    
    altitude:'海拔'
    altituedAccuracy:'海拔精度(单位:m)',
    heading:'方向 360度表示'
    speed:'每秒速度(单位:m)'
    code:'错误代码',
    message:'错误消息'
  };
  // 如果出错了 以下为错误代码
	0: 未知错误,浏览器没有提示出错的原因,相当于常量event.UNKNOWN_ERROR
  1: 用户拒绝授权,相当于常量event.PERMISSION_DENIED
  2: 没有得到位置,GPS或其他定位机制无法定位,相当于常量event.POSITION_UNAVAILABLE
  3: 超时,GPS没有在指定时间内返回结果,相当于常量event.TIMEOUT
});

// 监听用户位置的持续改变
P.watchPosition(function(){
	//返回的数据和上面的一样,只不过是它是持续监听
});
// 取消持续监听
P.clearWatch();
```
