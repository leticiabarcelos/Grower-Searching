<template>
  <nav class="pagination">
    <a class="button" v-show="showPreviousButton" @click="goPreviousPage()">Anterior</a>
    <a class="button" v-show="showNextButton" @click="goNextPage()">Próximo</a>
    <ul>
      <li>
        <span v-show="showPreviousButton">...</span>
      </li>
      <li>
        <a class="button" v-show="showPreviousButton" @click="goPage(page-1)">{{page-1}}</a>
      </li>
      <li>
        <span class="button">{{page}}</span>
      </li>
      <li>
        <a class="button" v-show="showNextButton" @click="goPage(page+1)">{{page+1}}</a>
      </li>
      <li>
        <span v-show="showNextButton">...</span>
      </li>
      <li>
        <a class="button" v-show="showNextButton" @click="goLastPage()">{{totalPages}}</a>
      </li>
    </ul>
  </nav>
</template>

<script src="./Pagination.js"></script>