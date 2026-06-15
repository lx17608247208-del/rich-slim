// 富豪减肥 - 路由模块
const Router = {
  routes: {},
  currentRoute: null,

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    if (this.currentRoute === path) return;
    this.currentRoute = path;

    const handler = this.routes[path];
    if (handler) {
      const app = document.getElementById('app');
      app.innerHTML = '';
      app.className = '';
      handler(app);

      // 更新底部导航高亮
      document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.route === path);
      });

      // 滚动到顶部
      window.scrollTo(0, 0);
    }
  },

  init() {
    // 监听底部导航
    document.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        const route = tab.dataset.route;
        if (route) this.navigate(route);
      });
    });

    // 默认路由
    const userId = localStorage.getItem('rich_slim_current_user');
    if (!userId) {
      this.navigate('login');
    } else {
      this.navigate('home');
    }
  }
};
