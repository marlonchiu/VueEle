<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index === currentIndex}"  @click="clickMenuItem(index)">
            <span class="text border-1px">
              <span class="icon" v-if="good.type>=0" :class="supportClasses[good.type]"></span>{{good.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--<cartcontrol :food="food" :updateFoodCount="updateFoodCount"/>-->
                    <cartcontrol :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart></shopcart>
    </div>
    <food :food="food" ref="food"></food>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
  import shopcart from '../../components/shopcart/shopcart.vue'
  import food from '../../components/food/food.vue'
  export default {
    data (){
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        scrollY: 0,
        tops: [],
        food: {}
      }
    },
    mounted(){
      // 获取数据
      this.$store.dispatch('getGoods', ()=>{   // 当此函数执行，goods数据状态就更新了
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      })
    },
    methods: {
      _initScroll(){
        // 定义分类列表的scroll对象
        const menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true  // 分发点击事件
        })
        // 定义食物列表的scroll对象
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 2, // 实时派发scroll事件(必须是用户操作)
          click: true  // 分发点击事件  (点击购物车按钮时的操作需要)
        })

        // 每次滑动得到划过的高度值（BScroll对象有自定义的方法）
        // 给foodsScroll绑定scroll监听
        this.foodsScroll.on('scroll', (event) => {
          console.log(event.y)
          // 更新scrollY的值
          this.scrollY = Math.abs(event.y)
        })

        // scrollEnd  给foodsScroll绑定scrollEnd监听
        this.foodsScroll.on('scrollEnd', (event) => {
          // 更新scrollY的值
          this.scrollY = Math.abs(event.y)
        })
      },

      /*
        功能点一：滑动右侧food列表，左侧的分类对应的分类下
        功能点二：点击左侧列表的分类，右侧跳转到对应的food列表

        功能点一
        要实现如上功能，经过分析需要知道当前food对应的分类索引值，currentIndex
          可以通过计算属性得到currentIndex，
          而currentIndex的影响因素：当前滚动过去的高度和每一个分类对应的高度
      * */

      // 获取每一个分类的高度（即在什么范围内是对应的就是什么样的index值）
      _initTops(){
        const tops = []
        let top = 0
        tops.push(top)   // 初始默认高度为0
        // 获取到所有foods分类列表的高度值
        const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        // 更新tops的值
        this.tops = tops
        console.log(this.tops)
      },

      // 左侧点击，右侧滚动到对应的food详情
      clickMenuItem (index){
        // 右侧应该滚动过的距离
        const length = this.tops[index]
        // 右侧平滑滚动到指定的位置
        /*
         Bscroll对象提供的
          scrollTo(x, y, time, easing)
             {Number} x 横轴坐标（单位 px）
             {Number} y 纵轴坐标（单位 px）
             {Number} time 滚动动画执行的时长（单位 ms）
             {Object} easing 缓动函数，一般不建议修改
        */
        this.foodsScroll.scrollTo(0, -length, 300, "easing")
        // 指定最终的scrollY
        this.scrollY = this.tops[index]
      },

      // 定义一个更新food数量的方法  （采用vuex的方法）
      /*updateFoodCount (food, isAdd){
        console.log('updateFoodCount()', isAdd)
        if(isAdd){   // 加1
          if(food.count){  // 判断是否有值，有值则加1
            food.count++
          }else{
            //food.count = 1 // 给food添加count属性, 值为1  这种方法是错误的，不能数据绑定的 界面不会更新
            this.$set(food, 'count', 1)  // 新加的属性就有了数据绑定, 界面就会更新
          }

        }else{  // 减1
          if(food.count){
            food.count--
          }
        }
      }*/

      showFood(food){
        // 更新food 状态
        this.food = food
        // 显示food 组件  (父组件调用子组件的方法 ref标识)
        this.$refs.food.toggleShow()
      }
    },
    computed: {
      ... mapState(['goods']),

      // 更新左侧对应的index
      currentIndex () {
        const {tops, scrollY} = this
        // 用scrollY与当前的top和下一个top比较
        const Index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1]
        })
        //console.log(Index);
        return Index
      }


    },
    components: {
      cartcontrol,
      shopcart,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

