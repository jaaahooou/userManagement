<script setup></script>

<template>
  <main>
    <div class="sm:m-20 m-2">
      <section class="text-4xl">User list</section>
      <section class="w-full shadow-lg h-4/5 w-4/5">
        <section
          class="w-full mt-5 sm:w-11/12 m-auto sm:flex flex-row content-between relative"
        >
          <!-- ========= SEARCH ABD ADD USER ========= -->
          <form>
            <label class="relative block">
              <input
                class="w-full bg-white placeholder:font-italitc drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
                placeholder="Search for users..."
                type="text"
                @change="
                  (e) => {
                    this.nameToSearch = e.target.value;
                    console.log(this.nameToSearch);
                  }
                "
              />

              <span
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                @click="
                  () => {
                    searchUser();
                  }
                "
              >
                <svg
                  class="h-5 w-5 fill-black"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path
                    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                  ></path>
                </svg>
              </span>
            </label>
          </form>

          <RouterLink :to="{ name: `addUser` }">
            <button
              class="text-white sm:right-0 mt-2 sm:m-0 absolute mr-3 bg-emerald-600 rounded-full py-2 px-6"
              type=""
            >
              + Add User
            </button>
          </RouterLink>

          <!-- ========= SEARCH AND ADD USER END ========= -->
        </section>

        <!-- ========= DISPLAY USERS ========= -->
        <table class="w-full m-auto sm:w-11/12 mt-10 sm:mt-0">
          <thead class="bg-white border-b-2 border-gray-200">
            <tr>
              <th
                class="p-3 text-s, font-semibold tracking-wide text-left"
              ></th>
              <th class="p-3 text-s, font-semibold tracking-wide text-left">
                Full Name
              </th>

              <th class="p-3 text-s, font-semibold tracking-wide text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <!-- ========= LOOPING THROUGH USERS ========= -->
            <tr v-for="user in users" :key="user.id">
              <td :class="user.id % 2 === 0 ? 'bg-stone-100' : 'bg-white'">
                <img class="rounded-full w-8 h-8" :src="user.avatar" alt="" />
              </td>
              <td :class="user.id % 2 === 0 ? 'bg-stone-100' : 'bg-white'">
                <span>{{ user.first_name }}&nbsp{{ user.last_name }}</span>
              </td>
              <td
                :class="user.id % 2 === 0 ? 'bg-stone-100' : 'bg-white'"
                class="text-right p-3"
              >
                <!-- ========= LINK TO USER ========= -->
                <RouterLink :to="{ path: `/user/${user.id}` }">
                  <i
                    class="fa-regular fa-pen-to-square px-2"
                    style="color: #9c9c9c"
                    @click="
                      () => {
                        console.log('USER', user.id);
                        setUserIdInLocalStorage(user.id);
                      }
                    "
                  ></i
                ></RouterLink>
                <!-- ========= LINK TO USER END ========= -->
                <!-- ========= DELETE USER ========= -->
                <i
                  class="fa-solid fa-trash"
                  style="color: #9c9c9c"
                  @click="
                    () => {
                      deleteUser(user.id);
                    }
                  "
                ></i>
                <!-- ========= DELETE USER END ========= -->
              </td>
            </tr>
            <!-- ========= LOOPING THROUGH USERS END ========= -->
          </tbody>
        </table>
        <!-- ========= DISPLAY USERS END ========= -->
      </section>

      <!-- ========= PAGINATION ========= -->
      <section class="flex">
        <div
          @click="
            () => {
              // CHANGE PAGE NUMBER TO ONE LESS THEN ACTUAL PAGE
              newPage = this.actualPage - 1;
              getUsers(newPage);
            }
          "
          class="w-8 h-8 bg-white mt-4 border-solid leading-8 border border-grey-50 cursor-pointer"
        >
          <i class="fa-solid px-1.5 fa-angles-left" style="color: #9c9c9c"></i>
        </div>
        <!-- ========= LOOPING THROUGH PAGES ========= -->
        <div v-for="page in total_pages" :key="page">
          <div
            @click="
              () => {
                // CHANGE PAGE NUMBER TO NUMBER FROM BUTON
                this.actualPage = page;
                getUsers(page);
              }
            "
            :class="
              // SET EMERALD BACKGROUND TO BUTTON WITH ACTUAL PAGE NUMBER
              page == actualPage
                ? 'w-8 h-8 mt-4 bg-emerald-600 border-solid leading-8 border border-grey-50 cursor-pointer'
                : 'w-8 h-8 mt-4 bg-white border-solid leading-8 border border-grey-50 cursor-pointer'
            "
          >
            <span class="px-2.5"> {{ page }}</span>
          </div>
        </div>

        <div
          @click="
            () => {
              // INCREASE ACTUAL PAGE NUMBER BY ONE
              newPage = this.actualPage + 1;
              console.log(newPage);
              getUsers(newPage);
            }
          "
          class="w-8 h-8 bg-white mt-4 border-solid leading-8 border border-grey-50 cursor-pointer"
        >
          <i class="fa-solid px-1.5 fa-angles-right" style="color: #9c9c9c"></i>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // SETTING FIRST STATES
      users: [],
      total_pages: 0,
      actualPage: 0,
      nameToSearch: null,
    };
  },

  async mounted() {
    // FETCHING FIRST PAGE
    try {
      const { data } = await axios.get("https://reqres.in/api/users?page=1");

      this.users = data.data;
      this.total_pages = data.total_pages;
      this.actualPage = 1;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    // GETTING USERS FROM SETTED PAGE
    async getUsers(page) {
      // IF PAGE NUMBER LOWER THEN ONE, SETTING PAGE NUMBER TO ONE
      if (page < 1) {
        page = 1;
      }
      // IF PAGE NUMNER IS GREATER THAN NUMBER OF PAGES, SETTING PAGE TO LAST STATE
      if (page > this.total_pages) {
        page = this.total_pages - 1;
      }

      try {
        // FETCHING USERS FROM REQUESTED PAGE NUMBER
        const { data } = await axios.get(
          `https://reqres.in/api/users?page=${page}`
        );

        this.users = data.data;
        this.total_pages = data.total_pages;
        this.actualPage = page;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser(id) {
      //FILTER METHOD RETURNS UPDATED ARRAY OF USER (I CANT DELETE USER FROM REQRES DATABASE)
      this.users = this.users.filter((user) => user.id != id);

      try {
        await axios
          .delete(`https://reqres.in/api/users/${id}`)
          .then(function (res) {
            let status = res.status;
            // DISPLAY RESPONSE STATUS BY ALERT
            alert(`Response Status: ${status} `);
          });
      } catch (error) {
        console.log(error);
      }
    },

    //PASS USER ID TO LOCAL STARAGE FOR FUTURE USAGE (DISPLAY USER)
    setUserIdInLocalStorage(id) {
      window.localStorage.setItem("userId", id);
    },

    //SEARCH USER

    searchUser(nameToSearch) {
      console.log(this.nameToSearch);
      console.log(this.users);
      let userArray = this.users.map((user) =>
        JSON.parse(JSON.stringify(user))
      );
      console.log(userArray);

      let searchByFirstName = (str) =>
        userArray.filter(({ first_name }) => first_name.includes(str));

      this.users = searchByFirstName(this.nameToSearch);
      console.log(this.users);
    },
  },
};
</script>
