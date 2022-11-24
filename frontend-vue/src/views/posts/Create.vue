<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add Journal</h4>
                        <hr>
                        <div v-if="validation.errors" class="mt-2 alert alert-danger">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">{{ `${error.param} : ${error.msg}` }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mb-2">TITLE</label>
                                <input type="text" class="form-control" v-model="post.title" placeholder="Journal Title">
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold mb-2">CONTENT</label>
                                <textarea class="form-control" rows="4" v-model="post.content" placeholder="Add Your Jurnal Here"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">Save</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>