// 为 NTP 核苷酸物品在背包中叠加文字标识

RenderJSEvents.RegisterItemDecorations(event => {
    const labels = [
        { item: 'cellabo:nucleotide_atp', text: 'ATP' },
        { item: 'cellabo:nucleotide_utp', text: 'UTP' },
        { item: 'cellabo:nucleotide_ctp', text: 'CTP' },
        { item: 'cellabo:nucleotide_gtp', text: 'GTP' },
    ]

    labels.forEach(entry => {
        event.register(entry.item, context => {
            RenderJSRenderSystem.disableDepthTestJS()
            context.pushPose()
            context.translate(context.xOffset + 1, context.yOffset + 1, 0)
            context.scale(0.67, 0.67, 1)

            context.drawString(Component.string(entry.text), 0, 0, 0, 0, 0, 120)
            context.drawString(Component.string(entry.text), 1, 0, 255, 255, 255, 255)

            context.popPose()
        })
    })
})
