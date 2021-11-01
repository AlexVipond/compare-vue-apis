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

const activate = (index: number) => {
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

const isActive = (index: number) => {
  return index === active.value
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
