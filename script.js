function payWithGCash() {
    const number = "09565527008";
    window.location.href = "gcash://send?recipient=" + number;

    setTimeout(() => {
        window.location.href = "tel:" + number;
    }, 2000);
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name") || "Subscriber";
    const account = params.get("account") || "--";
    const amount = params.get("amount") || "0";
    const due = params.get("due");

    document.getElementById("subscriberName").innerText = name;
    document.getElementById("accountNumber").innerText = account;

    document.getElementById("amountDue").innerText =
        `₱${parseFloat(amount).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

    const dueElement = document.getElementById("dueDate");

    if (due) {
        const dueDate = new Date(due);
        const today = new Date();

        today.setHours(0,0,0,0);
        dueDate.setHours(0,0,0,0);

        const formatted = dueDate.toLocaleDateString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        if (today > dueDate) {
            dueElement.innerText = `${formatted} (OVERDUE)`;
            dueElement.classList.add("overdue");
        } else {
            dueElement.innerText = formatted;
        }
    }
}

window.onload = getQueryParams;