import {createStore} from 'vuex'
import http from '../http/axios.http.js'

export default createStore({
    state: {
        isUserSignUp: false,
        user: {
            id: '',
            email: '',
            full_name: '',
            verified: false,
            accessToken: ''
        },
        isUserLoggedIn: false
    },
    getters: {
        getIsUserSignUp: state => state.isUserSignUp,
        getUser: state => state.user,
        getIsUserLoggedIn: state => state.isUserLoggedIn
    },
    mutations: {

        setIsUserSignUp(state, payload) {
            state.isUserSignUp = payload.isUserSignUp
        },
        setUser(state, payload) {
            state.user = payload.user
        },
        setIsUserLoggedIn(state, payload) {
            state.isUserLoggedIn = payload.isUserLoggedIn
        },
        setAuthError(state, payload) {
            state.authError = payload.authError
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
        },
        async logIn(context, payload) {
            const logInResponse = await http.post('/pawl/v1/api/login', {
                email: payload.email,
                password: payload.password
            })

            if (logInResponse.status === 200) {
                console.log('logInResponse', logInResponse)
                context.commit('setUser', {
                    user: {
                        id: logInResponse.data.user._id,
                        email: logInResponse.data.user.email,
                        full_name: logInResponse.data.user.full_name,
                        verified: logInResponse.data.user.verified,
                        accessToken: logInResponse.data.accessToken
                    }
                })
                context.commit('setIsUserLoggedIn', {
                    isUserLoggedIn: true
                })
            }
        }
    },
    modules: {}
})
