<template>
  <section class="flex flex-col items-center gap-12 font-mono">
    <!-- Basic tree -->
    <section class="h-[500px] w-[625px] flex flex-col gap-32 items-center justify-center rounded bg-gray-300">
      <div class="relative mx-auto flex items-center gap-2 p-4 bg-white rounded shadow-md">
        <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Parent</span>
        <h2 class="text-2xl text-center">Listbox</h2>
        <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">aria-activedescendant: ?</code>
      </div>
      <div class="mx-auto flex items-center gap-8">
        <div class="relative flex flex-col gap-2 p-4 bg-white rounded shadow-md">
          <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Child</span>
          <h2 class="text-2xl text-center">Option</h2>
          <div class="flex flex-col gap-1">
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">id: 'option-1'</code>
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">isFocused(): false</code>
          </div>
        </div>
        <div class="relative flex flex-col gap-2 p-4 bg-white rounded shadow-md">
          <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Child</span>
          <h2 class="text-2xl text-center">Option</h2>
          <div class="flex flex-col gap-1">
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">id: 'option-2'</code>
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">isFocused(): false</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Data moves up -->
    <section class="relative h-[500px] w-[625px] flex flex-col gap-32 items-center justify-center rounded bg-gray-300">
      <div class="relative mx-auto flex items-center gap-2 p-4 bg-white rounded shadow-md">
        <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Parent</span>
        <h2 class="text-2xl text-center">Listbox</h2>
        <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">aria-activedescendant: 'option-1'</code>
      </div>
      <div class="mx-auto flex items-center gap-8">
        <div class="relative flex flex-col gap-2 p-4 bg-white rounded shadow-md">
          <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Child</span>
          <h2 class="text-2xl text-center">Option</h2>
          <div class="flex flex-col gap-1">
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">id: 'option-1'</code>
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">isFocused(): false</code>
          </div>
        </div>
        <div class="relative flex flex-col gap-2 p-4 bg-white rounded shadow-md">
          <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Child</span>
          <h2 class="text-2xl text-center">Option</h2>
          <div class="flex flex-col gap-1">
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">id: 'option-2'</code>
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">isFocused(): false</code>
          </div>
        </div>
      </div>
      <section class="absolute top-[170px] left-[20px] flex flex-col gap-0.5 text-xl">
        <span>The mouse is on me!</span>
        <span>My ID is <code>'option-1'</code></span>
      </section>
      <svg class="absolute bottom-0 left-0 h-full w-full stroke-current text-primary-900" viewbox="0 0 500 625">
        <path d="M80 350 h -40 v -110 m 0 -80 v -50 h 40 m -10 -10 l 10 10 m -10 10 l 10 -10" fill="none" stroke-width="7" stroke-linecap="round" />
      </svg>
    </section>

    <!-- Data moves down -->
    <section class="relative h-[500px] w-[625px] flex flex-col gap-32 items-center justify-center rounded bg-gray-300">
      <div class="relative mx-auto flex items-center gap-2 p-4 bg-white rounded shadow-md">
        <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Parent</span>
        <h2 class="text-2xl text-center">Listbox</h2>
        <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">aria-activedescendant: 'option-1'</code>
      </div>
      <div class="mx-auto flex items-center gap-8">
        <div class="relative flex flex-col gap-2 p-4 bg-white rounded shadow-md">
          <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Child</span>
          <h2 class="text-2xl text-center">Option</h2>
          <div class="flex flex-col gap-1">
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">id: 'option-1'</code>
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">isFocused(): true</code>
          </div>
        </div>
        <div class="relative flex flex-col gap-2 p-4 bg-white rounded shadow-md">
          <span class="absolute top-0 left-0 -translate-y-full text-sm italic">Child</span>
          <h2 class="text-2xl text-center">Option</h2>
          <div class="flex flex-col gap-1">
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">id: 'option-2'</code>
            <code class="p-2 text-lg rounded bg-primary-200 text-primary-900">isFocused(): false</code>
          </div>
        </div>
      </div>
      <section class="absolute top-[170px] left-[20px] flex flex-col gap-0.5 text-xl">
        <span>The focused element</span>
        <span>is <code>'option-1'</code></span>
      </section>
      <svg class="absolute bottom-0 left-0 h-full w-full stroke-current text-primary-900" viewbox="0 0 500 625">
        <path d="M80 350 h -40 v -110 m 0 -80 v -50 h 40 m 0 240 m -10 -10 l 10 10 m -10 10 l 10 -10" fill="none" stroke-width="7" stroke-linecap="round" />
      </svg>
      <section class="absolute top-[170px] right-[20px] text-right flex flex-col gap-0.5 text-xl">
        <span>The focused element</span>
        <span>is <code>'option-1'</code></span>
      </section>
      <svg class="absolute bottom-0 left-0 h-full w-full stroke-current text-primary-900" viewbox="0 0 500 625">
        <path d="M545 350 h 40 v -110 m 0 -80 v -50 h -40 m 0 240 m 10 -10 l -10 10 m 10 10 l -10 -10" fill="none" stroke-width="7" stroke-linecap="round" />
      </svg>
    </section>
  </section>
</template>

<script setup lang="ts">

</script>
