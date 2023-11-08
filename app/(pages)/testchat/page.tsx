"use client"

import { io } from "socket.io-client";
import { useState, useEffect, SyntheticEvent } from "react";
import { FullContainer } from "@/app/components/_full_container";

export default function TestChat() {
	const [currentMessage, setCurrentMessage] = useState('' as string);
	const [messages, setMessages] = useState([] as string[]);
	
	// move to .env
    const socket = io('http://192.168.100.5:4000' as string, {
        // autoConnect: false
    });

	useEffect(() => {
		const onConnect = () => {
			console.log('connected to the socket');
		}

		const onDisconnect = () => {
			console.log('disconnected to the socket');
		}

		const onAddMessageEvent = (currentMessage: string) => {
			setMessages([
				...messages,
				currentMessage
			]);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		// catch from server
		socket.on('addMessage', onAddMessageEvent);

		return () => {}
	}, [socket]);

	const handleCurrentMessage = (message: string) => {
		setCurrentMessage(message);
	}

	const handleSendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		// send an event to server
		socket.emit('addMessage', {'username': 'lean', 'message': currentMessage});
	}

	return (
	<>
		<FullContainer className="bg-neutral-200">
			<div className="parentSize p-16">
				<input type="text" className="w-40" placeholder="Enter Message" onChange={(e) => handleCurrentMessage(e.currentTarget.value)}/>
				<button className="mt-4 border bg-sky-300 hover:bg-sky-200 rounded text-white" onClick={(e) => handleSendMessage(e)}>Send Message</button>
				<div className="mt-8 p-4 border border-neutral-950">
				{
					messages.map((message, index: number) => {
						return <div key={index}>{message}</div>;
					})
				}
				</div>
			</div>
		</FullContainer>
	</>
	)
}
