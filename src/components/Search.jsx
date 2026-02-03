import { useState, useEffect } from "react";
import fetchUserData from "../services/githubService";

const Search = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const [minRepos, setMinRepos] = useState("");
  const [location, setLocation] = useState("");

  async function fetchUser() {
    try {
      const data = await fetchUserData(search, location, minRepos);
      setUser(data);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (user) {
      setError(null);
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search.trim() && !minRepos.trim() && !location.trim()) return;
    fetchUser();
    setSearch("");
    setMinRepos("");
    setLocation("");
  };

  return (
    <div className="text-center pt-6 px-10">
      <h1 className="font-bold mb-2 text-4xl">GitHub User Search</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4"
      >
        <input
          type="text"
          placeholder="Search username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Minimum repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 flex-1"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>

      {!user ? (
        <p className="my-6 text-lg font-semibold">Loading...</p>
      ) : user.length === 0 ? (
        <p className="my-6 text-lg font-semibold">
          Looks like we can't find the user. That is what we know for now.
        </p>
      ) : error ? (
        <p className="my-6 text-lg font-semibold">
          Looks like we can't find the user.
        </p>
      ) : user ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          {user.map((user) => (
            <div
              key={user.id}
              className="border-2 rounded-lg shadow bg-gray-200 hover:bg-gray-300"
            >
              <h2 className="">
                Name:<span className="font-medium"> {user.login}</span>
              </h2>
              <p>Location: {user.location}</p>
              <p>Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                className="inline-block py-1 text-blue-600 hover:text-blue-700 hover:font-medium"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
