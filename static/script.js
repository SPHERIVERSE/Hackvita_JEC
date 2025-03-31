document.getElementById('moderateButton').addEventListener('click', function() {
    const text = document.getElementById('inputText').value;

    // Reset UI
    document.body.classList.remove('safe-bg', 'blocked-bg');
    document.getElementById('tickAnimation').style.display = 'none';
    document.getElementById('blockAnimation').style.display = 'none';
    document.getElementById('detailsPopup').style.display = 'none';

    fetch('/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        let resultsHTML = '';
        const hate = data.hate_speech;
        const toxic = data.toxicity;

        if (hate.status === 'blocked' || toxic.status === 'blocked') {
            resultsHTML = `<p class="blocked">Content Blocked <button id="infoButton" class="details-button">i</button></p>`;
            document.getElementById('blockAnimation').style.display = 'block';
            document.body.classList.add('blocked-bg');
            document.getElementById('blockSound').play(); // Play blocked sound
            // Add crack animation here
        } else if (hate.status === 'flagged' || toxic.status === 'flagged') {
            resultsHTML = `<p class="flagged">Content Flagged for Review <button id="infoButton" class="details-button">i</button></p>`;
        } else if (hate.status === 'error' || toxic.status === 'error') {
            resultsHTML = `<p class="error">An error occurred</p>`;
        } else {
            resultsHTML = `<p class="safe">Content Safe <button id="infoButton" class="details-button">i</button></p>`;
            document.getElementById('tickAnimation').style.display = 'block';
            document.body.classList.add('safe-bg');
            document.getElementById('safeSound').play(); // Play safe sound
            // Add glitter animation here
        }

        const hateConf = (hate.score * 100).toFixed(2);
        const toxicConf = (toxic.score * 100).toFixed(2);

        document.getElementById('detailsPopup').innerHTML = `Hate: ${hate.label}, Confidence: ${hateConf}%, Status: ${hate.status}<br>Toxic: ${toxic.label}, Confidence: ${toxicConf}%, Status: ${toxic.status}`;

        document.getElementById('results').innerHTML = resultsHTML;

        // ... (random quote handling) ...
    });
});

document.getElementById('results').addEventListener('click', function(event) {
    if (event.target.id === 'infoButton') {
        document.getElementById('detailsPopup').style.display = 'block';
    }
});

document.addEventListener('click', function(event) {
    if (event.target.id !== 'infoButton') {
        document.getElementById('detailsPopup').style.display = 'none';
    }
});

document.getElementById('retryButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('results').innerHTML = '';
    document.body.classList.remove('safe-bg', 'blocked-bg');
    document.getElementById('tickAnimation').style.display = 'none';
    document.getElementById('blockAnimation').style.display = 'none';
});
