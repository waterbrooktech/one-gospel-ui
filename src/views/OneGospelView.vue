<template>
  <main class="flex flex-col justify-center h-screen relative">
    <div class="mb-2 text-center">
      <router-link class="hover:bg-transparent" to="/"><button class="text-white mb-4">Go Back</button></router-link>
    </div>
    <PageHeader class="mb-2" title="One Gospel Centers" />
    <h3 class="mb-10 text-center text-xl text-slate-100 md:mb-20 md:text-3xl">
      Which one of the <b>{{ areas.length }}</b> One Gospel Center&rsquo;s would you&rsquo;d like to join
    </h3>
    <div v-if="loading" class="w-full flex justify-center p-20">
      <DataLoading />
    </div>
    <centers-list :centers="areas" @click="setIsOpen(true)" />

    <div
      :class="[
        'fixed flex flex-col justify-center items-center h-full w-full max-w-7xl backdrop-blur-sm bg-opacity-30 transition-all duration-200 ease-in-out',
        {
          'invisible': !isOpen
        }
      ]">
      <div class="bg-white rounded w-full p-4 max-w-xs md:max-w-md">
        <h4 class="font-bold text-center text-black text-xl">Great! Let&rsquo;s get your details </h4>
        <p class="text-center text-gray-500 text-xs mb-4">
          Why do we need it? Good question, we&rsquo;d like to send you all the information you'll need to get there :)
        </p>
        <form>
          <div class="mb-4">
            <label :class="labelClass" for="name">
              Name
            </label>
            <input :class="inputClass" id="name" type="text" placeholder="Name" v-model="user.name">
          </div>
          <div class="mb-4">
            <label :class="labelClass" for="email">
              Email
            </label>
            <input :class="inputClass" id="email" type="email" placeholder="email" v-model="user.email">
          </div>
          <div class="mb-4">
            <label :class="labelClass" for="phoneNumber">
              Phone Number
            </label>
            <input :class="inputClass" id="phoneNumber" type="text" maxlength="11" placeholder="Phone Number" v-model="user.phoneNumber">
          </div>
          <div class="grid grid-cols-2 gap-x-4 mb-6">
            <button class="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="button" @click="registerUser">
              Sign Me Up
            </button>
            <button class="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-800" @click="setIsOpen(false)" type="button">
              Close
            </button>
          </div>
          <p class="text-center text-gray-500 text-xs">
            We look forward to seeing you soon!
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

import { DataLoading, PageHeader } from '@base';
import { CentersList } from '@/components/centers';

import { getCenters } from '../services';

const inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
const labelClass = 'block text-gray-700 text-sm font-bold mb-2';

const { commit, getters } = useStore();

const areas = ref([]);
const centers = ref([]);
const initialUser = getters.user.email ? { ...getters.user } : {};
const isOpen = ref(false);
const loading = ref(true);
const user = ref(initialUser);

console.log('getters.user => ', getters.user);

const getAllCenters = async () => {
  const response = await getCenters();
  centers.value = response.data;

  const areaData = [];
  
  for (const center of centers.value) {
    const index = areaData.findIndex(data => data.area.toLowerCase() === center.area.toLowerCase());

    if (index > -1) {
      areaData[index].availableSpots += center.maxCapacity - center.registeredCount;
    } else {
      areaData.push({ area: center.area, availableSpots: center.maxCapacity - center.registeredCount });
    }
  }

  areas.value = areaData;
  loading.value = false;
};

const registerUser = () => {
  commit('setUserInfo', { ...user.value });
  setIsOpen(false);
};

const setIsOpen = (value) => {
  isOpen.value = value
};

getAllCenters();
</script>