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

                        <!-- <div class="row mt-4" >
                            <div class="col-3 my-3" v-for="(post, index) in posts" :key="index">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ post.question_1 }}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{{ new Date(post.date_published).toLocaleDateString() }}</h6>
                                        <p class="card-text">{{ post.answer_1}}</p>
                                            <router-link :to="{name: 'posts.edit', params:{id: post.id }}" class="btn btn-sm btn-primary me-2">EDIT</router-link>
                                            <button @click.prevent="postDelete(post.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>

                                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    ...
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <!-- dibawah ini tabel -->
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {

        //reactive state
        let posts = ref([])

        //mounted
        onMounted(() => {

           //panggil function "getDataPosts" 
           getDataPosts()

        })

        //function "getDataPosts"
        function getDataPosts() {

            //get API from Express Backend
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
              
              //assign state posts with response data
              posts.value = response.data.data
              console.log(response.data.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        }


// function "postDelete"
    function postDelete(id) {

    //delete data post by ID
    axios.delete(`http://localhost:3000/api/posts/delete/${id}`)
    .then(() => {

        //panggil function "getDataPosts"  
        getDataPosts()

    }).catch(error => {
        console.log(error.response.data)
    })
    }

    
    //return
        return {
            posts,
            getDataPosts,
            postDelete		// <-- function "postDelete"
        }
    }
}
</script>