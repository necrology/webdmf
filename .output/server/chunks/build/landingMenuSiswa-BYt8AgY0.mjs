import { _ as __nuxt_component_0 } from './nuxt-link-EMD4UaRt.mjs';
import { ref, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-dQLyCdVo.mjs';
import { useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-DQ1xFj2k.mjs';
import { onClickOutside } from '@vueuse/core';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './state-CuouCpJu.mjs';

const _sfc_main = {
  __name: "landingMenuSiswa",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const { user } = useAuth();
    onClickOutside(dropdownRef, () => {
      dropdownOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="bg-white shadow px-6 py-4 flex justify-between items-center"><div class="text-xl font-semibold">LMS Sesko AU</div><div class="relative"><button class="flex items-center space-x-3 focus:outline-none"><img${ssrRenderAttr("src", _imports_0)} class="w-8 h-8 rounded-full object-cover"><span class="font-medium text-gray-800">${ssrInterpolate(((_a = unref(user)) == null ? void 0 : _a.name) || "User")}</span></button>`);
      if (dropdownOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded py-2 z-10">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "block px-4 py-2 hover:bg-gray-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Profile`);
            } else {
              return [
                createTextVNode("Profile")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><section class="min-h-screen bg-gray-100 py-12 px-6"><h1 class="text-4xl font-bold text-center mb-12 text-gray-800">Dashboard Menu</h1><div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"><div class="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"><div class="bg-blue-500 text-white rounded-full p-5 mb-6" style="${ssrRenderStyle({ "box-shadow": "0 4px 15px rgba(59, 130, 246, 0.4)" })}"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 14a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v1a3 3 0 01-6 0v-1m6 0v-2a3 3 0 00-6 0v2m6 0H6"></path></svg></div><h2 class="text-xl font-semibold mb-2 text-gray-900">Siswa</h2><p class="text-gray-600">Kelola data siswa secara lengkap dan mudah.</p></div><div class="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"><div class="bg-green-500 text-white rounded-full p-5 mb-6" style="${ssrRenderStyle({ "box-shadow": "0 4px 15px rgba(34, 197, 94, 0.4)" })}"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16v12H4z"></path></svg></div><h2 class="text-xl font-semibold mb-2 text-gray-900">Kelas</h2><p class="text-gray-600">Atur dan monitor kelas serta jadwalnya.</p></div><div class="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"><div class="bg-purple-600 text-white rounded-full p-5 mb-6" style="${ssrRenderStyle({ "box-shadow": "0 4px 15px rgba(139, 92, 246, 0.4)" })}"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path></svg></div><h2 class="text-xl font-semibold mb-2 text-gray-900">Mata Pelajaran</h2><p class="text-gray-600">Kelola daftar mata pelajaran dan materi belajar.</p></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/siswa/landingMenuSiswa.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=landingMenuSiswa-BYt8AgY0.mjs.map
