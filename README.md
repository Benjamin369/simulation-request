## 模拟请求服务
```
该服务可以在后端没有服务器且前端无法使用mock等功能时，模拟出一个api server服务，可以提供相关的请求及返回数据功能。
目前该服务只能提供GET和POST请求，支持的返回数据类型有对象，字符，数字，数组，日期。
暂时不支持传入参数的校验。
GET请求配置文档：./setting/getUrl.json
POST请求配置文档：./setting/postUrl.json
相关配置说明详见：./setting/remark.json
```
### 启动方式
```js
npm i
npm run dev
```
***
__如有问题或改进意见，欢迎提出 issues 或者联系 benjamin@ismylover.cn __
