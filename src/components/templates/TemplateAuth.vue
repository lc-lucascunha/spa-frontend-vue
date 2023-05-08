<template>
  <div>
    <div :class="color+' bar-top'"></div>
    <div class="box">
      <div class="row">
        <div class="col s4 offset-s4">
          <div class="row card p-2">
            <h3 :class="'center '+color+'-text'">{{title}}</h3>
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateAuth',
  data () {
    return {
      title: 'INSIGHTS',
      color: 'teal',
    }
  },
  created() {
    if(sessionStorage.getItem('user')){
      this.$router.push('/');
    }
  },
}
</script>

<style scoped>
  .bar-top{
    height: 12rem;
  }
  .box{
    margin-top: -10rem;
  }
</style>

