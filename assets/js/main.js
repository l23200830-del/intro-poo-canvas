const canvasOOP = document.getElementById("canvasOOP");
const canvasRandom = document.getElementById("canvasRandom");
const canvasMultiple = document.getElementById("canvasMultiple");

const ctx = canvasOOP.getContext("2d");
const ctxRandom = canvasRandom.getContext("2d");
const ctxMultiple = canvasMultiple.getContext("2d");

// Dimensiones fijas para todos los canvas
const w = 300;
const h = 200;

[canvasOOP, canvasRandom, canvasMultiple].forEach(canv => {
    canv.width = w;
    canv.height = h;
});

canvasOOP.style.background = "#ff8";
canvasRandom.style.background = "#e6f7f6";
canvasMultiple.style.background = "#fcfb97";

// --- CLASE CIRCLE ---
class Circle {
    constructor(x, y, radius, color, text, backcolor, textColor) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color; // Color del borde
        this.text = text;
        this.backcolor = backcolor; // Color de relleno
        this.textColor = textColor;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();

        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = this.textColor;
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }
}

// --- UTILIDADES ---
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// --- 1. CANVAS OOP (Círculo Estático Centrado) ---
let miCirculo = new Circle(w / 2, h / 2, 50, "rgb(66, 120, 5)", "Tec", "white", "blue");
miCirculo.draw(ctx);

// --- 2. CANVAS RANDOM (Círculo Aleatorio que no se sale) ---
let rRadius = Math.floor(Math.random() * 20 + 30); // Radio entre 30 y 50
// Restamos el radio de los límites para que siempre quede dentro
let rX = Math.random() * (w - rRadius * 2) + rRadius;
let rY = Math.random() * (h - rRadius * 2) + rRadius;

let miCirculoRandom = new Circle(rX, rY, rRadius, "green", "Tec", "#53ba34", "#000");
miCirculoRandom.draw(ctxRandom);

// --- 3. CANVAS MULTIPLE (Animación y Colores Aleatorios) ---
let arrayCircle = [];
for (let i = 0; i < 7; i++) {
    let mRadius = Math.floor(Math.random() * 10 + 20); // Radio entre 20 y 30
    let mX = Math.random() * (w - mRadius * 2) + mRadius;
    let mY = Math.random() * (h - mRadius * 2) + mRadius;

    arrayCircle.push(new Circle(
        mX, 
        mY, 
        mRadius, 
        "#9e500d", 
        i + 1, 
        getRandomColor(), 
        "white"
    ));
}

function animateMultiple() {
    // 1. Limpiar el canvas específico de múltiples objetos
    ctxMultiple.clearRect(0, 0, w, h);

    // 2. Actualizar y dibujar cada círculo
    arrayCircle.forEach(circle => {
        circle.backcolor = getRandomColor(); // Cambia el color de fondo en cada frame
        circle.draw(ctxMultiple);
    });

    // 3. Crear el bucle infinito de animación
   // requestAnimationFrame(animateMultiple);
}

// Iniciar la animación
animateMultiple();