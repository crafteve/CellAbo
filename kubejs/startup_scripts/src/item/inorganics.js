const inorganics = [
    // --- 核心无机分子 ---
    { id: 'water', name: '水分子', color: 0x33CCFF, formula: 'H2O' },
    { id: 'ammonia', name: '氨分子', color: 0xDDFFCC, formula: 'NH3' },
    { id: 'carbon_dioxide', name: '二氧化碳', color: 0x888888, formula: 'CO2' },
    { id: 'phosphate', name: '磷酸根', color: 0xFF8822, formula: 'PO4³⁻' },
    
    // --- 核心金属离子 (辅助因子) ---
    { id: 'magnesium_ion', name: '镁离子', color: 0xEEEEFF, formula: 'Mg²⁺' }, // 核酶和核糖体必需
    { id: 'calcium_ion', name: '钙离子', color: 0xFFFAEE, formula: 'Ca²⁺' },
    { id: 'iron_ion', name: '铁离子', color: 0xAA5544, formula: 'Fe²⁺/Fe³⁺' },
    { id: 'zinc_ion', name: '锌离子', color: 0xCCDDEE, formula: 'Zn²⁺' }
];

StartupEvents.registry('item', event => {
    inorganics.forEach(io => {
        event.create(`cellabo:inorganic_${io.id}`)
            .displayName(io.name)
            .tooltip(`§e${io.formula}`)
            .texture('layer0', 'cellabo:item/ion_0') 
            .texture('layer1', 'cellabo:item/ion_1')
            .color(0, io.color)
            .tag('c:inorganic_molecules'); // 统一无机物 Tag
    });
});
