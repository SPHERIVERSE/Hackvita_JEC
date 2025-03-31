# Problem Statement 12: The Rise of Online Hate & Misinformation
Scenario: Online platforms are filled with hate speech, cyberbullying, and offensive content, making digital spaces unsafe. Can AI and technology help automate content moderation while balancing free speech and censorship concerns?
 
# Content Moderator - Hackathon Project

## Overview

This project is a content moderation web application designed to automatically analyze and flag or block potentially harmful text. It leverages state-of-the-art transformer models from Hugging Face to detect hate speech and toxicity in user-generated content. The application aims to strike a balance between free speech and the need to maintain a safe and respectful online environment.

## Features

* **Real-time Moderation:** Analyzes text inputs instantly.
* **Hate Speech Detection:** Uses `facebook/roberta-hate-speech-dynabench-r4-target` to identify hate speech.
* **Toxicity Detection:** Uses `marianna13/multilingual-toxic-text-detection-cc` to detect toxic content.
* **Dynamic UI/UX:**
    * Displays moderation results with confidence percentages.
    * Provides visual feedback with tick (safe) and block (blocked) animations.

* **Flagging and Blocking:** Categorizes content as "safe," "flagged" (for human review), or "blocked" based on confidence thresholds.
* **Multilingual support:** The toxicity model supports multiple languages.
* **Easy to use:** Simple web based application.

## Technologies Used

* **Python:** Backend logic and Flask web framework.
* **Transformers (Hugging Face):** Pre-trained transformer models for text classification.
* **PyTorch:** Deep learning framework for model inference.
* **HTML/CSS/JavaScript:** Frontend user interface.
* **Flask:** Web framework.

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/SPHERIVERSE/Hackvita_JEC.git
    cd Hackvita_JEC
    ```

2.  **Create a Virtual Environment:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate  # On Windows
    ```

3.  **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the Application:**

    ```bash
    python app.py
    ```

5.  **Open the Web Application:**

    * Open your web browser and navigate to `http://127.0.0.1:5000/`.

## Model Details

* **Hate Speech Detection:**
    * Model: `facebook/roberta-hate-speech-dynabench-r4-target`
    * Language: English
    * Description: A RoBERTa-based model fine-tuned for hate speech detection.
* **Toxicity Detection:**
    * Model: `marianna13/multilingual-toxic-text-detection-cc`
    * Language: Multilingual
    * Description: A multilingual model for toxic text detection.

## Important Notes for Hackathon Judges

* **Language Considerations:**
    * The hate speech model is specifically trained on English data.
    * The toxicity model is multilingual.
* **Threshold Tuning:** The thresholds for flagging and blocking content can be adjusted to balance sensitivity and accuracy.
* **Potential Improvements:**
    * Fine-tuning the models on a custom dataset for improved performance.
    * Implementing more sophisticated contextual analysis.
    * Adding a review queue, for flagged items.
    * Adding user feedback mechanisms.
* **Resource Consumption:** Transformer models can be resource-intensive.
* **Ethical Considerations:** This project aims to provide a tool for content moderation, but ethical considerations regarding censorship and free speech should be taken into account.
* **False positives, and false negatives:** There will always be some false positives and false negatives.

* Team MAVERICKS

Members:
* Kaushik Nath
* Kukil Nath

## Future Improvements

* Implement user authentication and authorization.
* Add a moderation queue for flagged content.
* Integrate with social media APIs for real-time moderation.
* Add user feedback mechanisms for model improvement.
* Fine tune the models with a custom dataset.
* Add more robust error handling.
* Add a database to store moderation logs.
* Add ability to change the thresholds from the web page.

## License

Spheriverse.license.copyright
