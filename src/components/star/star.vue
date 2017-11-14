<!--<template>
  <div class="star">
    <span v-for="star in starClasses" :class="star"></span>
  </div>
</template>-->
<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(item, index) in starClasses"
          :class="item" :key="index"></span>
  </div>
</template>


<script>
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starClasses (){
        const {score, size} = this
        // 定义一个空数组用来装所有计算出的star
        const stars = []
        const scoreInteger = Math.floor(score)
        // 向stars中添加 `star${size} on`
        for (let i = 0; i < scoreInteger; i++) {
          stars.push(`star${size} on`)
        }
        // 向stars中添加 `star${size} half`
        if(score - scoreInteger> 0.5){
          stars.push(`star${size} half`)
        }
        // 向stars中添加 `star${size} off`
        while (stars.length < 5){
          stars.push(`star${size} off`)
        }
        return stars
      }
    }
  }
</script>

<!--<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star
    display flex
    .star48
      width 20px
      height 20px
      background-size 20px 20px
      background-repeat no-repeat
      margin-right 16px
      &.on
        bg-star(star48_on)
      &.half
        bg-star(star48_half)
      &.off
        bg-star(star48_off)
    .star24
      width 10px
      height 10px
      background-size 10px 10px
      background-repeat no-repeat
      &.on
        bg-star(star24_on)
      &.half
        bg-star(star24_half)
      &.off
        bg-star(star24_off)
    .star36
      width 15px
      height 15px
      background-size 15px 15px
      background-repeat no-repeat
      &.on
        bg-star(star36_on)
      &.half
        bg-star(star36_half)
      &.off
        bg-star(star36_off)
</style>-->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>

