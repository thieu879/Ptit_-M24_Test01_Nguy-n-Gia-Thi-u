"use strict";
// add text
const point1Button = document.getElementById("point1");
const valueOfPoint1 = point1Button.innerText;
console.log(valueOfPoint1);
let point1 = document.getElementById("point1");
let point2 = document.getElementById("point2");
let point3 = document.getElementById("point3");
let point4 = document.getElementById("point4");
let point5 = document.getElementById("point5");
let point6 = document.getElementById("point6");
let point7 = document.getElementById("point7");
let point8 = document.getElementById("point8");
let point9 = document.getElementById("point9");
let point10 = document.getElementById("point10");
console.log(point1);
let point;
function namePoint(index) {
    const pointButtons = document.querySelectorAll(".point button");
    pointButtons.forEach(button => {
        const buttonIndex = parseInt(button.id.replace("point", ""));
        if (buttonIndex === index) {
            button.style.backgroundColor = "#FF1493";
        }
        else {
            button.style.backgroundColor = "#F5F5F5";
        }
    });
    const pointButton = document.getElementById(`point${index}`);
    const valueOfPoint = pointButton.innerText;
    point = valueOfPoint;
    const scoreInput = document.getElementById('inputData');
    let users = JSON.parse(localStorage.getItem("userData") || "[]");
    const newUser = {
        id: Math.floor(Math.random() * 10000000),
        name: valueOfPoint,
        score: scoreInput.value
    };
    users.push(newUser);
    // localStorage.setItem("userData", JSON.stringify(users));
}
// render
function renderUser() {
    let render = document.querySelector(".render");
    let users = JSON.parse(localStorage.getItem("userData") || "[]");
    users.forEach(user => {
        render.innerHTML += `
            <div class="icon">
                    <button>${user.name}</button>
                    <div class="iconMain">
                        <a href=""><i class="fa-regular fa-pen-to-square"></i></a>
                        <a href="" onclick = "deleteUser(${user.id})"><i class="fa-solid fa-xmark"></i></a>
                    </div>
                </div>
                <div class="text">
                    <p>${user.score}</p>
                    <!-- render input -->
                </div>`;
    });
}
document.addEventListener("DOMContentLoaded", renderUser);
// xoá
function deleteUser(id) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) {
        return;
    }
    let users = JSON.parse(localStorage.getItem("userData") || "[]");
    users = users.filter(user => user.id !== id);
    localStorage.setItem("userData", JSON.stringify(users));
    renderUser();
}
// lấy value
function add() {
    const scoreInput = document.getElementById('inputData');
    let users = JSON.parse(localStorage.getItem("userData") || "[]");
    const newUser = {
        id: Math.floor(Math.random() * 10000000),
        name: point,
        score: scoreInput.value
    };
    users.push(newUser);
    localStorage.setItem("userData", JSON.stringify(users));
}
