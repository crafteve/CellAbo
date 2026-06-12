ServerEvents.recipes(event => {
  event.shaped(
    '4x minecraft:chest', // 输出：4个箱子
    [
      'LLL', // 第一行
      'L L', // 第二行（中间空）
      'LLL'  // 第三行
    ],
    {
      L: '#minecraft:logs' // 键L对应：所有原木的tag
    }
  )
})
