/*
 * --- 糖酵解中间产物注册 ---
 * 贴图构成：
 *   layer0 → cellabo:item/nucleotide_base_0  (共享基底, 染色)
 *   layer1 → cellabo:item/nucleotide_base_1  (共享覆盖层, 不染色)
 *   layer2 → cellabo:item/glycolysis_overlay_{id} (独立文字层, 不染色)
 */
const glycolysisIntermediates = [
  // --- 六碳糖阶段 (C6) ---
  { id: 'glucose',  name: '葡萄糖',               color: 0xFFCC66, formula: 'C6H12O6' },
  { id: 'g6p',      name: '葡萄糖-6-磷酸',        color: 0xFF8844, formula: 'C6H13O9P' },
  { id: 'f6p',      name: '果糖-6-磷酸',          color: 0xFF6644, formula: 'C6H13O9P' },
  { id: 'f16bp',    name: '果糖-1,6-二磷酸',      color: 0xFF4444, formula: 'C6H14O12P2' },

  // --- 三碳糖阶段 (C3) ---
  { id: 'dhap',     name: '磷酸二羟丙酮',         color: 0x88FF88, formula: 'C3H7O6P' },
  { id: 'g3p',      name: '甘油醛-3-磷酸',        color: 0x44CC44, formula: 'C3H7O6P' },

  // --- 磷酸甘油酸阶段 ---
  { id: '13bpg',    name: '1,3-二磷酸甘油酸',     color: 0x44CCCC, formula: 'C3H8O10P2' },
  { id: '3pg',      name: '3-磷酸甘油酸',         color: 0x4466FF, formula: 'C3H7O7P' },
  { id: '2pg',      name: '2-磷酸甘油酸',         color: 0x3344CC, formula: 'C3H7O7P' },

  // --- 丙酮酸阶段 ---
  { id: 'pep',      name: '磷酸烯醇式丙酮酸',     color: 0x9944FF, formula: 'C3H5O6P' },
  { id: 'pyruvate', name: '丙酮酸',               color: 0x6633AA, formula: 'C3H4O3' }
];

/*
 * --- 辅酶注册 ---
 * 贴图构成：
 *   layer0 → cellabo:item/nucleotide_base_0  (共享基底, 染色)
 *   layer1 → cellabo:item/nucleotide_base_1  (共享覆盖层, 不染色)
 *   layer2 → cellabo:item/coenzyme_overlay_{id} (独立文字层, 不染色)
 */
const coenzymes = [
  { id: 'adp',      name: 'ADP',                  color: 0xCC3333, formula: 'C10H15N5O10P2' },
  { id: 'nad_plus', name: 'NAD⁺',                 color: 0xFFCC00, formula: 'C21H27N7O14P2' },
  { id: 'nadh',     name: 'NADH',                 color: 0xCC9900, formula: 'C21H29N7O14P2' }
];

StartupEvents.registry('item', event => {
  glycolysisIntermediates.forEach(item => {
    event.create(`cellabo:glycolysis_${item.id}`)
      .displayName(item.name)
      .tooltip(`§e${item.formula}`)
      .texture('layer0', 'cellabo:item/nucleotide_base_0')
      .texture('layer1', 'cellabo:item/nucleotide_base_1')
      .texture('layer2', 'cellabo:item/glycolysis_overlay_' + item.id)
      .color(0, item.color)
      .tag('c:glycolysis_intermediates');
  });

  coenzymes.forEach(item => {
    event.create(`cellabo:coenzyme_${item.id}`)
      .displayName(item.name)
      .tooltip(`§e${item.formula}`)
      .texture('layer0', 'cellabo:item/nucleotide_base_0')
      .texture('layer1', 'cellabo:item/nucleotide_base_1')
      .texture('layer2', 'cellabo:item/coenzyme_overlay_' + item.id)
      .color(0, item.color)
      .tag('c:coenzymes');
  });
});
