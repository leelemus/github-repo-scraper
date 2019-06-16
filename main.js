'use strict';

function displayResults(responseJson) {
    const repoResult = responseJson;
    $('.repoResults').empty();

    for (let i =0; i < repoResult.length; i++){
        $('.repoResults').append(`
            <li>
                <p><strong>Repo Name:</strong> ${repoResult[i].full_name}</p>
                <p><strong>Repo URL:</strong> <a href="${repoResult[i].html_url}" target="_blank">${repoResult[i].html_url}</a></p>
            </li>
        `);
    }
}

function getRepo(){
    let repoUrl ="https://api.github.com/users/"+$('.js-gitHubProfile').val()+"/repos";
    fetch(repoUrl)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then (responseJson => displayResults(responseJson))
        .catch (error => alert("Doh! Something went wrong! Please try again."));
}

function repoGenerator() {
    $('.js-gitHubForm').submit(event => {
        event.preventDefault();
        getRepo();
    })
}

$(repoGenerator);