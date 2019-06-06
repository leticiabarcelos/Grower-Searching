  export default{
    props: ["total","page","itensPerPage"],
    computed: {
      totalPages: function(){
        return Math.ceil(this.total/this.itensPerPage)||1
      },
      showNextButton: function(){
       return  this.page != this.totalPages
      },
      showPreviousButton: function(){
       return this.page != 1
      }
    },

    methods: {
      goNextPage: function(){
        this.$emit('change-page',this.page+1)
      },
      goPreviousPage: function(){
        this.$emit('change-page',this.page-1)
      },
      goLastPage: function(){
        this.$emit('change-page',this.totalPages)
      },
      goPage: function(page){
        this.$emit('change-page',page)
      }
    }
  }