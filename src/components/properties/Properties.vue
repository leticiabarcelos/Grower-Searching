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
                <td>{{findGrower(property.growerId)}}</td>
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
        <div class="columns">
        <div class="column">
            <label class="label">Proprietário</label>
              <p class="control">
                <input class="input" type="text" placeholder="Proprietário" v-model="selected.growerId">
              </p>
          </div>
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

<script src="./Properties.js"></script>
