const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Content = ({ partsExercises }) => {
  return (
    <>
      {partsExercises.map((item, index) => {
        return (
          <div key={index}>
            <p>{Object.values(item)[0]}</p>
            <p>{Object.values(item)[1]}</p>
          </div>
        );
      })}
    </>
  );
};

const Total = ({ exercises }) => {
  return <>{exercises.reduce((previous, item) => (item += previous))}</>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header courseName={course}></Header>
      <Content
        partsExercises={[
          { part1, exercises1 },
          { part2, exercises2 },
          { part3, exercises3 },
        ]}
      ></Content>
      <Total exercises={[exercises1, exercises2, exercises3]}></Total>
    </div>
  );
};

export default App;
