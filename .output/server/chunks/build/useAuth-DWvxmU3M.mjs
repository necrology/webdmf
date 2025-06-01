import { u as useState } from './state-CuouCpJu.mjs';

const useAuth = () => {
  const user = useState("user", () => null);
  const fetchSession = async () => {
    try {
      const res = await fetch("http://103.127.99.152:8888/me", {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        user.value = data.user;
      } else {
        user.value = null;
      }
    } catch {
      user.value = null;
    }
  };
  return { user, fetchSession };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-DWvxmU3M.mjs.map
