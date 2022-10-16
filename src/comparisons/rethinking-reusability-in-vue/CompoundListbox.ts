export const code = `\
import { // BOILERPLATE
  defineComponent, provide, inject,
  shallowRef, ref, watch, computed
} from 'vue'
import type { PropType, InjectionKey, Ref } from 'vue'

const ListboxSymbol: InjectionKey<ListboxProvided> = Symbol('Listbox')

type ListboxProvided = { // BOILERPLATE
  storeId: (option: string, id: string) => void, // IDS
  focused: Ref<string>, // FOCUSED
  focus: (option: string) => void,
  focusPrevious: (option: string) => void,
  focusNext: (option: string) => void,
  focusFirst: () => void,
  focusLast: () => void,
  isFocused: (option: string) => boolean,
  selected: Ref<string>, // SELECTED
  select: (option: string) => void,
  isSelected: (option: string) => boolean,
} // BOILERPLATE

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
    const ids = ref<{ [option: string]: string }>({}) // IDS

    const storeId = (option: string, id: string) => {
      ids.value[option] = id
    }
    
    const focused = ref(props.options[0]) // FOCUSED
    const ariaActivedescendant = computed(() => ids.value[focused.value])

    const focus = (option: string) => {
      focused.value = option
    }

    const focusPrevious = (option: string) => {
      const index = props.options.indexOf(option)

      if (index === 0) {
        return
      }

      focused.value = props.options[index - 1]
    }

    const focusNext = (option: string) => {
      const index = props.options.indexOf(option)

      if (index === props.options.length - 1) {
        return
      }

      focused.value = props.options[index + 1]
    }

    const focusFirst = () => {
      focused.value = props.options[0]
    }

    const focusLast = () => {
      focused.value = props.options[props.options.length - 1]
    }

    const isFocused = (option: string) => {
      return option === focused.value
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
      focused, // FOCUSED
      focus,
      focusPrevious,
      focusNext,
      focusFirst,
      focusLast,
      isFocused,
      selected, // SELECTED
      select,
      isSelected,
    }) // BOILERPLATE

    return () => slots.default({
      bindings: {
        role: 'listbox', // BASIC ACCESSIBILITY
        'aria-orientation': 'vertical',
        'aria-activedescendant': ariaActivedescendant.value, // FOCUSED
        tabindex: -1, // FOCUS MANAGEMENT
      }, // BOILERPLATE
      focused, // FOCUSED
      focus,
      focusFirst,
      focusLast,
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
      focused, // FOCUSED
      focus,
      focusPrevious,
      focusNext,
      focusFirst,
      focusLast,
      isFocused,
      selected, // SELECTED
      select,
      isSelected,
    } = inject(ListboxSymbol) // BOILERPLATE

    const id = 'compound-listbox-option-' + totalIds++
    storeId(props.option, id)

    const getEl = ref<() => HTMLElement>() // FOCUS MANAGEMENT
    
    watch(
      [focused, selected],
      () => {
        if (isFocused(props.option)) {
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
          onMouseenter: () => focus(props.option), // FOCUSED
          onKeydown: event => {
            switch (event.key) {
              case 'ArrowUp':
                event.preventDefault()
                if (event.metaKey) {
                  focusFirst()
                  break
                }
                focusPrevious(props.option)
                break
              case 'ArrowDown':
                event.preventDefault()
                if (event.metaKey) {
                  focusLast()
                  break
                }
                focusNext(props.option)
                break
              case 'Enter': // SELECTED
              case ' ':
                event.preventDefault()
                select(props.option)
                break
            }
          },
        }, // BOILERPLATE
        isFocused: () => isFocused(props.option), // FOCUSED
        focusPrevious: () => focusPrevious(props.option),
        focusNext: () => focusNext(props.option),
        isSelected: () => isSelected(props.option), // SELECTED
      }) // BOILERPLATE

      getEl.value = () => rendered[0].el as HTMLElement // FOCUS MANAGEMENT

      return rendered // BOILERPLATE
    }
  }
})`
