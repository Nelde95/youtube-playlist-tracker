header = "Youtube playlist tracker"
databaseid = "demo"
playlists = [{
		"id": "UURei8TBpt4r0WPZ7MkiKmVg",
		"filter": {
			"type": "search string",
			"search": "berd",
			"locations": ["title", "description"]
		},
		"policy": "overwrite"
	},
	{
		"id": "PLqs5ohhass_T9JXGd5fHii9bGKaKGel8M",
		"policy": "fetch new"
	},
	{
		"id": "UU2C_jShtL725hvbm1arSV9w",
		"filter": {
			"type": "or",
			"filters": [{
					"type": "regex",
					"regex": "minecraft",
					"flags": "gi",
					"locations": ["title"]
				},
				{
					"type": "regex",
					"regex": "minecraft",
					"flags": "gi",
					"locations": ["description"]
				}
			]
		},
		"policy": "fetch all"
	},
	{
		"id": "UUBR8-60-B28hp2BmDPdntcQ",
		"filter": {
			"type": "not",
			"filter": {
				"type": "search string",
				"search": "rewind",
				"locations": ["title"]
			}
		},
		"policy": "ignore"
	},
	{
		"id": "UU6nSFpj9HTCZ5t-N3Rm3-HA",
		"filter": {
			"type": "xor",
			"filters": [{
					"type": "regex",
					"regex": "how",
					"flags": "gi",
					"locations": ["description"]
				},
				{
					"type": "regex",
					"regex": "why",
					"flags": "gi",
					"locations": ["description"]
				},
				{
					"type": "regex",
					"regex": "where",
					"flags": "gi",
					"locations": ["description"]
				},
				{
					"type": "regex",
					"regex": "what",
					"flags": "gi",
					"locations": ["description"]
				},
				{
					"type": "regex",
					"regex": "when",
					"flags": "gi",
					"locations": ["description"]
				},
				{
					"type": "regex",
					"regex": "who",
					"flags": "gi",
					"locations": ["description"]
				}
			]
		},
		"policy": "fetch new"
	}
]
