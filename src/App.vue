<template>
  <main class="bg-gray-800 p-20 h-screen w-screen flex">
    <IndentationHistogram :code="ensuredCode" />
  </main>
  <main class="bg-gray-800 p-20">
    <section class="mt-10 relative w-auto flex bg-white">
      <pre><code>{{ lineNumbers }}</code></pre>
      <pre><code>{{ ensuredCode }}</code></pre>
      <div
        class="absolute top-0 left-0 h-full w-full"
        v-for="{ name, classes, lines } in ensuredConcerns"
        :key="name"
      >
        <Highlight
          v-for="line in lines"
          :key="line"
          :class="classes"
          :style="{ top: `${1.5 * line}em` }"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { code } from './comparisons/organizing-code-by-logical-concern/CompositionApiListboxOrganizedByLogicalConcern'
import { meta } from './comparisons/organizing-code-by-logical-concern/meta'
import { toCode } from './toCode'
import { toConcerns } from './toConcerns'
import Highlight from './Highlight.vue'
import IndentationHistogram from './IndentationHistogram.vue'

const ensuredCode = shallowRef(toCode(code)),
      lineNumbers = new Array(ensuredCode.value.split('\n').length)
        .fill(undefined)
        .map((_, index) => index)
        .join('\n'),
      ensuredConcerns = shallowRef(toConcerns({ code, meta }))
</script>
