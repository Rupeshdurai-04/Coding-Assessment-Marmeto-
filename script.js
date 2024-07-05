document.addEventListener('DOMContentLoaded', function () {
    showCategory('Men');
});

async function showCategory(category) {
    const tabs = document.querySelectorAll('.tab-link');
    const activeTab = document.querySelector(`.tab-link[data-category="${category}"]`);
    activeTab.classList.add('active');
    tabs.forEach(tab => {
        if (tab !== activeTab) {
            tab.classList.remove('active');
        }
    });

    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();

        const categoryData = data.categories.find(cat => cat.category_name === category);

        if (categoryData) {
            categoryData.category_products.forEach(product => {
                const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                const title = product.title.length > 20 ? product.title.substr(0,20) +"...":product.title

                const productCard = document.createElement('div');
                productCard.classList.add('card');

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;

                const productInfo = document.createElement('div');
                productInfo.classList.add('product-info');
                productInfo.innerHTML = `
            <div class="product-title">${title}</div>
            <div class="product-vendor">${product.vendor}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-compare-price">$${product.compare_at_price}</div>
            <div class="product-discount">${discount}% off</div>
            <button class="add-to-cart-btn">Add to Cart</button>
          `;

                productCard.appendChild(productImage);
                productCard.appendChild(productInfo);
                productContainer.appendChild(productCard);
            });
        } else {
            throw new Error('Category data not found');
        }
    } catch (error) {
        console.error('Error fetching and displaying products:', error);
    }
}
