import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * 为 CellAbo 整合包中的 NTP 物品生成带文字标识的 32x32 贴图。
 *
 * 工作流程：
 * 1. 读取原始 16x16 共享贴图 (nucleotide_0.png / _1.png)
 * 2. 最近邻放大至 32x32 (nucleotide_base_0.png / _1.png)
 * 3. 为每个 NTP 生成透明 overlay，左上角 16x16 区域绘制白色带阴影文字
 *
 * 所有文件读写均在 kubejs/assets/cellabo/textures/item/ 下。
 *
 * 运行方式（CWD 必须在项目根目录）：
 *   javac scripts/GenerateTextures.java -d scripts
 *   java -cp scripts GenerateTextures
 */
public class GenerateTextures {

    private static final String ITEM_DIR = "kubejs/assets/cellabo/textures/item";

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

    private static void generateOverlays() throws IOException {
        String[][] ntpList = {
            { "ATP", "atp" },
            { "UTP", "utp" },
            { "CTP", "ctp" },
            { "GTP", "gtp" }
        };

        Font font = new Font("Dialog", Font.BOLD, 7);

        for (String[] ntp : ntpList) {
            String label = ntp[0];
            String id = ntp[1];

            BufferedImage overlay = new BufferedImage(32, 32, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g = overlay.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
            g.setFont(font);

            FontMetrics fm = g.getFontMetrics();
            int x = 1;
            int y = 1 + fm.getAscent();

            // 阴影
            g.setColor(new Color(0, 0, 0, 120));
            g.drawString(label, x + 1, y + 1);
            // 白色文字
            g.setColor(new Color(255, 255, 255));
            g.drawString(label, x, y);

            g.dispose();

            File outFile = new File(ITEM_DIR, "nucleotide_overlay_" + id + ".png");
            ImageIO.write(overlay, "PNG", outFile);
            System.out.println("  " + outFile.getName());
        }
    }
}
