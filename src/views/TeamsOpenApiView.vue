<script lang="ts">
import { defineComponent } from 'vue'
import TeamsOptionsApiList from '@/components/TeamsOptionsApiList.vue'

export default defineComponent({
  name: 'TeamsOptionsApiView',
  components: { TeamsOptionsApiList }
})
</script>

<template>
  <main>
    <TeamsOptionsApiList title="Teams" />
  </main>
</template>

<style scoped></style>
