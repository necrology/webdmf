<template>
  <div class="min-h-screen bg-gray-100 p-6 relative">
    <h1 class="text-3xl font-bold text-center text-blue-700 mb-6">Daftar Users</h1>

    <!-- Notifikasi -->
    <div
      v-if="notifMessage"
      :class="notifType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'"
      class="mb-4 px-4 py-2 rounded"
    >
      {{ notifMessage }}
    </div>

    <!-- Tombol Tambah -->
    <div class="mb-4">
      <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        + Tambah User
      </button>
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

    <!-- Kontrol Pencarian dan Per Page -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari data..."
        class="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>
        <label class="mr-2 text-gray-700">Tampilkan</label>
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

    <!-- Tabel -->
    <div v-if="loading" class="text-center text-gray-600">Loading data...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <div v-else class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full table-auto">
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
          <tr v-for="user in paginatedUsers" :key="user.user_id" class="border-b hover:bg-gray-100">
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.no_hp }}</td>
            <td class="px-4 py-2">{{ user.alamat }}</td>
            <td class="px-4 py-2">
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
    <div class="mt-4 flex justify-center items-center gap-2">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        ← Prev
      </button>
      <span class="text-gray-700">Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

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

async function fetchUsers() {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("http://localhost:8888/users");
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
    let url = "http://localhost:8888/users";
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
      notifType.value = "error";
      notifMessage.value = data.error || "Gagal menyimpan data.";
      return;
    }

    notifType.value = "success";
    notifMessage.value = isEdit.value ? "User berhasil diupdate." : "User berhasil disimpan.";
    showModal.value = false;
    await fetchUsers();
    resetForm();
  } catch (err) {
    notifType.value = "error";
    notifMessage.value = err.message;
  }
}

async function deleteUser(id) {
  if (!confirm("Yakin ingin menghapus user ini?")) return;

  try {
    const response = await fetch(`http://localhost:8888/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Gagal menghapus user, status: ${response.status}`);

    await fetchUsers();
    notifType.value = "success";
    notifMessage.value = "User berhasil dihapus.";
  } catch (err) {
    notifType.value = "error";
    notifMessage.value = `Error hapus user: ${err.message}`;
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
</style>
