import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-2 text-gray-500">Page Not Found</p>
      <Link to="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Go Home
      </Link>
    </div>
  );
};

