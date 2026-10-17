import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  Scene1Hook,
  Scene2Chaos,
  Scene3Solution,
  Scene4Features,
  Scene5CTA,
} from "./scenes";
import { colors, fullScreen } from "./theme";

const SceneBackground: React.FC = () => (
  <AbsoluteFill
    style={{
      ...fullScreen,
      background: `
        radial-gradient(circle at 78% 12%, rgba(79,124,255,.18), transparent 34%),
        radial-gradient(circle at 12% 82%, rgba(139,92,246,.13), transparent 38%),
        ${colors.bg}
      `,
    }}
  />
);

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={fullScreen}>
      <SceneBackground />
      <Audio src={staticFile("voiceover.mp3")} />

      <Sequence durationInFrames={150} premountFor={30}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={150} durationInFrames={300} premountFor={30}>
        <Scene2Chaos />
      </Sequence>
      <Sequence from={450} durationInFrames={150} premountFor={30}>
        <Scene3Solution />
      </Sequence>
      <Sequence from={600} durationInFrames={900} premountFor={30}>
        <Scene4Features />
      </Sequence>
      <Sequence from={1500} durationInFrames={300} premountFor={30}>
        <Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
