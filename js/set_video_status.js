function set_video_status(videoId, video_status)
{
	db.transaction(
		function(tx)
		{
			tx.executeSql(
				  'UPDATE video '
				+ `SET watched = ${video_status} `
				+ `WHERE videoid = "${videoId}";`
			);
			load_videos();
		}
	);
}