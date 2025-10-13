export const TOKEN_KEY = "token";

export function getToken () {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(t: string) {
    localStorage.setItem(TOKEN_KEY, t);
    window.dispatchEvent(new Event("auth:change")); // 通知全局：已登录
  }

  export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event("auth:change")); // 通知全局：已登出
  }

  export function isAuthed() {
    return !!getToken();
  }
  export function logout() {
    clearToken();
  localStorage.removeItem("selectedPokemon");
  }