/***********
KEY QUESTIONS:
	How are positions trending in terms of scoring
    How is my favorite team performing?    
    How did my favorite player perform over the years
    Can we compare players?
    How is the fantasy leage in general performing?
    Who are the top scorers
    Develop a standing board of top players over the years
**********/
/* avg points by season and position */
-- avg_points_by_season_position
SELECT
	SEASON AS season,
    POS AS position,
	AVG(`FPTS/G`) AS avg_fpts_per_game
FROM 
	fantasy_stats
GROUP BY
	season,
    position;
    
/* avg points by season, position, and team */
-- avg_points_by_season_position_team
SELECT
	SEASON AS season,
    TEAM AS team,
    POS AS position,
	AVG(`FPTS/G`) AS avg_fpts_per_game
FROM 
	fantasy_stats
GROUP BY
	season,
    team,
    position;

/* avg points by team */
-- avg_points_by_season_team
SELECT
	SEASON AS season,
    TEAM AS team,
	AVG(`FPTS/G`) AS avg_fpts_per_game
FROM 
	fantasy_stats
GROUP BY
	season,
    team;


SELECT
	*
FROM
	fantasy_stats;