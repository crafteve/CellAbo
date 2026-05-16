const aminoAcids = [
    { id: 'glycine', name: '甘氨酸', color: 0xFFFFFF, formula: 'C2H5NO2' },   // 白色
    { id: 'alanine', name: '丙氨酸', color: 0x88FF88, formula: 'C3H7NO2' },   // 浅绿色
    { id: 'valine', name: '缬氨酸', color: 0x44AAFF, formula: 'C5H11NO2' },   // 蓝色
    { id: 'tryptophan', name: '色氨酸', color: 0xFFBBCC, formula: 'C11H12N2O2' } // 粉色
  ];
  
  StartupEvents.registry('item', event => {
    aminoAcids.forEach(aa => {
      event.create(`amino_acid_${aa.id}`)
        .displayName(aa.name)
        .tooltip(`§e分子式: ${aa.formula}`) 
        .texture('layer0', 'kubejs:item/amino_acids_0')
        .texture('layer1', 'kubejs:item/amino_acids_1')
        .color(0, aa.color); 
    });
  })