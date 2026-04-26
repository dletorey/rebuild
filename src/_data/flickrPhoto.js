import EleventyFetch from '@11ty/eleventy-fetch';
import dotenv from "dotenv";
/**
 * Grabs the remote data for studio images and returns back
 * an array of objects
 *
 * @returns {Array} Empty or array of objects
 */
export default async () => {
	try {
		let url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=922134d73cd871a57fd1c481eca7ca3c&photo_id=55229383807&format=json&nojsoncallback=1`
		const items = await EleventyFetch(url, {
			duration: '1d',
			type: 'json',
		});
		return items;
	} catch (err) {
		console.log(err);
		return [];
	}
};
