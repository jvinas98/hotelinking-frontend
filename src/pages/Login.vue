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
          :error="$v.loginPassword.$error"
          @blur="$v.loginPassword.$touch"
          error-message="minimo 8 carácteres"
        />
        <q-btn color="primary" class="full-width" label="¡Entra!" no-caps size="lg" @click="login" />
      </q-card-section>
      <p class="q-mx-xl text-center">Si no tienes cuenta registrate haciendo click en el boton de abajo</p>
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
      <p class="q-mx-xl text-center" >Si ya tienes cuenta entra haciendo click en el boton de abajo</p>
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
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

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
      this.$v.$touch();
      if (this.$v.$error) return;
      this.$axios
        .post(this.$constants.API_DOMAIN + "auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.repeatPassword +"patito"
        })
        .then(response =>  {
          this.loginPassword = this.password;
          this.loginEmail = this.email;
          this.login();
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            message: "Ha ocurrido un error, revise los datos e intentelo de nuevo",
            color: "red-10",
            icon: "error",
            timeout: 3500
          });
        });
    },
    login: function() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.$axios
        .post(this.$constants.API_DOMAIN + "auth/login", {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          sessionStorage.setItem("token", response.data.access_token);
          this.$router.push("/offers");
        })
        .catch(error => {
           this.$q.notify({
            message: "Ha ocurrido un error, revise la contraseña y el email y vuelva a intentarlo",
            color: "red-10",
            icon: "error",
            timeout: 3500
          });
        });
    },
    changueView() {
      this.isLoginView = !this.isLoginView;
    }
  },
  validations() {
    if (!this.isLoginView) {
      return {
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
        }
      };
    } else {
      return {
        loginEmail: {
          required,
          email
        },
        loginPassword: {
          required
        }
      };
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
