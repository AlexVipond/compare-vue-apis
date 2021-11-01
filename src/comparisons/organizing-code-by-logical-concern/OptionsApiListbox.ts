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
    active: 0, // active
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
    activate (index) { // ACTIVE
      this.active = index
    },
    activatePrevious (index) {
      if (index === 0) {
        return
      }
      
      this.active = index - 1
    },
    activateNext (index) {
      if (index === this.options.length - 1) {
        return
      }
      
      this.active = index + 1
    },
    isSelected (index) { // SELECTED
      return index === this.selected
    },
    isActive (index) { // ACTIVE
      return index === this.active
    },
    setElements (el, index) { // FOCUS MANAGEMENT
      this.elements[index] = el
    }
  }, // boilerplate
  watch: { // boilerplate
    active () { // FOCUS MANAGEMENT
      this.elements[this.active].focus()
    }
  }, // boilerplate
  mounted () { // FOCUS MANAGEMENT
    this.elements[this.active].focus()
  },
  beforeUpdate () {
    this.elements = []
  }
}) // boilerplate`
