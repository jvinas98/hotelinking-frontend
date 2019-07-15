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
        >
          <q-icon name="account_circle" class="q-mr-md" size="40px" />

          <span class="text-h6 q-mr-xs">Testeo</span>
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
  }
};
</script>