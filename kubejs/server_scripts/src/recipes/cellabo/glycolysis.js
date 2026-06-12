/*
 * 糖酵解途径 10 步酶促反应配方
 * 机器: Custom Machinery, processor: craft
 * 时间单位: ticks (20 ticks = 1 秒)
 */

ServerEvents.recipes(event => {

  /*
   * 1. 己糖激酶 (Hexokinase)
   * 输入: Glucose + ATP
   * 输出: G6P + ADP
   * 目的: 葡萄糖磷酸化，投入 1 ATP 启动糖酵解
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_hexokinase', 200)
    .requireItem('cellabo:glycolysis_glucose', 'substrate')
    .requireItem('cellabo:nucleotide_atp', 'cof_in')
    .produceItem('cellabo:glycolysis_g6p', 'product')
    .produceItem('cellabo:coenzyme_adp', 'cof_out')

  /*
   * 2. 磷酸葡萄糖异构酶 (PGI)
   * 输入: G6P
   * 输出: F6P
   * 目的: 醛糖→酮糖异构，为下一步磷酸化做准备
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_pgi', 100)
    .requireItem('cellabo:glycolysis_g6p', 'substrate')
    .produceItem('cellabo:glycolysis_f6p', 'product')

  /*
   * 3. 磷酸果糖激酶 (PFK)
   * 输入: F6P + ATP
   * 输出: F1,6BP + ADP
   * 目的: 第二次磷酸化，投入第二个 ATP，PFK 是糖酵解的关键限速酶
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_pfk', 200)
    .requireItem('cellabo:glycolysis_f6p', 'substrate')
    .requireItem('cellabo:nucleotide_atp', 'cof_in')
    .produceItem('cellabo:glycolysis_f16bp', 'product')
    .produceItem('cellabo:coenzyme_adp', 'cof_out')

  /*
   * 4. 醛缩酶 (Aldolase)
   * 输入: F1,6BP
   * 输出: DHAP + G3P
   * 目的: 六碳糖裂解为两个三碳糖，糖酵解的分支点
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_aldolase', 160)
    .requireItem('cellabo:glycolysis_f16bp', 'substrate')
    .produceItem('cellabo:glycolysis_dhap', 'product1')
    .produceItem('cellabo:glycolysis_g3p', 'product2')

  /*
   * 5. 磷酸丙糖异构酶 (TPI)
   * 输入: DHAP
   * 输出: G3P
   * 目的: DHAP 异构为 G3P，使两个三碳糖均能进入后续通路
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_tpi', 60)
    .requireItem('cellabo:glycolysis_dhap', 'substrate')
    .produceItem('cellabo:glycolysis_g3p', 'product')

  /*
   * 6. 甘油醛-3-磷酸脱氢酶 (GAPDH)
   * 输入: G3P + NAD+ + Pi
   * 输出: 1,3BPG + NADH
   * 目的: 氧化磷酸化，产生高能硫酯键和 NADH，为底物水平磷酸化作准备
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_gapdh', 240)
    .requireItem('cellabo:glycolysis_g3p', 'substrate')
    .requireItem('cellabo:coenzyme_nad_plus', 'cof_in1')
    .requireItem('cellabo:inorganic_phosphate', 'cof_in2')
    .produceItem('cellabo:glycolysis_13bpg', 'product')
    .produceItem('cellabo:coenzyme_nadh', 'cof_out')

  /*
   * 7. 磷酸甘油酸激酶 (PGK)
   * 输入: 1,3BPG + ADP
   * 输出: 3PG + ATP
   * 目的: 第一次底物水平磷酸化，回收 1 ATP
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_pgk', 160)
    .requireItem('cellabo:glycolysis_13bpg', 'substrate')
    .requireItem('cellabo:coenzyme_adp', 'cof_in')
    .produceItem('cellabo:glycolysis_3pg', 'product')
    .produceItem('cellabo:nucleotide_atp', 'cof_out')

  /*
   * 8. 磷酸甘油酸变位酶 (PGM)
   * 输入: 3PG
   * 输出: 2PG
   * 目的: 磷酸基团从 C3 移位至 C2，为脱水反应做准备
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_pgm', 100)
    .requireItem('cellabo:glycolysis_3pg', 'substrate')
    .produceItem('cellabo:glycolysis_2pg', 'product')

  /*
   * 9. 烯醇化酶 (Enolase)
   * 输入: 2PG
   * 输出: PEP + H2O
   * 目的: 脱水生成高能烯醇磷酸酯 PEP
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_enolase', 100)
    .requireItem('cellabo:glycolysis_2pg', 'substrate')
    .produceItem('cellabo:glycolysis_pep', 'product1')
    .produceItem('cellabo:inorganic_water', 'product2')

  /*
   * 10. 丙酮酸激酶 (PK)
   * 输入: PEP + ADP
   * 输出: Pyruvate + ATP
   * 目的: 第二次底物水平磷酸化，回收 1 ATP，终产物丙酮酸
   */
  event.recipes.custommachinery.custom_machine('custommachinery:glycolysis_pk', 160)
    .requireItem('cellabo:glycolysis_pep', 'substrate')
    .requireItem('cellabo:coenzyme_adp', 'cof_in')
    .produceItem('cellabo:glycolysis_pyruvate', 'product')
    .produceItem('cellabo:nucleotide_atp', 'cof_out')

})
