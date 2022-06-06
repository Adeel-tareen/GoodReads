<template>

<v-card>
    <v-card-title>
      Good Reads
      <v-spacer></v-spacer>
      <v-text-field
        v-model="title"
        label="Search"
        single-line
        hide-details
        @keyup.enter="onSearch"
      >
      </v-text-field>
      <v-btn @click="onSearch">Search</v-btn>
    </v-card-title>
  <v-simple-table >
    <template v-slot:default>
        
      <thead v-if="title!=''">
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Author</th>
          <th class="text-left">Rating</th>
          <th class="text-left">Publication Year</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books.booksData" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.average_rating }}</td>
          <td>{{ book.original_publication_year }}</td>
        </tr>
      </tbody>
      <v-pagination
      v-if="title!=''"
      class="custom"
      :circle="true"
      v-model="pageNumber"
      :length="pageCount"
      :total-visible="8"
      @input="handlePageChange"
    >
    </v-pagination>

    <div class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <span>{{ pageCount }} {{ pageNumber }}</span>
        
    </template>
    </v-simple-table>
    </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "GoodRead",
  data() {
    return {
      books: [],
      size: 20,
      count: 0,
      pageNumber: 1,
      title: "",
      isLoading: false,
    };
  },
  computed: {
    pageCount() {
      if (this.books?.booksData?.length > 0) {
        let l = this.books.bookTotalCount;
        let s = this.size;
        const r = Math.ceil(l / s);
        console.log("page count", r)
        return r;
      }
      return 1;
    },
  },
  methods: {
    async getBooks(pageNum = null, someTitle = null) {
      this.isLoading = true;
    
      await axios
        .get(
          `https://goodreads.fahadtanwir.repl.co/goodreads?pageNumber=${
            pageNum ? pageNum : this.pageNumber
          }&searchText=${someTitle ? someTitle : this.title}`
        )
        .then((response) => {
          this.books = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onClickPrevious() {
      this.books = [];
      const newPagenum = this.pageNumber - 1;
      this.pageNumber = newPagenum;
      this.getBooks(newPagenum, this.title);
    },
    onClicknext() {
      this.books = [];
      const newPagenum = this.pageNumber + 1;
      this.pageNumber = newPagenum;
      this.getBooks(newPagenum, this.title);
    },
    onSearch() {
      this.pageNumber = 1;
      this.getBooks(1, this.title);
    },
    handlePageChange() {
      this.getBooks(this.pageNumber, this.title);
    },
  }
};
</script>

<style scoped>
.custom {
padding-top: 25px;
margin-left: 470px;
}

</style>