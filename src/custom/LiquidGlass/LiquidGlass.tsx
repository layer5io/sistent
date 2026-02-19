import React, { type CSSProperties} from "react"

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement>  {
  children: React.ReactNode
  blurAmount?: number
  saturation?: number
  cornerRadius?: number
  className?: string
  padding?: string
  style?: CSSProperties
  overLight?: boolean
  showShadow?: boolean
  zIndex?: number
  showTextShadow?: boolean
}

export default function LiquidGlass({
    children,
    blurAmount = 0.0625,
    saturation = 140,
    cornerRadius = 999,
    className = "",
    padding = "24px 32px",
    overLight = false,
    showShadow = true,
    zIndex = 2,
    showTextShadow = true,
    style = {},
    }: LiquidGlassProps) {

    const baseBlur = overLight ? 12 : 4
    const blurPx = baseBlur + blurAmount * 32

    const backdropStyle = {
      backdropFilter: `blur(${blurPx}px) saturate(${saturation}%)`,
    }

    return (
        <div className={className} style={style}>
            <div
            className="glass"
            style={{
                borderRadius: `${cornerRadius}px`,
                position: "relative",
                padding,
                overflow: "hidden",
                boxShadow: showShadow ? (overLight ? "0px 16px 70px rgba(0, 0, 0, 0.75)" : "0px 12px 40px rgba(0, 0, 0, 0.25)") : "none",
                zIndex
            }}
            >
                {/* backdrop layer that gets wiggly */}
                <span
                    className="glass__warp"
                    style={
                    {
                        ...backdropStyle,
                        position: "absolute",
                        inset: "0",
                    } as CSSProperties
                    }
                />

                {/* user content stays sharp */}
                <div
                    style={{
                    position: "relative",
                    font: "500 20px/1 system-ui",
                    textShadow: showTextShadow ? (overLight ? "0px 2px 12px rgb(255, 255, 255)" : "0px 2px 12px rgb(5, 5, 5)") : "none",
                    color: overLight ? "rgb(5, 5, 5)" : "rgb(255, 255, 255)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}