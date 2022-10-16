<template>
  <section
    v-for="chart in [linesChart, charactersChart]"
    class="
      mx-auto h-full text-6 leading-0
      flex flex-col gap-2 p-6
      font-mono text-primary-900 bg-primary-50
    "
  >
    <section class="h-full w-full flex gap-2">
      <section class="h-full flex flex-col justify-between">
        <div
          v-for="label in chart.verticalLabels"
          class="w-24 flex items-center justify-center"
        >{{ label }}</div>
      </section>
      <section class="relative w-full flex justify-between items-end">
        <section class="absolute top-0 left-0 h-full w-full flex flex-col justify-between">
          <div
            v-for="label in chart.verticalLabels"
            class="relative w-full"
          >
            <span class="opacity-0 select-none">{{ label }}</span>
            <div class="absolute bottom-0 left-0 transform -translate-y-1/2 w-full h-px bg-primary-gray-1100"/>
          </div>
        </section>
        <div
          v-for="codeMeta in [code1Meta, code2Meta]"
          class="relative w-24 flex"
          :style="{ height: `${codeMeta[chart.prop] / chart.maxTotal * 100}%`, minHeight: '1px' }"
        >
          <div class="mx-auto w-7 rounded bg-primary-900" />
        </div>
      </section>
    </section>
    <section class="h-auto w-full flex gap-2">
      <section class="h-1 w-24"></section>
      <section class="flex gap-6 justify-between items-end">
        <div
          v-for="label in chart.horizontalLabels"
          class="w-24 flex-shrink-0 text-center"
        >{{ label }}</div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { code as code1 } from './comparisons/rethinking-reusability-in-vue/FunctionRefListbox'
import { code as code2 } from './comparisons/rethinking-reusability-in-vue/CompoundListbox'
import { shallowRef } from 'vue'

const toMeta = (code: string, name: string) => shallowRef({
  lines: code.split('\n').length,
  characters: code.length,
  name,
})

const code1Meta = toMeta(code1, 'Function ref composable')
const code2Meta = toMeta(code2, 'Compound component')

const toChart = (prop: string, step: number) => ({
  prop,
  horizontalLabels: [code1Meta.value.name, code2Meta.value.name],
  maxTotal: Math.ceil(Math.max(code1Meta.value[prop], code2Meta.value[prop]) / step) * step,
  verticalLabels: new Array(
    Math.ceil(Math.max(code1Meta.value[prop], code2Meta.value[prop]) / step) + 1
  )
    .fill(0)
    .map((_, index) => index * step)
    .reverse()
})

const linesChart = toChart('lines', 50)

const charactersChart = toChart('characters', 1000)
</script>
