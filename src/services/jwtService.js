const jwtService = {
  timeExp: 0,
  storage: localStorage.getItem('remember') ? localStorage : sessionStorage,
  rememberLogin() {
    localStorage.setItem('remember', true);
    this.storage = localStorage;
  },
  setTokens(accessToken, refreshToken) {
    this.storage.setItem('accessToken', accessToken);
    this.storage.setItem('refreshToken', refreshToken);
  },
  setTimeExp(seconds) {
    this.timeExp = Date.now() + seconds * 1000;
  },
  isTokenExpired() {
    return Date.now() >= this.timeExp;
  },
  getAccessToken() {
    return this.storage.getItem('accessToken') ?? '';
  },
  getRefreshToken() {
    return this.storage.getItem('refreshToken') ?? '';
  },
  deleteTokens() {
    this.storage.removeItem('refreshToken');
    this.storage.removeItem('accessToken');
    localStorage.removeItem('remember');
  },
};

export default jwtService;
