const aminoAcids = [
  // --- 脂肪族 / 非极性 (Aliphatic / Non-polar) ---
  { id: 'glycine', name: '甘氨酸', color: 0xFFFFFF, formula: 'C2H5NO2' },       // 白色 (原定)
  { id: 'alanine', name: '丙氨酸', color: 0x88FF88, formula: 'C3H7NO2' },       // 浅绿色 (原定)
  { id: 'valine', name: '缬氨酸', color: 0x44AAFF, formula: 'C5H11NO2' },       // 蓝色 (原定)
  { id: 'leucine', name: '亮氨酸', color: 0x2288CC, formula: 'C6H13NO2' },      // 深蓝色
  { id: 'isoleucine', name: '异亮氨酸', color: 0x116699, formula: 'C6H13NO2' }, // 藏青色
  { id: 'proline', name: '脯氨酸', color: 0xFFAA33, formula: 'C5H9NO2' },       // 橙色

  // --- 芳香族 (Aromatic) ---
  { id: 'phenylalanine', name: '苯丙氨酸', color: 0xAA55FF, formula: 'C9H11NO2' }, // 紫色
  { id: 'tyrosine', name: '酪氨酸', color: 0xDDAAFF, formula: 'C9H11NO3' },       // 淡紫色
  { id: 'tryptophan', name: '色氨酸', color: 0xFFBBCC, formula: 'C11H12N2O2' },   // 粉色 (原定)

  // --- 含硫 (Sulfur-containing) ---
  { id: 'cysteine', name: '半胱氨酸', color: 0xFFFF55, formula: 'C3H7NO2S' },     // 明黄色
  { id: 'methionine', name: '甲硫氨酸', color: 0xDDCC33, formula: 'C5H11NO2S' },   // 暗黄色

  // --- 极性且不带电荷 (Polar, uncharged) ---
  { id: 'serine', name: '丝氨酸', color: 0x66FFCC, formula: 'C3H7NO3' },        // 青色
  { id: 'threonine', name: '苏氨酸', color: 0x33CC99, formula: 'C4H9NO3' },      // 蓝绿色
  { id: 'asparagine', name: '天冬酰胺', color: 0x99FF88, formula: 'C4H8N2O3' },   // 草绿色
  { id: 'glutamine', name: '谷氨酰胺', color: 0x55DD44, formula: 'C5H10N2O3' },  // 绿色

  // --- 酸性 / 带负电荷 (Acidic / Negative charge) ---
  { id: 'aspartic_acid', name: '天冬氨酸', color: 0x4444CC, formula: 'C4H7NO4' }, // 靛蓝色
  { id: 'glutamic_acid', name: '谷氨酸', color: 0x333399, formula: 'C5H9NO4' },   // 深紫蓝色

  // --- 碱性 / 带正电荷 (Basic / Positive charge) ---
  { id: 'lysine', name: '赖氨酸', color: 0xFF6666, formula: 'C6H14N2O2' },       // 浅红色
  { id: 'arginine', name: '精氨酸', color: 0xDD2222, formula: 'C6H14N4O2' },      // 鲜红色
  { id: 'histidine', name: '组氨酸', color: 0xFF9966, formula: 'C6H9N3O2' }       // 珊瑚红
];
  
StartupEvents.registry('item', event => {
  aminoAcids.forEach(aa => {
    event.create(`cellabo:amino_acid_${aa.id}`)
      .displayName(aa.name)
      .tooltip(`§e${aa.formula}`) 
      .texture('layer0', 'cellabo:item/amino_acids_0')
      .texture('layer1', 'cellabo:item/amino_acids_1')
      .color(0, aa.color)
      .tag('c:amino_acids'); 
  });
})