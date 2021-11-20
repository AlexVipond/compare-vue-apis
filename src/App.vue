<template>
  <main class="bg-gray-800 p-20 flex flex-col items-center gap-6 text-3xl text-gray-200 font-mono">
    <span>{{ ensuredCode.split('\n').length }} lines</span>
    <span>{{ ensuredCode.length }} characters</span>
  </main>
  <main class="bg-gray-800 p-20 h-screen w-screen flex font-mono">
    <IndentationHistogram :code="ensuredCode" />
  </main>
  <main class="p-20 bg-gray-800">
    <section class="relative mx-auto h-auto w-[650px] flex px-6 bg-white">
      <pre class="font-mono"><code>{{ ensuredCode }}</code></pre>
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
  <main class="flex justify-center p-20 bg-gray-800">
    <CompoundCommunication />
  </main>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
// import { code } from './comparisons/organizing-code-by-logical-concern/OptionsApiListbox'
// import { code } from './comparisons/organizing-code-by-logical-concern/CompositionApiListboxOrganizedByOptions'
// import { code } from './comparisons/organizing-code-by-logical-concern/CompositionApiListboxOrganizedByLogicalConcern'
// import { code } from './comparisons/rethinking-reusability-in-vue/FunctionRefListbox'
import { code } from './comparisons/rethinking-reusability-in-vue/CompoundListbox'
// import { meta } from './comparisons/organizing-code-by-logical-concern/meta'
import { meta } from './comparisons/rethinking-reusability-in-vue/meta'
import { toCode } from './toCode'
import { toConcerns } from './toConcerns'
import Highlight from './Highlight.vue'
import IndentationHistogram from './IndentationHistogram.vue'
import CompoundCommunication from './CompoundCommunication.vue'

const ensuredCode = shallowRef(toCode(code)),
      lineNumbers = new Array(ensuredCode.value.split('\n').length)
        .fill(undefined)
        .map((_, index) => index)
        .join('\n'),
      ensuredConcerns = shallowRef(toConcerns({ code, meta }))

console.log(ensuredCode.value.length)
</script>
