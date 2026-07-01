const ErrorMessage = ({ message }) => {
  return (
    <h2 className="text-center text-red-600 text-xl mt-10">
      {message}
    </h2>
  );
};

export default ErrorMessage;