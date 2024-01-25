<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <div class="w-full">
      <LoadingPage
        v-if="isLoading"
        class="absolute left-[50%] top-[8px] translate-x-[-50%]"
      />
      <div
        class="flex items-center gap-[10px] border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
      >
        <img
          src="../../assets/icons/user-black.png"
          alt="user"
          class="w-[14px]"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Session List
        </h1>
      </div>
    </div>
    <div>
      <button
        class="flex items-center gap-2 text-[14px] p-[5px_10px] border-[1px] border-[solid] border-[#ddd] rounded-[5px] mt-2 hover:border-[rgba(32,111,162,0.5)] hover:bg-[rgba(32,111,162,0.05)] duration-[0.1s]"
      >
        <img
          src="../../assets/icons/delete.png"
          alt="delete"
          class="w-[15px]"
        />InvaliddateSession
      </button>
      <table class="w-full border-[1px] mt-[17px]">
        <thead>
          <tr>
            <th
              v-for="(item, index) in tableHead"
              :key="index"
              class="border-[1px] py-[8px] text-[14px]"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in sessionList" :key="index">
            <td class="border-[1px] p-[5px] text-[14px] text-center">
              <input type="checkbox" class="cursor-pointer" />
            </td>
            <td class="border-[1px] p-[5px] text-[14px] w-[320px]">
              {{ user.id }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">{{ user.ip }}</td>
            <td class="border-[1px] p-[5px] text-[14px]">{{ user.user }}</td>
            <td class="border-[1px] p-[5px] text-[14px]">{{ user.os }}</td>
            <td class="border-[1px] p-[5px] text-[14px]">
              {{ user.userAgent }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">
              {{ user.ipSession }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">
              {{
                new Date(user.creationTime).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">
              {{
                new Date(user.lastAccessedTime).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">
              {{ user.usedTime }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">
              {{ user.inactiveTime }}
            </td>
            <td class="border-[1px] p-[5px] text-[14px]">{{ user.ttl }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingPage from '../Loading/LoadingPage.vue'
export default {
  components: { LoadingPage },
  data() {
    return {
      sessionList: null,
      isLoading: false,
      tableHead: [
        'Check',
        'Id',
        'Access for ip',
        'Username',
        'OS',
        'Browser',
        'Ip',
        'Creation time',
        'Last accessed time',
        'Used time',
        'Inactive time',
        'Time to live',
      ],
    }
  },
  mounted() {
    // Sessions request
    this.isLoading = !this.isLoading
    axios
      .get('https://192.168.1.55:8443/api/sessions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        this.isLoading = !this.isLoading
        this.sessionList = res.data
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
}
</script>
