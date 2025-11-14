function updateLoadingBar(percentage) {
    const loadingBar = document.getElementById('loading-bar');
    const percentageText = document.getElementById('percentage-text');

    // 1. चौड़ाई अपडेट करना (Update Width)
    loadingBar.style.width = percentage + '%';
    percentageText.textContent = percentage + '%';

    // 2. रंग बदलने का लॉजिक (Colour Change Logic)
    let color;
    if (percentage < 10) {
        color = '#FF4500'; // लाल/नारंगी (Red/Orange) - कम प्रोग्रेस
    } else if (percentage < 25) {
        color = '#FFD700'; // पीला (Yellow) - मध्यम प्रोग्रेस
        } else if (percentage < 40) {
        color = '#4CAF50'; // हरा (Green) - ज़्यादा प्रोग्रेस
        } else if (percentage < 60) {
          color = 'black';
          } else if (percentage < 40) {
            color = 'blue';
    }

    loadingBar.style.backgroundColor = color;
}

// उदाहरण के लिए, 0 से 100% तक धीरे-धीरे बढ़ने वाला कोड:
let currentPercentage = 0;
const interval = setInterval(() => {
    currentPercentage += 5; // हर 500 मिलीसेकंड में 5% बढ़ाएँ

    if (currentPercentage <= 100) {
        updateLoadingBar(currentPercentage);
    } else {
        clearInterval(interval); // 100% पर रुक जाएँ
        percentageText.textContent = '100% - Loading Complete!';
    }
}, 500); // 500 मिलीसेकंड (आधा सेकंड) का अंतरालs