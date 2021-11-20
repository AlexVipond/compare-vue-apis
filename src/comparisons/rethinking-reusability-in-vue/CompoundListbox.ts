export const code = `\
import { // BOILERPLATE
  defineComponent, provide, inject,
  shallowRef, ref, watch, computed
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
  setup (props, { slots, emit }) {
    const ids = shallowRef<{ [option: string]: string }>({}) // IDS

    const storeId = (option: string, id: string) => {
      ids.value[option] = id
    }
    
    const active = ref(props.options[0]) // ACTIVE
    const ariaActivedescendant = computed(() => ids.value[active.value])

    const activate = (option: string) => {
      active.value = option
    }

    const activatePrevious = (option: string) => {
      const index = props.options.indexOf(option)

      if (index === 0) {
        return
      }

      active.value = props.options[index - 1]
    }

    const activateNext = (option: string) => {
      const index = props.options.indexOf(option)

      if (index === props.options.length - 1) {
        return
      }

      active.value = props.options[index + 1]
    }

    const activateFirst = () => {
      active.value = props.options[0]
    }

    const activateLast = () => {
      active.value = props.options[props.options.length - 1]
    }

    const isActive = (option: string) => {
      return option === active.value
    }

    const selected = computed(() => props.modelValue) // SELECTED

    const select = (option: string) => {
      emit('update:modelValue', option)
    }

    const isSelected = (option: string) => {
      return option === selected.value
    }

    provide(ListboxSymbol, { // BOILERPLATE
      storeId, // IDS
      active, // ACTIVE
      activate,
      activatePrevious,
      activateNext,
      activateFirst,
      activateLast,
      isActive,
      selected, // SELECTED
      select,
      isSelected,
    }) // BOILERPLATE

    return () => slots.default({
      bindings: {
        role: 'listbox', // BASIC ACCESSIBILITY
        'aria-orientation': 'vertical',
        'aria-activedescendant': ariaActivedescendant.value, // ACTIVE
        tabindex: -1, // FOCUS MANAGEMENT
      }, // BOILERPLATE
      active, // ACTIVE
      activate,
      activateFirst,
      activateLast,
      selected, // SELECTED
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
      storeId, // IDS
      active, // ACTIVE
      activate,
      activatePrevious,
      activateNext,
      activateFirst,
      activateLast,
      isActive,
      selected, // SELECTED
      select,
      isSelected,
    } = inject(ListboxSymbol) // BOILERPLATE

    const id = 'compound-listbox-option-' + totalIds++
    storeId(props.option, id)

    const getEl = shallowRef<() => HTMLElement>() // FOCUS MANAGEMENT
    
    watch(
      [active, selected],
      () => {
        if (isActive(props.option)) {
          getEl.value().focus()
        }
      },
      { flush: 'post' }
    )

    return () => { // BOILERPLATE
      const rendered = slots.default({
        bindings: {
          role: 'option', // BASIC ACCESSIBILITY
          id, // IDS
          tabindex: isSelected(props.option) ? 0 : -1, // FOCUS MANAGEMENT
          'aria-selected': isSelected(props.option), // SELECTED
          onClick: () => select(props.option),
          onMouseenter: () => activate(props.option), // ACTIVE
          onKeydown: event => {
            switch (event.key) {
              case 'ArrowUp':
                event.preventDefault()
                if (event.metaKey) {
                  activateFirst()
                  break
                }
                activatePrevious(props.option)
                break
              case 'ArrowDown':
                event.preventDefault()
                if (event.metaKey) {
                  activateLast()
                  break
                }
                activateNext(props.option)
                break
              case 'Enter': // SELECTED
              case ' ':
                event.preventDefault()
                select(props.option)
                break
            }
          },
        }, // BOILERPLATE
        isActive: () => isActive(props.option), // ACTIVE
        activatePrevious: () => activatePrevious(props.option),
        activateNext: () => activateNext(props.option),
        isSelected: () => isSelected(props.option), // SELECTED
      }) // BOILERPLATE

      getEl.value = () => rendered[0].el as HTMLElement // FOCUS MANAGEMENT

      return rendered // BOILERPLATE
    }
  }
})`
