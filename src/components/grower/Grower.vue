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

<script src="./Grower.js"></script>
