"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const createTaskInput = document.querySelector("#addButton");
    createTaskInput.addEventListener("click", createTask);
}

async function fetchDb() {
    try {
        const response = await fetch("http://localhost:5688/vakken");
        return await response.json();
    } catch (err) {
        console.error(`Er is een fout opgetreden: ${err}`);
    }
}

async function createTask() {
    const input = document.querySelector("#vakInput");
    const content = input.value.trim();

    try {
        const response = await fetch("http://localhost:5688/vakken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: content}),
        });
        if (response.ok) {
            input.value = "";
            fetchDb();
        }
    } catch (err) {
        console.error(`Er is een fout opgetreden: ${err}`);
    }
}