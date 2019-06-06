import Pagination from '../pagination/Pagination.vue'
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