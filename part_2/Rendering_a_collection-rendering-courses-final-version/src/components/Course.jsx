const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
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
      {parts.map((item) => {
        return (
          <Part
            key={item.id}
            partName={item.name}
            exerciseNumber={item.exercises}
          ></Part>
        );
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <strong>
      {`total of ${parts.reduce(
        (previous, item) => previous + item.exercises,
        0
      )}`}
    </strong>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header courseName={course.name}></Header>
          <Content parts={course.parts}></Content>
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};
export default Course;
