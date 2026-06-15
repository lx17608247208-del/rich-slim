// 富豪减肥 - 工具函数

// 获取当前用户
function getCurrentUser() {
  const userId = localStorage.getItem('rich_slim_current_user');
  if (!userId) return null;
  return getUserData(userId);
}

// 设置当前用户
function setCurrentUser(userId) {
  localStorage.setItem('rich_slim_current_user', userId);
}

// 退出登录
function logout() {
  localStorage.removeItem('rich_slim_current_user');
  window.location.reload();
}

// 获取打卡记录
function getCheckins(userId, type) {
  const key = `rich_slim_checkin_${userId}_${type}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
}

// 设置打卡
function setCheckin(userId, type, date, value) {
  const key = `rich_slim_checkin_${userId}_${type}`;
  const data = getCheckins(userId, type);
  data[date] = value;
  localStorage.setItem(key, JSON.stringify(data));
}

// 判断今日是否打卡
function isTodayChecked(userId, type) {
  const data = getCheckins(userId, type);
  return !!data[getTodayStr()];
}

// 计算阶段打卡完成率
function calcCheckinRate(userId, type, startDate, endDate) {
  const data = getCheckins(userId, type);
  let totalDays = 0;
  let checkedDays = 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date(getTodayStr());
  const actualEnd = end > today ? today : end;

  for (let d = new Date(start); d <= actualEnd; d.setDate(d.getDate() + 1)) {
    totalDays++;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (data[dateStr]) checkedDays++;
  }
  return totalDays > 0 ? ((checkedDays / totalDays) * 100).toFixed(1) : '0.0';
}

// 生成调整建议
function generateAdjustment(userId) {
  const user = getUserData(userId);
  const activeStage = user.stages.find(s => s.status === 'active');
  if (!activeStage) return null;

  const dietRate = parseFloat(calcCheckinRate(userId, 'diet', activeStage.startDate, activeStage.endDate));
  const exerciseRate = parseFloat(calcCheckinRate(userId, 'exercise', activeStage.startDate, activeStage.endDate));

  const suggestions = [];

  if (dietRate < 60) {
    suggestions.push({
      type: 'diet',
      icon: '🥗',
      title: '饮食计划调整',
      reason: `饮食打卡完成率仅${dietRate}%，执行力度不足`,
      actions: [
        '增加蛋白质摄入比例（鸡胸肉、鱼肉、蛋白）',
        '减少精制碳水，替换为粗粮（糙米、燕麦、红薯）',
        '设定手机定时提醒，确保三餐按时记录'
      ]
    });
  }

  if (exerciseRate < 60) {
    suggestions.push({
      type: 'exercise',
      icon: '🏃',
      title: '运动计划调整',
      reason: `运动打卡完成率仅${exerciseRate}%，运动量不足`,
      actions: [
        '降低单次运动强度，增加运动频次',
        '选择更易坚持的运动方式（散步、游泳）',
        '安排固定运动时间，培养运动习惯'
      ]
    });
  }

  if (dietRate >= 60 && exerciseRate >= 60) {
    suggestions.push({
      type: 'both',
      icon: '📊',
      title: '饮食+运动综合调整',
      reason: '饮食和运动执行良好但体重未达标，需要优化方案',
      actions: [
        '饮食：进一步减少每日热量摄入200-300大卡',
        '运动：增加有氧运动时长10-15分钟',
        '注意：保证充足睡眠（7-8小时），减少压力'
      ]
    });
  }

  return suggestions;
}

// 格式化日期
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

// 生成模拟体重数据（用于图表）
function generateWeightTrend(user) {
  return user.weightHistory.map(h => ({
    date: formatDate(h.date),
    weight: h.weight
  }));
}
