import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-DQ1xFj2k.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './state-CuouCpJu.mjs';
import './server.mjs';

const _imports_0 = publicAssetsURL("/assets/img/logo_seskoau.png");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    useRouter();
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen flex items-center justify-center bg-cover bg-center",
        style: { "background-image": "url('/assets/img/login-bg.jpg')" }
      }, _attrs))}><div class="bg-white/60 backdrop-blur-lg border border-white/20 shadow-xl p-8 rounded-2xl w-full max-w-md"><div class="flex justify-center mb-4"><img${ssrRenderAttr("src", _imports_0)} alt="Logo SESKO AU" class="h-50 w-auto"></div><h2 class="text-3xl font-bold text-center text-gray-800 mb-6">LMS SESKO AU</h2><form class="space-y-5"><div><label class="block mb-1 text-gray-600">Email</label><input${ssrRenderAttr("value", email.value)} type="email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com"></div><div><label class="block mb-1 text-gray-600">Password</label><input${ssrRenderAttr("value", password.value)} type="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"></div><button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"> Login </button></form>`);
      if (errorMessage.value) {
        _push(`<p class="text-red-600 text-center mt-4">${ssrInterpolate(errorMessage.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BQeRenT7.mjs.map
