function componentToHex(c) {
    let hex = c.toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function extractRGB(rgbString) {
    let match = rgbString.match(/\d+/g);
    if (match) {
        return {
            r: parseInt(match[0], 10),
            g: parseInt(match[1], 10),
            b: parseInt(match[2], 10)
        };
    }
    return { r: 0, g: 0, b: 0 }; // Default to black if extraction fails
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan'];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

document.addEventListener('DOMContentLoaded', () => {
    colors.forEach(color => {
        let column = document.createElement('div');
        column.className = 'col-md-4 mb-3 font-monospace';

        let swatch = document.createElement('div');
        swatch.className = `p-3 mb-2 swatch-3d swatch-${color}`;
        column.appendChild(swatch); // Add swatch to the column

        // Temporarily add swatch to the body to compute its color
        document.body.appendChild(swatch);
        let swatchColor = window.getComputedStyle(swatch).backgroundColor;
        let swatchRGB = extractRGB(swatchColor);
        swatch.innerHTML = `<strong class="d-block">${capitalizeFirstLetter(color)}</strong>${rgbToHex(swatchRGB.r, swatchRGB.g, swatchRGB.b)}`;
        document.body.removeChild(swatch); // Remove swatch from the body

        // Append the swatch to the column
        column.appendChild(swatch);

        shades.forEach(shade => {
            let shadeDiv = document.createElement('div');
            shadeDiv.className = `p-3 swatch-3d ${color}-${shade}`;
            column.appendChild(shadeDiv); // Add shadeDiv to the column
            document.body.appendChild(shadeDiv); // Temporarily add to body to compute color
            let computedColor = window.getComputedStyle(shadeDiv).backgroundColor;
            let shadeRGB = extractRGB(computedColor);
            shadeDiv.innerHTML = `${capitalizeFirstLetter(color)}-${shade}<br>${rgbToHex(shadeRGB.r, shadeRGB.g, shadeRGB.b)}`;
            document.body.removeChild(shadeDiv); // Remove shadeDiv from the body

            column.appendChild(shadeDiv);
        });

        document.querySelector('.row').appendChild(column);
    });
});
