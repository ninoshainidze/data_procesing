<template>
  <div class="login_two">
    <div class="login_div">
      <img src="../assets/login.png" alt="" />
    </div>
    <div class="login_form">
      <div class="content">
          <img src="../assets/user.png" alt="" />
      <div class="input">
        <input type="text" placeholder="username" />
        <br>
        <input type="text" placeholder="password"/>
      </div>
        <button>Login</button>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "loginTwo",
};
</script>

<style scoped>
.login_two {
  text-align: center;
  margin: auto;
  width: 430px;
  height: 500px;
  padding: 60px 35px 35px 35px;
  border-radius: 20px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
}
.login_div img {
  width: 150px;
  height: 150px;
}

.login_form {
  margin-top: 50px;
  /* transform: skewY(-11deg); */
  background: white;
  height: 500px;
  border-radius: 30px;
  border-top-left-radius: 100%;
}
.login_form img {
  width: 40px;
  height: 80px;
  margin-top: -40px !important;
}
.login_form input {
  margin: 20px;
}
.content{
   /* transform: skewY(11deg);  */
}
input{
    border-radius: 7px;
    border:none;
    padding:5px;
    border-bottom:1px solid black;

}
input::placeholder{
    text-indent: 5px;
}
button{
    border:none;
    padding:15px;
    background:rgb(231, 67, 231);
    color:white;
    border-radius: 30px;
    width: 100px;

}
</style>
