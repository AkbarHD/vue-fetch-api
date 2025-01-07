<script setup>
import { ref, defineProps, computed, defineEmits, watchEffect } from 'vue';
const props = defineProps(['product']);
// const props = defineProps(
//     {
//         product: Object
//     }
// );
const title = ref('');
const description = ref('');
const price = ref('');
const image = ref('');
const id = ref('');

const showForm = ref(false);
const isUpadate = computed(() => !!props.product); // ada atau tidak

const emit = defineEmits(['create-product', 'update-product']);

watchEffect(() => {
    if (props.product) {
        title.value = props.product.title;
        description.value = props.product.description;
        price.value = props.product.price;
        image.value = props.product.image;
        id.value = props.product.id;
        // jika tidak ada
    } else {
        title.value = '';
        description.value = '';
        price.value = '';
        image.value = '';
        id.value = '';
    }
});

function saveProduct() {
    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        image: image.value,
    };

    if (isUpadate.value) {
        // jika ada maka update
        emit('update-product', product);
    } else {
        // jika tidak ada maka create
        emit('create-product', product);
    }
    showForm.value = false;
    title.value = '';
    description.value = '';
    price.value = '';
    image.value = '';
}

</script>
<template>
    <div class="add-product">
        <button @click="showForm = true">{{ isUpadate ? 'Update' : 'Add' }} Product</button>
        <div v-if="showForm" class="product-form">
            <form @submit.prevent="saveProduct">
                <label for="title">Title</label>
                <input type="text" v-model="title" id="title" required>
                <label for="description">Description</label>
                <input type="text" v-model="description" id="description" required>
                <label for="price">price</label>
                <input type="number" v-model="price" id="price" required>
                <label for="image">image</label>
                <input type="text" v-model="image" id="image" required>
                <button type="submit">Save</button>
                <button @click="showForm = false">CLOSE</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.add-product {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.add-product button {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.add-product button:hover {
    background-color: #218838;
    transform: translateY(-2px);
}

.add-product button:focus {
    outline: none;
}

.add-product button:active {
    transform: translateY(1px);
    background-color: #1e7e34;
}

.product-form {
    margin-top: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
    text-align: left;
}

.product-form label {
    display: block;
    margin-bottom: 5px;
}

.product-form input[type='text'],
.product-form input[type='number'] {
    width: calc(100% - 20px);
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.product-form button {
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.product-form button:hover {
    background-color: #0056b3;
}

.product-form button[type='submit'] {
    background-color: #28a745;
}

.product-form button[type='submit']:hover {
    background-color: #218838;
}

.product-form button[type='button'] {
    background-color: #dc3545;
}

.product-form button[type='button']:hover {
    background-color: #c82333;
}
</style>