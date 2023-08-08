import { defineStore } from "pinia";

let initialState = {
  // all these properties will have their type inferred automatically
  authLoadType: "normal",
  authOrigin: "",
  auth: false,
  refreshToken: null,
  accessToken: null,
  userType: null,
  userData: {},
  mortal: {},
  tabId: null,
  BASE_BX_URL: "",
  BASE_DX_URL: "",
  BASE_EX_URL: "",
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("auth", {
  state: () => {
    return initialState;
  },



});
