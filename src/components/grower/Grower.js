import Pagination from '../pagination/Pagination.vue'
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