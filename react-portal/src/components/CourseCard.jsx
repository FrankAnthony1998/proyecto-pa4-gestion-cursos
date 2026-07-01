import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">

      <img
        src={course.image}
        alt={course.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="text-xl font-bold mt-4">
        {course.name}
      </h3>

      <p>{course.teacher}</p>

      <p className="font-semibold mt-2">
        S/. {course.price}
      </p>

      <Link to={`/courses/${course._id}`}>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
          Ver detalle
        </button>
      </Link>

    </div>
  );
};

export default CourseCard;