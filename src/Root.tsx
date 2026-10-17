import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OrdioPromo"
      component={MainVideo}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
  );
};
