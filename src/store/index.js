import {createStore} from 'vuex'
import http from '../http/axios.http.js'

export default createStore({
    state: {
        signUpUser: {
            fullName: null,
            email: null,
        }
    },
    getters: {
        getSignUpUser: state => state.signUpUser
    },
    mutations: {

        setSignUpUserData(state, payload) {
            state.signUpUser = payload
        }

    },
    actions: {
        async signUp(context, payload) {

            console.log('signUp action', payload)
            const signUpResponse = await http.post('/pawl/v1/api/signup', {
                full_name: payload.fullName,
                email: payload.email,
                password: payload.password
            })

            if (signUpResponse.status === 201) {

                context.commit('setSignUpUserData', {
                    fullName: payload.fullName,
                    email: payload.email
                })
            }
        }
    },
    modules: {}
})
