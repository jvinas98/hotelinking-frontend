<template>
  
    <q-page  class="flex items-center justify-center" id="bg-login">
    <q-card v-if="isLoginView" id="login-card" class="row flex justify-center">
      <q-card-section id="card" class="col-10">
        <h1 class="text-center">Login</h1>
        <p>Email</p>
        <q-input outlined v-model="email" class="q-mb-md"/>
        <p>Contraseña</p>
        <q-input outlined v-model="password" class="q-mb-lg"/>
        <q-btn color="primary" class="full-width" label="¡Entra!" no-caps size="lg"/>
       
      </q-card-section>
       <p>Si no tienes cuenta registrate pinchando en registrarse</p>
        <q-btn id="change-view-button"  class="full-width" label="registrarse" size="lg" @click="changueView"/>
    </q-card>


  
    <q-card v-else id="login-card">
      <h1 class="text-center">Registro</h1>
      <q-card-section id="card" class="col-10">
        <p>Nombe</p>
        <q-input outlined v-model="name" />
        <p>Email</p>
        <q-input outlined v-model="email" />
        <p>Contraseña</p>
        <q-input outlined v-model="password" />
        <p>Repita Contraseña</p>
        <q-input outlined v-model="repeatPassword" />
        <q-btn color="primary" class="full-width" label="¡Entra!" no-caps size="lg"/>
       
      </q-card-section>
       <p>Si no tienes cuenta registrate pinchando en registrarse</p>
        <q-btn id="change-view-button"  class="full-width" label="registrarse" size="lg" @click="changueView"/>
    </q-card>
  </q-page>


  </q-page>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      isLoginView: true,
      name: "",
      email: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    register: function() {
      this.$axios
        .post("http://hotelink.test/api/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.repeatPassword
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changueView(){
      this.isLoginView = !this.isLoginView;
    }
  }
};
</script>

<style>
#login-card {
  width: 35vw;
  height: 70vh;
}

#bg-login {
  background-image: linear-gradient(90deg, #2196f3, #81d4fa);
}

#change-view-button{
  background-color: #e0e0e0;
}
</style>
