import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { arabicFont, colors, fullScreen, glass } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const BrandMark: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: compact ? 12 : 18,
      direction: "ltr",
    }}
  >
    <div
      style={{
        width: compact ? 38 : 58,
        height: compact ? 38 : 58,
        borderRadius: compact ? 12 : 18,
        background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`,
        boxShadow: "0 10px 35px rgba(79,124,255,.42)",
        display: "grid",
        placeItems: "center",
        color: "white",
        fontWeight: 900,
        fontSize: compact ? 21 : 32,
      }}
    >
      O
    </div>
    <span
      style={{
        fontFamily: "Arial, sans-serif",
        fontWeight: 900,
        fontSize: compact ? 28 : 46,
        letterSpacing: 2,
      }}
    >
      ORDIO
    </span>
  </div>
);

const SceneShell: React.FC<{ children: ReactNode; accent?: string; duration: number }> = ({
  children,
  accent = colors.blue,
  duration,
}) => {
  const frame = useCurrentFrame();
  const inOpacity = interpolate(frame, [0, 10], [0, 1], clamp);
  const outOpacity = interpolate(
    frame,
    [duration - 12, duration],
    [1, 0],
    clamp,
  );
  return (
    <AbsoluteFill
      style={{
        ...fullScreen,
        opacity: Math.min(inOpacity, outOpacity),
        background: `radial-gradient(circle at 88% 8%, ${accent}22, transparent 32%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translateY(${(frame * 0.25) % 72}px)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const KineticLine: React.FC<{
  children: ReactNode;
  delay: number;
  color?: string;
  size?: number;
}> = ({ children, delay, color = colors.text, size = 82 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 150, mass: 0.75 },
  });
  const exit = interpolate(frame, [125, 148], [1, 0], clamp);
  return (
    <div
      style={{
        color,
        fontSize: size,
        lineHeight: 1.3,
        fontWeight: 900,
        opacity: entrance * exit,
        transform: `translateY(${interpolate(entrance, [0, 1], [75, 0])}px) scale(${interpolate(
          entrance,
          [0, 1],
          [0.92, 1],
        )})`,
        filter: `blur(${interpolate(entrance, [0, 1], [12, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

const EmptyRegister: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 55, fps, config: { damping: 9 } });
  const drawer = interpolate(frame, [70, 88, 115], [0, 70, 60], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 110,
        width: 360,
        height: 300,
        opacity: pop,
        transform: `scale(${pop}) rotate(${interpolate(pop, [0, 1], [-9, -2])}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 20px 90px",
          borderRadius: 34,
          border: `7px solid ${colors.red}`,
          background: "#1A1823",
          boxShadow: `0 30px 80px ${colors.red}33`,
        }}
      >
        <div
          style={{
            margin: 30,
            height: 60,
            borderRadius: 13,
            background: "#2A2430",
            border: `3px solid ${colors.red}88`,
          }}
        />
        <div style={{ display: "flex", gap: 16, margin: 30 }}>
          {[0, 1, 2].map((key) => (
            <div
              key={key}
              style={{ width: 65, height: 45, borderRadius: 10, background: colors.red }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: -drawer,
          right: 0,
          bottom: 18,
          height: 105,
          borderRadius: 24,
          border: `7px solid ${colors.red}`,
          background: "#120F18",
          display: "grid",
          placeItems: "center",
          fontSize: 34,
          color: colors.red,
          fontWeight: 900,
        }}
      >
        0.00 DH
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => (
  <SceneShell accent={colors.red} duration={150}>
    <div dir="rtl" style={{ position: "absolute", top: 230, right: 72, left: 72 }}>
      <KineticLine delay={5}>كتبيع أجزاء ديال سيارات</KineticLine>
      <KineticLine delay={23} color={colors.blue}>
        النهار كامل...
      </KineticLine>
      <div style={{ height: 32 }} />
      <KineticLine delay={43} size={72}>
        وفالليل كتلقى الكارني عامر،
      </KineticLine>
      <KineticLine delay={65} size={78} color={colors.red}>
        والفلوس ماكايناش فالمجر؟
      </KineticLine>
    </div>
    <EmptyRegister />
    <div style={{ position: "absolute", bottom: 92, right: 72 }}>
      <BrandMark compact />
    </div>
  </SceneShell>
);

const Receipt: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const cycle = (frame * (1.05 + index * 0.035) + index * 51) % 310;
  const top = interpolate(cycle, [0, 310], [-300, 2050]);
  const sway = Math.sin((frame + index * 23) / 13) * (24 + index * 2);
  return (
    <div
      style={{
        position: "absolute",
        left: 70 + ((index * 137) % 880) + sway,
        top,
        width: 128 + (index % 3) * 22,
        height: 210,
        padding: 18,
        borderRadius: 8,
        color: "#1A2638",
        background: "#F8FAFC",
        boxShadow: "0 18px 35px rgba(0,0,0,.2)",
        transform: `rotate(${index % 2 === 0 ? cycle * 0.13 : -cycle * 0.11}deg)`,
        opacity: 0.78,
      }}
    >
      {[70, 92, 54, 86, 62].map((width, line) => (
        <div
          key={line}
          style={{ height: 8, width: `${width}%`, marginBottom: 15, background: "#C8D1DC" }}
        />
      ))}
      <div style={{ borderTop: "3px dashed #9AA8BA", marginTop: 10, paddingTop: 16 }}>
        BON #{120 + index}
      </div>
    </div>
  );
};

const DecliningChart: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [80, 155], [0, 1], clamp);
  return (
    <div
      style={{
        ...glass,
        position: "absolute",
        bottom: 145,
        left: 80,
        right: 80,
        height: 420,
        borderRadius: 36,
        padding: 46,
      }}
    >
      <div style={{ color: colors.muted, fontSize: 28, fontWeight: 700 }}>رأس المال</div>
      <div style={{ color: colors.red, fontSize: 54, fontWeight: 900, marginTop: 10 }}>−37.8%</div>
      <svg viewBox="0 0 900 220" style={{ position: "absolute", left: 45, right: 45, bottom: 35 }}>
        <defs>
          <linearGradient id="decline" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={colors.red} stopOpacity=".35" />
            <stop offset="1" stopColor={colors.red} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M5 22 L150 48 L280 62 L410 95 L550 88 L700 152 L895 205 L895 220 L5 220Z" fill="url(#decline)" opacity={draw} />
        <path
          d="M5 22 L150 48 L280 62 L410 95 L550 88 L700 152 L895 205"
          fill="none"
          stroke={colors.red}
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - draw}
        />
      </svg>
    </div>
  );
};

const ChaosCaption: React.FC<{ text: string; start: number; end: number; color?: string }> = ({
  text,
  start,
  end,
  color = colors.text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 180 } });
  const leave = interpolate(frame, [end - 10, end], [1, 0], clamp);
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 190,
        right: 65,
        left: 65,
        textAlign: "center",
        color,
        fontSize: 72,
        lineHeight: 1.45,
        fontWeight: 900,
        opacity: enter * leave,
        transform: `translateX(${interpolate(enter, [0, 1], [160, 0])}px) scale(${interpolate(enter, [0, 1], [.92, 1])})`,
      }}
    >
      {text}
    </div>
  );
};

export const Scene2Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = frame > 210 ? Math.sin(frame * 2.2) * 3 : 0;
  return (
    <SceneShell accent={colors.red} duration={300}>
      <AbsoluteFill style={{ transform: `translateX(${shake}px)` }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Receipt key={index} index={index} />
        ))}
        <ChaosCaption text="البونات كيتجلاو..." start={0} end={72} color={colors.red} />
        <ChaosCaption text="سلعة كتخرج ومكاتعقلش عليها" start={62} end={135} />
        <ChaosCaption text="وستوك ماباغيش يتحرك... شادّ رأس المال" start={125} end={212} color={colors.amber} />
        <ChaosCaption text="ورُوينة حساب الكوميسيون مع الميكانيسيان!" start={202} end={295} />
        <DecliningChart />
      </AbsoluteFill>
    </SceneShell>
  );
};

const Dashboard: React.FC<{ large?: boolean }> = ({ large = false }) => (
  <div
    style={{
      ...glass,
      width: large ? 940 : 840,
      height: large ? 780 : 650,
      borderRadius: 42,
      overflow: "hidden",
      boxShadow: `0 45px 140px rgba(0,0,0,.5), 0 0 90px ${colors.blue}22`,
      direction: "ltr",
    }}
  >
    <div
      style={{
        height: 100,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <BrandMark compact />
      <div style={{ display: "flex", gap: 10 }}>
        {[colors.red, colors.amber, colors.green].map((color) => (
          <div key={color} style={{ width: 16, height: 16, background: color, borderRadius: 99 }} />
        ))}
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", height: "calc(100% - 100px)" }}>
      <div style={{ padding: 28, borderRight: `1px solid ${colors.line}` }}>
        {["Dashboard", "Ventes", "Stock", "Clients", "Fournisseurs"].map((item, i) => (
          <div
            key={item}
            style={{
              padding: "17px 16px",
              borderRadius: 14,
              marginBottom: 13,
              color: i === 0 ? "white" : colors.muted,
              background: i === 0 ? `${colors.blue}33` : "transparent",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ padding: 30 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {["Ventes", "Marge", "Stock"].map((item, index) => (
            <div key={item} style={{ background: "rgba(255,255,255,.055)", borderRadius: 18, padding: 20 }}>
              <div style={{ color: colors.muted, font: "18px Arial" }}>{item}</div>
              <div style={{ font: "700 26px Arial", marginTop: 16 }}>
                {index === 0 ? "28,450 DH" : index === 1 ? "+18.2%" : "1,284"}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 280, marginTop: 24, borderRadius: 22, padding: 25, background: "rgba(255,255,255,.04)" }}>
          <div style={{ font: "700 19px Arial", color: colors.muted }}>Aperçu des ventes</div>
          <div style={{ height: 190, display: "flex", alignItems: "end", gap: 22, marginTop: 20 }}>
            {[45, 62, 38, 78, 54, 88, 73, 96].map((height, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  borderRadius: "9px 9px 3px 3px",
                  background: `linear-gradient(${colors.blue}, ${colors.purple})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = spring({ frame: frame - 4, fps, config: { damping: 9, stiffness: 115 } });
  const dashboard = spring({ frame: frame - 50, fps, config: { damping: 15, stiffness: 95 } });
  const glow = 0.8 + Math.sin(frame / 8) * 0.2;
  return (
    <SceneShell accent={colors.blue} duration={150}>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          top: 230,
          right: 60,
          left: 60,
          textAlign: "center",
          fontSize: 100,
          lineHeight: 1.3,
          fontWeight: 900,
          transform: `scale(${interpolate(title, [0, 1], [.45, 1])})`,
          opacity: title,
          textShadow: `0 0 ${60 * glow}px ${colors.blue}88`,
        }}
      >
        هادشي علاش صاوبنا
        <div style={{ color: colors.blue }}>هاد السيستيم!</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 120,
          transform: `translateY(${interpolate(dashboard, [0, 1], [780, 0])}px) scale(${interpolate(
            dashboard,
            [0, 1],
            [.88, 1],
          )})`,
          opacity: dashboard,
        }}
      >
        <Dashboard />
      </div>
    </SceneShell>
  );
};

const FeatureHeader: React.FC<{ eyebrow: string; title: string; color: string }> = ({
  eyebrow,
  title,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  return (
    <div dir="rtl" style={{ position: "absolute", top: 135, left: 65, right: 65, textAlign: "right" }}>
      <div
        style={{
          color,
          fontSize: 27,
          fontWeight: 800,
          letterSpacing: 1,
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 28}px)`,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          fontSize: 70,
          lineHeight: 1.35,
          fontWeight: 900,
          marginTop: 15,
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 45}px)`,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const MiniFeatureShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 282, 300], [0, 1, 1, 0], clamp);
  const scale = interpolate(frame, [282, 300], [1, 0.975], clamp);
  return <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>{children}</AbsoluteFill>;
};

const CreditFeature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({ frame: frame - 28, fps, config: { damping: 12, stiffness: 125 } });
  const blocked = spring({ frame: frame - 105, fps, config: { damping: 8, stiffness: 180 } });
  return (
    <MiniFeatureShell>
      <FeatureHeader eyebrow="01 — CRÉDIT CLIENT" title="كتحدد البلافون... والسيستيم كيحميك" color={colors.red} />
      <div
        style={{
          ...glass,
          position: "absolute",
          top: 560,
          left: 80,
          right: 80,
          height: 730,
          borderRadius: 38,
          padding: 48,
          transform: `translateY(${interpolate(card, [0, 1], [180, 0])}px) scale(${interpolate(card, [0, 1], [.92, 1])})`,
          opacity: card,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", direction: "ltr" }}>
          <div>
            <div style={{ font: "700 24px Arial", color: colors.muted }}>Client</div>
            <div style={{ font: "800 38px Arial", marginTop: 10 }}>Garage Atlas</div>
          </div>
          <div style={{ width: 82, height: 82, borderRadius: 26, background: `${colors.blue}33`, display: "grid", placeItems: "center", font: "900 32px Arial", color: colors.blue }}>GA</div>
        </div>
        <div style={{ marginTop: 65, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, direction: "ltr" }}>
          <div style={{ background: "rgba(255,255,255,.05)", padding: 30, borderRadius: 24 }}>
            <div style={{ color: colors.muted, font: "22px Arial" }}>Plafond</div>
            <div style={{ font: "800 36px Arial", marginTop: 16 }}>10,000 DH</div>
          </div>
          <div style={{ background: `${colors.red}14`, padding: 30, borderRadius: 24 }}>
            <div style={{ color: colors.muted, font: "22px Arial" }}>Solde utilisé</div>
            <div style={{ font: "800 36px Arial", marginTop: 16, color: colors.red }}>12,450 DH</div>
          </div>
        </div>
        <div style={{ marginTop: 40, height: 20, borderRadius: 30, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", background: colors.red, transformOrigin: "left", transform: `scaleX(${interpolate(frame, [55, 105], [0, 1], clamp)})` }} />
        </div>
        <div
          dir="rtl"
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 46,
            padding: "28px 30px",
            borderRadius: 24,
            background: colors.red,
            fontSize: 34,
            fontWeight: 900,
            textAlign: "center",
            transform: `scale(${interpolate(blocked, [0, 1], [1.45, 1])}) rotate(${interpolate(blocked, [0, 1], [-4, 0])}deg)`,
            opacity: blocked,
            boxShadow: `0 18px 55px ${colors.red}55`,
          }}
        >
          ⛔ بلوكاج الكريدي — خاص الأداء
        </div>
      </div>
      <div dir="rtl" style={{ position: "absolute", bottom: 190, right: 80, left: 80, color: colors.muted, fontSize: 40, lineHeight: 1.55, textAlign: "center", fontWeight: 700 }}>
        ما تخرج حتى بياسة حتى يخلص.
      </div>
    </MiniFeatureShell>
  );
};

const StockFeature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panel = spring({ frame: frame - 25, fps, config: { damping: 15 } });
  const notification = spring({ frame: frame - 95, fps, config: { damping: 11, stiffness: 135 } });
  const rows = [
    ["Filtre à huile", "48", colors.green],
    ["Plaquettes frein", "21", colors.green],
    ["Amortisseur", "06", colors.amber],
    ["Courroie moteur", "03", colors.red],
  ];
  return (
    <MiniFeatureShell>
      <FeatureHeader eyebrow="02 — STOCK INTELLIGENT" title="الستوك مضبوط... والتنبيه كيسبق النفاذ" color={colors.green} />
      <div
        style={{
          ...glass,
          position: "absolute",
          top: 540,
          left: 68,
          right: 68,
          height: 800,
          borderRadius: 38,
          padding: 42,
          transform: `translateX(${interpolate(panel, [0, 1], [-180, 0])}px)`,
          opacity: panel,
          direction: "ltr",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ font: "800 35px Arial" }}>État du stock</div>
          <div style={{ font: "700 20px Arial", background: `${colors.green}22`, color: colors.green, borderRadius: 40, padding: "12px 20px" }}>LIVE</div>
        </div>
        <div style={{ marginTop: 35 }}>
          {rows.map(([name, quantity, color], index) => {
            const row = spring({ frame: frame - 45 - index * 12, fps, config: { damping: 15 } });
            return (
              <div
                key={name}
                style={{
                  height: 112,
                  borderBottom: `1px solid ${colors.line}`,
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 40px",
                  alignItems: "center",
                  fontFamily: "Arial, sans-serif",
                  opacity: row,
                  transform: `translateX(${(1 - row) * 80}px)`,
                }}
              >
                <span style={{ fontSize: 27, fontWeight: 700 }}>{name}</span>
                <span style={{ fontSize: 29, fontWeight: 900 }}>{quantity}</span>
                <span style={{ width: 18, height: 18, borderRadius: 99, background: color }} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 28,
            display: "flex",
            gap: 22,
            alignItems: "center",
            background: "#153C31",
            border: `2px solid ${colors.green}66`,
            padding: "24px 28px",
            borderRadius: 24,
            transform: `translateY(${interpolate(notification, [0, 1], [150, 0])}px)`,
            opacity: notification,
          }}
        >
          <div style={{ width: 62, height: 62, borderRadius: 18, display: "grid", placeItems: "center", background: colors.green, fontSize: 35 }}>✓</div>
          <div>
            <div style={{ font: "800 28px Arial" }}>Stock optimisé</div>
            <div style={{ font: "21px Arial", color: "#AEEBCF", marginTop: 6 }}>Réapprovisionnement planifié</div>
          </div>
        </div>
      </div>
    </MiniFeatureShell>
  );
};

const PhoneFeature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phone = spring({ frame: frame - 18, fps, config: { damping: 13, stiffness: 110 } });
  const supplier = spring({ frame: frame - 125, fps, config: { damping: 14 } });
  const items = [
    ["Filtre Bosch", "120 DH"],
    ["Batterie Varta", "890 DH"],
    ["Plaquettes Brembo", "440 DH"],
    ["Huile 5W30", "310 DH"],
  ];
  return (
    <MiniFeatureShell>
      <FeatureHeader eyebrow="03 — APP CLIENT & FOURNISSEURS" title="الثمن والصولد... بلا ما يصدعوك" color={colors.blue} />
      <div
        style={{
          position: "absolute",
          top: 520,
          right: 62,
          width: 510,
          height: 980,
          borderRadius: 72,
          border: "14px solid #28374B",
          background: "#F1F5F9",
          padding: 28,
          color: "#111827",
          boxShadow: "0 50px 110px rgba(0,0,0,.5)",
          transform: `translateX(${interpolate(phone, [0, 1], [650, 0])}px) rotate(${interpolate(phone, [0, 1], [8, -2])}deg)`,
          opacity: phone,
          direction: "ltr",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ width: 145, height: 28, borderRadius: 30, background: "#182334", margin: "-9px auto 35px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BrandMark compact />
          <div style={{ fontSize: 29 }}>☰</div>
        </div>
        <div style={{ marginTop: 36, color: "#64748B", fontSize: 20 }}>Bonjour, Garage Atlas</div>
        <div style={{ marginTop: 8, fontSize: 34, fontWeight: 900 }}>Prix professionnels</div>
        <div style={{ marginTop: 28 }}>
          {items.map(([name, price], index) => {
            const item = spring({ frame: frame - 52 - index * 10, fps, config: { damping: 15 } });
            return (
              <div key={name} style={{ display: "grid", gridTemplateColumns: "66px 1fr", gap: 16, background: "white", borderRadius: 23, padding: 18, marginBottom: 16, boxShadow: "0 9px 25px rgba(15,23,42,.08)", transform: `translateY(${(1 - item) * 60}px)`, opacity: item }}>
                <div style={{ width: 62, height: 62, borderRadius: 17, background: `linear-gradient(135deg, ${colors.blue}22, ${colors.purple}33)` }} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{name}</div>
                  <div style={{ color: colors.blue, fontSize: 24, fontWeight: 900, marginTop: 7 }}>{price}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 25, background: "#0F1F35", color: "white", borderRadius: 24, padding: 24 }}>
          <div style={{ fontSize: 19, color: "#A7B6C8" }}>Votre solde</div>
          <div style={{ fontSize: 32, fontWeight: 900, marginTop: 7 }}>2,350 DH</div>
        </div>
      </div>
      <div
        dir="rtl"
        style={{
          ...glass,
          position: "absolute",
          top: 740,
          left: 55,
          width: 470,
          borderRadius: 32,
          padding: 35,
          transform: `translateX(${interpolate(supplier, [0, 1], [-520, 0])}px)`,
          opacity: supplier,
        }}
      >
        <div style={{ fontSize: 27, color: colors.muted, fontWeight: 700 }}>حساب الفورنيسورات</div>
        <div style={{ fontSize: 48, fontWeight: 900, marginTop: 18, color: colors.green }}>ناضي ✓</div>
        <div style={{ height: 2, background: colors.line, margin: "28px 0" }} />
        <div style={{ fontSize: 27, lineHeight: 1.55 }}>التسبيقات والديون كاملين واضحين</div>
      </div>
    </MiniFeatureShell>
  );
};

export const Scene4Features: React.FC = () => (
  <SceneShell accent={colors.purple} duration={900}>
    <Sequence durationInFrames={300} premountFor={20}>
      <CreditFeature />
    </Sequence>
    <Sequence from={300} durationInFrames={300} premountFor={20}>
      <StockFeature />
    </Sequence>
    <Sequence from={600} durationInFrames={300} premountFor={20}>
      <PhoneFeature />
    </Sequence>
  </SceneShell>
);

const LedgerTrash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bin = spring({ frame: frame - 20, fps, config: { damping: 11 } });
  const fall = interpolate(frame, [50, 112], [0, 1], { ...clamp, easing: Easing.in(Easing.back(1.8)) });
  const lid = interpolate(frame, [105, 125, 145], [0, -24, 0], clamp);
  return (
    <div style={{ position: "absolute", top: 220, left: 305, width: 470, height: 560, transform: `scale(${bin})` }}>
      <div
        dir="rtl"
        style={{
          position: "absolute",
          top: interpolate(fall, [0, 1], [-40, 340]),
          left: 105,
          width: 260,
          height: 220,
          padding: 24,
          borderRadius: 18,
          background: "#F4E4BF",
          color: "#5D4630",
          fontSize: 31,
          lineHeight: 1.5,
          fontWeight: 900,
          textAlign: "center",
          transform: `rotate(${interpolate(fall, [0, 1], [-8, 24])}deg) scale(${interpolate(fall, [0, .85, 1], [1, .8, .2])})`,
          opacity: interpolate(fall, [0, .82, 1], [1, 1, 0], clamp),
        }}
      >
        الكارني القديم
        <div style={{ borderTop: "3px solid #8B7257", marginTop: 22, opacity: .6 }} />
        <div style={{ borderTop: "3px solid #8B7257", marginTop: 18, opacity: .6 }} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 55, width: 360, height: 320, borderRadius: "35px 35px 70px 70px", background: "linear-gradient(90deg,#28384C,#425873)", border: "7px solid #63758C", boxShadow: "0 35px 70px rgba(0,0,0,.4)" }}>
        <div style={{ position: "absolute", top: 65, left: 86, width: 188, height: 150, border: "7px solid #8494A7", borderRadius: 28, display: "grid", placeItems: "center", color: colors.muted, fontSize: 76 }}>♲</div>
      </div>
      <div style={{ position: "absolute", bottom: 305, left: 25, width: 420, height: 55, borderRadius: 26, background: "#60738B", transform: `translateY(${lid}px) rotate(${lid * .2}deg)`, transformOrigin: "left center" }} />
    </div>
  );
};

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const first = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 125 } });
  const cta = spring({ frame: frame - 135, fps, config: { damping: 10, stiffness: 120 } });
  const button = spring({ frame: frame - 185, fps, config: { damping: 8, stiffness: 140 } });
  const pulse = 1 + Math.sin(Math.max(0, frame - 210) / 7) * 0.035;
  return (
    <SceneShell accent={colors.blue} duration={300}>
      <div dir="rtl" style={{ position: "absolute", top: 100, left: 60, right: 60, textAlign: "center", fontSize: 84, fontWeight: 900, opacity: first, transform: `translateY(${(1 - first) * -70}px)` }}>
        بركة من <span style={{ color: colors.red }}>الكارني!</span>
      </div>
      <LedgerTrash />
      <div
        dir="rtl"
        style={{
          position: "absolute",
          top: 880,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: cta,
          transform: `scale(${interpolate(cta, [0, 1], [.6, 1])})`,
        }}
      >
        <div style={{ fontSize: 48, color: colors.muted, fontWeight: 700 }}>صيفط لينا ميساج دابا</div>
        <div style={{ fontSize: 104, lineHeight: 1.25, fontWeight: 900, marginTop: 28 }}>
          وجرب السيستيم
          <div style={{ color: colors.blue }}>بعينيك!</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 105,
          right: 105,
          bottom: 180,
          height: 140,
          borderRadius: 34,
          background: `linear-gradient(110deg, ${colors.blue}, ${colors.purple})`,
          boxShadow: `0 25px 80px ${colors.blue}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontSize: 42,
          fontWeight: 900,
          opacity: button,
          transform: `scale(${button * pulse}) translateY(${(1 - button) * 90}px)`,
          direction: "rtl",
        }}
      >
        <span style={{ fontSize: 54 }}>✉</span>
        <span>جرب السيستيم دابا</span>
      </div>
      <div style={{ position: "absolute", bottom: 72, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BrandMark compact />
      </div>
    </SceneShell>
  );
};

// Ensures Arabic typography stays consistent even if the host page has global styles.
export const arabicTextStyle: CSSProperties = {
  fontFamily: arabicFont,
  direction: "rtl",
  lineHeight: 1.45,
};
