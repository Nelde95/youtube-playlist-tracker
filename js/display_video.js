function display_video(videoId)
{
	document.getElementById(videoId).innerHTML =
		  '<iframe width="480" '
		+ 'height="270" '
		+ 'src="https://www.youtube.com/embed/'
		+ videoId
		+ '" title="YouTube video player" '
		+ 'frameborder="0" allow="accelerometer; '
		+ 'autoplay; clipboard-write; encrypted-media; '
		+ 'gyroscope; picture-in-picture" '
		+ 'allowfullscreen></iframe>'
		+ "<table><tr>"
		+ `<td><button onclick="set_video_status('${videoId}', -1)">`
		+ `Watching</button></td>`
		+ `<td><button onclick="set_video_status('${videoId}', 0)">`
		+ `Reset</button></td>`
		+ `<td><button onclick="set_video_status('${videoId}', 1)">`
		+ `Done</button></td>`
		+ `<td><button onclick="set_video_status('${videoId}', 2)">`
		+ `Ignore</button></td>`
		+ "</tr></table>";

	document.getElementById(`spoiler button ${videoId}`).innerHTML =
		  `<button class="spoiler" onclick="hide_video('${videoId}')">`
		+ `hide</button>`;
}