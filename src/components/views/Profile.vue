<template>
  <template-app>
    <div class="col s12 input-field">
      <input v-model="user.name" type="text" id="name" class="materialize-textarea"/>
      <label for="name">Nome</label>
    </div>

    <div class="col s12 input-field">
      <input v-model="user.email" type="email" id="email" class="materialize-textarea"/>
      <label for="email">E-mail</label>
    </div>

    <div class="col s12 file-field input-field">
      <div class="btn">
        <span>escolha sua selfie</span>
        <input @change="file" type="file" id="file" accept="image/png,image/jpeg">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>

    <div class="col s12 input-field">
      <input v-model="user.password" type="password" id="password" class="materialize-textarea"/>
      <label for="password">Senha</label>
    </div>

    <div class="col s12">
      <button @click="update" class="btn btn-large waves-effect waves-light col s12">ATUALIZAR</button>
    </div>

    <div class="col s12 mt-2">
      <router-link to="/" class="btn btn-large grey waves-effect waves-light col s12">CANCELAR</router-link>
    </div>
  </template-app>
</template>

<script>
import TemplateApp from "@/components/templates/TemplateApp.vue"
import axios from "axios";
import bus from '@/events/bus'

export default {
  name: 'Profile',
  components: {
    TemplateApp
  },
  data () {
    return {
      user: {
        token: '',
        name: '',
        email: '',
        password: '',
        file: '',
      }
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.user.token = user.token;
    this.user.name  = user.name;
    this.user.email = user.email;
  },
  methods:{
    alert(message){
      M.toast({html: message, displayLength: 5000, inDuration: 1000, outDuration: 500});
    },
    file(e){
      let file = e.target.files || e.dataTransfer.files;
      if(!file.length) return;

      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.user.file = e.target.result;
      };
      reader.readAsDataURL(file[0]);
    },
    update(){
      axios.put('http://127.0.0.1:8000/api/user', this.user, {
        "headers":{"Authorization": "Bearer "+this.user.token}
      })
        .then(response => {
          sessionStorage.setItem('user', JSON.stringify(response.data));
          this.user.password = '';
          this.user.file = '';
          bus.$emit('user-update');
          this.alert('Perfil atualizado com sucesso.');
        })
        .catch(error => {
          let response = error.response;
          switch (response.status){
            case 500:
              this.alert('Tente novamente em alguns instantes.');
              break;

            case 401:
              this.alert('Acesso não autorizado.');
              break;

            case 422:
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

