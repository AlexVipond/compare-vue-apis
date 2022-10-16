export const code = `\
import { defineComponent } from 'vue' // boilerplate
import { PropType } from 'vue' // props/emit
import IconCheck from './IconCheck.vue' // BOILERPLATE

export default defineComponent({
  components: {
    IconCheck,
  },
  props: { // PROPS/EMIT
    options: {
      type: Array as PropType<string[]>,
    },
    modelValue: {
      type: String,
    }
  },
  data: () => ({ // boilerplate
    focused: 0, // active
    elements: [], // focus management
  }), // boilerplate
  computed: { // boilerplate
    selected () { // SELECTED
      const index = this.options.indexOf(this.modelValue)
      return index === -1 ? 0 : index
    },
  }, // boilerplate
  methods: { // boilerplate
    select (index) { // SELECTED
      this.$emit('update:modelValue', this.options[index])
    },
    focus (index) { // FOCUSED
      this.focused = index
    },
    focusPrevious (index) {
      if (index === 0) {
        return
      }
      
      this.focused = index - 1
    },
    focusNext (index) {
      if (index === this.options.length - 1) {
        return
      }
      
      this.focused = index + 1
    },
    isSelected (index) { // SELECTED
      return index === this.selected
    },
    isFocused (index) { // FOCUSED
      return index === this.active
    },
    setElements (el, index) { // FOCUS MANAGEMENT
      this.elements[index] = el
    }
  }, // boilerplate
  watch: { // boilerplate
    focused () { // FOCUS MANAGEMENT
      this.elements[this.focused].focus()
    }
  }, // boilerplate
  mounted () { // FOCUS MANAGEMENT
    this.elements[this.focused].focus()
  },
  beforeUpdate () {
    this.elements = []
  }
}) // boilerplate`
