const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ partName, exerciseNumber }) => {
  return (
    <p>
      {partName} {exerciseNumber}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item, index) => {
        return (
          <Part
            key={index}
            partName={item.part}
            exerciseNumber={item.exercises}
          ></Part>
        );
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  return <>{parts.reduce((previous, item) => previous + item.exercises, 0)}</>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header courseName={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default App;
