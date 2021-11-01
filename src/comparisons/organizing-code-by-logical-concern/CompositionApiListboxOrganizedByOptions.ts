export const code = `\
import { ref, watch, computed, onMounted, onBeforeUpdate } from 'vue' // BOILERPLATE
import IconCheck from './IconCheck.vue'

const props = defineProps<{ // PROPS/EMIT
  options: string[],
  modelValue: string,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', option: string): void,
}>()

const active = ref(0) // ACTIVE

const elements = ref([]) // FOCUS MANAGEMENT

const selected = computed(() => { // SELECTED
  const index = props.options.indexOf(props.modelValue)
  return index === -1 ? 0 : index
})

const select = (index: number) => {
  emit('update:modelValue', props.options[index])
}

const activate = (index: number) => { // ACTIVE
  active.value = index
}

const activatePrevious = (index: number) => {
  if (index === 0) {
    return
  }

  active.value = index - 1
}

const activateNext = (index: number) => {
  if (index === props.options.length - 1) {
    return
  }

  active.value = index + 1
}

const isSelected = (index: number) => { // SELECTED
  return index === selected.value
}

const isActive = (index: number) => { // ACTIVE
  return index === active.value
}

const setElements = (el, index: number) => { // FOCUS MANAGEMENT
  elements.value[index] = el
}

watch( // FOCUS MANAGEMENT
  active,
  () => {
    elements.value[active.value].focus()
  },
  { flush: 'post' }
)

onMounted(() => {
  elements.value[active.value].focus()
})

onBeforeUpdate(() => {
  elements.value = []
})`
