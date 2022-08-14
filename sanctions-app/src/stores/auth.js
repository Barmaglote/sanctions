import AuthService from "../service/LoginAPI/auth.service";
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
        },
        register(user) {
            return authService.register(user).then(
              user => {
                  this.state.status.loggedIn = false;
                  this.state.user = null;
                  return Promise.resolve(user);
            }, 
              error => {
                  return Promise.reject(error);
            })
          },
        changePassword(user, password) {
            return authService.changePassword(user, password).then(
              user => {
                  this.state.status.loggedIn = false;
                  this.state.user = null;
                  return Promise.resolve(user);
            }, 
              error => {
                  return Promise.reject(error);
            })
          },   
        requestrestore(username) {
          return authService.requestrestore(username).then(
            data => {
                this.state.status.loggedIn = false;
                this.state.user = null;
                return Promise.resolve(username);
          }, 
            error => {
                return Promise.reject(error);
          })
        },     
        restore(password, token) {
            return authService.restore(password, token).then(
              data => {
                  this.state.status.loggedIn = false;
                  this.state.user = null;
                  return Promise.resolve();
            }, 
              error => {
                  return Promise.reject(error);
            })
          },                               
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