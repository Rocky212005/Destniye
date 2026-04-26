const axios = require("axios");

const cache = {};

const searchPlaces = async (req, res) => {
  const city = req.query.city?.toLowerCase();

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    // ⚡ Cache
    if (cache[city]) {
      return res.json({ places: cache[city] });
    }

    // 🔍 Step 1: Wikipedia search
    const searchRes = await axios.get(
      "https://en.wikipedia.org/w/api.php",
      {
        params: {
          action: "query",
          list: "search",
          srsearch: `famous tourist places in ${city}`,
          format: "json"
        },
        headers: {
          "User-Agent": "DestniyeApp/1.0 (test@test.com)"
        }
      }
    );

    const results = searchRes.data.query.search.slice(0, 5);

    // ⚡ Step 2: Parallel fetch (Wikipedia + Unsplash)
    const places = await Promise.all(
      results.map(async (item) => {
        try {
          // Wikipedia detail
          const wikiRes = await axios.get(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`,
            {
              headers: {
                "User-Agent": "DestniyeApp/1.0 (test@test.com)"
              }
            }
          );

          // Unsplash image
          const imgRes = await axios.get(
            `https://api.unsplash.com/search/photos`,
            {
              params: {
                query: item.title,
                per_page: 1
              },
              headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
              }
            }
          );

          return {
            name: wikiRes.data.title,
            description: wikiRes.data.extract,
            image:
              imgRes.data.results[0]?.urls?.regular ||
              wikiRes.data.thumbnail?.source ||
              null
          };

        } catch (err) {
          return null;
        }
      })
    );

    const filtered = places.filter(Boolean);

    // 💾 Cache (5 min)
    cache[city] = filtered;
    setTimeout(() => delete cache[city], 5 * 60 * 1000);

    res.json({ places: filtered });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "error fetching places" });
  }
};

module.exports =  searchPlaces ;