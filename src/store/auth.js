import firebase from "firebase/app";

export default {
    actions: {
        async login({commit}, {email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({commit}){
            await firebase.auth().signOut()
            await commit('clearInfo')
        },
        async register({dispatch, commit}, {email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 100000,
                    name: name,
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUserId(){
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}
