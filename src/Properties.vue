<template>
<div class="background">
  <div>
    <div class="container">
      <h1 class="title">Propriedades</h1>
      <div class="columns">
          <p class="control has-addons"> 
            <input class="searching" type="text" placeholder="Procure pelo nome da propriedade..." v-model="search">
            <a class="button general" @click.prevent="searchProperties">Pesquisar</a>
          </p>
        <div class="column is-6">

        </div>
          <a class="button general" @click.prevent="newProperties">Novo</a>
      </div>

      <div class="columns">
        <div class="column is-12">
          <table class="table is-narrow is-bordered">
            <thead>
              <th>Produtor</th>
              <th>Nome Propriedade</th>
              <th>Área Total</th>
              <th>Cidade</th>
              <th>Ações</th>
            </thead>
            <tbody>
              <tr v-for="property in sortedProperties" :key="property.id">
                <td>{{property.growerId}}</td>
                <td>{{property.name}}</td>
                <td>{{property.total_area}}</td>
                <td>{{property.city}}</td>
                <td class="is-icon">
                  <a href="#" @click.prevent="editProperties(property)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" @click.prevent="removeProperties(property)">
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

    <div id="modal_property" class="modal" :class="{'is-active':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Propriedade {{selected.name}}</p>
          <button class="delete" @click.prevent="showModal=false"></button>
        </header>
        <section class="modal-card-body">
          <div class="column">
            <label class="label">Produtor</label>
              <p class="control">
                <input class="input" type="text" placeholder="Produtor" v-model="selected.growerId">
              </p>
          </div>
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
          <input class="input" type="text" placeholder="Área Total" v-model="selected.total_area">
        </p>
          </div>
          <div class="column">
            <label class="label">Cidade</label>
        <p class="control">
          <input class="input" type="text" placeholder="Cidade da Propriedade" v-model="selected.city">
        </p>
          </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button" @click.prevent="saveProperties">Salvar</a>
          <a class="button" @click.prevent="showModal=false">Cancelar</a>
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
            title: 'Crud Properties',
            search: '',
            properties: [],
            page: 1,
            total: 0,
            selected: {},
            itensPerPage: 20,
            isLoading: false,
            showModal: false
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
            this.loadProperties()
        },

        showLoading() {
            this.isLoading = true;
        },

        hideLoading() {
            this.isLoading = false;
        },

        getAll() {
            this.$http.get(`/properties`).then(
                response => {
                    this.properties = response.json()
                },
                error => {
                    console.log(error)
                }).finally(function () {
                    this.hideLoading();
                })
        },

        loadProperties() {
            this.showLoading()

            let start = (this.page * this.itensPerPage) - (this.itensPerPage)
            let end = this.page * this.itensPerPage
            let qString = ""

            if (this.search) {
                qString = `&q=${this.search}`
            }

            this.$http.get(`/properties?_start=${start}&_end=${end}${qString}`).then(
                response => {
                    this.properties = response.json()
                    this.total = response.headers['X-Total-Count']
                },
                error => {
                    console.log(error)
                }).finally(function () {
                    this.hideLoading();
                })
        },

        searchProperties() {
            this.loadProperties()
        },

        newProperties() {
            this.selected = {}
            this.showModal = true;
        },

        editProperties(property) {
            this.selected = property
            this.showModal = true;
        },

        removeProperties(property) {
            let t = this;
            swal({
                title: `Deseja apagar a propriedade "${property.name}"?`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#B22222",
                cancelButtonText: "CANCELAR",
                cancelButtonTextColor: "#808080",
                confirmButtonText: "APAGAR",
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {

                t.$http.delete(`/properties/${property.id}`).then(
                    result => {
                        swal(`Propriedade "${property.name}" removido com sucesso!`)
                        t.loadProperties()
                    })
            });
        },

        saveProperties() {
            if (this.selected.id != null) {
                this.$http.put(`/properties/${this.selected.id}`, this.selected).then(
                    response => {
                        this.$set('selected', {})
                        this.$set('showModal', false)
                    },
                    error => {
                        console.error(error)
                    }
                ).finally(
                    this.loadProperties()
                )
            }
            else {
                this.$http.post(`/properties`, this.selected).then(
                    response => {
                        this.$set('selected', {})
                        this.$set('showModal', false)
                    },
                    error => {
                        console.error(error)
                    }
                ).finally(
                    this.loadProperties()
                )
            }
        }
    },

    created() {
        this.loadProperties();
    },

    computed: {
        sortedProperties() {
            return this.properties.sort((t1, t2) => t1.name < t2.name ? -1 : 1);
        },
    }
}
</script>

<style>
.background {
          position: relative;
          margin: auto;
          width: auto;
          height: auto;
          background-color: #EEC591;
          background-image: url('http://emojipedia.com.br/assets/img/emoji/1f331.png');
      }
</style>
