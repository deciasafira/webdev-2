<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h4>My Journal</h4>
                            <h4>{{new Date(detailJournal.date).toDateString()}}</h4>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col my-2 col-3" v-for="(detail, index) in 4" :key="index">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">{{detailJournal.journals[index].question }}</h5>
                                            <p class="card-text">{{detailJournal.journals[index].answer || "Not answer yet"}}</p>
                                            <router-link :to="{ name: 'posts.edit', params: {Journalid: router.params.id, id : detailJournal.journals[index]._id} }" class="card-link" >Edit</router-link>
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
import { useRoute } from "vue-router";

const router = useRoute();
const detailJournal = ref([])

const getDetailJournal = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/journal/detail/${id}`)
    detailJournal.value = response.data
}

getDetailJournal(router.params.id)
</script>