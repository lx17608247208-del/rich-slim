// 富豪减肥 - 应用主逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 注册路由
  Router.register('login', renderLoginPage);
  Router.register('home', renderHomePage);
  Router.register('plan', renderPlanPage);
  Router.register('diet', renderDietPage);
  Router.register('exercise', renderExercisePage);
  Router.register('style', renderStylePage);
  Router.register('report', renderReportPage);

  // 初始化路由
  Router.init();
});

// ==================== 登录页 ====================
function renderLoginPage(container) {
  const nav = document.getElementById('bottom-nav');
  nav.style.display = 'none';

  container.innerHTML = `
    <div class="login-page">
      <div class="login-header">
        <div class="login-logo">👑</div>
        <h1 class="login-title">富豪减肥</h1>
        <p class="login-subtitle">定制你的蜕变之旅</p>
      </div>
      <div class="login-users">
        ${USERS.map(user => `
          <div class="user-card" data-userid="${user.id}">
            <div class="user-avatar">${user.avatar}</div>
            <div class="user-info">
              <div class="user-name">${user.name}</div>
              <div class="user-meta">${user.gender === 'male' ? '男' : '女'} · ${user.age}岁 · ${user.height}cm · ${user.currentWeight}kg</div>
              <div class="user-goal">目标: ${user.targetWeight}kg (减${user.currentWeight - user.targetWeight}kg)</div>
            </div>
            <div class="user-arrow">›</div>
          </div>
        `).join('')}
      </div>
      <div class="login-footer">
        <p>体验版 · 仅限3名用户</p>
      </div>
    </div>
  `;

  // 绑定点击事件
  container.querySelectorAll('.user-card').forEach(card => {
    card.addEventListener('click', () => {
      const userId = card.dataset.userid;
      showPasswordModal(userId);
    });
  });
}

function showPasswordModal(userId) {
  const user = USERS.find(u => u.id === userId);
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>验证身份</h3>
      <p class="modal-user">${user.avatar} ${user.name}</p>
      <input type="password" class="modal-input" placeholder="请输入密码" maxlength="6" />
      <p class="modal-hint">默认密码: 123456</p>
      <div class="modal-actions">
        <button class="btn-cancel">取消</button>
        <button class="btn-confirm">确认</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = modal.querySelector('.modal-input');
  input.focus();

  modal.querySelector('.btn-cancel').addEventListener('click', () => modal.remove());
  modal.querySelector('.btn-confirm').addEventListener('click', () => {
    if (input.value === user.password) {
      setCurrentUser(userId);
      modal.remove();
      Router.navigate('home');
    } else {
      input.style.borderColor = '#e74c3c';
      input.value = '';
      input.placeholder = '密码错误，请重试';
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') modal.querySelector('.btn-confirm').click();
  });
}

// ==================== 首页仪表盘 ====================
function renderHomePage(container) {
  const nav = document.getElementById('bottom-nav');
  nav.style.display = 'flex';

  const user = getCurrentUser();
  if (!user) { Router.navigate('login'); return; }

  const bmi = calcBMI(user.currentWeight, user.height);
  const activeStage = user.stages.find(s => s.status === 'active');
  const progress = activeStage ? calcProgress(user.currentWeight, activeStage.startWeight, activeStage.targetWeight) : 0;
  const totalProgress = calcProgress(user.currentWeight, user.stages[0].startWeight, user.targetWeight);
  const dietChecked = isTodayChecked(user.id, 'diet');
  const exerciseChecked = isTodayChecked(user.id, 'exercise');

  container.innerHTML = `
    <div class="page home-page">
      <div class="page-header">
        <div class="header-left">
          <span class="header-avatar">${user.avatar}</span>
          <div>
            <div class="header-greeting">你好，${user.name}</div>
            <div class="header-date">${getTodayStr()} ${getDayOfWeek()}</div>
          </div>
        </div>
        <button class="btn-logout" onclick="logout()">退出</button>
      </div>

      <div class="dashboard">
        <div class="stat-card main-stat">
          <div class="stat-row">
            <div class="stat-item">
              <div class="stat-label">当前体重</div>
              <div class="stat-value">${user.currentWeight}<span class="stat-unit">kg</span></div>
            </div>
            <div class="stat-item">
              <div class="stat-label">BMI</div>
              <div class="stat-value ${bmi > 28 ? 'warning' : bmi > 24 ? 'caution' : 'normal'}">${bmi}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">目标体重</div>
              <div class="stat-value">${user.targetWeight}<span class="stat-unit">kg</span></div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${totalProgress}%"></div>
          </div>
          <div class="progress-text">总进度 ${totalProgress}%</div>
        </div>

        <div class="quick-actions">
          <div class="action-card ${dietChecked ? 'checked' : ''}" onclick="Router.navigate('diet')">
            <div class="action-icon">🥗</div>
            <div class="action-label">饮食打卡</div>
            <div class="action-status">${dietChecked ? '✓ 已打卡' : '待打卡'}</div>
          </div>
          <div class="action-card ${exerciseChecked ? 'checked' : ''}" onclick="Router.navigate('exercise')">
            <div class="action-icon">🏃</div>
            <div class="action-label">运动打卡</div>
            <div class="action-status">${exerciseChecked ? '✓ 已打卡' : '待打卡'}</div>
          </div>
          <div class="action-card" onclick="Router.navigate('style')">
            <div class="action-icon">👔</div>
            <div class="action-label">形象改造</div>
            <div class="action-status">查看建议</div>
          </div>
          <div class="action-card" onclick="Router.navigate('report')">
            <div class="action-icon">📊</div>
            <div class="action-label">分析报告</div>
            <div class="action-status">查看详情</div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">当前阶段</div>
          ${activeStage ? `
            <div class="stage-info">
              <div class="stage-name">${activeStage.name}</div>
              <div class="stage-target">${activeStage.startWeight}kg → ${activeStage.targetWeight}kg</div>
              <div class="stage-progress">
                <canvas id="home-ring" style="width:80px;height:80px;"></canvas>
                <div class="stage-detail">
                  <div>已减 ${activeStage.startWeight - user.currentWeight}kg</div>
                  <div>还需减 ${user.currentWeight - activeStage.targetWeight}kg</div>
                </div>
              </div>
            </div>
          ` : '<p>暂无进行中的阶段</p>'}
        </div>

        <div class="section-card">
          <div class="section-title">体重趋势</div>
          <canvas id="home-trend" style="width:100%;height:180px;"></canvas>
        </div>
      </div>
    </div>
  `;

  // 绘制图表
  setTimeout(() => {
    if (activeStage) {
      Chart.drawProgressRing('home-ring', parseFloat(progress), '#d4af37');
    }
    Chart.drawWeightTrend('home-trend', generateWeightTrend(user), user.targetWeight);
  }, 100);
}

// ==================== 减肥规划页 ====================
function renderPlanPage(container) {
  const user = getCurrentUser();
  if (!user) { Router.navigate('login'); return; }

  container.innerHTML = `
    <div class="page plan-page">
      <div class="page-header">
        <h2>减肥规划</h2>
      </div>

      <div class="plan-overview">
        <div class="overview-card">
          <div class="overview-label">总体目标</div>
          <div class="overview-value">${user.currentWeight}kg → ${user.targetWeight}kg</div>
          <div class="overview-sub">共需减重 ${user.currentWeight - user.targetWeight}kg</div>
        </div>
        <div class="overview-card">
          <div class="overview-label">体型分析</div>
          <div class="overview-value">${user.bodyType}</div>
          <div class="overview-sub">BMI ${calcBMI(user.currentWeight, user.height)}</div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">阶段目标</div>
        <div class="stages-list">
          ${user.stages.map((stage, idx) => {
            const isActive = stage.status === 'active';
            const isDone = stage.status === 'completed';
            const isPending = stage.status === 'pending';
            const stageProgress = isActive ? calcProgress(user.currentWeight, stage.startWeight, stage.targetWeight) : (isDone ? 100 : 0);
            return `
              <div class="stage-card ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${isPending ? 'pending' : ''}">
                <div class="stage-header">
                  <div class="stage-badge ${stage.status}">${isDone ? '✓' : isActive ? '●' : idx + 1}</div>
                  <div class="stage-title">${stage.name}</div>
                  <div class="stage-status ${stage.status}">${isDone ? '已完成' : isActive ? '进行中' : '待开始'}</div>
                </div>
                <div class="stage-body">
                  <div class="stage-meta">
                    <span>${formatDate(stage.startDate)} - ${formatDate(stage.endDate)}</span>
                    <span>${stage.startWeight}kg → ${stage.targetWeight}kg</span>
                  </div>
                  ${isActive ? `
                    <div class="stage-progress-bar">
                      <div class="stage-progress-fill" style="width: ${stageProgress}%"></div>
                    </div>
                    <div class="stage-progress-text">进度 ${stageProgress}%</div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">智能调整建议</div>
        <div id="adjustment-area">
          ${renderAdjustments(user)}
        </div>
      </div>
    </div>
  `;
}

function renderAdjustments(user) {
  const suggestions = generateAdjustment(user.id);
  if (!suggestions || suggestions.length === 0) {
    return '<p class="empty-text">暂无调整建议，继续保持当前计划</p>';
  }
  return suggestions.map(s => `
    <div class="adjustment-card">
      <div class="adjustment-header">
        <span class="adjustment-icon">${s.icon}</span>
        <span class="adjustment-title">${s.title}</span>
      </div>
      <div class="adjustment-reason">${s.reason}</div>
      <ul class="adjustment-actions">
        ${s.actions.map(a => `<li>${a}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ==================== 饮食计划页 ====================
function renderDietPage(container) {
  const user = getCurrentUser();
  if (!user) { Router.navigate('login'); return; }

  const dietChecked = isTodayChecked(user.id, 'diet');
  const plan = user.dietPlan;

  container.innerHTML = `
    <div class="page diet-page">
      <div class="page-header">
        <h2>饮食计划</h2>
        <div class="calorie-badge">每日 ${plan.dailyCalories} 大卡</div>
      </div>

      <div class="diet-checkin ${dietChecked ? 'checked' : ''}">
        <div class="checkin-icon">${dietChecked ? '✅' : '⬜'}</div>
        <div class="checkin-text">${dietChecked ? '今日已打卡' : '今日未打卡'}</div>
        <button class="btn-checkin" ${dietChecked ? 'disabled' : ''} id="diet-checkin-btn">
          ${dietChecked ? '已完成' : '打卡'}
        </button>
      </div>

      <div class="meals-list">
        <div class="meal-card">
          <div class="meal-header">
            <span class="meal-icon">🌅</span>
            <span class="meal-name">早餐</span>
            <span class="meal-cal">${plan.meals.breakfast.calories} 大卡</span>
          </div>
          <ul class="meal-items">
            ${plan.meals.breakfast.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="meal-card">
          <div class="meal-header">
            <span class="meal-icon">☀️</span>
            <span class="meal-name">午餐</span>
            <span class="meal-cal">${plan.meals.lunch.calories} 大卡</span>
          </div>
          <ul class="meal-items">
            ${plan.meals.lunch.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="meal-card">
          <div class="meal-header">
            <span class="meal-icon">🌙</span>
            <span class="meal-name">晚餐</span>
            <span class="meal-cal">${plan.meals.dinner.calories} 大卡</span>
          </div>
          <ul class="meal-items">
            ${plan.meals.dinner.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="meal-card">
          <div class="meal-header">
            <span class="meal-icon">🍎</span>
            <span class="meal-name">加餐</span>
            <span class="meal-cal">${plan.meals.snack.calories} 大卡</span>
          </div>
          <ul class="meal-items">
            ${plan.meals.snack.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">热量分布</div>
        <canvas id="diet-calorie-chart" style="width:100%;height:120px;"></canvas>
      </div>
    </div>
  `;

  // 绑定打卡
  document.getElementById('diet-checkin-btn').addEventListener('click', () => {
    setCheckin(user.id, 'diet', getTodayStr(), true);
    showToast('饮食打卡成功！');
    setTimeout(() => Router.navigate('diet'), 500);
  });

  // 绘制热量分布图
  setTimeout(() => {
    Chart.drawMiniBar('diet-calorie-chart',
      [plan.meals.breakfast.calories, plan.meals.lunch.calories, plan.meals.dinner.calories, plan.meals.snack.calories],
      ['早餐', '午餐', '晚餐', '加餐']
    );
  }, 100);
}

// ==================== 运动计划页 ====================
function renderExercisePage(container) {
  const user = getCurrentUser();
  if (!user) { Router.navigate('login'); return; }

  const exerciseChecked = isTodayChecked(user.id, 'exercise');
  const todayPlan = user.exercisePlan.weekly.find(d => d.day === getDayOfWeek()) || { type: '休息', items: ['今天休息'], duration: 0, calories: 0 };

  container.innerHTML = `
    <div class="page exercise-page">
      <div class="page-header">
        <h2>运动计划</h2>
        <div class="today-tag">${getDayOfWeek()}</div>
      </div>

      <div class="exercise-checkin ${exerciseChecked ? 'checked' : ''}">
        <div class="checkin-icon">${exerciseChecked ? '✅' : '⬜'}</div>
        <div class="checkin-text">${exerciseChecked ? '今日已打卡' : '今日未打卡'}</div>
        <button class="btn-checkin" ${exerciseChecked ? 'disabled' : ''} id="exercise-checkin-btn">
          ${exerciseChecked ? '已完成' : '打卡'}
        </button>
      </div>

      <div class="today-exercise">
        <div class="today-label">今日运动</div>
        <div class="today-type-badge ${todayPlan.type}">${todayPlan.type}</div>
        <div class="today-items">
          ${todayPlan.items.map(item => `<div class="exercise-item">${item}</div>`).join('')}
        </div>
        <div class="today-meta">
          <span>⏱ ${todayPlan.duration}分钟</span>
          <span>🔥 ${todayPlan.calories}大卡</span>
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">本周计划</div>
        <div class="weekly-plan">
          ${user.exercisePlan.weekly.map(d => `
            <div class="day-card ${d.day === getDayOfWeek() ? 'today' : ''}">
              <div class="day-name">${d.day}</div>
              <div class="day-type ${d.type}">${d.type}</div>
              <div class="day-duration">${d.duration}min</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // 绑定打卡
  document.getElementById('exercise-checkin-btn').addEventListener('click', () => {
    setCheckin(user.id, 'exercise', getTodayStr(), true);
    showToast('运动打卡成功！');
    setTimeout(() => Router.navigate('exercise'), 500);
  });
}

// ==================== 形象改造页 ====================
function renderStylePage(container) {
  const user = getCurrentUser();
  if (!user) { Router.navigate('login'); return; }

  const style = user.styleAdvice;

  container.innerHTML = `
    <div class="page style-page">
      <div class="page-header">
        <h2>形象改造</h2>
      </div>

      <div class="section-card">
        <div class="section-title">体型分析</div>
        <div class="body-analysis">
          <div class="analysis-tags">
            <span class="tag">${user.bodyType}</span>
            <span class="tag">${user.faceShape}</span>
            <span class="tag">${user.skinTone}</span>
          </div>
          <p class="analysis-text">${style.bodyAnalysis}</p>
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">服装搭配</div>
        <div class="compare-section">
          <div class="compare-card before">
            <div class="compare-label">改造前</div>
            <div class="compare-content">${style.clothing.before}</div>
          </div>
          <div class="compare-arrow">→</div>
          <div class="compare-card after">
            <div class="compare-label">改造后</div>
            <div class="compare-content">${style.clothing.after}</div>
          </div>
        </div>
        <div class="tips-list">
          <div class="tips-title">搭配建议</div>
          ${style.clothing.tips.map(tip => `<div class="tip-item">• ${tip}</div>`).join('')}
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">发型设计</div>
        <div class="compare-section">
          <div class="compare-card before">
            <div class="compare-label">改造前</div>
            <div class="compare-content">${style.hairstyle.before}</div>
          </div>
          <div class="compare-arrow">→</div>
          <div class="compare-card after">
            <div class="compare-label">改造后</div>
            <div class="compare-content">${style.hairstyle.after}</div>
          </div>
        </div>
        <div class="tips-list">
          <div class="tips-title">发型建议</div>
          ${style.hairstyle.tips.map(tip => `<div class="tip-item">• ${tip}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==================== 分析报告页 ====================
function renderReportPage(container) {
  const user = getCurrentUser();
  if (!user) { Router.navigate('login'); return; }

  const activeStage = user.stages.find(s => s.status === 'active');
  const dietRate = activeStage ? calcCheckinRate(user.id, 'diet', activeStage.startDate, activeStage.endDate) : '0.0';
  const exerciseRate = activeStage ? calcCheckinRate(user.id, 'exercise', activeStage.startDate, activeStage.endDate) : '0.0';
  const suggestions = generateAdjustment(user.id);

  container.innerHTML = `
    <div class="page report-page">
      <div class="page-header">
        <h2>分析报告</h2>
      </div>

      <div class="report-summary">
        <div class="summary-card">
          <div class="summary-label">当前体重</div>
          <div class="summary-value">${user.currentWeight}kg</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">累计减重</div>
          <div class="summary-value">${(user.stages[0].startWeight - user.currentWeight).toFixed(1)}kg</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">剩余目标</div>
          <div class="summary-value">${(user.currentWeight - user.targetWeight).toFixed(1)}kg</div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-title">体重变化曲线</div>
        <canvas id="report-trend" style="width:100%;height:200px;"></canvas>
      </div>

      ${activeStage ? `
        <div class="section-card">
          <div class="section-title">阶段执行分析</div>
          <div class="execution-stats">
            <div class="exec-item">
              <div class="exec-label">饮食打卡完成率</div>
              <div class="exec-bar">
                <div class="exec-fill diet" style="width: ${dietRate}%"></div>
              </div>
              <div class="exec-value">${dietRate}%</div>
            </div>
            <div class="exec-item">
              <div class="exec-label">运动打卡完成率</div>
              <div class="exec-bar">
                <div class="exec-fill exercise" style="width: ${exerciseRate}%"></div>
              </div>
              <div class="exec-value">${exerciseRate}%</div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">调整建议</div>
          <div id="report-adjustments">
            ${suggestions && suggestions.length > 0 ? suggestions.map(s => `
              <div class="adjustment-card">
                <div class="adjustment-header">
                  <span class="adjustment-icon">${s.icon}</span>
                  <span class="adjustment-title">${s.title}</span>
                </div>
                <div class="adjustment-reason">${s.reason}</div>
                <ul class="adjustment-actions">
                  ${s.actions.map(a => `<li>${a}</li>`).join('')}
                </ul>
              </div>
            `).join('') : '<p class="empty-text">执行良好，继续保持！</p>'}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // 绘制图表
  setTimeout(() => {
    Chart.drawWeightTrend('report-trend', generateWeightTrend(user), user.targetWeight);
  }, 100);
}

// ==================== Toast 提示 ====================
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
