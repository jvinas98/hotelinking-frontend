<template>
  <div>
    <q-item clickable id="offer-card" class="card-offer flex row no-wrap" @click="getOffer">
      <div id="price-content" class="text-white col-3 flex items-center justify-center">
        <span v-if="offer.price != 0.00">{{offer.price}}€</span>
        <span v-else>GRATIS</span>
      </div>

      <div id="offer-content" class="col-9">
        <p class="text-h5">{{offer.title}}</p>
        <p>{{offer.description}}</p>
      </div>
      <q-tooltip
        anchor="center left"
        self="center middle"
        transition-show="flip-right"
        transition-hide="flip-left"
      >
        Obtener oferta
      </q-tooltip>
    </q-item>
    <q-dialog v-model="infoCodeDialog">
      <q-card id="dialog-style" class="bg-primary text-white">
        <q-card-section class="text-h3 text-center">
          <p>Código del cupón</p>
          <p id="code-style">{{this.code}}</p>
          <p class="text-body1">
            Puedes cangearlo entrando en
            <span class="text-weight-bolder">MIS OFERTAS</span>
          </p>
          <q-btn
            class="full-width"
            label="¡Vale!"
            color="white"
            text-color="primary"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "OfferCard",
  data() {
    return {
      code: "",
      infoCodeDialog: false
    };
  },
  methods: {
    getOffer() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.$axios
        .post(this.$constants.API_DOMAIN + "user/offer", {
          idUser: user.id,
          idOffer: this.offer.id
        })
        .then(response => {
          this.code = response.data;
          this.infoCodeDialog = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  props: ["offer"]
};
</script>

<style>
#offer-card {
  padding: 0;
  height: 20vh;
}

#price-content {
  background-color: #fbc02d;
  padding: 20px;
  border-style: none dotted none none;
  word-wrap: break-word;
  font-size: 4vh;
}

#offer-content {
  word-wrap: break-word;
  padding: 20px;
  background-color: #ffe082;
}

#dialog-style {
  width: 60vh;
}

#code-style {
  background-color: white;
  color: black;
  border-radius: 5px;
}
</style>
