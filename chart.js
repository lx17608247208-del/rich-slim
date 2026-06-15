// 富豪减肥 - 图表绘制模块

const Chart = {
  // 绘制体重趋势折线图
  drawWeightTrend(canvasId, data, targetWeight) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    // 计算数据范围
    const weights = data.map(d => d.weight);
    const allValues = targetWeight ? [...weights, targetWeight] : weights;
    const minW = Math.min(...allValues) - 2;
    const maxW = Math.max(...allValues) + 2;

    // 清空
    ctx.clearRect(0, 0, w, h);

    // 绘制网格线
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      // Y轴标签
      const val = maxW - ((maxW - minW) / 4) * i;
      ctx.fillStyle = '#999';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(1), padding.left - 5, y + 4);
    }

    // 绘制目标线
    if (targetWeight) {
      const targetY = padding.top + chartH * (1 - (targetWeight - minW) / (maxW - minW));
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding.left, targetY);
      ctx.lineTo(w - padding.right, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#d4af37';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`目标 ${targetWeight}kg`, padding.left + 5, targetY - 5);
    }

    // 绘制折线
    if (data.length < 2) return;

    const points = data.map((d, i) => ({
      x: padding.left + (chartW / (data.length - 1)) * i,
      y: padding.top + chartH * (1 - (d.weight - minW) / (maxW - minW))
    }));

    // 渐变填充
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(26, 26, 46, 0.3)');
    gradient.addColorStop(1, 'rgba(26, 26, 46, 0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 折线
    ctx.beginPath();
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // 数据点
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a2e';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // X轴标签
    ctx.fillStyle = '#999';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      if (i % Math.ceil(data.length / 5) === 0 || i === data.length - 1) {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        ctx.fillText(d.date, x, h - 5);
      }
    });
  },

  // 绘制环形进度图
  drawProgressRing(canvasId, percent, color = '#1a1a2e') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const radius = size / 2 - 8;
    const lineWidth = 6;

    // 背景环
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // 进度环
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * percent) / 100;
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 中心文字
    ctx.fillStyle = '#333';
    ctx.font = `bold ${size * 0.25}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percent.toFixed(1)}%`, center, center);
  },

  // 绘制迷你柱状图
  drawMiniBar(canvasId, values, labels) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 5, right: 5, bottom: 20, left: 5 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barWidth = chartW / values.length * 0.6;
    const gap = chartW / values.length * 0.4;
    const maxVal = Math.max(...values, 1);

    ctx.clearRect(0, 0, w, h);

    values.forEach((val, i) => {
      const x = padding.left + (chartW / values.length) * i + gap / 2;
      const barH = (val / maxVal) * chartH;
      const y = padding.top + chartH - barH;

      // 柱子
      const gradient = ctx.createLinearGradient(x, y, x, y + barH);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#d4af37');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [3, 3, 0, 0]);
      ctx.fill();

      // 标签
      if (labels) {
        ctx.fillStyle = '#999';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, h - 3);
      }
    });
  }
};
