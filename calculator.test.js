/**
 * Tests for Skirt Pattern Calculator
 */

const { calculatePanelMeasurements, round } = require('./calculator.js');

describe('Skirt Panel Calculator', () => {
    
    describe('calculatePanelMeasurements', () => {
        
        test('calculates correct panel width at waist for 4 panels', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 4, 1.5);
            expect(result.panelWidthAtWaist).toBe(20); // 80 / 4 = 20
        });
        
        test('calculates correct panel width at hip for 4 panels', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 4, 1.5);
            expect(result.panelWidthAtHip).toBe(25); // 100 / 4 = 25
        });
        
        test('calculates correct panel length', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 4, 1.5);
            expect(result.panelLength).toBe(60);
        });
        
        test('includes seam allowance in width measurements', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 4, 1.5);
            // Seam allowance added to both sides: 20 + (1.5 * 2) = 23
            expect(result.panelWidthAtWaistWithSeam).toBe(23);
            // Seam allowance added to both sides: 25 + (1.5 * 2) = 28
            expect(result.panelWidthAtHipWithSeam).toBe(28);
        });
        
        test('includes seam allowance in length measurements', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 4, 1.5);
            // Seam allowance added to top and bottom: 60 + (1.5 * 2) = 63
            expect(result.panelLengthWithSeam).toBe(63);
        });
        
        test('calculates correctly for 6 panels', () => {
            const result = calculatePanelMeasurements(90, 120, 70, 6, 1);
            expect(result.panelWidthAtWaist).toBe(15); // 90 / 6 = 15
            expect(result.panelWidthAtHip).toBe(20); // 120 / 6 = 20
            expect(result.panelLength).toBe(70);
            expect(result.panelWidthAtWaistWithSeam).toBe(17); // 15 + (1 * 2)
            expect(result.panelWidthAtHipWithSeam).toBe(22); // 20 + (1 * 2)
            expect(result.panelLengthWithSeam).toBe(72); // 70 + (1 * 2)
        });
        
        test('handles default seam allowance', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 4);
            expect(result.seamAllowance).toBe(1.5);
        });
        
        test('returns correct number of panels', () => {
            const result = calculatePanelMeasurements(80, 100, 60, 8);
            expect(result.numberOfPanels).toBe(8);
        });
        
        test('throws error for invalid waist measurement', () => {
            expect(() => calculatePanelMeasurements(0, 100, 60, 4)).toThrow('Invalid measurements provided');
            expect(() => calculatePanelMeasurements(-10, 100, 60, 4)).toThrow('Invalid measurements provided');
        });
        
        test('throws error for invalid hip measurement', () => {
            expect(() => calculatePanelMeasurements(80, 0, 60, 4)).toThrow('Invalid measurements provided');
            expect(() => calculatePanelMeasurements(80, -10, 60, 4)).toThrow('Invalid measurements provided');
        });
        
        test('throws error for invalid length', () => {
            expect(() => calculatePanelMeasurements(80, 100, 0, 4)).toThrow('Invalid measurements provided');
            expect(() => calculatePanelMeasurements(80, 100, -10, 4)).toThrow('Invalid measurements provided');
        });
        
        test('throws error for less than 2 panels', () => {
            expect(() => calculatePanelMeasurements(80, 100, 60, 1)).toThrow('Invalid measurements provided');
            expect(() => calculatePanelMeasurements(80, 100, 60, 0)).toThrow('Invalid measurements provided');
        });
        
        test('handles decimal measurements', () => {
            const result = calculatePanelMeasurements(75.5, 99.5, 55.5, 4, 1.5);
            expect(result.panelWidthAtWaist).toBe(18.9); // 75.5 / 4 = 18.875, rounded to 18.9
            expect(result.panelWidthAtHip).toBe(24.9); // 99.5 / 4 = 24.875, rounded to 24.9
        });
    });
    
    describe('round function', () => {
        
        test('rounds to 1 decimal place', () => {
            expect(round(10.555, 1)).toBe(10.6);
            expect(round(10.544, 1)).toBe(10.5);
        });
        
        test('rounds to 2 decimal places', () => {
            expect(round(10.5555, 2)).toBe(10.56);
            expect(round(10.5544, 2)).toBe(10.55);
        });
        
        test('handles whole numbers', () => {
            expect(round(10, 1)).toBe(10);
        });
    });
});
