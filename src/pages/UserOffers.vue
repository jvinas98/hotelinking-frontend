<template>
  <q-page padding class="row flex items-start">
    <q-tabs v-model="tab" dense active-color="primary" align="justify">
      <q-tab name="no-activate" label="Ofertas no canjeadas"></q-tab>
      <q-tab name="activate" label="Ofertas canjeadas"></q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="col-12">
      <q-tab-panel name="no-activate">
        <p
          v-if="offersOfUserNotActivate.length == 0"
          class="text-center text-h3"
        >¡Vaya! no tienes ninguna oferta.</p>

        <q-item
          class="card-offer flex column text-white bg-primary q-mb-lg flex justify-between"
          v-for="offerOfUser in offersOfUserNotActivate"
          :key="offerOfUser.id"
        >
          <div class="flex row no-wrap items-center">
            <span
              class="text-h3"
              v-if="offerOfUser.offer.price != 0.00"
            >{{offerOfUser.offer.price}}€</span>
            <span class="text-h3" v-else>GRATIS</span>
            <div class="q-ml-xl flex column justify-center">
              <p class="text-h6">{{offerOfUser.offer.title}}</p>
              <p>{{offerOfUser.offer.description}}</p>
            </div>
          </div>

          <div class="text-h2 text-center q-my-md">{{offerOfUser.code}}</div>

          <div>
            <q-btn
              color="white"
              text-color="primary"
              class="full-width"
              no-caps
              label="Canjear cupón"
              @click="activateOffer(offerOfUser)"
            ></q-btn>
          </div>
        </q-item>
      </q-tab-panel>

      <q-tab-panel name="activate">
        <p
          v-if="offersOfUserActivate.length == 0"
          class="text-center text-h3"
        >¡Vaya! no tienes ninguna oferta activada.</p>
        <q-item
          class="card-offer flex column text-white bg-grey-8 q-mb-lg flex justify-between"
          v-for="offerOfUser in offersOfUserActivate"
          :key="offerOfUser.id"
        >
          <div class="flex row no-wrap items-center">
            <span
              class="text-h3"
              v-if="offerOfUser.offer.price != 0.00"
            >{{offerOfUser.offer.price}}€</span>
            <span class="text-h3" v-else>GRATIS</span>
            <div class="q-ml-xl flex column justify-center">
              <p class="text-h6">{{offerOfUser.offer.title}}</p>
              <p>{{offerOfUser.offer.description}}</p>
            </div>
          </div>

          <div class="text-h2 text-center q-my-md">{{offerOfUser.code}}</div>
        </q-item>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: "UserOffers",
  data() {
    return {
      offersOfUserNotActivate: [],
      offersOfUserActivate: [],
      tab: "no-activate"
    };
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.$axios
      .get(this.$constants.API_DOMAIN + "user/" + user.id + "/offers")
      .then(response => {
        this.offersOfUserNotActivate = response.data.filter(
          offer => offer.activate == 0
        );
        this.offersOfUserActivate = response.data.filter(
          offer => offer.activate == 1
        );
        this.offersOfUserActivate.reverse();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    activateOffer(offerOfUser) {
      this.$axios
        .put(this.$constants.API_DOMAIN + "user/offer/activate", {
          id_offer_user: offerOfUser.id
        })
        .then(response => {
          this.offersOfUserNotActivate = this.offersOfUserNotActivate.filter(
            offer => offerOfUser.id != offer.id
          );
          this.offersOfUserActivate.unshift(offerOfUser);

          this.$q.notify({
            message: `Se ha canjeado la oferta con el código ${offerOfUser.code} correctamente`,
            color: "primary",
            icon: "check_circle",
            timeout: 3000
          });
        })
        .catch(error => {
          this.$q.notify({
            message: "Ha ocurrido un error al intentar canjear la oferta",
            color: "red-10",
            icon: "error",
            timeout: 3000
          });
        });
    }
  }
};
</script>

<style>
</style>
