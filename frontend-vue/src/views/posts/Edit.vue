<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>New Date</h4>
                        <hr>
                        <div class="d-grid justify-content-center">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mb-2">Question</label>
                                <input type="text" class="form-control" v-model="question" placeholder="Masukkan Judul Post">
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold mb-2">Answer</label>
                                <textarea class="form-control" rows="4" v-model="answer" placeholder="Masukkan Konten Post"></textarea>
                            </div>
                                <router-link class="btn btn-primary" :to="{name: 'Detail', params : {id : router.params.Journalid}}" @click="editJournal()"> Edit </router-link>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import { useRoute } from "vue-router";
import { ref } from "vue"

const router = useRoute()
const question = ref(null)
const answer = ref(null)

const getJournal = async (id) => {
    let Journal = []
    const response = await axios.get(`https://expressapi.herokuapp.com/api/journal/detail/${id}`)
    Journal.push(response.data.journals)
    console.log(Journal[0].length)
    for (let index = 0; index < Journal[0].length; index++) {
        if (Journal[0][index]._id == router.params.id) {
            question.value = Journal[0][index].question
            answer.value = Journal[0][index].answer ? Journal[0][index].answer : ""
        }        
    }
}
getJournal(router.params.Journalid)

const editJournal = async () => {
    console.log(answer.value)
    const response = await axios.put(`https://expressapi.herokuapp.com/api/journal/${router.params.Journalid}/${router.params.id}`, {
        answer : answer.value
    })
    console.log(response.data)
    router.push({name : "Detail", params: {id : router.params.id}})
}
</script>