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
        isUserLoggedIn: false,
        measurementData: null,
        loadedChart: false,
        registeredDevices: [],
        deviceData: null,
        measurementStarted: false
    },
    getters: {
        getIsUserSignUp: state => state.isUserSignUp,
        getUser: state => state.user,
        getIsUserLoggedIn: state => state.isUserLoggedIn,
        getMeasurementData: state => state.measurementData,
        getLoadedChart: state => state.loadedChart,
        getRegisteredDevices: state => state.registeredDevices,
        getDeviceData: state => state.deviceData,
        getMeasurementStarted: state => state.measurementStarted
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
        },
        setMeasurementData(state, payload) {
            state.measurementData = payload.measurementData
        },
        setLoadedChart(state, payload) {
            state.loadedChart = payload.loadedChart
        },
        setRegisteredDevices(state, payload) {
            state.registeredDevices = payload.registeredDevices
        },
        setDeviceData(state, payload) {
            state.deviceData = payload.deviceData
        },
        setMeasurementStarted(state, payload) {
            state.measurementStarted = payload.measurementStarted
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

                localStorage.setItem('user', JSON.stringify(logInResponse.data.user))
                localStorage.setItem('accessToken', logInResponse.data.accessToken)
            }
        },
        autoLogIn(context) {
            const user = JSON.parse(localStorage.getItem('user'))
            const accessToken = localStorage.getItem('accessToken')

            if (user && accessToken) {
                context.commit('setUser', {
                    user: {
                        id: user._id,
                        email: user.email,
                        full_name: user.full_name,
                        verified: user.verified,
                        accessToken: accessToken
                    }
                })

                context.commit('setIsUserLoggedIn', {
                    isUserLoggedIn: true
                })
            }
        },
        logOut(context) {
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')

            context.commit('setUser', {
                user: {
                    id: '',
                    email: '',
                    full_name: '',
                    verified: false,
                    accessToken: ''
                }
            })

            context.commit('setIsUserLoggedIn', {
                isUserLoggedIn: false
            })
        },
        async startMeasurement(context, payload) {

            context.commit('setMeasurementStarted', {
                measurementStarted: true
            })

            await http.put(`/pawl/v1/api/command/${payload.deviceId}`, {
                name: 'STARTED_MEASUREMENT',
                identifier: payload.identifier
            })

            let commandResponse = await http.get(`/pawl/v1/api/command/${payload.deviceId}`)

            while (commandResponse.data.name !== 'STOPPED_MEASUREMENT') {
                await new Promise(resolve => setTimeout(resolve, 1000))
                commandResponse = await http.get(`/pawl/v1/api/command/${payload.deviceId}`)
            }

            const responseData = await http.get(`/pawl/v1/api/data/${payload.identifier}`)

            await context.commit('setMeasurementData', {
                measurementData: responseData.data
            })

            await context.commit('setLoadedChart', {
                loadedChart: true
            })

            context.commit('setMeasurementStarted', {
                measurementStarted: false
            })

        },
        async getRegisteredDevices(context) {

            let registeredDevices = await http.get(`/pawl/v1/api/command/`)

            context.commit('setRegisteredDevices', {
                registeredDevices: registeredDevices.data
            })
        },
        async getDeviceData(context, payload) {

            const responseData = await http.get(`/pawl/v1/api/data/${payload.deviceId}`)

            await context.commit('setDeviceData', {
                deviceData: responseData.data
            })
        }

    },
    modules: {}
})
