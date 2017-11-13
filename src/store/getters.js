export default {
  // 获取购物车中的food列表
  foodList (state) {
    const foods = []   // 定义一个空数组用于接收所有的被选择的food
    state.goods.forEach((good) => {  // 遍历外围的good(哪一类)
      good.foods.forEach((food) => {  // 遍历内层的food(哪一种)
        if(food.count){
          foods.push(food)
        }
      })
    })
    return foods
  },

  // 获取选择的food数量
  totalCount(state, getters){
/*    return getters.foodList.redude(function (preTotal, food) {
      return preTotal + food.count
    },0)*/
      return getters.foodList.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  // 获取总价格
  totalPrice(state, getters){
    return getters.foodList.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },

  // 清空购物车 即将food的数量变为0
  clearCart(state, getters){
    getters.foodList.forEach((food, index) => {
      food.count = 0
    })
  }
}
