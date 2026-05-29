/*
 * --- 物品注册部分 ---
 * 用途：注册 ATP/UTP/CTP/GTP 四个 NTP 物品
 * 贴图构成：
 *   layer0 → cellabo:item/nucleotide_base_0  (32×32, 共享, 最近邻放大自 nucleotide_0.png)
 *   layer1 → cellabo:item/nucleotide_base_1  (32×32, 共享, 最近邻放大自 nucleotide_1.png)
 *   layer2 → cellabo:item/nucleotide_overlay_{id} (32×32, 独立文字层, 不染色)
 */
const nucleotides = [
    { id: 'atp', name: 'ATP', color: 0xFF5555, formula: 'C10H16N5O13P3' },
    { id: 'utp', name: 'UTP', color: 0xFFFF55, formula: 'C9H15N2O15P3' },
    { id: 'ctp', name: 'CTP', color: 0x5555FF, formula: 'C9H16N3O14P3' },
    { id: 'gtp', name: 'GTP', color: 0x55FF55, formula: 'C10H16N5O14P3' }
]

StartupEvents.registry('item', event => {
    nucleotides.forEach(nt => {
        event.create('cellabo:nucleotide_' + nt.id)
            .displayName(nt.name)
            .tooltip('§e' + nt.formula)
            .texture('layer0', 'cellabo:item/nucleotide_base_0')
            .texture('layer1', 'cellabo:item/nucleotide_base_1')
            .texture('layer2', 'cellabo:item/nucleotide_overlay_' + nt.id)
            .color(0, nt.color)
            .tag('c:nucleotides')
    })
})
