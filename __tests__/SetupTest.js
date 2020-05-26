import { mount } from '@vue/test-utils'
import CardGrid from "../src/components/card_grid"

const wrapper = mount(CardGrid)
const vm = wrapper.vm
console.log(wrapper)