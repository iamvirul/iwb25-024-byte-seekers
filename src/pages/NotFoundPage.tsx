import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-red-200 text-red-600 px-10 py-8 rounded-xl shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">404 - Page Not Found</h1>
        <p className="text-sm text-red-500 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-sm text-red-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Go back home
        </Link>
      </div>
    </div>
  );
}
