<template>
  <q-item clickable id="offer-card" class="flex row no-wrap">
    <div id="price-content" class="text-white col-3 flex items-center justify-center">
      <span v-if="offer.price != 0.00">{{offer.price}}€</span>
      <span v-else>GRATIS</span>
    </div>

    <div id="offer-content" class="col-9">
      <p>{{offer.title}}</p>
      <p>{{offer.description}}</p>
    </div>
  </q-item>
</template>

<script>
export default {
  name: "OfferCard",
  data() {
    return {};
  },
  props: ["offer"]
};
</script>

<style>
#offer-card {
  height: 20vh;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 0;
  overflow: hidden;
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
</style>
