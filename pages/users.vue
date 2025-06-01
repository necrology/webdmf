<template>
  <div class="min-h-screen bg-gray-100 relative">
    <h1 class="text-2xl font-bold mb-6">Data User</h1>

    <!-- Notifikasi Popup -->
    <transition name="fade">
      <div
        v-if="notifMessage"
        @click="clearNotif"
        :class="[
          notifType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
          'fixed top-6 right-6 flex items-center gap-3 px-4 py-3 rounded shadow-lg cursor-pointer z-50 select-none',
          'max-w-xs',
          'drop-shadow-lg',
        ]"
      >
        <svg
          v-if="notifType === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="flex-grow">{{ notifMessage }}</span>
        <button @click.stop="clearNotif" aria-label="Close" class="ml-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <!-- Card Pembungkus -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Header card: kontrol pencarian dan tombol tambah -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div class="flex items-center gap-3 w-full md:w-2/3">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari data..."
            class="flex-grow px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div class="flex items-center gap-2">
            <label class="text-gray-700">Tampilkan</label>
            <select
              v-model.number="perPage"
              class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>
        </div>

        <!-- Tombol Tambah dipindahkan kanan -->
        <div class="w-full md:w-auto flex justify-end">
          <button @click="showModal = true" class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600">
            + Tambah User
          </button>
        </div>
      </div>

      <!-- Tabel -->
      <div v-if="loading" class="text-center text-gray-600 py-10">Loading data...</div>
      <div v-else-if="error" class="text-center text-red-500 py-10">Error: {{ error }}</div>
      <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full table-auto border-collapse">
          <thead class="bg-blue-600 text-white">
            <tr>
              <th class="px-4 py-3 text-left">Nama</th>
              <th class="px-4 py-3 text-left">Email</th>
              <th class="px-4 py-3 text-left">No HP</th>
              <th class="px-4 py-3 text-left">Alamat</th>
              <th class="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.user_id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2">{{ user.no_hp }}</td>
              <td class="px-4 py-2">{{ user.alamat }}</td>
              <td class="px-4 py-2 whitespace-nowrap">
                <button
                  @click="editUser(user)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  @click="deleteUser(user.user_id)"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="5" class="text-center text-gray-500 py-4">Data tidak ditemukan.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-center items-center gap-4">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          ← Prev
        </button>
        <span class="text-gray-700">Halaman {{ currentPage }} dari {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Modal Form Tambah / Edit -->
    <div v-if="showModal" class="fixed inset-0 flex items-start justify-center pt-24 backdrop-blur-sm z-50">
      <div class="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6 relative">
        <h2 class="text-xl font-semibold mb-4">{{ isEdit ? "Edit User" : "Tambah User" }}</h2>
        <form @submit.prevent="submitUser">
          <div class="mb-4">
            <label class="block mb-1">Nama</label>
            <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block mb-1">Email</label>
            <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block mb-1">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="w-full border rounded px-3 py-2"
              :required="!isEdit"
              placeholder="Isi password baru jika ingin mengubah"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-1">No HP</label>
            <input v-model="form.no_hp" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="mb-4">
            <label class="block mb-1">Alamat</label>
            <textarea v-model="form.alamat" class="w-full border rounded px-3 py-2" required></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Batal
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {{ isEdit ? "Update" : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const users = ref([]);
const loading = ref(false);
const error = ref(null);
const showModal = ref(false);
const notifMessage = ref("");
const notifType = ref("success");

const isEdit = ref(false); // Mode tambah/edit
const editUserId = ref(null); // Menyimpan user_id yang diedit

const form = ref({
  name: "",
  email: "",
  password: "",
  no_hp: "",
  alamat: "",
  role_id: 2,
  created_by: 1,
});

const searchQuery = ref("");
const currentPage = ref(1);
const perPage = ref(5);

const filteredUsers = computed(() => {
  const keyword = searchQuery.value.toLowerCase();
  return users.value.filter((user) =>
    [user.name, user.email, user.no_hp, user.alamat].some((field) => field?.toLowerCase().includes(keyword))
  );
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage.value));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredUsers.value.slice(start, start + perPage.value);
});

watch([searchQuery, perPage], () => {
  currentPage.value = 1;
});

let notifTimeout = null;

function setNotif(type, message) {
  notifType.value = type;
  notifMessage.value = message;

  // Clear timeout if already running
  if (notifTimeout) clearTimeout(notifTimeout);

  // Auto hide notif after 4 seconds
  notifTimeout = setTimeout(() => {
    notifMessage.value = "";
    notifTimeout = null;
  }, 4000);
}

function clearNotif() {
  notifMessage.value = "";
  if (notifTimeout) {
    clearTimeout(notifTimeout);
    notifTimeout = null;
  }
}

async function fetchUsers() {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("http://103.127.99.152:8888/users");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    users.value = data ?? [];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.value = {
    name: "",
    email: "",
    password: "",
    no_hp: "",
    alamat: "",
    role_id: 2,
    created_by: 1,
  };
  editUserId.value = null;
  isEdit.value = false;
}

function closeModal() {
  showModal.value = false;
  resetForm();
}

function editUser(user) {
  isEdit.value = true;
  editUserId.value = user.user_id;

  form.value.name = user.name;
  form.value.email = user.email;
  form.value.password = ""; // Kosongkan password saat edit, agar user isi ulang jika mau ubah
  form.value.no_hp = user.no_hp;
  form.value.alamat = user.alamat;
  form.value.role_id = user.role_id || 2;

  showModal.value = true;
}

async function submitUser() {
  try {
    let url = "http://103.127.99.152:8888/users";
    let method = "POST";

    if (isEdit.value && editUserId.value) {
      url += `/${editUserId.value}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password, // Jika kosong di API GoLang bisa abaikan update password
        no_hp: form.value.no_hp,
        alamat: form.value.alamat,
        role_id: form.value.role_id,
        created_by: form.value.created_by,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setNotif("error", data.error || "Gagal menyimpan data.");
      return;
    }

    setNotif("success", isEdit.value ? "User berhasil diupdate." : "User berhasil disimpan.");
    showModal.value = false;
    await fetchUsers();
    resetForm();
  } catch (err) {
    setNotif("error", err.message);
  }
}

async function deleteUser(id) {
  if (!confirm("Yakin ingin menghapus user ini?")) return;

  try {
    const response = await fetch(`http://103.127.99.152:8888/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Gagal menghapus user, status: ${response.status}`);

    await fetchUsers();
    setNotif("success", "User berhasil dihapus.");
  } catch (err) {
    setNotif("error", `Error hapus user: ${err.message}`);
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(6px);
}

/* Animasi fade untuk transisi notifikasi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
