<script setup></script>

<template>
  <main>
    <div class="md:m-20 sm:mt-20 m-2">
      <section class="text-4xl">Edit User</section>
      <div class="sm:flex flex-row">
        <section class="w-full sm:h-72 h-60 w-4/5 relative">
          <form
            class="bg-white sm:h-72 h-60 relative shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-row md:flex"
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                First Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                :placeholder="user.first_name"
                @change="
                  (e) => {
                    this.user.first_name = e.target.value;
                    console.log(this.user.first_name);
                  }
                "
              />
            </div>
            <div class="mb-4 md:px-5">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
                @change="
                  (e) => {
                    this.user.last_name = e.target.value;
                    console.log(this.user.last_name);
                  }
                "
              >
                Last Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                :placeholder="user.last_name"
              />
            </div>
          </form>
          <button
            class="text-white bottom-3 ml-8 absolute bg-emerald-600 rounded-md py-2 px-6"
            type=""
            @click="
              () => {
                updateDetails();
              }
            "
          >
            Update Details
          </button>
        </section>
        <section
          class="w-full relative shadow-lg sm:h-72 h-56 sm:ml-5 m-0 mt-10 sm:mt-0 sm:w-3/5"
        >
          <img
            class="rounded-full w-35 h-35 m-auto sm:mt-10"
            :src="user.avatar"
            :alt="user.avatar"
          />

          <input
            type="file"
            @change="onFileSelected"
            class="hidden"
            ref="fileInput"
          />
          <button
            class="w-4/5 text-gray-500 w-4/5 bottom-3.5 border-solid border border-grey-50 absolute rounded-md py-2 px-6 m-auto left-2/4 translate-x-[-50%]"
            type=""
            @click="
              () => {
                $refs.fileInput.click();
              }
            "
          >
            <i class="fa-solid fa-camera"></i>
            Change Photo
          </button>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // SETTNIG USER ID FOR FETCHING, AND USER EMPTY OBJECT
      userId: window.localStorage.getItem("userId"),
      user: {},
      selectedFile: null,
    };
  },

  async mounted() {
    //FETCHING USER DATA
    try {
      const { data } = await axios.get(
        `https://reqres.in/api/users/${this.userId}`
      );
      this.user = data.data;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    // SETTING SELECTED FILE FOR FUTURE USAGE
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    // UPDATING DATABASE
    async updateDetails() {
      try {
        let body;
        //CASE : USER WANTS TO UPLOAD IMAGE
        if (this.selectedFile != null) {
          this.user.avatar = `https://reqres.in/api/img/faces/${this.selectedFile.name}`;
          body = {
            avatar: `https://reqres.in/api/img/faces/${this.selectedFile.name}`,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
          };
        }
        //CASE : USER DOESN`T WANTS TO UPLOAD IMAGE
        if (this.selectedFile == null) {
          body = {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
          };
        }
        //FETCHING DATA WITH 'PUT' METHOD
        await axios
          .put(`https://reqres.in/api/users/${this.userId}`, body)
          .then((res) => {
            console.log(body);
            console.log(res);
            alert(`Status: ${res.status}`);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
