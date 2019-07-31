const userInterface = {
    
    // 用户登陆
    userLogin: '/api/v1/login/{userName}/{userPhone}',

    // 分页获取人员信息
    userMessageInfo:'/api/v1/getUserInfoByPage/{page}/{size}',

    // 删除用户信息
    deleteUserInfoById: '/api/v1/delete/{userId}',

    // 更新用户信息
    updataUserInfo: '/api/v1/updata/{userId}',

    // 根据手机以及用户名查询获取用户的密码
    getUserPassword: '/api/v1/getUserInfo/{userName}/{userPhone}',

    // 添加路由信息
    saveRouterInfo: '/api/v1/save',

    // 获取路由信息
    getRouterInfo: '/api/v1/getRouter',

    // 添加水果信息
    saveFruitINnfo: '/api/v1/addMessage',

    // 获取流水信息
    getTimeSheetInfo: '/api/v1/getRecord',

    // 分页获取水果信息
    getFruitByPage:'/api/v1/getData/{page}/{size}',

    // 更新用户姓名以及密码
    refreshUserMessage: '/api/v1/getUserInfo/{userId}/{userName}/{userPassword}'
}

export default userInterface;