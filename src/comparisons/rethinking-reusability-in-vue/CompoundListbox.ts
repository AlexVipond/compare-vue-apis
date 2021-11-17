export const code = `\
import { // BOILERPLATE
  defineComponent, provide, inject,
  ref, watch, computed, onMounted, onBeforeUpdate
} from 'vue'
import type { PropType } from 'vue'

const ListboxSymbol = Symbol('Listbox')

let totalIds = 0

export const Listbox = defineComponent({
  name: 'Listbox',
  props: {
    options: {
      type: Array as PropType<string[]>,
    },
    modelValue: {
      type: String,
    },
  },
  setup (props, { slots, emit, expose }) {
    const optionsElements = ref<HTMLElement[]>([]) // ELEMENTS
    
    const storeOptionsElement = (index: number, element: HTMLElement) => {
      optionsElements.value[index] = element
    }

    onBeforeUpdate(() => optionsElements.value = [])

    const ids = ref([]) // IDS
    onMounted(() => ids.value = optionsElements.value
      .map(() => 'compound-listbox-option-' + totalIds++))
    
    const active = ref(0) // ACTIVE
    const ariaActivedescendant = computed(() => ids.value[active.value])

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
      if (index === optionsElements.value.length - 1) {
        return
      }

      active.value = index + 1
    }

    const isActive = (index: number) => {
      return index === active.value
    }

    const selected = computed(() => props.options.indexOf(props.modelValue)) // SELECTED

    const select = (index: number) => {
      emit('update:modelValue', props.options[index])
    }

    const isSelected = (index: number) => {
      return index === selected.value
    }

    watch( // FOCUS MANAGEMENT
      [active, selected],
      () => {
        optionsElements.value[active.value].focus()
      },
      { flush: 'post' }
    )

    provide(ListboxSymbol, { // BOILERPLATE
      options: props.options,
      storeOptionsElement, // elements
      ids, // ids
      activate, // ACTIVE
      activatePrevious,
      activateNext,
      isActive,
      select, // SELECTED
      isSelected,
    }) // BOILERPLATE

    const bindings = computed(() => ({
      role: 'listbox', // BASIC ACCESSIBILITY
      'aria-orientation': 'vertical',
      'aria-activedescendant': ariaActivedescendant.value, // active
      tabindex: -1, // focus management
    })) // BOILERPLATE

    return () => slots.default({
      bindings: bindings.value,
      active, // ACTIVE
      activate,
      selected,
      select,
    }) // BOILERPLATE
  }
})

export const ListboxOption = defineComponent({
  name: 'ListboxOption',
  props: {
    option: {
      type: String
    },
  },
  setup (props, { slots }) {
    const {
      options,
      storeOptionsElement, // elements
      ids, // ids
      activate, // ACTIVE
      activatePrevious,
      activateNext,
      isActive,
      select, // SELECTED
      isSelected,
    } = inject(ListboxSymbol) // BOILERPLATE

    const index = options.indexOf(props.option)
    
    const id = computed(() => ids.value[index]) // IDS

    return () => slots.default({ // BOILERPLATE
      bindings: {
        role: 'option', // BASIC ACCESSIBILITY
        id, // ids
        'aria-selected': isSelected(index), // SELECTED
        tabindex: isSelected(index) ? 0 : -1, // focus management
        ref: el => storeOptionsElement(index, el), // elements
        onMouseenter: () => activate(index), // ACTIVE
        onClick: () => select(index), // SELECTED
        onKeydown: event => { // ACTIVE
          switch (event.key) {
            case 'ArrowUp':
              event.preventDefault()
              if (event.metaKey) {
                activate(0)
                break
              }
              activatePrevious(index)
              break
            case 'ArrowDown':
              event.preventDefault()
              if (event.metaKey) {
                activate(options.length - 1)
                break
              }
              activateNext(index)
              break
            case 'Enter':
            case ' ':
              event.preventDefault()
              select(index)
              break
          }
        },
      },
      isActive: () => isActive(index),
      isSelected: () => isSelected(index), // SELECTED
      activatePrevious: () => activatePrevious(index), // ACTIVE
      activateNext: () => activateNext(index),
    }) // BOILERPLATE
  }
})`
