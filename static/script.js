/* static/script.js */
document.getElementById('moderateButton').addEventListener('click', function() {
    const text = document.getElementById('inputText').value;

    // Remove existing background classes
    document.body.classList.remove('safe-bg', 'blocked-bg');

    // Hide animations before showing new ones
    document.getElementById('tickAnimation').style.display = 'none';
    document.getElementById('blockAnimation').style.display = 'none';

    fetch('/moderate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        let resultsHTML = '';
        const hate = data.hate_speech;
        const toxic = data.toxicity;

        if (hate.status === 'blocked' || toxic.status === 'blocked') {
            resultsHTML = `<p class="blocked">Content Blocked.</p>`;
            document.getElementById('blockAnimation').style.display = 'block';
            document.body.classList.add('blocked-bg'); // Add blocked background
        } else if (hate.status === 'flagged' || toxic.status === 'flagged') {
            resultsHTML = `<p class="flagged">Content Flagged for Review.</p>`;
        } else if (hate.status === 'error' || toxic.status === 'error') {
            resultsHTML = `<p class="error">An error occurred during moderation.</p>`;
        } else {
            resultsHTML = `<p class="safe">Content Safe.</p>`;
            document.getElementById('tickAnimation').style.display = 'block';
            document.body.classList.add('safe-bg'); // Add safe background
        }

        const hateConfidencePercent = (hate.score * 100).toFixed(2);
        const toxicConfidencePercent = (toxic.score * 100).toFixed(2);

        resultsHTML += `<p>Hate Speech: ${hate.label}, Confidence: ${hateConfidencePercent}%, Status: ${hate.status}</p>`;
        resultsHTML += `<p>Toxicity: ${toxic.label}, Confidence: ${toxicConfidencePercent}%, Status: ${toxic.status}</p>`;

        document.getElementById('results').innerHTML = resultsHTML;
    });
});
