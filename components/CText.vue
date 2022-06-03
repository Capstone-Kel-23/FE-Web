<template>
  <p
    :style="{
      fontSize: `${fontSize}px`,
      fontWeight: `${fontWeight}`,
      color: `var(--v-${color}-base)`
    }"
  >
    <slot />
  </p>
</template>

<script>
export default {
  name: 'CText',

  props: {
    fontSize: {
      type: String,
      default: '16'
    },
    fontWeight: {
      type: String,
      default: '500'
    },
    color: {
      type: String,
      default: 'blue'
    }
  }
}
</script>
