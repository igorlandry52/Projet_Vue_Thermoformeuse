import axios from "axios"

const url = "http://localhost:8000/events";

class EventService {
	static getPosts(){
		return new Promise(async (resolve, rject) => {
			try {
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map(post => ({
						...post
					}))
				);
			} catch(err) {
				reject(err);
			}
		})
	}

	static insertPost(text) {
		return axios.post(url, {
			text
		})
	}
  /*async getEvents() {
    let res = await axios.get("http://localhost:8000/events");
    return res.data;
  },
  async getEventSingle(eventId) {
    let res = await axios.get("http://localhost:8000/events/" + eventId);
    return res.data;
  }*/
}

export default EventService;