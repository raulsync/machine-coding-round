import { useEffect, useState } from 'react';

interface ITrafficLight {
  red: string;
  green: string;
  yellow: string;
}

const light: ITrafficLight = {
  green: 'green',
  red: 'red',
  yellow: 'yellow',
};

const TrafficLight: React.FC = () => {
  const [active, setActive] = useState<string>(light.red);

  //we use useffect to render the trafficlight indefinitely on the basis of active state change
  useEffect(() => {
    switch (active) {
      case light.red:
        setTimeout(() => {
          setActive(light.yellow);
        }, 4000);
        break;
      case light.yellow:
        setTimeout(() => {
          setActive(light.green);
        }, 500);
        break;
      case light.green:
        setTimeout(() => {
          setActive(light.red);
        }, 3000);
        break;
    }
  }, [active]);

  const green = active !== light.green ? { opacity: 0.4 } : {};
  const yellow = active !== light.yellow ? { opacity: 0.4 } : {};
  const red = active !== light.red ? { opacity: 0.4 } : {};

  return (
    <div className="wrapper">
      <div
        className="light green"
        style={green}
      ></div>
      <div
        className="light yellow"
        style={yellow}
      ></div>
      <div
        className="light red"
        style={red}
      ></div>
    </div>
  );
};

export default TrafficLight;
