import { useStore, mapGetters } from 'vuex';
import { computed } from 'vue';
 
export default function useGetters(mapper) {
  const store = useStore();
  // 1. 接受全部getters
  const gettersFn = mapGetters(mapper);
  // 2. 定义新的函数数组
  const newGetters = {};
  // 3. 遍历绑定
  Object.keys(gettersFn).forEach((key) => {
    newGetters[key] = computed(gettersFn[key].bind({ $store: store }));
  });
  // 返沪
  return newGetters;
}