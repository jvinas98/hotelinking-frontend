<template>
  <q-layout view="hHh LpR fFf" class="bg">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-h5">Ofertas y Ofertas</div>
        </q-toolbar-title>
        <q-item
          clickable
          rounded
          style="border-radius: 50px;"
          class="justify-between items-center q-pa-xs q-mr-md q-mt-xs"
          @click="logOut"
        >
          <q-icon name="power_settings_new" class="q-mr-md" size="40px" />
          <span class="text-h6 q-mr-xs">Log Out</span>
        </q-item>
      </q-toolbar>

      <q-tabs align="left" inline-label indicator-color="black">
        <q-route-tab to="/offers" label="Ofertas" active-class="text-black" />
        <q-route-tab to="/my-offers" label="Mis Ofertas" active-class="text-black" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$axios
        .get("http://hotelink.test/api/auth/logout")
        .then(response => {
          sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.$axios
      .get("http://hotelink.test/api/auth/user")
      .then(response => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>