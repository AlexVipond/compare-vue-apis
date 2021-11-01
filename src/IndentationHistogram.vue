<template>
  <section class="
    mx-auto h-full text-6 leading-0
    flex flex-col gap-2 p-6
    font-mono text-primary-900 bg-primary-50
  ">
    <section class="h-full w-full flex gap-2">
      <section class="h-full flex flex-col justify-between">
        <div
          v-for="num in verticalNums"
          class="w-12 flex items-center justify-center"
        >{{ num }}</div>
      </section>
      <section class="relative h-full w-full flex justify-between items-end">
        <section class="absolute top-0 left-0 h-full w-full flex flex-col justify-between">
          <div
            v-for="num in verticalNums"
            class="relative w-full"
          >
            <span class="opacity-0 select-none">{{ num }}</span>
            <div class="absolute bottom-0 left-0 transform -translate-y-1/2 w-full h-px bg-primary-gray-1100"/>
          </div>
        </section>
        <div
          v-for="({ num, total }) in totals"
          class="relative w-12 flex"
          :style="{ height: `${total / maxTotal * 100}%`, minHeight: '1px' }"
        >
          <div
            class="mx-auto w-7 rounded"
            :class="total === 0 ? '' : 'bg-primary-900'"
          />
        </div>
      </section>
    </section>
    <section class="h-auto w-full flex gap-2">
      <section class="h-1 w-12"></section>
      <section class="flex gap-6 justify-between items-end">
        <div
          v-for="({ num, total }) in totals"
          class="w-12 flex-shrink-0 flex items-center justify-center"
        >{{ num }}</div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'

const props = defineProps<{
  code: string,
}>()

const indentations = props.code
        .split(`\n`)
        .map(line => line.match(/^( +)/)?.[1] ?? '')
        .map(line => line.length),
      horizontalNums = (new Array(12))
        .fill(undefined)
        .map((_, index) => index)
        .filter(num => num % 2 === 0),
      totals = shallowRef(horizontalNums.map(num => ({
        num,
        total: indentations.filter(indentation => indentation === num).length
      }))),
      maxTotal = shallowRef(60),
      verticalNums = shallowRef(new Array(maxTotal.value / 10 + 1).fill(undefined).map((_, index) => index * 10).reverse())
</script>
