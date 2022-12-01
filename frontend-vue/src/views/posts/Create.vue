<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>New Date</h4>
                        <hr>
                        <div v-if="validation" class="mt-2 alert alert-danger">
                            <div class="d-flex justify-content-center">
                                {{ validation }}
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <input type="Date" v-model="newDate">
                            <button type="submit" class="btn btn-primary" @click="AddDateJournal(newDate)">
                                Create
                            </button>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios"
import { ref } from "vue"

const router = useRouter();

const validation = ref(undefined)
const newDate = ref([])

const AddDateJournal = async (data) => {
    try {
        const QNA = [
            {
                question: "What I am most greatful for?",
                answer: ""
            }, 
            {
                question: "Did I workout today ?",
                answer: ""
            }, 
            {
                question: "What work have I done today",
                answer: ""
            }, 
            {
                question: "What did I learn today",
                answer: ""
            }]
        const date = await axios.post("http://localhost:3000/api/journal/newdate", {
            date : data,
            journal : QNA
        })
        if (date.data.message) throw date.data.message
        router.push({ name: "posts.index" })
    } catch (error) {
        validation.value = error        
    }
}

</script>