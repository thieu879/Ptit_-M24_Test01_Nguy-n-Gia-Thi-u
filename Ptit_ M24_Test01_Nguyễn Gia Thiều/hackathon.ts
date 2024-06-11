type IFeedback = {
    id: number;
    name: string;
    score: string;
};

class Feedback {
    feedbacks: IFeedback[];
    selectedPoint: number | null;

    constructor() {
        this.feedbacks = JSON.parse(localStorage.getItem("userData") || "[]");
        this.selectedPoint = null;
        this.renderFeedback();

        const addButton = document.getElementById('add');
        if (addButton) {
            addButton.addEventListener('click', () => this.addFeedback());
        }

        const renderDiv = document.querySelector('.render');
        if (renderDiv) {
            renderDiv.addEventListener('click', (event) => this.handleRenderClick(event));
        }
    }

    handleRenderClick(event: Event) {
        const target = event.target as HTMLElement;
        const iconMainDiv = target.closest('.iconMain');
        if (!iconMainDiv) return;

        const parentDiv = iconMainDiv.closest('div[data-id]');
        if (!parentDiv) return;

        const id = parseInt(parentDiv.getAttribute('data-id') || '0', 10);

        if (target.matches('.fa-pen-to-square')) {
            this.editFeedback(id);
        } else if (target.matches('.fa-xmark')) {
            this.deleteFeedback(id);
        }
    }

    renderFeedback() {
        const renderDiv = document.querySelector('.render');
        if (renderDiv) {
            renderDiv.innerHTML = '';

            this.feedbacks.forEach(user => {
                const feedbackDiv = document.createElement('div');
                feedbackDiv.setAttribute('data-id', user.id.toString());
                feedbackDiv.innerHTML = `
                    <div class="icon">
                        <button>${user.name}</button>
                        <div class="iconMain">
                            <a href="javascript:void(0)"><i class="fa-regular fa-pen-to-square"></i></a>
                            <a href="javascript:void(0)"><i class="fa-solid fa-xmark"></i></a>
                        </div>
                    </div>
                    <div class="text">
                        <p>${user.score}</p>
                    </div>`;
                renderDiv.appendChild(feedbackDiv);
            });
        }
    }

    selectPoint(index: number | null) {
        this.selectedPoint = index;
        const pointButtons = document.querySelectorAll(".point button");
        pointButtons.forEach(button => {
            const buttonIndex = parseInt(button.id.replace("point", ""), 10);
            (button as HTMLButtonElement).style.backgroundColor = buttonIndex === index ? "#FF1493" : "#F5F5F5";
        });
    }

    addFeedback() {
        const scoreInput = document.getElementById('inputData') as HTMLInputElement;
        if (this.selectedPoint === null || scoreInput.value.trim() === '') {
            return;
        }

        const newUser: IFeedback = {
            id: Math.floor(Math.random() * 10000000),
            name: this.selectedPoint.toString(),
            score: scoreInput.value.trim()
        };

        this.feedbacks.push(newUser);
        this.updateLocalStorage();
        this.renderFeedback();

        scoreInput.value = '';
        this.selectPoint(null);
    }

    editFeedback(id: number) {
        const user = this.feedbacks.find(feedback => feedback.id === id);
        if (user) {
            const scoreInput = document.getElementById('inputData') as HTMLInputElement;
            scoreInput.value = user.score;
            this.selectPoint(parseInt(user.name, 10));

            const addButton = document.getElementById('add');
            if (addButton) {
                addButton.innerText = 'Update';
                addButton.onclick = () => this.updateFeedback(id);
            }
        }
    }

    updateFeedback(id: number) {
        const scoreInput = document.getElementById('inputData') as HTMLInputElement;
        const user = this.feedbacks.find(feedback => feedback.id === id);

        if (user && this.selectedPoint !== null) {
            user.name = this.selectedPoint.toString();
            user.score = scoreInput.value.trim();

            this.updateLocalStorage();
            this.renderFeedback();

            scoreInput.value = '';
            this.selectPoint(null);

            const addButton = document.getElementById('add');
            if (addButton) {
                addButton.innerText = 'Send';
                addButton.onclick = () => this.addFeedback();
            }
        }
    }

    deleteFeedback(id: number) {
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            this.feedbacks = this.feedbacks.filter(user => user.id !== id);
            this.updateLocalStorage();
            this.renderFeedback();
        }
    }

    updateLocalStorage() {
        localStorage.setItem("userData", JSON.stringify(this.feedbacks));
    }
}

const feedback = new Feedback();

function selectPoint(index: number) {
    feedback.selectPoint(index);
}
