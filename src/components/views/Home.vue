<template>
  <template-app>
    <div class="row">

      <div class="col s12 input-field">
        <textarea v-model="conteudo" id="conteudo" class="materialize-textarea"></textarea>
        <label for="conteudo">Como foi seu dia?</label>
      </div>

      <div v-if="conteudo" class="col s12">
        <button class="btn waves-effect waves-light right">Publicar</button>
      </div>

    </div>
  </template-app>
</template>

<script>
import TemplateApp from "@/components/templates/TemplateApp.vue"

export default {
  name: 'Home',
  components: {
    TemplateApp
  },
  data () {
    return {
      conteudo: ''
    }
  }
}
</script>

<style scoped>

</style>
