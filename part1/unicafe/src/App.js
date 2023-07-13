import { useState } from "react";

const goodUnit = "g";
const neutralUnit = "n";
const badUnit = "b";

const Title = (props) => {
  return <h1>{props.text}</h1>;
};

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const [good, neutral, bad, all] = props.allStates;
  const getPositive = () => {
    if (all.length === 0) return 0;

    return (good * 100) / all.length;
  };

  const getAverage = () => {
    if (all.length === 0) return 0;

    let totalSum = 0;
    all.forEach((el) => {
      switch (el) {
        case goodUnit:
          totalSum++;
          break;
        case neutralUnit:
          break;
        case badUnit:
          totalSum--;
          break;
        default:
          break;
      }
    });
    return totalSum / all.length;
  };
  if (all.length === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="good" value={good}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral" value={neutral}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad" value={bad}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="all" value={all.length}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine
                text="positive"
                value={getPositive() + "%"}
              ></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine
                text="average"
                value={getAverage() + "%"}
              ></StatisticLine>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState([]);

  const handleSetGood = () => {
    setAll(all.concat(goodUnit));
    setGood(good + 1);
  };

  const handleSetNeutral = () => {
    setAll(all.concat(neutralUnit));
    setNeutral(neutral + 1);
  };

  const handleSetBad = () => {
    setAll(all.concat(badUnit));
    setBad(bad + 1);
  };

  return (
    <div>
      <Title text="give feedback"></Title>
      <Button handleClick={() => handleSetGood()} text="Good"></Button>
      <Button handleClick={() => handleSetNeutral()} text="Neutral"></Button>
      <Button handleClick={() => handleSetBad()} text="Bad"></Button>
      <Title text="statistics"></Title>
      <Statistics allStates={[good, neutral, bad, all]}></Statistics>
    </div>
  );
};

export default App;
