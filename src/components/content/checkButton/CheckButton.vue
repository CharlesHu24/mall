<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckBox",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #cccccc;
  }

  .checked {
    border-color: #ff0000;
    background-color: #ff0000;
  }
</style>
