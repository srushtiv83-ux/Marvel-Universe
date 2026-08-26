import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const movies = [
  {
    _id: 'iron-man',
    title: 'Iron Man',
    year: 2008,
    phase: 'Phase One',
    rating: 7.9,
    runtime: 126,
    synopsis: 'After being captured by terrorists, billionaire weapons manufacturer Tony Stark builds an armored suit and begins a new life as Iron Man.',
    story: {
      overview: 'Tony Stark is a brilliant industrialist whose worldview changes after a life-threatening kidnapping.',
      beginning: 'Tony demonstrates his weapons technology in Afghanistan before a convoy attack leaves him seriously injured and captured.',
      mainConflict: 'Tony discovers that weapons from his own company are being used against innocent people and decides to stop the cycle.',
      majorEvents: 'With help from Yinsen and later Pepper Potts and James Rhodes, Tony develops increasingly advanced armor while confronting the corruption inside his company.',
      turningPoint: 'Tony publicly rejects the weapons business and focuses on becoming Iron Man, while Obadiah Stane secretly works toward his own armored weapon.',
      climax: 'Tony confronts Stane in a battle involving the Iron Monger armor and ultimately defeats him.',
      ending: 'Tony accepts responsibility for his actions and tells the world that he is Iron Man.',
      postCreditScene: 'Nick Fury approaches Tony and hints at a larger world of extraordinary heroes.',
      mcuConnection: 'The ending establishes the Avengers initiative and begins the interconnected Marvel Cinematic Universe.'
    }
  },
  {
    _id: 'captain-america-first-avenger',
    title: 'Captain America: The First Avenger',
    year: 2011,
    phase: 'Phase One',
    rating: 6.9,
    runtime: 124,
    synopsis: 'Steve Rogers becomes a super soldier during World War II and battles Hydra leader Johann Schmidt.',
    story: {
      overview: 'A determined but physically weak Steve Rogers becomes a symbol of courage during World War II.',
      beginning: 'Steve repeatedly attempts to enlist before being selected for the experimental Super Soldier program.',
      mainConflict: 'Steve must fight Hydra and its leader Johann Schmidt, who possesses a powerful cosmic artifact.',
      majorEvents: 'Steve becomes Captain America, leads missions against Hydra and grows close to Peggy Carter while Hydra develops increasingly dangerous technology.',
      turningPoint: 'Steve realizes that Schmidt plans to use the Tesseract to dominate the world.',
      climax: 'Steve boards Schmidt’s aircraft and stops the weapon, but the aircraft crashes into the Arctic.',
      ending: 'Steve awakens decades later and discovers that the world he knew is gone.',
      postCreditScene: 'The film transitions into the modern era and sets up Steve’s future in the Avengers.',
      mcuConnection: 'The Tesseract, Hydra and Steve Rogers become major threads in later MCU stories.'
    }
  },
  {
    _id: 'the-avengers',
    title: 'The Avengers',
    year: 2012,
    phase: 'Phase One',
    rating: 8.0,
    runtime: 143,
    synopsis: 'Earths mightiest heroes unite when Loki leads an alien invasion of New York.',
    story: {
      overview: 'Nick Fury brings together several extraordinary individuals to stop a threat too large for any one hero.',
      beginning: 'Loki arrives on Earth, steals the Tesseract and takes control of several S.H.I.E.L.D. personnel.',
      mainConflict: 'The Avengers struggle to work together while Loki prepares to open a portal for the Chitauri.',
      majorEvents: 'Iron Man, Captain America, Thor, Hulk, Black Widow and Hawkeye clash before gradually becoming a team.',
      turningPoint: 'The heroes unite after the destruction of the S.H.I.E.L.D. Helicarrier and the death of a key ally.',
      climax: 'The team fights the Chitauri invasion in New York while trying to close the portal.',
      ending: 'The invasion is stopped and the Avengers leave as a newly established superhero team.',
      postCreditScene: 'A mysterious figure is revealed to be behind the invasion, teasing an even greater threat.',
      mcuConnection: 'The Avengers become the central team of the MCU and the Battle of New York affects many future stories.'
    }
  }
];

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/movies', (req, res) => res.json(movies));

app.get('/api/movies/timeline', (req, res) =>
  res.json([...movies].sort((a, b) => a.year - b.year))
);

app.get('/api/movies/search', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  res.json(movies.filter(m => m.title.toLowerCase().includes(q)));
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m._id === req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
});

const port = process.env.PORT || 5000;

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
    } catch (err) {
      console.log('MongoDB unavailable; running with seed data');
    }
  }
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}

start();
