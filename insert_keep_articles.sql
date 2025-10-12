-- Insert only the articles we want to keep (real content)
INSERT INTO news (title, story, author, category, image, timestamp) VALUES 
(
    'STRICTLY SOUL BRINGS THE VIBES TO KAMPALA THIS INDEPENDENCE EVE',
    'Get ready for an unforgettable night of soul music as STRICTLY SOUL brings the vibes to Kampala this Independence Eve. This highly anticipated event promises to deliver an evening of smooth melodies, powerful vocals, and soulful performances that will have you dancing all night long.',
    'Admin',
    'Entertainment',
    '',
    NOW()
),
(
    'Namuwongo Blazers to Represent Uganda in The Road to BAL 2026',
    'The Namuwongo Blazers basketball team has secured their spot to represent Uganda in the prestigious Road to BAL 2026 tournament. This is a historic moment for Ugandan basketball as the team prepares to compete against the best teams from across Africa.',
    'ADMIN',
    'Sports',
    '',
    NOW()
),
(
    'ALAK SG Set to Drop Highly Anticipated Album "Golden Boy From Arua" This October!',
    'Ugandan music sensation ALAK SG is gearing up to release his highly anticipated album "Golden Boy From Arua" this October. The album promises to showcase his unique sound and storytelling abilities that have made him one of the most exciting artists in the country.',
    'egm eg',
    'Entertainment',
    '',
    NOW()
);

-- Verify the inserted articles
SELECT id, title, author, category, timestamp FROM news ORDER BY id;
