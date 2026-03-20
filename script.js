// EmailJS credentials
const EMAILJS_PUBLIC_KEY  = "serbCwOdZR-I0PgUe";
const EMAILJS_SERVICE_ID  = "service_zp2u72s";
const EMAILJS_TEMPLATE_ID = "template_wpodfdo";

(function(){
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
  s.onload = function(){ emailjs.init(EMAILJS_PUBLIC_KEY); };
  document.head.appendChild(s);
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ORDER FORM SUBMISSION ---
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const forme       = document.getElementById('forme').value;
            const longueur    = document.getElementById('longueur').value;
            const name        = document.getElementById('nom').value;
            const phone       = document.getElementById('tel').value;
            const address     = document.getElementById('adresse').value;
            const price       = document.getElementById('totalPrice').textContent;
            const productName = document.getElementById('productTitle')
                                ? document.getElementById('productTitle').textContent
                                : 'Produit';

            const now       = new Date();
            const timestamp = now.toLocaleDateString('fr-DZ') + ' à ' + now.toLocaleTimeString('fr-DZ');

            const btn = orderForm.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                customer_name:   name,
                customer_phone:  phone,
                customer_wilaya: address,
                product_name:    productName,
                product_price:   price,
                order_date:      timestamp,
                nail_forme:      forme,
                nail_longueur:   longueur
            })
            .then(() => {

                // 🔔 Play notification sound
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play();

                // Save to localStorage as backup
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push({
                    id: Date.now(),
                    date: timestamp,
                    product: productName,
                    forme, longueur,
                    customerName: name,
                    customerPhone: phone,
                    customerAddress: address,
                    price
                });
                localStorage.setItem('orders', JSON.stringify(orders));

                btn.textContent = 'Buy Now';
                btn.disabled = false;
                alert(`Merci ${name} ! Votre commande a été reçue. Nous vous contacterons bientôt. 💕`);
                orderForm.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                btn.textContent = 'Buy Now';
                btn.disabled = false;
                alert('Une erreur est survenue. Veuillez réessayer.');
            });
        });
    }

    // --- 2. DYNAMIC PRODUCT LOADER ---
    const params   = new URLSearchParams(window.location.search);
    const prodImg  = params.get('img');
    const prodName = params.get('name');

    if (prodImg && document.getElementById('mainProductImg')) {
        document.getElementById('mainProductImg').src = prodImg;
    }
    if (prodName && document.getElementById('productTitle')) {
        document.getElementById('productTitle').textContent = prodName;
    }

    // Update price based on product
    const prices = {
        'couleur unie': '1200 Da',
        'la french':    '1600 Da',
        'babyboomer':   '1600 Da',
        '3d nail art':  '2000 Da',
        'cat eye':      '1800 Da'
    };
    if (prodName && prices[prodName] && document.getElementById('totalPrice')) {
        document.getElementById('totalPrice').textContent = prices[prodName];
    }
});

// --- 3. TOGGLE PRODUCT IMAGE ---
window.toggleProductImage = function(event, prodId) {
    event.preventDefault();
    event.stopPropagation();

    if (prodId === 1) {
        const img   = document.getElementById('prod-1-img');
        const link  = document.getElementById('prod-1-link');
        const title = document.getElementById('prod-1-title');

        if (img.src.includes('couleur%20unie%201.webp') || img.src.includes('couleur unie 1.webp')) {
            img.src           = 'couleur unie 2.webp';
            title.textContent = 'couleur unie';
            link.href         = 'product.html?name=couleur+unie&img=couleur+unie+2.webp';
        } else {
            img.src           = 'couleur unie 1.webp';
            title.textContent = 'couleur unie';
            link.href         = 'product.html?name=couleur+unie&img=couleur+unie+1.webp';
        }
    }
};
