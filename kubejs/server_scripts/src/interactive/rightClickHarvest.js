const rightClickHarvestRecipes = []

function registerRightClickHarvest(config) {
  rightClickHarvestRecipes.push(config)
}

BlockEvents.rightClicked(event => {
  const { player, hand, block, item } = event
  if (hand !== 'main_hand') return

  for (const recipe of rightClickHarvestRecipes) {
    if (!matchesBlock(recipe.block, block)) continue

    if (recipe.hand === 'empty') {
      if (!item.empty) continue
    } else if (recipe.hand && recipe.hand !== 'empty') {
      if (item.id !== recipe.hand) continue
    }

    if (recipe.damage) {
      const [min, max] = recipe.damage
      const dmg = min + Math.floor(Math.random() * (max - min + 1))
      if (dmg > 0) {
        player.attack(dmg)
      }
    }

    for (const drop of recipe.drops) {
      if (Math.random() * 100 < drop.weight) {
        const stack = Item.of(drop.item, drop.count)
        const entity = player.drop(stack, false)
        if (entity) {
          entity.motionX = 0
          entity.motionY = 0
          entity.motionZ = 0
          entity.setNoPickUpDelay()
        }
      }
    }
  }
})

function matchesBlock(target, block) {
  if (target.startsWith('#')) {
    return block.hasTag(target.slice(1))
  }
  return block.id === target
}

/*
输入：空手右键 compactmachines:solid_wall
消耗：0-1 伤害
输出：铁离子、磷酸盐、甘氨酸、丙氨酸、水（独立概率）
目的：前期基础物质获取
*/
registerRightClickHarvest({
  block: 'compactmachines:solid_wall',
  hand: 'empty',
  damage: [0, 1],
  drops: [
    { item: 'cellabo:inorganic_iron_ion',     weight: 10, count: 1 },
    { item: 'cellabo:inorganic_phosphate',     weight: 15, count: 1 },
    { item: 'cellabo:amino_acid_glycine',      weight: 30, count: 1 },
    { item: 'cellabo:amino_acid_alanine',      weight: 25, count: 1 },
    { item: 'cellabo:inorganic_water',         weight: 20, count: 1 },
  ]
})
