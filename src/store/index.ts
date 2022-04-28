import useCategoryStore from './modules/category'
import useHomeStore from './modules/home'
export default function () {
  return {
    category: useCategoryStore(),
    home: useHomeStore()
  }
}
