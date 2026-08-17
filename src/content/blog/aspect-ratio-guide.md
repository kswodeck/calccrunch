**Aspect ratio** is the proportional relationship between an image's (or screen's) width and height, written as two numbers separated by a colon — like 16:9 or 4:3. To calculate it, divide both the width and height by their **greatest common divisor (GCD)**. For a 1920×1080 photo, the GCD of 1920 and 1080 is 120, so 1920 ÷ 120 = 16 and 1080 ÷ 120 = 9, giving you 16:9.

This guide walks through the GCD method step by step, shows a quick decimal shortcut, breaks down what 16:9, 4:3, 21:9, and other common ratios actually mean, and explains how to resize an image or video to a new size without stretching or distorting it. Use the [aspect ratio calculator](/calculators/aspect-ratio-calculator) to check your own numbers as you go.

## How to Calculate Aspect Ratio: The GCD Method

The most reliable way to find an aspect ratio from pixel dimensions (or any width/height pair) is:

1. **Find the GCD** of the width and height — the largest number that divides evenly into both.
2. **Divide both numbers by the GCD.**
3. The two results, written as `width:height`, are your simplified aspect ratio.

### Worked Example: 1920×1080 (Full HD)

- Width: 1920, Height: 1080
- GCD(1920, 1080) = 120
- 1920 ÷ 120 = 16
- 1080 ÷ 120 = 9
- **Aspect ratio: 16:9**

### Worked Example: 1024×768 (Old Monitor Resolution)

- GCD(1024, 768) = 256
- 1024 ÷ 256 = 4
- 768 ÷ 256 = 3
- **Aspect ratio: 4:3**

This is exactly the same math used to simplify a fraction or a ratio — if you've used the [ratio calculator](/calculators/ratio-calculator) or the [GCF and LCM calculator](/calculators/gcf-lcm-calculator) before, the process will look familiar, since aspect ratio is really just a ratio simplified to lowest terms.

## The Decimal Shortcut

If you don't need the "clean" ratio and just want a quick way to compare two shapes, divide width by height directly:

**Decimal ratio = width ÷ height**

For 1920×1080: 1920 ÷ 1080 = 1.7778, which matches 16 ÷ 9 = 1.7778. This decimal form is also how cinema aspect ratios are usually written — 2.39:1 means "2.39 units wide for every 1 unit tall" — and it's the fastest way to check whether two differently-sized images share the same shape.

## Common Aspect Ratios Explained

| Ratio | Decimal | Where you'll see it |
|---|---|---|
| **1:1** | 1.00 | Square photos, Instagram posts |
| **5:4** | 1.25 | Older computer monitors |
| **4:3** | 1.33 | Classic TVs, iPad screens, PowerPoint (older) |
| **3:2** | 1.50 | DSLR and mirrorless camera photos |
| **16:10** | 1.60 | Some laptop and monitor displays |
| **16:9** | 1.78 | HD/4K TVs, YouTube, most monitors |
| **21:9** | 2.33 | Ultrawide monitors, cinematic video |
| **2.39:1** | 2.39 | Widescreen cinema ("Cinemascope") |
| **9:16** | 0.56 | Vertical video — Reels, TikTok, Stories |

Notice that 4:3 and 3:4 (or 16:9 and 9:16) are the same ratio, just rotated — swapping width and height flips landscape to portrait without changing the underlying proportions.

## How to Resize Without Distorting the Image

The most common real-world use of aspect ratio math isn't identifying a ratio — it's finding a matching dimension when you resize something. If you shrink a 1920×1080 image down to 1280 pixels wide, what height keeps it from looking stretched or squished?

**Step 1:** Find the scale factor: new width ÷ original width.
1280 ÷ 1920 = 0.667

**Step 2:** Apply that same scale factor to the height.
1080 × 0.667 = **720**

So a 1920×1080 image resized to 1280 pixels wide should be exactly 720 pixels tall to preserve the original 16:9 shape. This is exactly what the [aspect ratio calculator](/calculators/aspect-ratio-calculator)'s "Find Dimension" mode does — enter your original size and just one target dimension, and it solves for the other.

### Worked Example: Resizing a 4:3 Photo

- Original: 1600×1200 (which simplifies to 4:3)
- Target width: 800
- Scale factor: 800 ÷ 1600 = 0.5
- New height: 1200 × 0.5 = **600**
- Result: 800×600 — still exactly 4:3.

## Why Photo Prints Sometimes Get Cropped

Aspect ratio math also explains a common photography annoyance: why a photo taken on a phone or DSLR doesn't always print cleanly at a standard size. Most phone and camera sensors shoot at 4:3 or 3:2, but common print sizes don't always match:

| Print size | Simplified ratio | Matches common camera ratio? |
|---|---|---|
| 4×6 in | 2:3 | Yes — matches 3:2 camera photos |
| 5×7 in | 5:7 | No — neither 4:3 nor 3:2 |
| 8×10 in | 4:5 | No — neither 4:3 nor 3:2 |
| 8×12 in | 2:3 | Yes — matches 3:2 camera photos |

If your photo's ratio doesn't match your print size's ratio, part of the image gets cropped off automatically to fill the frame. Running your camera's resolution and your target print size through the [aspect ratio calculator](/calculators/aspect-ratio-calculator) tells you in advance whether you'll need to crop — and by how much — before you print.

## Why Some Resolutions Don't Simplify to a "Clean" Ratio

Not every resolution reduces neatly to a standard ratio. For example, 1366×768 (a common older laptop resolution) simplifies to 683:384 — not a tidy number, and its decimal value (1.780) is only *close* to 16:9 (1.778), not identical. This happens because manufacturers sometimes round panel dimensions for manufacturing or cost reasons rather than hitting an exact ratio. The [aspect ratio calculator](/calculators/aspect-ratio-calculator) flags this by showing both the exact simplified ratio and the closest standard ratio, so you can tell at a glance whether your dimensions are an exact match or just an approximation.

## Frequently Asked Questions

**How do I calculate aspect ratio from width and height?**
Divide both the width and height by their greatest common divisor (GCD). For 1920×1080, the GCD is 120, giving 16:9. You can also express it as a decimal by dividing width by height directly (1920 ÷ 1080 = 1.78).

**What's the difference between 16:9 and 4:3?**
16:9 (1.78:1) is the modern widescreen standard for HD/4K TVs, monitors, and online video. 4:3 (1.33:1) is the older "fullscreen" format used by classic TVs and early computer monitors — noticeably more square-shaped than 16:9.

**How do I keep the same aspect ratio when resizing an image?**
Multiply both the width and height by the same scale factor. If you know your target width, divide it by the original width to get the scale factor, then multiply the original height by that same factor to get the new height (and vice versa for a target height).

**What resolution is 21:9 ultrawide?**
Common 21:9 (2.33:1) resolutions include 2560×1080 and 3440×1440. It's noticeably wider than standard 16:9 and is popular for ultrawide gaming and productivity monitors.

**Why doesn't my resolution simplify to a standard ratio like 16:9?**
Some resolutions are close to, but not exactly, a standard ratio due to how panel dimensions are manufactured — 1366×768 is a common example that's very close to but not precisely 16:9. Compare the decimal value to the standard ratios table above to see how close it actually is.

## The Bottom Line

Calculating aspect ratio comes down to one core skill: finding the GCD of your width and height and dividing both by it — the exact same math used to simplify fractions and ratios. Once you know your ratio, resizing without distortion is just a matter of applying the same scale factor to both dimensions. Plug your own numbers into the [aspect ratio calculator](/calculators/aspect-ratio-calculator) to get the simplified ratio, the closest standard match, and a distortion-free resize in one step, or brush up on the underlying math with the [ratio calculator](/calculators/ratio-calculator) and [GCF and LCM calculator](/calculators/gcf-lcm-calculator).
