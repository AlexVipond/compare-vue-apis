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

const focused = ref(0) // FOCUSED

const focus = (index: number) => {
  focused.value = index
}

const focusPrevious = (index: number) => {
  if (index === 0) {
    return
  }

  focused.value = index - 1
}

const focusNext = (index: number) => {
  if (index === props.options.length - 1) {
    return
  }

  focused.value = index + 1
}

const isFocused = (index: number) => {
  return index === focused.value
}

const selected = computed(() => { // SELECTED
  const index = props.options.indexOf(props.modelValue)
  return index === -1 ? 0 : index
})

const select = (index: number) => {
  emit('update:modelValue', props.options[index])
}

const isSelected = (index: number) => {
  return index === selected.value
}

const elements = ref([]) // FOCUS MANAGEMENT

const setElements = (el, index: number) => {
  elements.value[index] = el
}

watch(
  focused,
  () => {
    elements.value[focused.value].focus()
  },
  { flush: 'post' }
)

onMounted(() => {
  elements.value[focused.value].focus()
})

onBeforeUpdate(() => {
  elements.value = []
})`
