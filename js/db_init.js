// Creates or opens a database in the browsers websql storage
db = openDatabase("youtube_" + databaseid, "1.0", "YouTube " + header, 1000000);

// Creates a table to hold youtube videos
db.transaction(
	function(tx)
	{
		tx.executeSql(
			  'CREATE TABLE IF NOT EXISTS video'
			+ '('
			+ 'title TEXT NOT NULL,'
			+ 'channel TEXT NOT NULL,'
			+ 'timestamp TEXT NOT NULL,'
			+ 'videoid TEXT NOT NULL,'
			+ 'watched INTEGER NOT NULL DEFAULT 0,'
			+ 'PRIMARY KEY(videoid)'
			+ ');'
		);
	}
);

// Creates a table to store video ids for each playlist
db.transaction(
	function(tx)
	{
		tx.executeSql(
			  'CREATE TABLE IF NOT EXISTS playlist_video'
			+ '('
			+ 'playlistid TEXT NOT NULL,'
			+ 'videoid TEXT NOT NULL,'
			+ 'PRIMARY KEY(playlistid, videoid),'
			+ 'FOREIGN KEY(videoid) REFERENCES video(videoid)'
			+ ');'
		);
	}
);

// Create lookup table for watched status text and id
db.transaction(
	function(tx)
	{
		tx.executeSql(
			  'CREATE TABLE IF NOT EXISTS watched'
			+ '('
			+ 'id TEXT NOT NULL,'
			+ 'text INTEGER NOT NULL DEFAULT 0,'
			+ 'PRIMARY KEY(id)'
			+ ');'
		);
	}
);
db.transaction(
	function(tx)
	{
		tx.executeSql(
			  'INSERT OR IGNORE INTO watched '
			+ 'VALUES '
			+ '(-1, "Watching"),'
			+ '(0, "New"),'
			+ '(1, "Watched"),'
			+ '(2, "Ignore");'
		);
	}
);

/*db.transaction(
	function(tx)
	{
		tx.executeSql(
			  'DROP VIEW video_view'
		);
	}
);*/
db.transaction(
	function(tx)
	{
		tx.executeSql(
			  'CREATE VIEW IF NOT EXISTS video_view AS '
			+ 'SELECT v.watched AS status_id, v.timestamp AS timestamp,'
			+ '"www.youtube.com/watch?v=" || v.videoid AS url, v.videoid AS id,'
			+ 'v.channel AS channel, v.title AS title, w.text AS status '
			+ 'FROM video AS v '
			+ 'JOIN watched AS w ON v.watched=w.id '
			+ 'ORDER BY status_id ASC, timestamp ASC;'
		);
	}
);
