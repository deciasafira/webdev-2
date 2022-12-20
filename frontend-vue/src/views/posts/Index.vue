<template>
    
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4>My Journal</h4>
                            <router-link :to="{name: 'posts.create'}" class="btn btn-md btn-success">Add Date</router-link>
                        </div>
                        <hr>
                        <div class="container">
                            <div class="row">
                            <div class="col my-2 col-3" v-for="journal in journals" :key="journal._id">
                                <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title d-flex justify-content-center"> {{ new Date(journal.date).toLocaleDateString() }}</h5>
                                    <router-link :to="{ name: 'Detail', params: { id: journal._id,  }}" class="card-link">Detail</router-link>
                                    <a @click="journalDelete(journal._id)" class="card-link">Delete</a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"

const journals = ref([])

const getDataJournals = async () => {
    //get API from Express Backend
    const response = await axios.get('http://localhost:3000/api/journal/')
    journals.value = response.data.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date)
    })
    // console.log(journals.value)
}

getDataJournals()

const journalDelete = async (id) => {
    //delete data post by ID
    await axios.delete(`http://localhost:3000/api/journal/${id}`)
    getDataJournals();
}
</script>

<style scoped>
.tanggal {
    background-color:moccasin;
    border-radius: 25px;
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}
</style>