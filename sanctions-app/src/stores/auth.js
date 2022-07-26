import AuthService from "../service/LoginAPI/AuthService";
const localStorageKey = 'barmaglote.sanctions.user'; // TODO: Move to .env
let user = null; 
try {
    user = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : null;
} catch {
    localStorage.removeItem(localStorageKey);
    user = null;
}

import { defineStore } from "pinia";

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const authService = new AuthService();

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            state: initialState
        }
    },
    actions: {
        login(user) {
          return authService.login(user).then(
            user => {
                this.state.status.loggedIn = true;
                this.state.user = user;
                return Promise.resolve(user);
          }, 
            error => {
                return Promise.reject(error);
          })
        },
        async refreshToken(accessToken){
            this.state.status.loggedIn = true;
            this.state.user = { ...state.user, accessToken: accessToken };
        },
        logout(){
            authService.logout();
            this.state.user = null;
            this.state.status.loggedIn = false;
        }
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
        getStatus: (state) => {
            return state.status;
        }        
    }
});