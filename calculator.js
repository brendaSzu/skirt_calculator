/**
 * Skirt Pattern Calculator
 * Calculates panel measurements for skirt pattern pieces based on body measurements
 */

/**
 * Calculate the measurements for each panel of a skirt
 * @param {number} waistCircumference - Waist measurement in cm
 * @param {number} hipCircumference - Hip measurement in cm
 * @param {number} skirtLength - Desired skirt length in cm
 * @param {number} numberOfPanels - Number of panels to divide the skirt into
 * @param {number} seamAllowance - Seam allowance in cm (default 1.5)
 * @returns {Object} Panel measurements including width at waist, width at hip, and length
 */
function calculatePanelMeasurements(waistCircumference, hipCircumference, skirtLength, numberOfPanels, seamAllowance = 1.5) {
    // Validate inputs
    if (waistCircumference <= 0 || hipCircumference <= 0 || skirtLength <= 0 || numberOfPanels < 2) {
        throw new Error('Invalid measurements provided');
    }

    // Calculate width at waist for each panel (before seam allowance)
    const panelWidthAtWaist = waistCircumference / numberOfPanels;
    
    // Calculate width at hip for each panel (before seam allowance)
    const panelWidthAtHip = hipCircumference / numberOfPanels;
    
    // Add seam allowance to width (both sides of the panel)
    const panelWidthAtWaistWithSeam = panelWidthAtWaist + (seamAllowance * 2);
    const panelWidthAtHipWithSeam = panelWidthAtHip + (seamAllowance * 2);
    
    // Panel length includes seam allowance at top (waist) and hem
    const panelLengthWithSeam = skirtLength + (seamAllowance * 2);
    
    return {
        numberOfPanels: numberOfPanels,
        panelWidthAtWaist: round(panelWidthAtWaist, 1),
        panelWidthAtHip: round(panelWidthAtHip, 1),
        panelLength: round(skirtLength, 1),
        panelWidthAtWaistWithSeam: round(panelWidthAtWaistWithSeam, 1),
        panelWidthAtHipWithSeam: round(panelWidthAtHipWithSeam, 1),
        panelLengthWithSeam: round(panelLengthWithSeam, 1),
        seamAllowance: seamAllowance
    };
}

/**
 * Round a number to specified decimal places
 * @param {number} value - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

/**
 * Display the calculated panel measurements in the UI
 * @param {Object} measurements - The calculated panel measurements
 */
function displayResults(measurements) {
    const resultsDiv = document.getElementById('results');
    const panelDetailsDiv = document.getElementById('panel-details');
    
    // Clear previous results
    panelDetailsDiv.innerHTML = '';
    
    // Create panel info display
    const panelInfo = document.createElement('div');
    panelInfo.className = 'panel-info';
    panelInfo.innerHTML = `
        <h3>Each Panel (Cut ${measurements.numberOfPanels} pieces)</h3>
        <div class="measurement">
            <span class="measurement-label">Width at Waist (finished):</span>
            <span class="measurement-value">${measurements.panelWidthAtWaist} cm</span>
        </div>
        <div class="measurement">
            <span class="measurement-label">Width at Hip (finished):</span>
            <span class="measurement-value">${measurements.panelWidthAtHip} cm</span>
        </div>
        <div class="measurement">
            <span class="measurement-label">Length (finished):</span>
            <span class="measurement-value">${measurements.panelLength} cm</span>
        </div>
        <div class="measurement">
            <span class="measurement-label">Width at Waist (with seam allowance):</span>
            <span class="measurement-value">${measurements.panelWidthAtWaistWithSeam} cm</span>
        </div>
        <div class="measurement">
            <span class="measurement-label">Width at Hip (with seam allowance):</span>
            <span class="measurement-value">${measurements.panelWidthAtHipWithSeam} cm</span>
        </div>
        <div class="measurement">
            <span class="measurement-label">Length (with seam allowance):</span>
            <span class="measurement-value">${measurements.panelLengthWithSeam} cm</span>
        </div>
    `;
    
    panelDetailsDiv.appendChild(panelInfo);
    
    // Create summary
    const summary = document.createElement('div');
    summary.className = 'summary';
    summary.innerHTML = `
        <h3>Summary</h3>
        <p>Cut ${measurements.numberOfPanels} identical panels</p>
        <p>Seam allowance: ${measurements.seamAllowance} cm included</p>
    `;
    
    panelDetailsDiv.appendChild(summary);
    
    // Show results
    resultsDiv.classList.remove('hidden');
}

// Form submission handler (only attach if in browser environment)
if (typeof document !== 'undefined') {
    document.getElementById('skirt-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const waist = parseFloat(document.getElementById('waist').value);
        const hip = parseFloat(document.getElementById('hip').value);
        const length = parseFloat(document.getElementById('length').value);
        const panels = parseInt(document.getElementById('panels').value);
        const seamAllowance = parseFloat(document.getElementById('seam-allowance').value) || 1.5;
        
        try {
            const measurements = calculatePanelMeasurements(waist, hip, length, panels, seamAllowance);
            displayResults(measurements);
        } catch (error) {
            alert('Please check your measurements and try again.');
        }
    });
}

// Export for testing (if in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculatePanelMeasurements, round };
}
