<template>
  <main class="flex flex-col justify-center gap-4 mx-auto relative overflow-y-scroll p-4 max-w-2xl lg:h-screen lg:pt-0">
    <PageHeader class="mb-2" title="New Post" />
    <div v-if="submitting" class="w-full flex justify-center p-20">
      <DataLoading />
    </div>
    <div v-else>
      <h5 class="font-bold text-slate-100 text-xl">Title</h5>
      <input class="p-2 rounded text-lg w-full focus:outline-none focus-visible:outline-none" type="text" v-model="title" />
      <small class="block mb-4 mt-2 text-slate-100">Character Count: {{title.length}}/{{ MIN_TITLE_LENGTH }}</small>

      <h5 class="font-bold text-slate-100 text-xl">Post</h5>
      <ckeditor :editor="editor" v-model="message" :config="editorConfig"></ckeditor>
      <small class="block mb-4 mt-2 text-slate-100">Character Count: {{characterCount}}/{{ MIN_POST_LENGTH }}</small>
      
      <h5 class="font-bold text-slate-100 text-xl">Link</h5>
      <div class="flex">
        <span class="bg-yellow-400 text-slate-900 inline-block shrink-0 p-2 text-lg rounded-bl rounded-tl">http://</span>
        <input class="p-2 inline-block grow rounded-br rounded-tr text-lg focus:outline-none focus-visible:outline-none" type="text" v-model="link" />
      </div>
      <small v-if="link && link.length > 0"
        :class="[
          'block',
          { 'text-slate-100': isValidURL },
          { 'text-red-500': !isValidURL }
        ]">{{isValidURL ? 'Valid Link' : 'Invalid Link'}}</small>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="setIsOpen(true)"
          :disabled="disabled">
          Save Post
        </button>
        <router-link to="/">
          <button class="text-white font-bold py-2 px-6 w-full rounded focus:outline-none focus:shadow-outline">
            Go Back
          </button>
        </router-link>
      </div>
    </div>

    <div
      :class="[
        'fixed top-0 left-0 z-50 lg:flex justify-center lg:items-center h-full lg:h-full w-full max-w-7xl backdrop-blur-sm bg-opacity-30 transition-all duration-200 ease-in-out',
        {
          'invisible': !isOpen
        }
      ]">
      <div class="bg-white rounded w-full h-full lg:h-auto p-4 overflow-y-scroll md:max-w-md">
        <h4 class="font-bold text-center text-black text-xl">Confirm Password</h4>
        <p class="text-center text-gray-500 text-xs mb-4">
          To post, we need to verify you are allowed to post. Please put in the password below:
        </p>
        <div v-if="confirming" class="w-full flex justify-center p-20">
          <DataLoading />
        </div>
        <form v-else>
          <div class="mb-4">
            <label :class="labelClass" for="password">
              Confirm Password
            </label>
            <input :class="inputClass" id="name" type="password" placeholder="Password" v-model="data.password">
          </div>
          <div class="grid grid-cols-2 gap-x-4 mb-6">
            <button class="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="button" @click="confirmPassword">
              Confirm
            </button>
            <button class="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-800" @click="setIsOpen(false)" type="button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { DataLoading, PageHeader } from '@base';

import { persistPasswordConfirmation, createPost } from '../services';

const $toast = useToast();

const MIN_TITLE_LENGTH = 5;
const MIN_POST_LENGTH = 20;

const inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
const labelClass = 'block text-gray-700 text-sm font-bold mb-2';

const confirming = ref(false);
const data = ref({ password: null });
const isOpen = ref(false);
const link = ref('');
const message = ref('');
const submitting = ref(false);
const title = ref('');

const editor = ClassicEditor;
const editorConfig = {
  colors: [
		{
			color: 'hsl(0, 0%, 0%)',
			label: 'Black'
		},
		{
			color: 'hsl(0, 0%, 30%)',
			label: 'Dim grey'
		},
		{
			color: 'hsl(0, 0%, 60%)',
			label: 'Grey'
		},
		{
			color: 'hsl(0, 0%, 90%)',
			label: 'Light grey'
		}],
  style: [{
    name: 'Default',
    element: 'p',
    classes: ['text-black']
  }],
};

const characterCount = computed(() => message.value.replace(/<\/{0,1}\D>/gm, '').length);
const disabled = computed(() => characterCount.value.length < MIN_POST_LENGTH || title.value.length < MIN_TITLE_LENGTH || (!!link.value && !isValidURL.value));

const confirmPassword = async () => {
  try {
    await persistPasswordConfirmation({ ...data.value});

    confirming.value = true;
    setIsOpen(false);
    savePost();
  } catch (e) {
    confirming.value = false;
    const messageError = e.response.data ? e.response.data.message : undefined;
    showErrorToast(messageError);
  }
};

const isValidURL = computed(() => {
  try {
    new URL(`https://${link.value}`);
    return true;
  } catch (_) {
    return false;
  }
});

const savePost = async () => {
  try {
    submitting.value = true;
    await createPost({
      title: title.value,
      message: message.value,
      ...(link.value && { link: `https://${link.value}` })
    });

    submitting.value = false;
    $toast.success("Post created successfully.");
    link.value = '';
    message.value = '';
    title.value = '';
  } catch (e) {
    submitting.value = false;
    const messageError = e.response.data ? e.response.data.message : undefined;
    showErrorToast(messageError);
  }
};

const setIsOpen = (value) => {
  isOpen.value = value
};

const showErrorToast = (message) => {
  $toast.error(message ?? 'An error occured, please try again or message us at info@thewaterbrook.com.', {
      toastClassName: "toast-class-error"
    });
};

</script>