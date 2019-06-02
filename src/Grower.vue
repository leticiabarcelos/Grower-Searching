<template>
<div class="background"><div>
    <a class="fix button is-large" v-show="isLoading">Carregando...</a>
    <div class="container">
      <h1 class="title">Produtores</h1>
      <div class="columns">
          <p class="control has-addons">
            <input class="searching" type="text" placeholder="Procure pelo nome do produtor..." v-model="search">
            <a class="button general" @click.prevent="searchGrower">Pesquisar</a>
          </p>
        <div class="column is-6">

        </div>
          <a class="button general" @click.prevent="newGrower">Novo</a>

      </div>
      <div class="columns">
        <div class="column is-12">
          <table class="table is-narrow is-bordered">
            <thead>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </thead>
            <tbody>
              <tr v-for="producer in sortedGrower" :key="producer.id">
                <td>{{producer.name}}</td>
                <td>{{producer.cpf}}</td>
                <td class="is-icon">
                  <a href="#" @click.prevent="editGrower(producer)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" @click.prevent="removeGrower(producer)">
                    <i class="fa fa-remove"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination>
    </div>

    <div id="modal_new_producer" class="modal" :class="{'is-active':showNewModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Produtor {{selected.name}} e Propriedade</p>
          <button class="delete" @click.prevent="showNewModal=false"></button>
        </header>
        <section class="modal-card-body">

        <div class="columns">
          <div class="column">
            <label class="label">Nome</label>
              <p class="control">
                <input class="input" type="text" placeholder="Nome Produtor" v-model="selected.name">
              </p>
          </div>
          <div class="column">
            <label class="label">CPF</label>
        <p class="control">
          <input class="input" type="text" placeholder="CPF" v-model="selected.cpf">
        </p>
          </div>
          </div>
        </section>
        <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <label class="label">Nome Propriedade</label>
              <p class="control">
                <input class="input" type="text" placeholder="Nome Propriedade" v-model="selected.name">
              </p>
          </div>
          <div class="column">
            <label class="label">Área Total</label>
        <p class="control">
          <input class="input" type="text" placeholder="Área Total" v-model="selected.cpf">
        </p>
          </div>
          <div class="column">
            <label class="label">Cidade</label>
        <p class="control">
          <input class="input" type="text" placeholder="Cidade da Propriedade" v-model="selected.cpf">
        </p>
          </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button" @click.prevent="saveGrower">Salvar</a>
          <a class="button" @click.prevent="showNewModal=false">Cancelar</a>
        </footer>
      </div>
    </div>

    <div id="modal_edit_producer" class="modal" :class="{'is-active':showEditModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Produtor {{selected.name}}</p>
          <button class="delete" @click.prevent="showEditModal=false"></button>
        </header>
        <section class="modal-card-body">

        <div class="columns">
          <div class="column">
            <label class="label">Nome</label>
              <p class="control">
                <input class="input" type="text" placeholder="Nome Produtor" v-model="selected.name">
              </p>
          </div>
          <div class="column">
            <label class="label">CPF</label>
        <p class="control">
          <input class="input" type="text" placeholder="CPF" v-model="selected.cpf">
        </p>
          </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button" @click.prevent="saveGrower">Salvar</a>
          <a class="button" @click.prevent="showEditModal=false">Cancelar</a>
        </footer>
      </div>
    </div>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import _ from 'lodash';

export default {
    data() {
        return {
            title: 'Crud Grower',
            search: '',
            grower: [],
            page: 1,
            total: 0,
            selected: {},
            itensPerPage: 20,
            isLoading: false,
            showEditModal:false,
            showNewModal:false
        }
    },
    mounted: {
    },

    components: {
        Pagination
    },

    methods: {
        onChangePage(page) {
            this.page = page
            this.loadGrower()
        },

        showLoading() {
            this.isLoading = true;
        },

        hideLoading() {
            this.isLoading = false;
        },

        loadGrower() {
            this.showLoading()

            let start = (this.page * this.itensPerPage) - (this.itensPerPage)
            let end = this.page * this.itensPerPage
            let qString = ""

            if (this.search) {
                qString = `&q=${this.search}`
            }

            this.$http.get(`/grower?_start=${start}&_end=${end}${qString}`).then(
                response => {
                    this.grower = response.json()
                    this.total = response.headers['X-Total-Count']
                },
                error => {
                    console.log(error)
                }).finally(function () {
                    this.hideLoading();
                })
        },

        searchGrower() {
            this.loadGrower()
        },

        newGrower() {
            this.selected = {}
            this.showNewModal = true;
        },

        editGrower(producer) {
            this.selected = producer
            this.showEditModal = true;
        },

        removeGrower(producer) {
          let t = this;
            swal({
                title: `Deseja apagar o produtor "${producer.name}"?`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#B22222",
                cancelButtonText: "CANCELAR",
                cancelButtonTextColor: "#808080",
                confirmButtonText: "APAGAR",
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {  
                t.$http.delete(`/grower/${producer.id}`).then(
                    result => {
                        swal(`Produtor "${producer.name}" removido com sucesso!`)
                        t.loadGrower()
                    })
            });
        },

        saveGrower() {
            if (this.selected.id != null) {
                this.$http.put(`/grower/${this.selected.id}`, this.selected).then(
                    response => {
                        this.$set('selected', {})
                        this.$set('showEditModal', false)
                    },
                    error => {
                        console.error(error)
                    }
                ).finally(
                    this.loadGrower()
                )
            }
            else {
                this.$http.post(`/grower`, this.selected).then(
                    response => {
                        this.$set('selected', {})
                        this.$set('showNewModal', false)
                    },
                    error => {
                        console.error(error)
                    }
                ).finally(
                    this.loadGrower()
                )
            }
        }
    },

    created() {
        this.loadGrower();
    },

    computed: {
        sortedGrower() {
            return this.grower.sort((t1, t2) => t1.name < t2.name ? -1 : 1);
        },
    },
}
</script>

<style>
.fix{
    position: absolute; 
    background:rgb(138, 103, 68); 
    width: 50%; 
    text-align: center; 
    display: flex; 
    border-radius: 5px;
    top: 2  50px;
    left: 250px;
    margin-right: -50%;}
.title{
    text-align: center;
    color: black;
}
.searching{
  text-align: center;
  width:500px;
  height: 35px;
  border-color:  rgb(161, 109, 41);
  border-radius: 5px;
}
.general{
  height: 35px;
  background-color: white;
  color: rgb(161, 109, 41);
  border-radius: 5px;
  border-color: rgb(161, 109, 41);
}
.pagination button{
  height: 35px;
  border-radius: 5px;
  text-align: center;
}
</style>
