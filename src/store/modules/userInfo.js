const userInfo  = {
    state: {
        userInfo: {
            userName:'xiaozhang',
            userRole:'Vip'
        }
    },

    mutations: {
        SAVE_USER_INFO(state,userMessage) {
            state.userInfo = userMessage;
        }
    },
    
    actions: {
        saveUserInfo({commit}, userMessage) {
            commit('SAVE_USER_INFO', userMessage);
        }
    }
}



export default userInfo;
