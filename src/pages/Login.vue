<template>
  <q-page class="flex items-center justify-center" id="bg-login">
    <q-card v-if="isLoginView" id="login-card" class="row flex justify-center">
      <q-card-section id="card" class="col-10">
        <p class="text-center text-h1">Login</p>
        <p>Email</p>
        <q-input
          outlined
          v-model="loginEmail"
          class="q-mb-md"
          type="email"
          placeholder="obligatorio"
          :error="$v.loginEmail.$error"
          @blur="$v.loginEmail.$touch"
          error-message="correo electrónico invalido"
        />
        <p>Contraseña</p>
        <q-input
          outlined
          v-model="loginPassword"
          class="q-mb-lg"
          type="password"
          placeholder="obligatorio"
        />
        <q-btn color="primary" class="full-width" label="¡Entra!" no-caps size="lg" @click="login" />
      </q-card-section>
      <p>Si no tienes cuenta registrate haciendo click en el boton de abajo</p>
      <q-btn
        id="change-view-button"
        class="full-width"
        label="registrarse"
        size="lg"
        @click="changueView"
      />
    </q-card>

    <q-card v-else id="login-card" class="row flex justify-center">
      <p class="text-center text-h1">Registro</p>
      <q-card-section id="card" class="col-10">
        <span>Nombe</span>
        <q-input
          outlined
          v-model="name"
          dense
          placeholder="obligatorio"
          :error="$v.name.$error"
          @blur="$v.name.$touch"
          error-message="debes añadir un nombre"
        />
        <span>Email</span>
        <q-input
          outlined
          v-model="email"
          dense
          type="email"
          placeholder="obligatorio"
          :error="$v.email.$error"
          @blur="$v.email.$touch"
          error-message="correo electrónico invalido"
        />
        <span>Contraseña</span>
        <q-input
          outlined
          v-model="password"
          dense
          type="password"
          placeholder="obligatorio"
          :error="$v.password.$error"
          @blur="$v.password.$touch"
          error-message="minimo 8 carácteres"
        />
        <span>Repita Contraseña</span>
        <q-input
          outlined
          v-model="repeatPassword"
          dense
          class="q-mb-md"
          type="password"
          placeholder="obligatorio"
          :error="$v.repeatPassword.$error"
          @blur="$v.repeatPassword.$touch"
          error-message="las contraseñas no son iguales"
        />
        <q-btn color="primary" class="full-width" label="¡Entra!" no-caps @click="register" />
      </q-card-section>
      <p>Si no tienes cuenta registrate pinchando en registrarse</p>
      <q-btn
        id="change-view-button"
        class="full-width"
        label="ingresa"
        size="lg"
        @click="changueView"
      />
    </q-card>
  </q-page>
</template>

<script>
import {
  required,
  minLength,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: function() {
    return {
      isLoginView: true,
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      loginEmail: "",
      loginPassword: ""
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
    login: function() {
      this.$axios
        .post("http://hotelink.test/api/auth/login", {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          console.log(response);
          localStorage.setItem("token", response.data.access_token);
          this.$router.push("/offers");
        })
        .catch(error => {
          console.log(error);
        });
    },
    changueView() {
      this.isLoginView = !this.isLoginView;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      required,
      sameAs: sameAs(function() {
        return this.password;
      })
    },
    loginEmail: {
      required,
      email
    },
    loginPassword: {
      required
    }
  }
};
</script>

<style>
#login-card {
  width: 35vw;
}

#bg-login {
  background-image: linear-gradient(90deg, #2196f3, #81d4fa);
}

#change-view-button {
  background-color: #e0e0e0;
}
</style>
