<template>
  <q-page class="flex row justify-between" padding v-if="!$q.screen.lt.md">
    <offer-card class="col-5 q-mb-md" v-for="offer in offers" :key="offer.id" :offer="offer" />
  </q-page>
  <q-page v-else>
    <offer-card class="col-12 q-ma-md" v-for="offer in offers" :key="offer.id" :offer="offer" />
  </q-page>
</template>

<script>
import OfferCard from "../components/OfferCard";
export default {
  name: "PageIndex",
  data() {
    return {
      offers: []
    };
  },
  created() {
    console.log("envio peticion");
    this.$axios
      .get( this.$constants.API_DOMAIN + "offers")
      .then(response => {
        console.log(response);
        this.offers = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    OfferCard
  }
};
</script>

<style>
</style>