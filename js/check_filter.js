function check_filter(filter, videoResponse)
{
	if(filter.type == "search string")
	{
		for(const location of filter.locations)
		{
			if(location == "title")
			{
				if(videoResponse.snippet.title.includes(filter.search))
				{
					return true;
				}
			}
			else if(location == "description")
			{
				if(videoResponse.snippet.description.includes(filter.search))
				{
					return true;
				}
			}
		}
		return false;
	}
	else if(filter.type == "regex")
	{
		for(const location of filter.locations)
		{
			if(location == "title")
			{
				let regex = new RegExp(filter.regex, filter.flags);
				if(regex.test(videoResponse.snippet.title))
				{
					return true;
				}
			}
			else if(location == "description")
			{
				let regex = new RegExp(filter.regex, filter.flags);
				if(regex.test(videoResponse.snippet.description))
				{
					return true;
				}
			}
		}
		return false;
	}
	else if(filter.type == "and")
	{
		for(const subFilter of filter.filters)
		{
			if(!check_filter(subFilter, videoResponse))
			{
				return false;
			}
		}
		return true;
	}
	else if(filter.type == "or")
	{
		for(const subFilter of filter.filters)
		{
			if(check_filter(subFilter, videoResponse))
			{
				return true;
			}
		}
		return false;
	}
	else if(filter.type == "xor")
	{
		let result = true;
		for(const subFilter of filter.filters)
		{
			if(check_filter(subFilter, videoResponse))
			{
				result = !result;
			}
		}
	}
	else if(filter.type == "nor")
	{
		for(const subFilter of filter.filters)
		{
			if(check_filter(subFilter, videoResponse))
			{
				return false;
			}
		}
		return true;
	}
	else if(filter.type == "nand")
	{
		for(const subFilter of filter.filters)
		{
			if(!check_filter(subFilter, videoResponse))
			{
				return true;
			}
		}
		return false;
	}
	else if(filter.type == "not")
	{
		return !check_filter(filter.filter, videoResponse);
	}
	return true;
}