function hide_video(videoId)
{
	document.getElementById(videoId).innerHTML = "";

	document.getElementById(`spoiler button ${videoId}`).innerHTML =
		  `<button class="spoiler" onclick="display_video('${videoId}')">`
		+ `show</button>`;
}