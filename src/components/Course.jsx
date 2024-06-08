
const Course = ({ course }) => {

    const totalExe = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map((part) => (
                    <li key={part.id}>
                        {part.name}: {part.exercises}
                    </li>
                ))}
            </ul>
            <p><strong>Total of {totalExe} exercises</strong></p>
        </div>
    )
}

export default Course