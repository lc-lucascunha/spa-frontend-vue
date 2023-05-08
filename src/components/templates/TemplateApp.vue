<template>
  <div>
    <layout-header :color="color" :title="title">
      <li><a @click="logout">Sair</a></li>
      <li><a>{{user.name}}</a></li>
      <li><img :src="user.file" :alt="user.name" class="circle responsive-img" style="width: 50px; height: 50px; margin-top: 5px;" /></li>
    </layout-header>

    <main>
      <div class="container">
        <div class="row">
          <div class="col s4" style="padding-top: 2rem;">
            <layout-menu>
              <router-link class="btn btn-large col s12" to="/">Home</router-link>
              <router-link class="btn btn-large col s12 mt-2" to="/profile">Perfil</router-link>
            </layout-menu>
          </div>
          <div class="col s8" style="padding-top: 2rem;">
            <slot/>
          </div>
        </div>
      </div>
    </main>

    <layout-footer :color="color"/>
  </div>
</template>

<script>
import LayoutHeader from '@/components/layouts/LayoutHeader'
import LayoutMenu   from '@/components/layouts/LayoutMenu'
import LayoutFooter from '@/components/layouts/LayoutFooter'
import bus from '@/events/bus'

export default {
  name: 'TemplateApp',
  components: {
    LayoutHeader,
    LayoutMenu,
    LayoutFooter,
  },
  data () {
    return {
      title: 'INSIGHTS',
      color: 'teal',
      user : '',
    }
  },
  created() {
    let user = sessionStorage.getItem('user');
    if(!user){
      this.$router.push('/login');
    }
    this.fetchUser();

    bus.$on('user-update', () => {
      this.fetchUser();
    });
  },
  methods:{
    fetchUser() {
      let user = sessionStorage.getItem('user');
      this.user = JSON.parse(user);
    },
    logout(){
      sessionStorage.clear();
      this.$router.push('/login');
    }
  },
}
</script>

<style>

</style>
