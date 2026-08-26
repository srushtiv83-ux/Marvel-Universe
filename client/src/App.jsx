import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function Navbar() {
  return (
    <nav className="nav">
      <Link className="brand" to="/">MARVEL<span>VERSE</span></Link>
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  );
}

function MovieCard({ movie }) {
  return (
    <Link className="card" to={`/movies/${movie._id}`}>
      <div className="poster">
        <div className="posterFallback">{movie.title}</div>
        <span className="rating">★ {movie.rating}</span>
      </div>
      <div className="cardInfo">
        <h3>{movie.title}</h3>
        <p>{movie.year} · {movie.phase}</p>
      </div>
    </Link>
  );
}

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API}/movies`).then(r => setMovies(r.data)).catch(err => console.error(err));
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">THE MARVEL UNIVERSE LIBRARY</p>
          <h1>Explore the<br /><span>Universe.</span></h1>
          <p className="heroText">Discover movies, characters, timelines and stories in one cinematic library.</p>
          <Link className="button" to="/movies">Explore Movies</Link>
        </div>
      </section>
      <section className="section">
        <div className="sectionHead">
          <h2>Featured Movies</h2>
          <Link to="/movies">View all →</Link>
        </div>
        <div className="grid">
          {movies.slice(0, 6).map(m => (
            <MovieCard key={m._id} movie={m} />
          ))}
        </div>
      </section>
    </>
  );
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    axios.get(`${API}/movies`).then(r => setMovies(r.data)).catch(err => console.error(err));
  }, []);

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section className="section page">
      <div className="sectionHead">
        <h1>Movie Library</h1>
      </div>
      <input
        className="search"
        placeholder="Search movies..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <div className="grid">
        {filtered.map(m => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </div>
    </section>
  );
}

function MovieDetails({ id }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${API}/movies/${id}`).then(r => setMovie(r.data)).catch(err => console.error(err));
    }
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <article className="details page">
      <Link to="/movies" className="back">← Back to library</Link>
      <div className="detailsTop">
        <div className="largePoster">
          <div className="posterFallback">{movie.title}</div>
        </div>
        <div>
          <p className="eyebrow">{movie.phase}</p>
          <h1>{movie.title}</h1>
          <p className="meta">{movie.year} · {movie.runtime} min · ★ {movie.rating}</p>
          <p className="synopsis">{movie.synopsis}</p>
        </div>
      </div>
      <div className="story">
        <div className="spoiler">■ Contains spoilers</div>
        <h2>Full Story</h2>
        {Object.entries(movie.story || {}).map(([key, value]) => (
          <section key={key}>
            <h3>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</h3>
            <p>{value}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

function Timeline() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API}/movies/timeline`).then(r => setMovies(r.data)).catch(err => console.error(err));
  }, []);

  return (
    <section className="section page">
      <h1>MCU Timeline</h1>
      <div className="timeline">
        {movies.map((m, i) => (
          <Link className="timelineItem" to={`/movies/${m._id}`} key={m._id}>
            <span>{i + 1}</span>
            <div>
              <strong>{m.title}</strong>
              <small>{m.year} · {m.phase}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Watchlist() {
  return (
    <section className="section page">
      <h1>Watchlist</h1>
      <p className="muted">Authentication and persistent watchlists are ready for the next development stage.</p>
    </section>
  );
}

function MovieRoute() {
  const params = useParams();
  const id = params.id || window.location.pathname.split('/').pop();
  return <MovieDetails id={id} />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieRoute />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <footer>Fan-made educational/discovery project. Not affiliated with Marvel Studios, Marvel Entertainment or Disney.</footer>
    </>
  );
}

export default App;
