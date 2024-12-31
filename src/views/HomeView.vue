<script setup>
import ProductCard from '../components/ProductCard.vue';
import Pagination from '@/components/Pagination.vue';

import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, onBeforeUnmount, onUnmounted, ref, watch } from 'vue';

// const page = ref(1);
// function nextPage() {
	// 	page.value++;
	// }
import axios from 'axios';
const products = ref([]);
const page = ref(1);
const limit = ref(8);

products.value = await axios.
	get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`)
	.then((res) => res.data);

// console.log(products.value);

watch(page, async () => [
	products.value = await axios.
		get(`http://localhost:3000/products?_page=${page.value}&_per_page=${limit.value}`)
		.then((res) => res.data)
]);

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
	<button @click="nextPage">Next Page</button>
	<main>
		<div class="product-grid">
			<!-- Product 1 -->
     		 <ProductCard v-for="(product, index) in products.data" :key="index" :product="product" />
		</div>
		<div class="pagination">
      		<Pagination />
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