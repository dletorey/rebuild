import { defaults } from "@chrisburnell/eleventy-cache-webmentions"

// Load .env variables with dotenv
import dotenv from "dotenv"
dotenv.config()

export default Object.assign({}, defaults, {
	domain: "https://letorey.co.uk",
	feed: `https://webmention.io/api/mentions.jf2?domain=letorey.co.uk&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=9001`,
	key: "children",
})