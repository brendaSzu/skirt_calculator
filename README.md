# Skirt Pattern Calculator

A web-based application to calculate the measurements of pattern pieces for skirts. It takes the user's body measurements and calculates the length and width of user-defined number of panels that will be the skirt components.

## Features

- Input body measurements (waist circumference, hip circumference, skirt length)
- Specify number of panels (2-20)
- Customize seam allowance
- Get calculated panel measurements with and without seam allowance

## Usage

1. Open `index.html` in a web browser
2. Enter your measurements:
   - **Waist Circumference**: Your waist measurement in cm
   - **Hip Circumference**: Your hip measurement in cm
   - **Skirt Length**: Desired skirt length in cm
   - **Number of Panels**: How many panels to divide the skirt into
   - **Seam Allowance**: Seam allowance in cm (default 1.5 cm)
3. Click "Calculate Panels" to see the results

## Output

The calculator provides:
- Panel width at waist (finished and with seam allowance)
- Panel width at hip (finished and with seam allowance)
- Panel length (finished and with seam allowance)
- Number of panels to cut

## Running Tests

```bash
npm install
npm test
```

## Screenshot

![Skirt Pattern Calculator](https://github.com/user-attachments/assets/0cdaf6f7-d962-4f8b-a807-0a927c755433)
