function put_video_in_database(videoResponse, overwrite)
{
    let videoTitle = videoResponse.snippet.title;
	let channelTitle = videoResponse.snippet.channelTitle;
	let videoPublishedAt = videoResponse.contentDetails.videoPublishedAt;
	let videoId = videoResponse.snippet.resourceId.videoId;
	let playlistId = videoResponse.snippet.playlistId;
	/*console.log(
		videoTitle
		+ "@" + videoId
		+ " in " + playlistId
		+ "\n\t-" + channelTitle
		+ " " + videoPublishedAt
	);*/

	// Ignore or replace conflicts depending on policy
	if(overwrite)
	{
		db.transaction(
			function(tx)
			{
				tx.executeSql(
					  "INSERT OR REPLACE INTO video"
					+ "(title, channel, timestamp, videoid)"
					+ "VALUES(?,?,?,?);",
					[
						videoTitle,
						channelTitle,
						videoPublishedAt.replace("T", " ").replace("Z", ""),
						videoId
					]
				);
			}
		);
	}
	else
	{
		db.transaction(
			function(tx)
			{
				tx.executeSql(
					  "INSERT OR IGNORE INTO video"
					+ "(title, channel, timestamp, videoid)"
					+ "VALUES(?,?,?,?);",
					[
						videoTitle,
						channelTitle,
						videoPublishedAt.replace("T", " ").replace("Z", ""),
						videoId
					]
				);
			}
		);
	}

	// Ad video to playlist
	db.transaction(
	function(tx)
		{
			tx.executeSql(
				  "INSERT OR IGNORE INTO playlist_video"
				+ "(playlistid, videoid)"
				+ "VALUES(?,?);",
				[
					playlistId,
					videoId
				]
			);
		}
	);
}