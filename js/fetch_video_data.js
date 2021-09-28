function fetch_video_data()
{
	// Loop through all the channels
	for(pl of playlists)
	{
		let playlist = pl;

		// Skip playlist if policy is ignore
		if(playlist.policy == "ignore"){continue;}

		// Remove videos and start fresh if policy is overwrite
		if(playlist.policy == "overwrite")
		{
			// Remove all videos from playlist
			db.transaction(
				function(tx)
				{
					tx.executeSql(
						  'DELETE FROM playlist_video '
						+ 'WHERE playlistid = "' + playlist.id + '";'
					);
				}
			);

			// Delete videos that have no remaining playlists
			db.transaction(
				function(tx)
				{
					tx.executeSql(
						  'DELETE video FROM video '
						+ 'LEFT JOIN playlist_video '
						+ 'ON video.videoid = playlist_video.videoid '
						+ 'WHERE playlist_video.videoid IS NULL;'
					);
				}
			);
		}

		db.transaction(
			function(tx)
			{
				tx.executeSql(
					  "SELECT max(video.timestamp) FROM video JOIN playlist_video "
					+ "ON video.videoid = playlist_video.videoid WHERE playlist_video.playlistid = '"
					+ playlist.id + "';",
					[],
					async function(tx, rs)
					{
						// Fetch timestamp of most recent video that is saved in the database
						let lastTimestamp = rs.rows.item(0)["max(video.timestamp)"];
						console.log(lastTimestamp);

						let done = false;
						// Find uploads for channels who match id
						let baseurl = "https://youtube.googleapis.com/youtube/v3/";
						let playlistResponse = await fetch(
							  baseurl + "playlistItems?"
							+ "part=contentDetails,snippet"
							+ "&playlistId=" + playlist.id
							+ "&key=" + youtube_key,
							{Accept: "application/json"}
						)
						.then(promise => {return promise.json();});

						console.log(playlist);
						console.log(playlistResponse);

						// Keep going until last page
						while('nextPageToken' in playlistResponse)
						{
							let nextPageToken = playlistResponse.nextPageToken;

							// Go through videos in the response
							for(videoResponse of playlistResponse.items)
							{
								// Skip old videos if policy is fetch new
								if(playlist.policy == "fetch new")
								{
									if(lastTimestamp != null)
									{
										if((lastTimestamp.localeCompare(
											videoResponse.contentDetails.videoPublishedAt
												.replace("T", " ").replace("Z", "")
											) > 0))
										{
											done = true;
											break;
										}
									}
								}

								if(playlist.hasOwnProperty("filter"))
								{
									if(check_filter(playlist.filter, videoResponse))
									{
										if(playlist.policy == "overwrite")
										{
											put_video_in_database(videoResponse, true);
										}
										else
										{
											put_video_in_database(videoResponse, false);
										}
									}
								}
								else
								{
									if(playlist.policy == "overwrite")
									{
										put_video_in_database(videoResponse, true);
									}
									else
									{
										put_video_in_database(videoResponse, false);
									}
								}
							}
							if(done){break;}

							playlistResponse = await fetch(
								  baseurl + "playlistItems?"
								+ "part=contentDetails,snippet"
								+ "&pageToken=" + nextPageToken
								+ "&playlistId=" + playlist.id
								+ "&key=" + youtube_key,
								{Accept: "application/json"}
							)
							.then(promise => {return promise.json();});
						}
						if(!done)
						{
							for(videoResponse of playlistResponse.items)
							{
								// Skip old videos if policy is fetch new
								if(playlist.policy == "fetch new")
								{
									if(lastTimestamp != null)
									{
										if((lastTimestamp.localeCompare(
											videoResponse.contentDetails.videoPublishedAt
												.replace("T", " ").replace("Z", "")
											) > 0))
										{
											break;
										}
									}
								}

								if(playlist.hasOwnProperty("filter"))
								{
									if(check_filter(playlist.filter, videoResponse))
									{
										if(playlist.policy == "overwrite")
										{
											put_video_in_database(videoResponse, true);
										}
										else
										{
											put_video_in_database(videoResponse, false);
										}
									}
								}
								else
								{
									if(playlist.policy == "overwrite")
									{
										put_video_in_database(videoResponse, true);
									}
									else
									{
										put_video_in_database(videoResponse, false);
									}
								}
							}
						}
					}
				);
			}
		);
	}
}