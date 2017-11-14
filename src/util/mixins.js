/*定义混合代码*/
export const ratingsMixin = {  // 实质是一个配置对象
  data (){
    return {
      selectType: 2,
      onlyContent: false
    }
  },
  methods: {
    toggleContent(){
      this.onlyContent = !this.onlyContent
      // 异步通知scroll对象去更新.否则看不到符合要求的的评论
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    setSelectType(selectType){
      this.selectType = selectType
      // 异步通知scroll对象去更新
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  computed: {
    filterRatings(){
      const ratings = this.ratings || this.food.ratings
      const {selectType, onlyContent} = this
      // 判断如果还没有数据, 直接返回一个空数组
      if(!ratings){
        return []
      }

      return ratings.filter(rating => {
        /*
         条件1: selectType与rating.rateType
         rating.rateType: 0/1
         selectType: 0/1/2
         selectType==2 || selectType===rating.rateType
         条件2: onlyContent与rating.text
         rating.text: 有值/没有值('')
         onlyContent: true/false
         !onlyContent || rating.text.length>0
         */
        return (selectType === 2 ||selectType === rating.rateType) && (!onlyContent || rating.text.length > 0)
      })
    }
  }
}
