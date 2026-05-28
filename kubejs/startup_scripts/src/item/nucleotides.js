const nucleotides = [
    { id: 'atp', name: 'ATP', color: 0xFF5555, formula: 'C10H16N5O13P3' }, // 红色系 (A)
    { id: 'utp', name: 'UTP', color: 0xFFFF55, formula: 'C9H15N2O15P3' }, // 黄色系 (U)
    { id: 'ctp', name: 'CTP', color: 0x5555FF, formula: 'C9H16N3O14P3' }, // 蓝色系 (C)
    { id: 'gtp', name: 'GTP', color: 0x55FF55, formula: 'C10H16N5O14P3' }  // 绿色系 (G)
];

StartupEvents.registry('item', event => {
    nucleotides.forEach(nt => {
        event.create(`cellabo:nucleotide_${nt.id}`)
            .displayName(nt.name)
            .tooltip(`§e${nt.formula}`)
            .texture('layer0', 'cellabo:item/nucleotide_0') 
            .texture('layer1', 'cellabo:item/nucleotide_1')
            .color(0, nt.color) 
            .tag('c:nucleotides') // 统一打上核苷酸 Tag
    });
});