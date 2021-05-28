<template>
  <div>
    <div class="login-div">
      <h1>ACCOUNT LOGIN</h1>
      <div class="fields">
        <div class="username">
          <input
            type="username"
            class="user-input"
            placeholder="Username"
            v-model="username"
          />
        </div>
        <div class="password">
          <input
            type="password"
            class="pass-input"
            placeholder="Password"
            v-model="password"
          />
        </div>
      </div>
      <button class="signin-button" v-on:click="login()">Login</button>

      <!-- <router-view /> -->
    </div>
  </div>
</template>


<script>
const axios = require("axios");
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    var log = this.$cookies.get("logged");
    console.log(log);
    if (!log) this.$router.push("/").catch(() => {});
    else {
      this.$router.push("/apipage").catch(() => {});
      this.accessToken = this.$cookies.get("accessToken");
    }
  },
  methods: {
    async login() {
      const data = {
        username: this.username,
        password: this.password,
      };
      var login = false;
      var token = "";
      await axios({
        method: "post",
        url: "https://cprtapistage.caucasusauto.com/api/v1/auth",
        data: data,
        headers: { accept: "text/plain", "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response.data.success) {
            token = response.data.accessToken;
            login = true;
          }
        })
        .catch(function (response) {
          console.log(response);
        });

      this.username = "";
      this.password = "";
      console.log(login);
      if (login) {
        console.log(login);
        this.$cookies.set("accessToken", token);
        this.$cookies.set("logged", login);
        this.$router.push("/apipage");
      }
    },
  },
};
</script>

<style scoped>
.login-div {
  text-align: center;
  margin: auto;
  width: 430px;
  height: 500px;
  padding: 60px 35px 35px 35px;
  border-radius: 40px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
}
.fields {
  margin: auto;
  align-items: center;
  width: 50%;
  padding: 75px 5px 5px 5px;
}
.fields input {
  border: none;
  outline: none;
  background: none;
  font-size: 18px;
  color: #555;
  padding: 20px 10px 20px 5px;
}
.username,
.password {
  margin-bottom: 30px;
  border-radius: 25px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
}
.signin-button {
  outline: none;
  border: none;
  cursor: pointer;
  width: 50%;
  height: 60px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background: #24cfaa;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;
  transition: 0.5s;
}
.signin-button:hover {
  background: #5ae0c3;
}
</style>
