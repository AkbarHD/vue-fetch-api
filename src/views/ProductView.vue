<script setup>
import { onMounted, ref } from 'vue';
import ProductForm from '@/components/ProductForm.vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const product = ref({});
const showForm = ref(false);

onMounted(() => {
    fetchData();
})

async function fetchData() {
    const API_URL = `http://localhost:3000/products/${id}`;
    try {
        const response = await axios.get(API_URL);
        product.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

// fungsi update
async function updateProduct(product) {
    const API_URL = `http://localhost:3000/products/${id}`;
    try {
        await axios.put(API_URL, product);
        router.push('/');
    } catch (error) {
        console.log(error);
    }
}

// fungsi delete
async function deleteProduct() {
    const API_URL = `http://localhost:3000/products/${id}`;
    try {
        await axios.delete(API_URL);
        router.push('/');
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <div class="product-detail">
        <h2>{{ product.title }}</h2>
        <img :src="product.image" :alt="product.title" class="product-image" />
        <p>Description: {{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <router-link to="/" class="back-button">Back</router-link>
        <button @click="deleteProduct" class="asu">Delete</button>
        <!-- update -->
        <div :class="showForm">
            <ProductForm :product="product" @update-product="updateProduct" />
        </div>
    </div>
</template>

<style scoped>
/* Styling untuk halaman detail produk */
.product-detail {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    text-align: center;
}

.product-image {
    width: 200px;
    height: auto;
    margin-bottom: 10px;
}

.product-detail p {
    margin-bottom: 5px;
}

.product-detail button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.back-button {
    display: inline-block;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.back-button:hover {
    background-color: #0056b3;
}

.asu {
    color: white !important;
    background-color: red !important;
    margin-left: 10px;
}
</style>