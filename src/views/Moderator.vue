<script setup>
import PostProducts from '@/components/PostProducts.vue';
import Header from '@/components/HeaderComponent.vue';
import PostCategories from '@/components/PostCategories.vue';
import PostCoupom from '@/components/PostCoupom.vue';
import PostDiscounts from '@/components/PostDiscounts.vue';
import OrdersComponent from '@/components/OrdersComponent.vue';
import PostModerator from '@/components/PostModerator.vue';
import { useAuthStore } from '@/stores/auth';
import { ref, computed} from 'vue';

// Estado da aba ativa
const activeTab = ref(1);
const auth = useAuthStore();

// Lista de abas
const tabs = [
    { id: 1, label: "Product" },
    { id: 2, label: "Category" },
    { id: 3, label: "Discount" },
    { id: 4, label: "Coupons" },
    { id: 5, label: "Orders" },
    { id: 6, label: "Users" , adminOnly: true},

];

const visibleTabs = computed(() => {
    return tabs.filter(tab => {
        return !(tab.adminOnly && auth.user?.role !== 'ADMIN');
    });
});

</script>

<template>
    <main>
        <Header></Header>
        <!--Tabs Here-->
        <div class="flex border-b">
            <button v-for="tab in visibleTabs" key="tab.id" @click="activeTab = tab.id"
                class="flex-1 py-2 text-center border-b-2 transition-colors duration-300"
                :class="activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'">
                {{ tab.label }}
            </button>
        </div>

        <!-- Content for each tab-->
        <div class="p-4">
            <div v-if="activeTab === 1">
                <PostProducts />
            </div>
            <div v-if="activeTab === 2">
                <PostCategories />
            </div>
            <div v-if="activeTab === 3">
                <PostDiscounts />
            </div>
            <div v-if="activeTab === 4">
                <PostCoupom />
            </div>
            <div v-if="activeTab === 5">
                <OrdersComponent />
            </div>
            <div v-if="activeTab === 6 && auth.user?.role == 'ADMIN'">
                <PostModerator />
            </div>
        </div>
    </main>
</template>