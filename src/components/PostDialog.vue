<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import { useUserStore } from '@/stores/userStore'
import { ElNotification, ElScrollbar, ElEmpty, ElCard, ElForm, ElFormItem, ElInput, ElButton, ElDialog } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface PostDialogProps {
    userId: number | null
}

const props = defineProps<PostDialogProps>()

const dialogVisible = ref(false)
const emit = defineEmits(['close'])

const userStore = useUserStore()

const formRef = ref<FormInstance>()
const newPost = ref({ title: '', body: '' })

const rules: FormRules = {
    title: [{ required: true, message: 'Введіть заголовок', trigger: 'blur' }],
    body: [{ required: true, message: 'Введіть текст поста', trigger: 'blur' }],
}

watch(
    () => props.userId,
    (newVal) => {
        if (newVal !== null) {
            userStore.fetchPostsForUser(newVal)
        }
    }
)

async function submitForm() {
    if (!formRef.value || !props.userId) return
    
    await formRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await userStore.createPostForUser(
                    props.userId as number,
                    newPost.value.title,
                    newPost.value.body
                )
                ElNotification({
                    title: 'Успіх',
                    message: 'Пост успішно створено!',
                    type: 'success',
                })
                
                newPost.value.title = ''
                newPost.value.body = ''
            } catch {
                ElNotification({
                    title: 'Помилка',
                    message: 'Не вдалося створити пост',
                    type: 'error',
                })
            }
        }
    })
}

function closeForm() {
    dialogVisible.value = false
    emit('close')
}

const posts = () => userStore.posts
const isLoading = computed(() => userStore.isLoading)
</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="Пости користувача"
    >
        <el-scrollbar height="300px">
            <div v-if="isLoading" class="loading-state">Завантаження постів...</div>
            <template v-else>
                <el-empty description="Немає постів" v-if="posts().length === 0" />
                <el-card
                    v-for="post in posts()"
                    :key="post.id"
                    class="mb-2"
                >
                    <strong>{{ post.title }}</strong>
                    <p>{{ post.body }}</p>
                </el-card>
            </template>
        </el-scrollbar>
        
         Форма створення нового поста
        <div class="form-container">
            <el-form
                ref="formRef"
                :model="newPost"
                :rules="rules"
                label-position="top"
            >
                <el-form-item prop="title">
                    <el-input v-model="newPost.title" placeholder="Введіть заголовок" />
                </el-form-item>
                
                <el-form-item prop="body">
                    <el-input type="textarea" v-model="newPost.body" placeholder="Введіть текст поста" />
                </el-form-item>
            </el-form>
        </div>
        
        <template #footer>
            <el-button @click="closeForm">Скасувати</el-button>
            <el-button type="primary" @click="submitForm">Створити пост</el-button>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.mb-2 {
    margin-bottom: 8px;
}
.form-container {
    margin-top: 16px;
}
.loading-state {
    text-align: center;
    margin: 20px 0;
}
@media (max-width: 992px) {
    :deep(.el-dialog) {
        --el-dialog-width: 90%;
        margin: 0 auto;
    }
    
    :deep(.el-dialog__body) {
        font-size: 14px;
    }
}
</style>
