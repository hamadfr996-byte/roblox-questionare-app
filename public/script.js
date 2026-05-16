// Load questions and build form
window.addEventListener('DOMContentLoaded', async () => {
    await loadQuestions();
    await updateResponseCount();
});

async function loadQuestions() {
    try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        const questions = data.questions;
        
        const container = document.getElementById('questionsContainer');
        container.innerHTML = '';
        
        questions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.innerHTML = `
                <label class="question-label">${index + 1}. ${question}</label>
                <div class="question-options">
                    <div class="radio-option">
                        <input type="radio" id="q${index}_yes" name="q${index}" value="Yes">
                        <label for="q${index}_yes">Yes</label>
                    </div>
                    <div class="radio-option">
                        <input type="radio" id="q${index}_no" name="q${index}" value="No" checked>
                        <label for="q${index}_no">No</label>
                    </div>
                </div>
            `;
            container.appendChild(questionItem);
        });
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

async function updateResponseCount() {
    try {
        const response = await fetch('/api/response-count');
        const data = await response.json();
        document.getElementById('responseCount').textContent = data.count;
    } catch (error) {
        console.error('Error updating response count:', error);
    }
}

document.getElementById('questionnaireForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            const successMsg = document.getElementById('successMessage');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
            
            // Reset form
            document.getElementById('questionnaireForm').reset();
            
            // Update response count
            await updateResponseCount();
            
            // Re-check all "No" options
            const radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                if (radio.value === 'No') {
                    radio.checked = true;
                } else {
                    radio.checked = false;
                }
            });
        } else {
            showError(data.message);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showError('Error submitting questionnaire');
    }
});

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = '❌ ' + message;
    errorMsg.style.display = 'block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 3000);
}
