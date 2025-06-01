export const useAuth = () => {
  const user = useState("user", () => null);

  const fetchSession = async () => {
    try {
      const res = await fetch("http://localhost:8888/me", {
        credentials: "include",
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
