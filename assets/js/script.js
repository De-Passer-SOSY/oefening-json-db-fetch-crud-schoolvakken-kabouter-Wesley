"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const createTaskInput = document.querySelector("#addButton");
    createTaskInput.addEventListener("click", createTask);
}

async function fetchDb() {
    try {
        const response = await fetch("http://localhost:5688/vakken");
        await updateTask();
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

async function deleteTask(id) {
    try {
        let response = await fetch(`http://localhost:5688/vakken/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            fetchDb();
        }
    } catch (err) {
        console.error("Fout bij verwijderen:", err);
    }
}

async function updateTask() {
    const content = await fetchDb();
    const list = document.querySelector("#vakList");
    content.forEach(vak => {
        let li = document.createElement("li");
        li.textContent = vak.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => deleteTask(vak.id));

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}