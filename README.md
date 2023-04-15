### 开发技术
基于vue3.2 + vite + pinia + element plus + vue router实现的信息资讯平台；在客户端进行了响应式设计。
### 功能介绍
#### 客户端界面
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681569330084-e55c7691-77be-4e85-b9e4-79c2da97e1de.png#averageHue=%23faf9f9&clientId=u0bfe4e3a-b5e2-4&from=paste&height=964&id=u8231a0d9&name=image.png&originHeight=964&originWidth=1650&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59777&status=done&style=none&taskId=uf160e27b-34f1-4e75-8187-ecba7ab8844&title=&width=1650)
顶部导航栏可以直接前往设定好的分类列表，站内搜索可以对文章进行一个模糊搜索。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681569413736-730adc19-2d71-400c-9171-f1374ae35aeb.png#averageHue=%23b0dae7&clientId=u0bfe4e3a-b5e2-4&from=paste&height=759&id=u39ebcd5a&name=image.png&originHeight=759&originWidth=1482&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116483&status=done&style=none&taskId=uab472c7e-1a06-403a-9bd5-9bd10c3079f&title=&width=1482)
往下拉的最新资讯部分，展示软件/硬件相关的最新五篇。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681569518602-d4b3be34-02e4-48e8-a4a9-e2f2c55917fa.png#averageHue=%23fcfcfc&clientId=u0bfe4e3a-b5e2-4&from=paste&height=492&id=u198bee06&name=image.png&originHeight=492&originWidth=521&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14946&status=done&style=none&taskId=u5c4b851a-1d39-4e12-977e-0455baf822c&title=&width=521)
分辨率缩小时，可以通过点击首页左边的切换按钮，显示模态框。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570399279-5ad65310-64c3-4a87-903d-702233ba60af.png#averageHue=%23fdfdfc&clientId=u0bfe4e3a-b5e2-4&from=paste&height=490&id=uc882d805&name=image.png&originHeight=490&originWidth=476&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17034&status=done&style=none&taskId=u3c65bb57-5923-4087-8b3a-d3c0e16464a&title=&width=476)
用户登录界面。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570485970-75002883-32be-4547-bbe0-2c15c1629153.png#averageHue=%23cff4f0&clientId=u0bfe4e3a-b5e2-4&from=paste&height=454&id=u2e037a06&name=image.png&originHeight=454&originWidth=1450&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40306&status=done&style=none&taskId=u6230299e-f3fc-4678-86a6-b26e055f879&title=&width=1450)
用户个人空间的功能模块。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570506894-c1ce58d7-102e-4671-b541-584f36cf42dd.png#averageHue=%23b19ef2&clientId=u0bfe4e3a-b5e2-4&from=paste&height=177&id=u81570e03&name=image.png&originHeight=177&originWidth=1439&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71292&status=done&style=none&taskId=ub83cf886-8755-4f39-b9a1-b51df83d4e1&title=&width=1439)
积分显示。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570519463-fc3079fe-834b-4e3e-b9f6-9489738e992f.png#averageHue=%23fdfdfd&clientId=u0bfe4e3a-b5e2-4&from=paste&height=497&id=u3cc4944c&name=image.png&originHeight=497&originWidth=1453&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29812&status=done&style=none&taskId=u3e58e88c-a49a-45ba-8b41-f011a2b1f03&title=&width=1453)
充值表。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570532319-ed6a2bdc-522f-4b08-9c52-14ed90e53f84.png#averageHue=%23fdfdfd&clientId=u0bfe4e3a-b5e2-4&from=paste&height=360&id=u56681ebe&name=image.png&originHeight=360&originWidth=1440&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36478&status=done&style=none&taskId=u5c4eb4ee-e686-492c-b79a-c10b0b85203&title=&width=1440)
订单表。
#### 后台管理界面
路由改成 /login
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570815673-6d76232f-24e3-454f-a542-a14d9e9f3505.png#averageHue=%23e9ecf6&clientId=u0bfe4e3a-b5e2-4&from=paste&height=609&id=u015616e2&name=image.png&originHeight=609&originWidth=1113&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96732&status=done&style=none&taskId=u080b01da-6663-4734-b874-c9871f8e42b&title=&width=1113)
功能选项
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570850290-61a3c19b-497a-469e-b67b-fd1110a8efb5.png#averageHue=%23fefdfd&clientId=u0bfe4e3a-b5e2-4&from=paste&height=232&id=u3b8b405c&name=image.png&originHeight=232&originWidth=190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6624&status=done&style=none&taskId=ud612b353-47bf-4823-bc8c-82e1e3cdc42&title=&width=190)
首页 数据可视化
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570866551-36942fb8-750c-402b-97a1-67c6ebef8033.png#averageHue=%23f6c979&clientId=u0bfe4e3a-b5e2-4&from=paste&height=888&id=u572fafca&name=image.png&originHeight=888&originWidth=1665&originalType=binary&ratio=1&rotation=0&showTitle=false&size=109911&status=done&style=none&taskId=u0dc77273-37d3-430d-a98e-2a19bb96aba&title=&width=1665)
文章管理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570880242-2c811e4a-a948-4ae0-9a54-813971d33906.png#averageHue=%23e7ce9f&clientId=u0bfe4e3a-b5e2-4&from=paste&height=824&id=u0f82956c&name=image.png&originHeight=824&originWidth=1601&originalType=binary&ratio=1&rotation=0&showTitle=false&size=276784&status=done&style=none&taskId=u9645ec94-bb7c-4040-be91-93654c29f75&title=&width=1601)
用户管理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570892430-edc7dae0-5611-4cbb-9f17-cce3c022e449.png#averageHue=%23eed69d&clientId=u0bfe4e3a-b5e2-4&from=paste&height=427&id=ucf0e1e80&name=image.png&originHeight=427&originWidth=1585&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63508&status=done&style=none&taskId=u057f2439-4939-43cd-83c4-216942e225b&title=&width=1585)
权限管理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33692003/1681570901879-616f22aa-75ce-4217-ab98-6db6f72af986.png#averageHue=%23f4f3cd&clientId=u0bfe4e3a-b5e2-4&from=paste&height=266&id=u6fe41376&name=image.png&originHeight=266&originWidth=1584&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28932&status=done&style=none&taskId=u2d670096-36a4-42b3-84e0-326a35817db&title=&width=1584)
### 项目使用
```javascript
// 下载所需依赖
npm i
// 项目运行
npm run dev
```
