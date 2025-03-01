import { defineStore } from 'pinia'
import axios from 'axios'
import type { User, Post } from '@/types'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] as User[],
        posts: [] as Post[],
        isLoading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchUsers() {
            this.isLoading = true
            this.error = null
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                this.users = response.data
            } catch (error) {
                this.error = 'Помилка при завантаженні користувачів.'
            } finally {
                this.isLoading = false
            }
        },

        async fetchPostsForUser(userId: number) {
            this.isLoading = true
            this.error = null
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                this.posts = response.data
            } catch (error) {
                this.error = 'Помилка при завантаженні постів.'
            } finally {
                this.isLoading = false
            }
        },

        async createPostForUser(userId: number, title: string, body: string) {
            this.isLoading = true
            this.error = null
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                    userId,
                    title,
                    body,
                })
                this.posts.unshift(response.data)
            } catch (error) {
                this.error = 'Помилка при створенні поста.'
                throw error
            } finally {
                this.isLoading = false
            }
        },
    },
})
