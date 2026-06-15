// 富豪减肥 - 预设数据
const USERS = [
  {
    id: 'user_a',
    name: '张先生',
    avatar: '👨',
    gender: 'male',
    age: 35,
    height: 180,
    currentWeight: 95,
    targetWeight: 75,
    password: '123456',
    bodyType: '苹果型肥胖',
    faceShape: '方脸',
    skinTone: '暖黄皮',
    stages: [
      { id: 1, name: '第一阶段', startWeight: 95, targetWeight: 88, startDate: '2026-06-15', endDate: '2026-07-15', status: 'active' },
      { id: 2, name: '第二阶段', startWeight: 88, targetWeight: 82, startDate: '2026-07-16', endDate: '2026-08-15', status: 'pending' },
      { id: 3, name: '第三阶段', startWeight: 82, targetWeight: 75, startDate: '2026-08-16', endDate: '2026-09-30', status: 'pending' }
    ],
    weightHistory: [
      { date: '2026-06-15', weight: 95 },
      { date: '2026-06-18', weight: 94.5 },
      { date: '2026-06-21', weight: 94.2 },
      { date: '2026-06-24', weight: 93.8 }
    ],
    dietPlan: {
      dailyCalories: 1800,
      meals: {
        breakfast: { items: ['全麦面包2片', '煮鸡蛋2个', '脱脂牛奶250ml', '小番茄5颗'], calories: 450 },
        lunch: { items: ['糙米饭1小碗', '清蒸鸡胸肉150g', '西兰花200g', '凉拌黄瓜'], calories: 650 },
        dinner: { items: ['紫薯1个', '清蒸鱼200g', '炒菠菜', '冬瓜汤'], calories: 500 },
        snack: { items: ['苹果1个', '坚果一小把(15g)'], calories: 200 }
      }
    },
    exercisePlan: {
      weekly: [
        { day: '周一', type: '有氧', items: ['快走40分钟'], duration: 40, calories: 300 },
        { day: '周二', type: '力量', items: ['哑铃卧推4组x12', '深蹲4组x15', '平板支撑3组x60秒'], duration: 45, calories: 250 },
        { day: '周三', type: '有氧', items: ['游泳30分钟'], duration: 30, calories: 350 },
        { day: '周四', type: '拉伸', items: ['瑜伽45分钟'], duration: 45, calories: 150 },
        { day: '周五', type: '力量', items: ['引体向上3组x8', '弓步蹲4组x12', '卷腹3组x20'], duration: 45, calories: 250 },
        { day: '周六', type: '有氧', items: ['慢跑30分钟'], duration: 30, calories: 320 },
        { day: '周日', type: '休息', items: ['散步20分钟'], duration: 20, calories: 80 }
      ]
    },
    styleAdvice: {
      bodyAnalysis: '苹果型身材，脂肪主要集中在腹部。建议选择能遮盖腹部赘肉、拉长身材比例的服装。',
      clothing: {
        before: '宽松T恤+运动裤，整体松垮无型，显得更加臃肿',
        after: '深色修身衬衫+直筒西裤+修身西装外套，拉长身形比例',
        tips: [
          '选择深色系（藏青、深灰、黑色）上衣，有收缩视觉效果',
          'V领设计拉长颈部线条，避免高领',
          '上衣长度盖过臀部但不盖过大腿中部',
          '选择有垂感的面料，避免反光材质',
          '直筒或微锥形裤型，避免紧身裤'
        ]
      },
      hairstyle: {
        before: '短发贴头皮，暴露脸型缺陷，显得脸更大',
        after: '三七分短发+顶部蓬松造型，修饰方脸线条',
        tips: [
          '选择三七分或四六分发型，打破方脸的棱角感',
          '顶部保持蓬松度，增加头顶高度',
          '侧面鬓角适度修剪，不要过短',
          '可考虑轻微烫发增加纹理感'
        ]
      }
    }
  },
  {
    id: 'user_b',
    name: '李女士',
    avatar: '👩',
    gender: 'female',
    age: 28,
    height: 165,
    currentWeight: 68,
    targetWeight: 58,
    password: '123456',
    bodyType: '梨型微胖',
    faceShape: '圆脸',
    skinTone: '白皙皮',
    stages: [
      { id: 1, name: '第一阶段', startWeight: 68, targetWeight: 64, startDate: '2026-06-15', endDate: '2026-07-15', status: 'active' },
      { id: 2, name: '第二阶段', startWeight: 64, targetWeight: 60, startDate: '2026-07-16', endDate: '2026-08-15', status: 'pending' },
      { id: 3, name: '第三阶段', startWeight: 60, targetWeight: 58, startDate: '2026-08-16', endDate: '2026-09-15', status: 'pending' }
    ],
    weightHistory: [
      { date: '2026-06-15', weight: 68 },
      { date: '2026-06-18', weight: 67.6 },
      { date: '2026-06-21', weight: 67.3 },
      { date: '2026-06-24', weight: 67.0 }
    ],
    dietPlan: {
      dailyCalories: 1500,
      meals: {
        breakfast: { items: ['燕麦粥1碗', '水煮蛋1个', '蓝莓50g', '无糖豆浆250ml'], calories: 350 },
        lunch: { items: ['杂粮饭半碗', '清炒虾仁150g', '凉拌木耳', '番茄蛋花汤'], calories: 500 },
        dinner: { items: ['玉米1根', '香煎三文鱼150g', '蒜蓉生菜', '紫菜蛋花汤'], calories: 450 },
        snack: { items: ['酸奶1杯(低脂)', '草莓5颗'], calories: 200 }
      }
    },
    exercisePlan: {
      weekly: [
        { day: '周一', type: '有氧', items: ['跳绳20分钟'], duration: 20, calories: 250 },
        { day: '周二', type: '力量', items: ['臀桥4组x15', '侧卧抬腿3组x20', '深蹲4组x12'], duration: 35, calories: 200 },
        { day: '周三', type: '有氧', items: ['快走+慢跑交替30分钟'], duration: 30, calories: 280 },
        { day: '周四', type: '拉伸', items: ['普拉提40分钟'], duration: 40, calories: 180 },
        { day: '周五', type: '力量', items: ['哑铃推举3组x12', '俯卧撑3组x10', '平板支撑3组x45秒'], duration: 35, calories: 200 },
        { day: '周六', type: '有氧', items: ['动感单车30分钟'], duration: 30, calories: 300 },
        { day: '周日', type: '休息', items: ['散步30分钟'], duration: 30, calories: 100 }
      ]
    },
    styleAdvice: {
      bodyAnalysis: '梨型身材，上半身纤细但臀部和大腿较粗。建议选择A字型服装，突出腰部优势，遮盖下半身。',
      clothing: {
        before: '紧身牛仔裤+短款上衣，暴露下半身缺点，比例失调',
        after: '高腰A字裙+收腰上衣+尖头高跟鞋，优化身材比例',
        tips: [
          '选择高腰设计，提升腰线位置',
          'A字裙/伞裙是最佳选择，遮盖臀腿赘肉',
          '上衣选择收腰设计，突出纤细腰身',
          '避免紧身裤和低腰裤',
          '深色下装+浅色上装，视觉重心上移'
        ]
      },
      hairstyle: {
        before: '长发披肩无造型，显得脸更圆更胖',
        after: '锁骨发+八字刘海+微卷造型，修饰圆脸显脸小',
        tips: [
          '选择锁骨发或中长发，长度在锁骨到肩膀之间',
          '搭配八字刘海，修饰脸型两侧',
          '大卷或水波纹增加发量感',
          '避免齐刘海，会缩短脸部长度',
          '可尝试侧分发型，打破对称感'
        ]
      }
    }
  },
  {
    id: 'user_c',
    name: '王先生',
    avatar: '🧔',
    gender: 'male',
    age: 42,
    height: 175,
    currentWeight: 105,
    targetWeight: 75,
    password: '123456',
    bodyType: '全身肥胖型',
    faceShape: '圆脸',
    skinTone: '偏黑皮',
    stages: [
      { id: 1, name: '第一阶段', startWeight: 105, targetWeight: 95, startDate: '2026-06-15', endDate: '2026-07-30', status: 'active' },
      { id: 2, name: '第二阶段', startWeight: 95, targetWeight: 85, startDate: '2026-07-31', endDate: '2026-09-15', status: 'pending' },
      { id: 3, name: '第三阶段', startWeight: 85, targetWeight: 78, startDate: '2026-09-16', endDate: '2026-11-15', status: 'pending' },
      { id: 4, name: '第四阶段', startWeight: 78, targetWeight: 75, startDate: '2026-11-16', endDate: '2026-12-15', status: 'pending' }
    ],
    weightHistory: [
      { date: '2026-06-15', weight: 105 },
      { date: '2026-06-18', weight: 104.5 },
      { date: '2026-06-21', weight: 104.0 },
      { date: '2026-06-24', weight: 103.6 }
    ],
    dietPlan: {
      dailyCalories: 2000,
      meals: {
        breakfast: { items: ['全麦面包1片', '煮鸡蛋2个', '脱脂牛奶250ml', '黄瓜1根'], calories: 500 },
        lunch: { items: ['糙米饭1碗', '清蒸鲈鱼200g', '炒时蔬200g', '番茄蛋汤'], calories: 700 },
        dinner: { items: ['红薯1个', '白灼虾200g', '凉拌西兰花', '冬瓜排骨汤(去油)'], calories: 600 },
        snack: { items: ['橙子1个', '核桃3颗'], calories: 200 }
      }
    },
    exercisePlan: {
      weekly: [
        { day: '周一', type: '有氧', items: ['快走30分钟'], duration: 30, calories: 250 },
        { day: '周二', type: '力量', items: ['弹力带训练30分钟', '深蹲3组x10', '靠墙静蹲3组x30秒'], duration: 35, calories: 200 },
        { day: '周三', type: '有氧', items: ['椭圆机20分钟'], duration: 20, calories: 280 },
        { day: '周四', type: '拉伸', items: ['太极/八段锦30分钟'], duration: 30, calories: 120 },
        { day: '周五', type: '力量', items: ['哑铃划船3组x12', '卧推3组x10', '腿举3组x12'], duration: 40, calories: 220 },
        { day: '周六', type: '有氧', items: ['游泳20分钟'], duration: 20, calories: 300 },
        { day: '周日', type: '休息', items: ['散步15分钟'], duration: 15, calories: 60 }
      ]
    },
    styleAdvice: {
      bodyAnalysis: '全身肥胖型，整体体重偏大。需要通过服装颜色、版型和层次感来优化整体视觉效果。',
      clothing: {
        before: '大号polo衫+运动短裤+拖鞋，随意且不修边幅',
        after: '深色POLO衫+卡其休闲裤+乐福鞋，整洁大方显精神',
        tips: [
          '全身选择深色系（藏青、深灰、黑色），统一色系显瘦',
          '选择合身但不紧身的版型，避免过于宽松',
          '利用层次感（内搭+外套）遮盖身形',
          '竖条纹图案有拉长效果',
          '避免大面积亮色和复杂图案'
        ]
      },
      hairstyle: {
        before: '平头+胡茬未修，显得不修边幅',
        after: '短背头+修剪整齐的胡须造型，干练精神',
        tips: [
          '选择短背头或侧背造型，增加头顶高度',
          '保持面部清洁，修剪整齐的胡须造型',
          '鬓角适度留长，修饰脸型',
          '定期修剪保持造型',
          '可使用哑光发蜡增加质感'
        ]
      }
    }
  }
];

// 获取当前用户数据（含本地存储的打卡记录）
function getUserData(userId) {
  const presetUser = USERS.find(u => u.id === userId);
  if (!presetUser) return null;

  const savedData = localStorage.getItem(`rich_slim_${userId}`);
  if (savedData) {
    return { ...presetUser, ...JSON.parse(savedData) };
  }
  return presetUser;
}

// 保存用户数据
function saveUserData(userId, data) {
  localStorage.setItem(`rich_slim_${userId}`, JSON.stringify(data));
}

// 获取今日日期字符串
function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 获取星期几
function getDayOfWeek() {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return days[new Date().getDay()];
}

// 计算BMI
function calcBMI(weight, height) {
  const h = height / 100;
  return (weight / (h * h)).toFixed(1);
}

// 计算减重进度百分比
function calcProgress(current, start, target) {
  const total = start - target;
  const done = start - current;
  return Math.min(100, Math.max(0, (done / total) * 100)).toFixed(1);
}
