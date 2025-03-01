<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PostDialog from '@/components/PostDialog.vue'
import { useUserStore } from '@/stores/userStore'
import type {User} from "@/types";
import { ElTable, ElTableColumn, ElButton, ElInput } from 'element-plus'

const userStore = useUserStore()
const searchTerm = ref('')
const selectedUserId = ref<number | null>(null)
const isDialogVisible = ref(false)

onMounted(() => {
    userStore.fetchUsers()
})

const filteredUsers = computed(() => {
    if (!searchTerm.value) {
        return userStore.users
    }
    return userStore.users.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})

function openPostDialog(userId: number) {
    selectedUserId.value = userId
    isDialogVisible.value = true
}

</script>

<template>
    <div class="users-page">
        <el-table :data="filteredUsers" :loading="userStore.isLoading">
            <el-table-column prop="id" label="ID" width="40" />
            <el-table-column prop="name" label="Ім'я" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="address.city" label="Місто" width="150"/>
            
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="searchTerm" size="small" placeholder="Пошук" />
                </template>
                <template #default="{ row }">
                    <el-button
                        type="primary"
                        @click="openPostDialog(row.id)"
                        class="icon-button"
                    >
                        <img
                            src="@/assets/eye_icon.svg"
                            alt="Переглянути"
                            class="button-icon"
                        />
                        <span class="button-text">Переглянути</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <div v-if="userStore.error" class="error">{{ userStore.error }}</div>
        
        <PostDialog
            v-model="isDialogVisible"
            :userId="selectedUserId"
            @close="isDialogVisible = false"
        />
    </div>
</template>

<style scoped lang="scss">
.users-page {
    padding: 16px;
}

.icon-button {
    display: inline-flex;
    align-items: center;
    .button-icon {
        width: 20px;
        height: 20px;
        display: none;
    }
    .button-text {
        margin-left: 8px;
    }
}

.loading-state {
    margin-top: 16px;
    color: #999;
}

.error {
    margin-top: 16px;
    color: red;
}

@media (max-width: 992px) {
    .users-page {
        padding: 8px;
    }
    
    .icon-button {
        .button-icon {
            display: inline-block;
        }
        .button-text {
            display: none;
        }
    }
}
</style>
