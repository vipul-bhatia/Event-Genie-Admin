import React, { useEffect } from "react";
import firebase from "firebase/app";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid, email, eventToUpdate }) {
	const [eventName, setEventName] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [eventPlace, setEventPlace] = useState("");
	const [eventImage, setEventImage] = useState("");
	const [eventRegistrationLink, setEventRegistrationLink] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [imageError, setImageError] = useState(null);
	const currentDate = new Date().toISOString().slice(0, 10);
	const { addDocument, response, updateDocument } = useFirestore("events");

	useEffect(() => {
		if (eventToUpdate) {
			setEventName(eventToUpdate.eventName);
			const dateObject = new Date(eventToUpdate.eventDate.seconds * 1000);
			const formattedDate = dateObject.toISOString().split("T")[0];
			setEventDate(formattedDate);
			setEventTime(eventToUpdate.eventTime);
			setEventPlace(eventToUpdate.eventPlace);
			setEventRegistrationLink(eventToUpdate.eventRegistrationLink);
			setEventDescription(eventToUpdate.eventDescription);
		}
	}, [eventToUpdate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const eventDateTimeString = `${eventDate}T${eventTime}:00`;
		const eventDateTime = new Date(eventDateTimeString);
		const firestoreTimestamp =
			firebase.firestore.Timestamp.fromDate(eventDateTime);

		if (eventToUpdate) {
			updateDocument(
				eventToUpdate.id,
				{
					uid,
					email,
					eventName,
					eventDate: firestoreTimestamp,
					eventTime,
					eventPlace,
					eventRegistrationLink,
					eventDescription,
				},
				eventImage
			);
		} else if (eventImage) {
			addDocument(
				{
					uid,
					email,
					eventName,
					eventDate: firestoreTimestamp,
					eventTime,
					eventPlace,
					eventRegistrationLink,
					eventDescription,
				},
				eventImage
			);
			setImageError(null);
		} else {
			// handle case where image is not provided
			setImageError("Please select an image for the event.");
		}
	};

	// reset the form fields
	useEffect(() => {
		if (response.success) {
			setEventName("");
			setEventDate("");
			setEventTime("");
			setEventPlace("");
			setEventImage("");
			setEventRegistrationLink("");
			setEventDescription("");
		}
	}, [response.success]);
	const handleFileChange = (e) => {
		setEventImage(e.target.files[0]);
	};

	return (
		<>
			<h3>Add a Event</h3>
			{eventToUpdate && <h4>** Make sure to update something in your form otherwise the form will be stuck and you have to reload the website.</h4>}
			{eventToUpdate && <h4>** Also you have 2 choices either to add a new image or don't add any image and submit to continue with previous image</h4>}
			<form onSubmit={handleSubmit}>
				<label>
					<span>Event Name: </span>
					<input
						type="text"
						required
						value={eventName}
						onChange={(e) => setEventName(e.target.value)}
					/>
				</label>
				<label>
					<span>Event Date: </span>
					<input
						type="date"
						required
						value={eventDate}
						min={currentDate}
						onChange={(e) => setEventDate(e.target.value)}
					/>
				</label>
				<label>
					<span>Event Time: </span>
					<input
						type="time"
						required
						value={eventTime}
						onChange={(e) => setEventTime(e.target.value)}
					/>
				</label>
				<label>
					<span>Event Place: </span>
					<input
						type="text"
						required
						value={eventPlace}
						onChange={(e) => setEventPlace(e.target.value)}
					/>
				</label>
				<label>
					<span>Event Image: </span>
					<input
						type="file"
						required={!eventToUpdate}
						onChange={handleFileChange}
					/>
				</label>
				<label>
					<span>Event Registration Link: </span>
					<input
						type="url"
						required
						value={eventRegistrationLink}
						onChange={(e) => setEventRegistrationLink(e.target.value)}
					/>
				</label>
				<label>
					<span>Event Description: </span>
					<input
						type="text"
						required
						value={eventDescription}
						onChange={(e) => setEventDescription(e.target.value)}
					/>
				</label>

				{imageError && <p>{imageError}</p>}
				<button disabled={response.isPending}>
					{eventToUpdate
						? response.isPending
							? "Updating Event..."
							: "Update Event"
						: response.isPending
						? "Adding Event..."
						: "Add Event"}
				</button>
					
			</form>
		</>
	);
}
