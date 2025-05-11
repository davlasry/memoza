import { useEffect, useState } from "react";
import DateRangeFilter from "./DateRangeFilter";
import DateRangePresets from "./DateRangePresets";
import type { DateFilter } from "./DateRangeFilter";

interface User {
  login: string;
  avatar_url: string;
  name: string;
}

interface PullRequest {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  number: number;
}

interface PRSearchResponse {
  total_count: number;
  items: PullRequest[];
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [filteredPRs, setFilteredPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Fetch user data
    fetch("http://localhost:4000/api/github/user", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));

    // Fetch pull requests
    fetch("http://localhost:4000/api/github/pull-requests", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pull requests");
        return res.json();
      })
      .then((data: PRSearchResponse) => {
        setPullRequests(data.items);
        setFilteredPRs(data.items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    applyDateFilter();
  }, [dateFilter, pullRequests]);

  const applyDateFilter = () => {
    let filtered = [...pullRequests];

    if (dateFilter.startDate) {
      const startDate = new Date(dateFilter.startDate);
      filtered = filtered.filter((pr) => new Date(pr.created_at) >= startDate);
    }

    if (dateFilter.endDate) {
      const endDate = new Date(dateFilter.endDate);
      // Set to end of the day
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((pr) => new Date(pr.created_at) <= endDate);
    }

    setFilteredPRs(filtered);
  };

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectPreset = (preset: DateFilter) => {
    setDateFilter(preset);
  };

  const clearFilters = () => {
    setDateFilter({
      startDate: "",
      endDate: "",
    });
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="mb-6 flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
            <p className="text-gray-600">@{user.login}</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Your Pull Requests</h2>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <DateRangePresets
          onSelectPreset={handleSelectPreset}
          currentFilter={dateFilter}
        />
        <DateRangeFilter
          dateFilter={dateFilter}
          onFilterChange={handleDateFilterChange}
          onClearFilters={clearFilters}
          totalCount={pullRequests.length}
          filteredCount={filteredPRs.length}
        />
      </div>

      {filteredPRs.length === 0 ? (
        <p className="text-gray-500">
          No pull requests found for the selected criteria.
        </p>
      ) : (
        <div className="grid gap-4">
          {filteredPRs.map((pr) => {
            // Extract repo name from repository_url
            const repoName = pr.repository_url.split("/").slice(-2).join("/");

            return (
              <div
                key={pr.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {pr.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {repoName} #{pr.number}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      pr.state === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {pr.state}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Created: {new Date(pr.created_at).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  Updated: {new Date(pr.updated_at).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
