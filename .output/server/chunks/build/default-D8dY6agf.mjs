import { mergeProps, ref, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-EMD4UaRt.mjs';
import { useRoute, useRouter } from 'vue-router';
import { HomeIcon, UserIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { _ as _imports_0 } from './virtual_public-dQLyCdVo.mjs';
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

const _sfc_main$2 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isCollapsed = ref(true);
    const menuItems = [
      { name: "Dashboard", to: "/dashboard", icon: HomeIcon },
      { name: "Users", to: "/users", icon: UserIcon },
      { name: "Settings", to: "/settings", icon: Cog6ToothIcon }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: [
          "bg-gray-800 text-white min-h-screen flex flex-col transition-width duration-300",
          isCollapsed.value ? "w-16" : "w-64"
        ]
      }, _attrs))}><div class="flex items-center justify-between p-4 border-b border-gray-700">`);
      if (!isCollapsed.value) {
        _push(`<span class="text-lg font-semibold">LMS Sesko AU</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-1 rounded hover:bg-gray-700 focus:outline-none" aria-label="Toggle sidebar"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div><nav class="flex-1 overflow-auto"><ul class="mt-4"><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li class="mb-1">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: ["flex items-center px-4 py-3 rounded hover:bg-gray-700 transition-colors", { "bg-gray-700": unref(route).path === item.to }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "w-6 h-6" }, null), _parent2, _scopeId);
              if (!isCollapsed.value) {
                _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(item.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-6 h-6" })),
                !isCollapsed.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-3"
                }, toDisplayString(item.name), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav></aside>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "TopNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const { user } = useAuth();
    useRouter();
    onClickOutside(dropdownRef, () => {
      dropdownOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white shadow px-6 py-4 flex justify-between items-center" }, _attrs))}><div class="text-xl font-semibold">LMS Sesko AU</div><div class="relative"><button class="flex items-center space-x-3 focus:outline-none"><img${ssrRenderAttr("src", _imports_0)} class="w-8 h-8 rounded-full object-cover"><span class="font-medium text-gray-800">${ssrInterpolate(((_a = unref(user)) == null ? void 0 : _a.name) || "User")}</span></button>`);
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
        _push(`<button class="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopNavbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="flex-1 flex flex-col">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="p-6 bg-gray-100 min-h-screen">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-D8dY6agf.mjs.map
