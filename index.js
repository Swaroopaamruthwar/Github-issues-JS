const perPage = 5;
let pageNumber = 1;
const issueList = document.getElementById('issue__list');
const pageNumberElement = document.getElementById('page-number');
const loadPrevBtn = document.getElementById('load-prev');
const loadNextBtn = document.getElementById('load-next');

// function to fetch issues from GitHub API
async function fetchIssues(page) {
    const url = `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=${perPage}`;
    const response = await fetch(url);
    const issues = await response.json();
    return issues;
}

function displayIssues(issues) {
    issueList.innerHTML = '';
    issues.forEach(issue => {
        const li = document.createElement('li');
        li.innerText = issue.title;
        issueList.appendChild(li);
    });
}

function updatePageNumber() {
    pageNumberElement.innerText = `Page number ${pageNumber}`;
}

async function loadPrevPage() {
    if (pageNumber > 1) {
        pageNumber--;
        const issues = await fetchIssues(pageNumber);
        displayIssues(issues);
        updatePageNumber();
    }
}

async function loadNextPage() {
    pageNumber++;
    const issues = await fetchIssues(pageNumber);
    displayIssues(issues);
    updatePageNumber();
}

fetchIssues(pageNumber).then(issues => {
    displayIssues(issues);
});

loadPrevBtn.addEventListener('click', loadPrevPage);
loadNextBtn.addEventListener('click', loadNextPage);