-- Delete test/placeholder news articles from PostgreSQL database
-- This script will delete the specific articles identified as test data

-- Delete articles by title and author (test data)
DELETE FROM news WHERE title = 'kdglf' AND author = 'egm eg';

-- Delete other test articles
DELETE FROM news WHERE title = 'Weather Alert: Storm Approaching' AND author = 'Mike Weatherman';

DELETE FROM news WHERE title = 'Community Center Renovation Complete' AND author = 'Jane Writer';

DELETE FROM news WHERE title = 'Breaking: Local Music Festival Announced' AND author = 'John Reporter';

-- Verify remaining articles (should only show real content)
SELECT id, title, author, category, created_at FROM news ORDER BY id;
