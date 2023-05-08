<template>
  <template-auth>
    <div class="col s12 input-field">
      <input v-model="user.email" type="text" id="email" class="materialize-textarea"/>
      <label for="email">E-mail</label>
    </div>

    <div class="col s12 input-field">
      <input v-model="user.password" type="password" id="password" class="materialize-textarea"/>
      <label for="password">Senha</label>
    </div>

    <div class="col s12">
      <button @click="login" class="btn btn-large waves-effect waves-light col s12">ENTRAR</button>
    </div>

    <div class="col s12 mt-2">
      <router-link to="/register" class="btn btn-large grey waves-effect waves-light col s12">CADASTRE-SE</router-link>
    </div>
  </template-auth>
</template>

<script>
import TemplateAuth from "@/components/templates/TemplateAuth.vue"
import axios from 'axios'

export default {
  name: 'Login',
  components: {
    TemplateAuth
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods:{
    alert(message){
      M.toast({html: message, displayLength: 5000, inDuration: 1000, outDuration: 500});
    },
    login(){
      axios.post('http://127.0.0.1:8000/api/auth', this.user)
        .then(response => {
          sessionStorage.setItem('user', JSON.stringify(response.data));
          this.$router.push('/');
        })
        .catch(error => {
          let response = error.response;
          switch (response.status){
            case 500:
              this.alert('Tente novamente em alguns instantes.');
              break;

            case 400:
              for(let erro of response.data){
                this.alert(erro);
              }
          }
        });
    }
  },
}
</script>

<style scoped>

</style>
