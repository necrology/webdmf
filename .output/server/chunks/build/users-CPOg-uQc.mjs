import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const users2 = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const showModal = ref(false);
    const notifMessage = ref("");
    const notifType = ref("success");
    const isEdit = ref(false);
    ref(null);
    const form = ref({
      name: "",
      email: "",
      password: "",
      no_hp: "",
      alamat: "",
      role_id: 2,
      created_by: 1
    });
    const searchQuery = ref("");
    const currentPage = ref(1);
    const perPage = ref(5);
    const filteredUsers = computed(() => {
      const keyword = searchQuery.value.toLowerCase();
      return users2.value.filter(
        (user) => [user.name, user.email, user.no_hp, user.alamat].some((field) => field == null ? void 0 : field.toLowerCase().includes(keyword))
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 relative" }, _attrs))} data-v-87e2e7c4><h1 class="text-2xl font-bold mb-6" data-v-87e2e7c4>Data User</h1>`);
      if (notifMessage.value) {
        _push(`<div class="${ssrRenderClass([
          notifType.value === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white",
          "fixed top-6 right-6 flex items-center gap-3 px-4 py-3 rounded shadow-lg cursor-pointer z-50 select-none",
          "max-w-xs",
          "drop-shadow-lg"
        ])}" data-v-87e2e7c4>`);
        if (notifType.value === "success") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-87e2e7c4><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-87e2e7c4></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-87e2e7c4><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-87e2e7c4></path></svg>`);
        }
        _push(`<span class="flex-grow" data-v-87e2e7c4>${ssrInterpolate(notifMessage.value)}</span><button aria-label="Close" class="ml-2 focus:outline-none" data-v-87e2e7c4><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-87e2e7c4><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-87e2e7c4></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-lg p-6" data-v-87e2e7c4><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6" data-v-87e2e7c4><div class="flex items-center gap-3 w-full md:w-2/3" data-v-87e2e7c4><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Cari data..." class="flex-grow px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-87e2e7c4><div class="flex items-center gap-2" data-v-87e2e7c4><label class="text-gray-700" data-v-87e2e7c4>Tampilkan</label><select class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-87e2e7c4><option${ssrRenderAttr("value", 5)} data-v-87e2e7c4${ssrIncludeBooleanAttr(Array.isArray(perPage.value) ? ssrLooseContain(perPage.value, 5) : ssrLooseEqual(perPage.value, 5)) ? " selected" : ""}>5</option><option${ssrRenderAttr("value", 10)} data-v-87e2e7c4${ssrIncludeBooleanAttr(Array.isArray(perPage.value) ? ssrLooseContain(perPage.value, 10) : ssrLooseEqual(perPage.value, 10)) ? " selected" : ""}>10</option><option${ssrRenderAttr("value", 20)} data-v-87e2e7c4${ssrIncludeBooleanAttr(Array.isArray(perPage.value) ? ssrLooseContain(perPage.value, 20) : ssrLooseEqual(perPage.value, 20)) ? " selected" : ""}>20</option></select></div></div><div class="w-full md:w-auto flex justify-end" data-v-87e2e7c4><button class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600" data-v-87e2e7c4> + Tambah User </button></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center text-gray-600 py-10" data-v-87e2e7c4>Loading data...</div>`);
      } else if (error.value) {
        _push(`<div class="text-center text-red-500 py-10" data-v-87e2e7c4>Error: ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div class="overflow-x-auto rounded-lg border border-gray-200" data-v-87e2e7c4><table class="min-w-full table-auto border-collapse" data-v-87e2e7c4><thead class="bg-blue-600 text-white" data-v-87e2e7c4><tr data-v-87e2e7c4><th class="px-4 py-3 text-left" data-v-87e2e7c4>Nama</th><th class="px-4 py-3 text-left" data-v-87e2e7c4>Email</th><th class="px-4 py-3 text-left" data-v-87e2e7c4>No HP</th><th class="px-4 py-3 text-left" data-v-87e2e7c4>Alamat</th><th class="px-4 py-3 text-left" data-v-87e2e7c4>Aksi</th></tr></thead><tbody data-v-87e2e7c4><!--[-->`);
        ssrRenderList(paginatedUsers.value, (user) => {
          _push(`<tr class="border-b hover:bg-gray-50" data-v-87e2e7c4><td class="px-4 py-2" data-v-87e2e7c4>${ssrInterpolate(user.name)}</td><td class="px-4 py-2" data-v-87e2e7c4>${ssrInterpolate(user.email)}</td><td class="px-4 py-2" data-v-87e2e7c4>${ssrInterpolate(user.no_hp)}</td><td class="px-4 py-2" data-v-87e2e7c4>${ssrInterpolate(user.alamat)}</td><td class="px-4 py-2 whitespace-nowrap" data-v-87e2e7c4><button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2" data-v-87e2e7c4> Edit </button><button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-v-87e2e7c4> Hapus </button></td></tr>`);
        });
        _push(`<!--]-->`);
        if (paginatedUsers.value.length === 0) {
          _push(`<tr data-v-87e2e7c4><td colspan="5" class="text-center text-gray-500 py-4" data-v-87e2e7c4>Data tidak ditemukan.</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div>`);
      }
      _push(`<div class="mt-6 flex justify-center items-center gap-4" data-v-87e2e7c4><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" data-v-87e2e7c4> \u2190 Prev </button><span class="text-gray-700" data-v-87e2e7c4>Halaman ${ssrInterpolate(currentPage.value)} dari ${ssrInterpolate(totalPages.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" data-v-87e2e7c4> Next \u2192 </button></div></div>`);
      if (showModal.value) {
        _push(`<div class="fixed inset-0 flex items-start justify-center pt-24 backdrop-blur-sm z-50" data-v-87e2e7c4><div class="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6 relative" data-v-87e2e7c4><h2 class="text-xl font-semibold mb-4" data-v-87e2e7c4>${ssrInterpolate(isEdit.value ? "Edit User" : "Tambah User")}</h2><form data-v-87e2e7c4><div class="mb-4" data-v-87e2e7c4><label class="block mb-1" data-v-87e2e7c4>Nama</label><input${ssrRenderAttr("value", form.value.name)} type="text" class="w-full border rounded px-3 py-2" required data-v-87e2e7c4></div><div class="mb-4" data-v-87e2e7c4><label class="block mb-1" data-v-87e2e7c4>Email</label><input${ssrRenderAttr("value", form.value.email)} type="email" class="w-full border rounded px-3 py-2" required data-v-87e2e7c4></div><div class="mb-4" data-v-87e2e7c4><label class="block mb-1" data-v-87e2e7c4>Password</label><input${ssrRenderAttr("value", form.value.password)} type="password" class="w-full border rounded px-3 py-2"${ssrIncludeBooleanAttr(!isEdit.value) ? " required" : ""} placeholder="Isi password baru jika ingin mengubah" data-v-87e2e7c4></div><div class="mb-4" data-v-87e2e7c4><label class="block mb-1" data-v-87e2e7c4>No HP</label><input${ssrRenderAttr("value", form.value.no_hp)} type="text" class="w-full border rounded px-3 py-2" required data-v-87e2e7c4></div><div class="mb-4" data-v-87e2e7c4><label class="block mb-1" data-v-87e2e7c4>Alamat</label><textarea class="w-full border rounded px-3 py-2" required data-v-87e2e7c4>${ssrInterpolate(form.value.alamat)}</textarea></div><div class="flex justify-end gap-2" data-v-87e2e7c4><button type="button" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" data-v-87e2e7c4> Batal </button><button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" data-v-87e2e7c4>${ssrInterpolate(isEdit.value ? "Update" : "Simpan")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const users = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-87e2e7c4"]]);

export { users as default };
//# sourceMappingURL=users-CPOg-uQc.mjs.map
