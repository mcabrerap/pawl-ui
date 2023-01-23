import {createStore} from 'vuex'
import http from '../http/axios.http.js'

export default createStore({
    state: {
        isUserSignUp: false
    },
    getters: {
        getIsUserSignUp: state => state.isUserSignUp
    },
    mutations: {

        setIsUserSignUp(state, payload) {
            state.isUserSignUp = payload.isUserSignUp
        }

    },
    actions: {
        async signUp(context, payload) {

            const signUpResponse = await http.post('/pawl/v1/api/signup', {
                full_name: payload.fullName,
                email: payload.email,
                password: payload.password
            })

            if (signUpResponse.status === 201) {
                console.log('signUpResponse', signUpResponse)
                context.commit('setIsUserSignUp', {
                    isUserSignUp: true
                })
            }
        }
    },
    modules: {}
})
