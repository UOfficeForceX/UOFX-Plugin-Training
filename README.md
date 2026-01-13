# U-Office Force X Plugin 範例程式

### 外掛欄位
新增外掛欄位 component 後，需進行以下設定檔設定
* [webpack-exposes.config.js](./Ede.Uofx.Customize.Web/ClientApp/webpack-exposes.config.js)
* [fields-design.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/fields-design.json)
* [fields-runtime.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/fields-runtime.json)
***
### 外掛頁面
新增外掛頁面 component 後，需進行以下設定檔設定

#### 網頁版-使用者端
* [user.module.ts](./Ede.Uofx.Customize.Web/ClientApp/src/app/web/pages/user/user.module.ts)
* [routes.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/routes.json)

#### 網頁版-管理者端
* [admin.module.ts](./Ede.Uofx.Customize.Web/ClientApp/src/app/web/pages/admin/admin.module.ts)
* [routes.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/routes.json)

#### 手機版
* [page.module.ts](./Ede.Uofx.Customize.Web/ClientApp/src/app/mobile/pages/page.module.ts)
* [routes.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/routes.json)
  
***
### 外掛面板
新增外掛面板 component 後，需進行以下設定檔設定
* [webpack-exposes.config.js](./Ede.Uofx.Customize.Web/ClientApp/webpack-exposes.config.js)
* [panels-design.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/panels-design.json)
* [panels-runtime.json](./Ede.Uofx.Customize.Web/ClientApp/src/assets/configs/panels-runtime.json)
***

#### 說明文件
* [U-Office Force X 使用手冊](https://docs.uof.tw/operationdoc/index.html)
* [U-Office Force X 開發手冊](https://docs.uof.tw/techdoc/index.html)
* [U-Office Force X SDK 類別庫手冊](https://docs.uof.tw/sdkdevdoc/api/Ede.Uofx.PubApi.Sdk.NetStd.html)