import useCategoryStore from './modules/category'
export default function () {
  return {
    category: useCategoryStore()
  }
}
