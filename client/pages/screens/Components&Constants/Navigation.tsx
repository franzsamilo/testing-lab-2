import { useRouter } from "next/router";

export default function useNavigation() {
  const router = useRouter();

  function auth0LogOut() {
    router.push("/api/auth/logout");
  }

  function auth0LogIn() {
    router.push("/api/auth/login");
  }

  function navigateToCreatePogs() {
    router.push("/screens/AddPogs/AddPogs");
  }

  function navigateToUpdatePogs() {
    router.push("/screens/UpdatePogs/UpdatePogs");
  }

  function navigateToEwallet() {
    router.push("/screens/Ewallet/Ewallet");
  }

  function navigateToAssets() {
    router.push("/screens/MyAssets/Assets");
  }

  return {
    auth0LogIn,
    auth0LogOut,
    navigateToCreatePogs,
    navigateToUpdatePogs,
    navigateToEwallet,
    navigateToAssets,
  };
}
