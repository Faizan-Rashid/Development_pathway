import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, totalFeedBack }) => {
  const average = (good * 1 + neutral * 0 + bad * -1) / totalFeedBack || 0;
  const positiveFeedback = (good / totalFeedBack) * 100 || 0;

  return (
    <>
      {totalFeedBack ? (
        <table>
          <thead>
            <tr>
              <td>
                <strong>data</strong>
              </td>
              <td>
                <strong>value</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"total"} value={totalFeedBack} />
            <StatisticLine text={"average"} value={average} />
            <StatisticLine
              text={"positive feedback"}
              value={positiveFeedback}
            />
          </tbody>
        </table>
      ) : (
        "No Feedback Given"
      )}
    </>
  );
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = left + 1;
    setRight(updatedRight);
    setTotal(updatedRight + right);
  };

  // FEEDBACK EXERCISE STARTS HERE
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setbad] = useState(0);
  const [totalFeedBack, setTotalFeedBack] = useState(0);

  // ANECDOTES EXERCISE
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({});

  const ans = Object.entries(vote).find((entry) => {
    return vote[entry[0]] === Math.max(...Object.values(vote));
  });


  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />

      {/* FEEDBACK EXERCISE STARTS HERE */}

      <h1>Give feedback</h1>
      <Button
        onClick={() => {
          setGood(good + 1);
          setTotalFeedBack(totalFeedBack + 1);
        }}
        text={"good"}
      ></Button>
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
          setTotalFeedBack(totalFeedBack + 1);
        }}
        text={"neutral"}
      ></Button>
      <Button
        onClick={() => {
          setbad(bad + 1);
          setTotalFeedBack(totalFeedBack + 1);
        }}
        text={"bad"}
      ></Button>

      <h2>Statistics</h2>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedBack={totalFeedBack}
      ></Statistics>

      {/* ANECDOTES EXERCISE */}
      <h1>toggle</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button
        text={"next anecdote"}
        onClick={() => {
          const newSelected = Math.floor(Math.random() * anecdotes.length);
          setSelected(newSelected);
        }}
      />
      <Button
        text={"vote"}
        onClick={() => {
          let newVote = {};

          if (vote[selected] >= 0)
            newVote = {
              ...vote,
              [selected]: vote[selected] + 1,
            };
          else
            newVote = {
              ...vote,
              [selected]: 1,
            };

          setVote(newVote);
        }}
      />

      {/* Shoe Anecdotes with most votes */}
      <h2>Anecdotes with highest votes</h2>
      <div>{ans && anecdotes[parseInt(ans[0])] + ` with ${ans[1]} votes`}</div>
    </div>
  );
};

export default App;
