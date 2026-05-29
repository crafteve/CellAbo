import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 为 CellAbo 整合包中的 NTP 物品生成带文字标识的 32×32 贴图。
 *
 * ## 工作流程
 * 1. 读取原始 16×16 共享贴图 (nucleotide_0.png / _1.png)
 * 2. 最近邻放大至 32×32 → nucleotide_base_0.png / _1.png
 * 3. 为每个 NTP 生成透明 overlay，左上角用像素字体绘制白色带阴影文字
 *    → nucleotide_overlay_{id}.png
 *
 * ## 像素字体说明
 * 当前使用 5×7 像素字体 (GLYPH_W × GLYPH_H)，字间距 +1px。
 * 如需新增字符（如氨基酸单字母缩写），在下方 PIXEL_FONT static 块中
 * 按相同格式添加即可，每行 5 个字符，'1' = 点亮，'0' = 透明。
 *
 * ## 新增物品类别
 * 如需为其他物品生成文字 overlay，在 generateOverlays() 的列表中
 * 按 { "显示文字", "文件名id" } 格式添加条目即可。
 *
 * ## 运行方式
 * CWD 必须在项目根目录：
 *   javac scripts/GenerateTextures.java -d scripts
 *   java -cp scripts GenerateTextures
 */
public class GenerateTextures {

    // 输出目录（相对于项目根目录）
    private static final String ITEM_DIR = "kubejs/assets/cellabo/textures/item";

    // 像素字体：每个字符的宽/高（像素），如需更大字号直接修改这两个值
    // 注意：宽×字符数 + (字间距×间隙数) 不应超出 16px（左上角 16×16 区域）
    // 当前 5×3 + 2 = 17px，但 P 最右列为空，实际不超边界
    private static final int GLYPH_W = 5;
    private static final int GLYPH_H = 7;

    // 字间距（像素），每两个字符之间插入的空白列数
    // 修改该值会同时影响所有字符的总体宽度
    private static final int GLYPH_SPACING = 1;

    // 像素字体定义：Map<字符, 每行bitmap>
    // 每行是一个 5 字符的字符串，'1' 表示该像素点亮，'0' 表示透明
    // 共 GLYPH_H = 7 行，从上到下排列
    // 添加新字符：在下方按相同格式追加即可
    private static final Map<Character, String[]> PIXEL_FONT = new HashMap<>();

    static {
        PIXEL_FONT.put('A', new String[] {
            "01110",
            "10001",
            "10001",
            "11111",
            "10001",
            "10001",
            "10001"
        });
        PIXEL_FONT.put('C', new String[] {
            "01110",
            "10001",
            "10000",
            "10000",
            "10000",
            "10001",
            "01110"
        });
        PIXEL_FONT.put('G', new String[] {
            "01110",
            "10001",
            "10000",
            "10111",
            "10001",
            "10001",
            "01110"
        });
        PIXEL_FONT.put('P', new String[] {
            "11110",
            "10001",
            "10001",
            "11110",
            "10000",
            "10000",
            "10000"
        });
        PIXEL_FONT.put('T', new String[] {
            "11111",
            "00100",
            "00100",
            "00100",
            "00100",
            "00100",
            "00100"
        });
        PIXEL_FONT.put('U', new String[] {
            "10001",
            "10001",
            "10001",
            "10001",
            "10001",
            "10001",
            "01110"
        });
    }

    public static void main(String[] args) {
        try {
            System.out.println("Generating nucleotide textures...");
            generateBaseTextures();
            generateOverlays();
            System.out.println("Done.");
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void generateBaseTextures() throws IOException {
        File dir = new File(ITEM_DIR);

        BufferedImage src0 = ImageIO.read(new File(dir, "nucleotide_0.png"));
        BufferedImage src1 = ImageIO.read(new File(dir, "nucleotide_1.png"));

        ImageIO.write(upscale2x(src0), "PNG", new File(dir, "nucleotide_base_0.png"));
        ImageIO.write(upscale2x(src1), "PNG", new File(dir, "nucleotide_base_1.png"));
    }

    private static BufferedImage upscale2x(BufferedImage src) {
        int w = src.getWidth() * 2;
        int h = src.getHeight() * 2;
        BufferedImage dst = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = dst.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
        g.drawImage(src, 0, 0, w, h, null);
        g.dispose();
        return dst;
    }

    /**
     * 生成所有 NTP 的文字 overlay 贴图。
     *
     * 如需为其他类别物品生成文字，在此添加条目即可：
     * { "显示文字", "文件名id" } → 输出 nucleotide_overlay_{文件名id}.png
     *
     * 文字颜色可在下方的 drawPixelString 调用处修改。
     */
    private static void generateOverlays() throws IOException {
        String[][] ntpList = {
            { "ATP", "atp" },
            { "UTP", "utp" },
            { "CTP", "ctp" },
            { "GTP", "gtp" }
        };

        for (String[] ntp : ntpList) {
            String label = ntp[0];
            String id = ntp[1];

            BufferedImage overlay = new BufferedImage(32, 32, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g = overlay.createGraphics();

            // 文字起始位置（左上角偏移 1px）
            // 如需调整整体位置，修改 x/y 即可
            int x = 1;
            int y = 1;

            // 阴影层（黑色半透明，右偏下偏 1px）
            drawPixelString(g, label, x + 1, y + 1, new Color(0, 0, 0, 120));
            // 主文字层（纯白）
            drawPixelString(g, label, x, y, new Color(255, 255, 255));

            g.dispose();

            File outFile = new File(ITEM_DIR, "nucleotide_overlay_" + id + ".png");
            ImageIO.write(overlay, "PNG", outFile);
            System.out.println("  " + outFile.getName());
        }
    }

    /**
     * 用像素字体绘制文字。
     *
     * @param g     Graphics2D 上下文
     * @param text  要绘制的文字（仅支持 PIXEL_FONT 中已定义的字符）
     * @param x     起始 X 坐标
     * @param y     起始 Y 坐标（文字顶行）
     * @param color 文字颜色（含 alpha 通道，用于阴影半透明）
     */
    private static void drawPixelString(Graphics2D g, String text, int x, int y, Color color) {
        g.setColor(color);
        int cx = x;
        for (char c : text.toCharArray()) {
            String[] glyph = PIXEL_FONT.get(c);
            if (glyph == null) continue;
            for (int row = 0; row < GLYPH_H; row++) {
                String rowBits = glyph[row];
                for (int col = 0; col < GLYPH_W; col++) {
                    if (rowBits.charAt(col) == '1') {
                        g.fillRect(cx + col, y + row, 1, 1);
                    }
                }
            }
            // 每个字符后插入 GLYPH_SPACING 像素的间隔
            cx += GLYPH_W + GLYPH_SPACING;
        }
    }
}
