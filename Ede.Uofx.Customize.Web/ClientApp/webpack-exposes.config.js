const exposes = {
  web: {
    // ./PageAdmin 名稱固定，為管理者端進入點
    './PageAdmin': './src/app/web/pages/admin/admin.module.ts',
    // ./PageUser 名稱固定，為使用者端進入點
    './PageUser': './src/app/web/pages/user/user.module.ts',
    './HelloWorld': './src/app/web/hello-world/hello-world.module.ts',
    './AdvancedField': './src/app/web/advanced-field/advanced-field.module.ts',
    './OrderFieldComplete': './src/app/web/order-field-complete/order-field-complete.module.ts',
    './Template': './src/app/web/template/your-field-name.module.ts',
  },
  app: {
    // ./Page 名稱固定，為手機端進入點
    './Page': './src/app/mobile/pages/page.module.ts',
    './HelloWorld': './src/app/mobile/hello-world/hello-world.module.ts',
    './AdvancedField': './src/app/mobile/advanced-field/advanced-field.module.ts'
  }
};

module.exports = exposes;
