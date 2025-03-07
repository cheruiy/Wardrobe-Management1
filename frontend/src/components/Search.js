import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // ✅ Track if a search was performed

  useEffect(() => {
    if (!query) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5000/clothing?q=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setResults(res.data);
        setLoading(false);
        setSearched(true); // ✅ Set search state
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-container">
        {/* ✅ Search Title */}
        <h2 className="search-title">Search for: "{query}"</h2>
        
        <div className="results-container">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : results.length === 0 && searched ? (
            <p className="no-results">❌ No items found.</p>
          ) : (
            <div className="search-results">
              {results.map((item) => (
                <div key={item.id} className="search-item">
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  {item.image_url && <img src={item.image_url} alt={item.name} />}
                </div>
              ))}
            </div>
          )}

          {/* ✅ Back Button Always Below Results */}
          {searched && (
            <button onClick={() => navigate(-1)} className="back-button">
              🔙 Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
