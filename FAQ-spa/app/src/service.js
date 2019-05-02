/**
 * Contains functions for working with the lambda functions
 */

const BASEURL = "https://drx3551i1m.execute-api.ap-southeast-2.amazonaws.com/dev";

export function getHotList() {
    const serviceURL = BASEURL + '/hotlist';
    return fetch(serviceURL).then(dat => {
        return dat.json();
    })
}


export function askQuestion({ question, asker }) {
    const serviceURL = BASEURL + '/ask';
    if (!asker) {
        asker = 'Anon'
    }
    if (!question) {
        return Promise.reject('No question');
    }
    return fetch(serviceURL, {
        method: 'POST',
        body: JSON.stringify({ question, asker }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(body => {
        return body.json();
    })
}

// POst the answer to this question
export function saveAnswer({ questionId, answer, person }) {
    const serviceURL = BASEURL + '/q/' + questionId + '/answer'
    return fetch(serviceURL, {
        method: 'POST',
        body: JSON.stringify({ answer, person }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(body => {
        return body.json();
    })
}