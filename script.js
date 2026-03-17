/* 
  ================================================================
  CORE INTERACTIVE LOGIC
  - Handles dynamic product page updates.
  - Manages order form validation and submission feedback.
  - Development Strategy: Using URL parameters for the Detail page 
    prevents having to create individual HTML files for every product.
  ================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ORDER FORM SUBMISSION ---
    // Target the form in product.html
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            // Prevent the browser from refreshing the page
            e.preventDefault();
            
            // Collect user input for personalized feedback
            const forme = document.getElementById('forme').value;
            const longueur = document.getElementById('longueur').value;
            const name = document.getElementById('nom').value;
            const phone = document.getElementById('tel').value;
            const address = document.getElementById('adresse').value;
            const price = document.getElementById('totalPrice').textContent;
            const productName = document.getElementById('productTitle') ? document.getElementById('productTitle').textContent : 'Produit';
            
            // Generate Timestamp
            const now = new Date();
            const timestamp = now.toLocaleDateString('fr-FR') + ' à ' + now.toLocaleTimeString('fr-FR');
            
            const newOrder = {
                id: Date.now(),
                date: timestamp,
                product: productName,
                forme: forme,
                longueur: longueur,
                customerName: name,
                customerPhone: phone,
                customerAddress: address,
                price: price
            };

            // Save to localStorage
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            alert(`Merci ${name} ! Votre commande d'un montant de ${price} a été reçue. Nous vous contacterons bientôt.`);
            orderForm.reset(); // Clear the form after submission
        });
    }

    // --- 2. DYNAMIC PRODUCT LOADER ---
    // Parse the URL (e.g., product.html?name=Red+Nails&img=red.webp)
    const params = new URLSearchParams(window.location.search);
    const prodImg = params.get('img');
    const prodName = params.get('name');

    // Update the image if the 'img' parameter exists
    if (prodImg && document.getElementById('mainProductImg')) {
        document.getElementById('mainProductImg').src = prodImg;
    }
    
    // Update the title text if the 'name' parameter exists
    if (prodName && document.getElementById('productTitle')) {
        document.getElementById('productTitle').textContent = prodName;
    }
});

// --- 3. TOGGLE PRODUCT IMAGE ---
window.toggleProductImage = function(event, prodId) {
    event.preventDefault(); // Prevent navigating to the product link
    event.stopPropagation(); // Stop event from bubbling up to the link
    
    if (prodId === 1) {
        const img = document.getElementById('prod-1-img');
        const link = document.getElementById('prod-1-link');
        const title = document.getElementById('prod-1-title');
        
        // Use a simple check to toggle between 1 and 2
        if (img.src.includes('couleur%20unie%201.webp') || img.src.includes('couleur unie 1.webp')) {
            // Switch to couleur unie 2
            img.src = 'couleur unie 2.webp';
            title.textContent = 'couleur unie';
            link.href = 'product.html?name=couleur+unie&img=couleur+unie+2.webp';
        } else {
            // Switch back to couleur unie 1
            img.src = 'couleur unie 1.webp';
            title.textContent = 'couleur unie';
            link.href = 'product.html?name=couleur+unie&img=couleur+unie+1.webp';
        }
    }
};
