// theme.js
const theme = {
  // Color Palette
  colors: {
    // Primary brand colors (your specified colors)
    primary: {
      darkest: "#1a4d70", // Deep blue
      dark: "#3d799e", // Medium blue
      main: "#6ea3b9", // Light blue
      light: "#95c0d0", // Lighter blue
      lightest: "#f2e5d4", // Cream/beige
    },

    // Semantic colors using your palette
    brand: {
      primary: "#1a4d70",
      secondary: "#3d799e",
      accent: "#6ea3b9",
      muted: "#95c0d0",
      background: "#f2e5d4",
    },

    // Grayscale
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },

    // Basic colors
    white: "#ffffff",
    black: "#000000",

    // Semantic colors
    success: {
      light: "#dcfce7",
      main: "#22c55e",
      dark: "#15803d",
    },
    warning: {
      light: "#fef3c7",
      main: "#f59e0b",
      dark: "#d97706",
    },
    error: {
      light: "#fee2e2",
      main: "#ef4444",
      dark: "#dc2626",
    },
    info: {
      light: "#dbeafe",
      main: "#3b82f6",
      dark: "#1d4ed8",
    },

    // Text colors
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      tertiary: "#9ca3af",
      inverse: "#ffffff",
      brand: "#1a4d70",
    },

    // Background colors
    background: {
      primary: "#ffffff",
      secondary: "#f9fafb",
      tertiary: "#f3f4f6",
      brand: "#f2e5d4",
      overlay: "rgba(0, 0, 0, 0.5)",
    },

    // Border colors
    border: {
      light: "#e5e7eb",
      main: "#d1d5db",
      dark: "#9ca3af",
      brand: "#95c0d0",
    },
  },

  // Typography
  typography: {
    // Font families
    fontFamily: {
      sans: [
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      serif: ["Georgia", "Times New Roman", "serif"],
      mono: [
        "Fira Code",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },

    // Font sizes
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
    },

    // Font weights
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },

    // Line heights
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },

    // Letter spacing
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },

  // Spacing scale
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
  },

  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  boxShadow: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
  },

  // Z-index scale
  zIndex: {
    auto: "auto",
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50",
    modal: "1000",
    popover: "1100",
    tooltip: "1200",
    notification: "1300",
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Animation/Transition
  transition: {
    duration: {
      fast: "150ms",
      base: "200ms",
      slow: "300ms",
      slower: "500ms",
    },
    timing: {
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      linear: "linear",
    },
  },

  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      padding: {
        sm: "0.5rem 1rem",
        md: "0.75rem 1.5rem",
        lg: "1rem 2rem",
      },
    },
    input: {
      height: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
    },
    card: {
      padding: "1.5rem",
      borderRadius: "0.5rem",
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
  },
};

export default theme;

// Alternative export for named import
export { theme };

// CSS Custom Properties Generator (optional)
export const generateCSSVariables = (themeObj = theme) => {
  const cssVars = {};

  const flatten = (obj, prefix = "") => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const cssKey = prefix ? `${prefix}-${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flatten(value, cssKey);
      } else {
        cssVars[`--${cssKey}`] = value;
      }
    });
  };

  flatten(themeObj);
  return cssVars;
};

// Utility functions for easier theme access
export const getColor = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], theme.colors);
};

export const getSpacing = (size) => {
  return theme.spacing[size] || size;
};

export const getFontSize = (size) => {
  return theme.typography.fontSize[size] || size;
};
