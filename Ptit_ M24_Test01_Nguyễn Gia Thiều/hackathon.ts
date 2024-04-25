type IFeedback = {
    id: number;
    name: string;
    score: string
}
// add text
const point1Button = document.getElementById("point1") as HTMLButtonElement;
const valueOfPoint1: string = point1Button.innerText;
console.log(valueOfPoint1);

let point1 = document.getElementById("point1") as HTMLTextAreaElement;
let point2 = document.getElementById("point2") as HTMLTextAreaElement;
let point3 = document.getElementById("point3") as HTMLTextAreaElement;
let point4 = document.getElementById("point4") as HTMLTextAreaElement;
let point5 = document.getElementById("point5") as HTMLTextAreaElement;
let point6 = document.getElementById("point6") as HTMLTextAreaElement;
let point7 = document.getElementById("point7") as HTMLTextAreaElement;
let point8 = document.getElementById("point8") as HTMLTextAreaElement;
let point9 = document.getElementById("point9") as HTMLTextAreaElement;
let point10 = document.getElementById("point10") as HTMLTextAreaElement;
console.log(point1);
let point: any
function namePoint(index: number): void {
    const pointButtons = document.querySelectorAll(".point button");
    pointButtons.forEach(button => {
        const buttonIndex = parseInt((button as HTMLButtonElement).id.replace("point", ""));
        if (buttonIndex === index) {
            (button as HTMLButtonElement).style.backgroundColor = "#FF1493";
        } else {
            (button as HTMLButtonElement).style.backgroundColor = "#F5F5F5";
        }
    });

    const pointButton = document.getElementById(`point${index}`) as HTMLButtonElement;
    const valueOfPoint: string = pointButton.innerText;
    point = valueOfPoint
    const scoreInput = document.getElementById('inputData') as HTMLInputElement;

    let users: IFeedback[] = JSON.parse(localStorage.getItem("userData") || "[]");

    const newUser: IFeedback = {
        id: Math.floor(Math.random() * 10000000),
        name: valueOfPoint,
        score: scoreInput.value
    };

    users.push(newUser);
    // localStorage.setItem("userData", JSON.stringify(users));
}
// render

function renderUser() {
    let render:any = document.querySelector(".render");

    let users: IFeedback[] = JSON.parse(localStorage.getItem("userData") || "[]");

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
function deleteUser(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    
    if (!confirmed) {
        return;
    }
   let users: IFeedback[] = JSON.parse(localStorage.getItem("userData") || "[]");

    users = users.filter(user => user.id !== id);

    localStorage.setItem("userData", JSON.stringify(users));

    renderUser();
}
// lấy value
function add() {
    const scoreInput = document.getElementById('inputData') as HTMLInputElement;
    let users: IFeedback[] = JSON.parse(localStorage.getItem("userData") || "[]");

    const newUser: IFeedback = {
        id: Math.floor(Math.random() * 10000000),
        name: point,
        score: scoreInput.value
    };
    users.push(newUser);
    localStorage.setItem("userData", JSON.stringify(users));
}
