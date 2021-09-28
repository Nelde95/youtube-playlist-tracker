function load_videos()
{
	db.transaction(
		function(tx)
		{
			tx.executeSql(
				'SELECT * from video_view;',
				[],
				function(tx, rs)
				{
					let section = Number.MIN_SAFE_INTEGER;

					let resultHTML = "";
					let titleHTML = `<br/><h1 class="title">`
								+ `<img src="conf/favicon.png"`
								+ ` style="vertical-align:middle"/>`;
					titleHTML += " " + header + "</h1>";
					document.title = header;
					titleHTML += "<table><tr>";

					for(video of rs.rows)
					{
						if(video["status_id"] > section)
						{
							section = video["status_id"];
							titleHTML += "<td>";
							titleHTML += "<h2>";
							titleHTML += `<a href="#${video["status"]}">`;
							titleHTML += `${video["status"]}`;
							titleHTML += "</a>";
							titleHTML += "</h2>";
							titleHTML += "</td>";
							resultHTML += "<hr/>";
							resultHTML += `<a id="${video["status"]}">`;
							resultHTML += `<h1 id = ${video["status"]}>${video["status"]}</h1>`;
							resultHTML += "</a>";
							resultHTML += "<hr/>";
						}
						resultHTML += `<h2>${video["title"]}</h2>`;
						resultHTML += `<p>-${video["channel"]} `;
						resultHTML += `${video["timestamp"]}</p>`;
						resultHTML += `<div id="spoiler button ${video["id"]}">`
						if(document.getElementById(`spoiler button ${video["id"]}`) == null)
						{
							resultHTML += `<button class="spoiler" onclick="display_video('${video["id"]}')">`
										+ `show</button>`;
						}
						else if(document.getElementById(`spoiler button ${video["id"]}`)
							.innerHTML == null)
						{
							resultHTML += `<button class="spoiler" onclick="display_video('${video["id"]}')">`
										+ `show</button>`;
						}
						else
						{
							resultHTML += document.getElementById(
								`spoiler button ${video["id"]}`
							).innerHTML;
						}
						resultHTML += "</div>"
						resultHTML += "<table class=\"video\"><tr><td>";
						resultHTML += `<div id="${video["id"]}">`;
						if(document.getElementById(video["id"]) != null)
						{
							if(document.getElementById(video["id"]).innerHTML != null)
							{
								resultHTML += document.getElementById(video["id"]).innerHTML;
							}
						}
						resultHTML += "</div>";
						resultHTML += "</td></tr></table>";
					}

					titleHTML += "</tr></table>";
						resultHTML += "<br/>";

					document.getElementById("videos").innerHTML = resultHTML;
					document.getElementById("title").innerHTML = titleHTML;
				}
			);
		}
	);
}