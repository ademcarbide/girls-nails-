// Function to update price based on model selection
function updatePrice() {
    const modeleSelect = document.getElementById('modele');
    const priceDisplay = document.getElementById('totalPrice');
    if (modeleSelect && priceDisplay) {
        priceDisplay.textContent = modeleSelect.value + " Da";
    }
}

// Handle Order Submission
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('nom').value;
            const price = document.getElementById('totalPrice').textContent;
            
            alert(`Merci ${name} ! Votre commande d'un montant de ${price} a été reçue. Nous vous contacterons bientôt.`);
        });
    }

    // Check URL for product parameters
    const params = new URLSearchParams(window.location.search);
    const prodImg = params.get('img');
    const prodName = params.get('name');

    if (prodImg && document.getElementById('mainProductImg')) {
        document.getElementById('mainProductImg').src = prodImg;
    }
    if (prodName && document.getElementById('productTitle')) {
        document.getElementById('productTitle').textContent = prodName;
    }
});

// --- CUSTOMIZER FUNCTIONS ---

function updateNailShape(shape) {
    const fingerPreview = document.getElementById('fingerPreview');
    const imagePreview = document.getElementById('imagePreview');
    const nail = document.getElementById('previewNail');

    if (shape === 'round') {
        fingerPreview.style.display = 'none';
        imagePreview.style.display = 'block';
    } else {
        fingerPreview.style.display = 'block';
        imagePreview.style.display = 'none';
        
        if (nail) {
            const shapes = ['round', 'almond', 'square', 'oval', 'ballerina', 'stiletto'];
            shapes.forEach(s => nail.classList.remove(s));
            nail.classList.add(shape);
        }
    }

    // Update active button state - more robust selector
    document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === shape) {
            btn.classList.add('active');
        }
    });

    updateCustomPrice();
}

function updateNailSize(size) {
    const nail = document.getElementById('previewNail');
    if (!nail) return;

    // Remove old size classes
    const sizes = ['size-s', 'size-m', 'size-l', 'size-xl'];
    sizes.forEach(s => nail.classList.remove(s));
    
    // Add new size
    nail.classList.add('size-' + size);
    
    updateCustomPrice();
}

function updateNailColor(color, element) {
    const nail = document.getElementById('previewNail');
    const colorDemo = document.getElementById('colorDemoOverlay');

    // Update dynamic nail
    if (nail) {
        nail.style.backgroundColor = color;
        nail.style.backgroundImage = `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`;
    }

    // Update image-based demo overlay
    if (colorDemo) {
        colorDemo.style.backgroundColor = color;
    }

    if (element) {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        element.classList.add('active');
    }
}

function updateCustomPrice() {
    const priceEl = document.getElementById('customPrice');
    if (!priceEl) return;

    // Logic based on shape and size
    let basePrice = 1200;
    const nail = document.getElementById('previewNail');
    
    if (nail.classList.contains('stiletto') || nail.classList.contains('ballerina')) basePrice += 300;
    if (nail.classList.contains('size-l')) basePrice += 200;
    if (nail.classList.contains('size-xl')) basePrice += 400;

    priceEl.textContent = basePrice + " Da";
}

function sendOrder() {
    alert("Commande personnalisée envoyée ! Nous vous contacterons pour confirmer les détails.");
}
