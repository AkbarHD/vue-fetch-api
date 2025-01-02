<script setup>
import ProductCard from '../components/ProductCard.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';

import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, onBeforeUnmount, onUnmounted, ref, watch, watchEffect } from 'vue';

// const page = ref(1);
// function nextPage() {
// 	page.value++;
// }
import axios from 'axios';
const products = ref([]);
const page = ref(1);
const limit = ref(8);
const isLoading = ref(true);

// penggunaan watchEffect akan memangkas lifecycle dan watch cukup menggunakan watchEffect
async function fetchData() {
	try {
		isLoading.value = true; // agar muncul loading
		const response = await axios.get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`)
		products.value = response.data;
	} catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false
	}
}

watchEffect(() => {
	fetchData();
});

// penggunaan lifecycle
// onMounted(async () => {
// 	try {
// 		products.value = await axios.get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`)
// 			.then((res) => res.data);
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		isLoading.value = false
// 	}
// });

// watch(page, async () => {
// 	try {
// 		// tambahkan loading true
// 		isLoading.value = true
// 		products.value = await axios.get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`)
// 			.then((res) => res.data);
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		isLoading.value = false
// 	}
// });

// tidak mnggunakan lifecycle, jadi tidak perlu menggunakan suspend
// products.value = await axios.
// 	get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`)
// 	.then((res) => res.data);

// console.log(products.value);


function changePage(newPage) {
	if (newPage < 1) return;
	if (newPage > products.value.pages) return;

	page.value = newPage;
}


// async function getProducts() {
// 	const response = await axios.get('http://localhost:3000/products');
// 	products.value = response.data;
// 	console.log(response.data);
// }

// getProducts();

// onBeforeMount(() => {
// 	console.log('Component will be mounted soon');
// });

// onMounted(() => {
// 	console.log('Component has been mounted');
// });

// pagination
// onBeforeUpdate(() => {
// 	console.log('Component will be updated soon');
// });

// onUpdated(() => {
// 	console.log('Component has been updated');
// });

// berpindah halaman
// onBeforeUnmount(() => {
// 	console.log('Component will be unmounted soon');
// });

// onUnmounted(() => {
// 	console.log('Component has been unmounted');
// });

</script>

<template>
	<!-- {{ products }} -->
	<!-- {{ page }} -->
	<!-- <button @click="nextPage">Next Page</button> -->
	<div v-show="isLoading">
		<Loading />
	</div>
	<main>
		<div class="product-grid">
			<!-- Product 1 --> <!-- karna menggunakan pagination harus products.data -->
			<ProductCard v-for="(product, index) in products.data" :key="index" :product="product" />
		</div>
		<div class="pagination">
			<Pagination :page="page" :totalPages="products.pages" @change-page="changePage" />
		</div>
	</main>
</template>


<style scoped>
.product-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
	width: 80%;
	margin: 0 auto;
}


.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}
</style>