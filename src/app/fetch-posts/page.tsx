'use client';
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setPosts(data.data);
          setLoading(false);
        } else {
          setLoading(false);
          setError("An unexpected error occurred");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError("Failed to fetch data");
      });
  }, []);

  return (
    <main className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 min-h-screen">
      <div className="w-full max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          Posts
        </h1>
        {loading && (
          <div className="text-center text-lg text-gray-600">Loading...</div>
        )}
        {error && (
          <div className="text-center text-lg text-red-600">{error}</div>
        )}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center text-lg text-gray-600">
            No posts available.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: { id: number; title: string; body: string }) => (
            <div
              key={post.id}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{post.body}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="text-blue-500 font-medium hover:text-blue-700 transition">
                  Like
                </button>
                <button className="text-blue-500 font-medium hover:text-blue-700 transition">
                  Comment
                </button>
                <button className="text-blue-500 font-medium hover:text-blue-700 transition">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

    