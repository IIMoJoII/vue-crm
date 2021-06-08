import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "./common/message.plugin";
import dateFilter from "@/filters/date.filter";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Loader from "@/components/app/Loader";
import currencyFilter from "@/filters/currency.filter";

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component("Loader", Loader);


firebase.initializeApp({
  apiKey: "AIzaSyCFh_rdi5Yt7fS2wf21yY2T8dmIZ4xQnZY",
  authDomain: "mojos-crm.firebaseapp.com",
  projectId: "mojos-crm",
  storageBucket: "mojos-crm.appspot.com",
  messagingSenderId: "892339687083",
  appId: "1:892339687083:web:e5e163e45738d6451771ee",
  measurementId: "G-H3DTMV4Z6Y",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

